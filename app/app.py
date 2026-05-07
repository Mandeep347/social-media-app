from fastapi import FastAPI, HTTPException

app = FastAPI()

text_posts = {
    1:{
        "title":"New post",
        "content":"This is the first post"
    },
    2: {
    "title": "New post",
    "content": "This is the second post"
  },
  3: {
    "title": "New post",
    "content": "This is the third post"
  },
  4: {
    "title": "New post",
    "content": "This is the fourth post"
  },
  5: {
    "title": "New post",
    "content": "This is the fifth post"
  },
  6: {
    "title": "New post",
    "content": "This is the sixth post"
  },
  7: {
    "title": "New post",
    "content": "This is the seventh post"
  },
  8: {
    "title": "New post",
    "content": "This is the eighth post"
  },
  9: {
    "title": "New post",
    "content": "This is the ninth post"
  },
  10: {
    "title": "New post",
    "content": "This is the tenth post"
  }
}

@app.get("/posts")
def get_all_posts(limit: int = None):
    if limit:
        return list(text_posts.values())[:limit]
    return text_posts

@app.get("/posts/{id}")
def get_post(id: int):
    
    if id not in text_posts:
        raise HTTPException(status_code=404, detail="Post not found")
    return text_posts.get(id)