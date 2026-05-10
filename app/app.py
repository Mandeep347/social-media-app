from fastapi import FastAPI, HTTPException, File, UploadFile, Form, Depends
from app.schemas import PostCreate, PostResponse
from app.db import Post, create_db_and_table, get_async_session
from sqlalchemy.ext.asyncio import AsyncSession
from contextlib import asynccontextmanager
from sqlalchemy import select
from app.images import imagekit
import shutil
import os
import uuid
import tempfile
#from imagekitio.

@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_db_and_table()
    yield

app = FastAPI(lifespan=lifespan)

@app.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    caption: str = Form(""),
    session: AsyncSession = Depends(get_async_session)
):

    temp_file_path = None

    try:
        # Create temp file
        temp_file = tempfile.NamedTemporaryFile(
            delete=False,
            suffix=os.path.splitext(file.filename)[1]
        )

        temp_file_path = temp_file.name

        # Copy uploaded content into temp file
        shutil.copyfileobj(file.file, temp_file)

        # IMPORTANT: close temp file before reopening on Windows
        temp_file.close()

        # Open file safely for upload
        with open(temp_file_path, "rb") as upload_file_obj:

            upload_result = imagekit.files.upload(
                file=upload_file_obj,
                file_name=file.filename,
                use_unique_file_name=True,
                tags=["backend-upload"]
            )

        # Check upload success
        if upload_result.url:

            post = Post(
                caption=caption,
                url=upload_result.url,
                file_type="video"
                if file.content_type.startswith("video/")
                else "image",
                file_name=upload_result.name
            )

            session.add(post)

            await session.commit()
            await session.refresh(post)

            return post

        else:
            raise HTTPException(
                status_code=400,
                detail="Image upload failed"
            )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:

        # Remove temp file safely
        if temp_file_path and os.path.exists(temp_file_path):
            os.unlink(temp_file_path)

        # IMPORTANT: UploadFile.close() is async
        await file.close()        

@app.get("/feed")
async def get_feed(
    session: AsyncSession = Depends(get_async_session)
):
    result = await session.execute(select(Post).order_by(Post.created_at.desc()))
    posts = [row[0] for row in result.all()]

    posts_data = []
    for post in posts:
        posts_data.append(
            {
                "id": str(post.id),
                "caption": post.caption,
                "url": post.url,
                "file_type": post.file_type,
                "created_at": post.created_at.isoformat()
            }
        )
    
    return {"posts": posts_data}