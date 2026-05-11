# 📱 Social Media Web App

A modern, full-stack social media application with a minimalist design inspired by Instagram and X (Twitter). Built with FastAPI backend and React frontend.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.11+-blue.svg)
![React](https://img.shields.io/badge/react-18.2+-blue.svg)

## ✨ Features

### 🎨 Frontend
- **Modern UI Design** - Minimalist, clean interface
- **Dark Mode** - Full dark/light theme support with smooth transitions
- **Responsive Design** - Mobile-first approach, works on all devices
- **Real-time Updates** - Dynamic feed with instant updates
- **Image & Video Upload** - Support for media content
- **Social Interactions** - Like, comment, and share posts
- **User Profiles** - Personalized user pages with post history
- **Search & Explore** - Discover new content and users
- **Notifications** - Stay updated with activity

### 🔧 Backend
- **RESTful API** - FastAPI with automatic OpenAPI documentation
- **JWT Authentication** - Secure token-based auth
- **User Management** - Registration, login, profile management
- **Media Handling** - ImageKit integration for image/video storage
- **Database** - SQLAlchemy with async support
- **CORS Enabled** - Cross-origin resource sharing configured

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client
- **Vite** - Build tool and dev server
- **React Icons** - Icon library
- **date-fns** - Date formatting

### Backend
- **FastAPI** - Modern Python web framework
- **FastAPI Users** - Authentication system
- **SQLAlchemy** - ORM with async support
- **SQLite/PostgreSQL** - Database
- **ImageKit** - Media storage and CDN
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation

## 📁 Project Structure

```
.
├── app/                      # Backend application
│   ├── app.py               # Main FastAPI application
│   ├── db.py                # Database models and connection
│   ├── users.py             # User authentication logic
│   ├── schemas.py           # Pydantic schemas
│   ├── images.py            # ImageKit configuration
│   └── .env                 # Backend environment variables
├── frontend/                 # Frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # React context (Auth, Theme)
│   │   ├── pages/           # Page components
│   │   ├── services/        # API integration
│   │   ├── utils/           # Utility functions
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── public/              # Static assets
│   ├── index.html           # HTML template
│   ├── package.json         # Dependencies
│   ├── vite.config.js       # Vite configuration
│   └── tailwind.config.js   # Tailwind configuration
├── main.py                   # Backend entry point
├── requirements.txt          # Python dependencies
├── render.yaml              # Render deployment config
└── README.md                # This file
```

## 🚀 Quick Start

### Prerequisites

- Python 3.11 or higher
- Node.js 16 or higher
- npm or yarn
- ImageKit account (for media uploads)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/social-media-app.git
cd social-media-app
```

### 2. Backend Setup

#### Install Python Dependencies

```bash
pip install -r requirements.txt
```

#### Configure Environment Variables

Create `app/.env`:

```env
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key_here
```

#### Start Backend Server

```bash
python main.py
```

Backend will run on **http://localhost:8000**

Verify: Open http://localhost:8000/docs to see API documentation

### 3. Frontend Setup

#### Install Dependencies

```bash
cd frontend
npm install
```

#### Configure Environment Variables (Optional)

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:8000
```

#### Start Frontend Server

```bash
npm run dev
```

Frontend will run on **http://localhost:3000** or **http://localhost:5173**

### 4. Create Your First Account

1. Open http://localhost:3000 in your browser
2. Click "Create Account"
3. Enter email and password (min 8 characters)
4. Start posting!

## 📖 API Documentation

Once the backend is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Main Endpoints

#### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/jwt/login` - Login with credentials
- `POST /auth/jwt/logout` - Logout user
- `GET /users/me` - Get current user info

#### Posts
- `GET /feed` - Get all posts
- `POST /upload` - Create new post with media
- `DELETE /posts/{post_id}` - Delete a post

#### Users
- `GET /users/{user_id}` - Get user profile
- `PATCH /users/{user_id}` - Update user profile

## 🎨 Features Showcase

### Pages

1. **Login/Register** - Beautiful authentication pages with validation
2. **Home Feed** - Main feed with all posts, create post functionality
3. **Profile** - User profile with posts grid and statistics
4. **Post Detail** - Individual post view with comments section
5. **Explore** - Search and discover trending content
6. **Notifications** - Activity notifications and updates

### Components

- **PostCard** - Feed cards with media, actions, and metadata
- **CreatePostModal** - Upload images/videos with captions
- **Sidebar** - Desktop navigation with theme toggle
- **MobileNav** - Bottom navigation for mobile devices
- **RightSidebar** - Trending topics and suggested users
- **Loading States** - Skeleton loaders for better UX
- **Empty States** - Friendly messages when no content
- **Error States** - Error handling with retry options

## 🌐 Deployment

### Quick Deploy (Recommended)

**Frontend → Vercel | Backend → Render**

See detailed guides:
- **Quick Guide**: [QUICK_DEPLOY.md](QUICK_DEPLOY.md)
- **Step-by-Step**: [VERCEL_DEPLOY.md](VERCEL_DEPLOY.md)
- **Full Guide**: [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- **Checklist**: [DEPLOY_CHECKLIST.md](DEPLOY_CHECKLIST.md)

### Deploy Backend to Render

```bash
# Push to GitHub
git push origin main

# Go to render.com
# Create new Web Service
# Connect repository
# Deploy automatically
```

### Deploy Frontend to Vercel

```bash
cd frontend
vercel --prod
```

Or use Vercel dashboard to import from GitHub.

## 🔧 Configuration

### Backend Environment Variables

```env
# Required
IMAGEKIT_PRIVATE_KEY=your_imagekit_key

# Optional (for production)
DATABASE_URL=postgresql://user:pass@host/db
SECRET_KEY=your_secret_key
```

### Frontend Environment Variables

```env
# API URL (defaults to http://localhost:8000)
VITE_API_URL=http://localhost:8000

# For production
VITE_API_URL=https://your-backend.onrender.com
```

## 🧪 Testing

### Test Backend

```bash
# Visit API docs
curl http://localhost:8000/docs

# Test registration
curl -X POST "http://localhost:8000/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass123"}'

# Test login
curl -X POST "http://localhost:8000/auth/jwt/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=test@example.com&password=testpass123"
```

### Test Frontend

```bash
cd frontend

# Build test
npm run build

# Preview production build
npm run preview
```

### Test API Connection

Open browser console (F12) and run:

```javascript
testAPI()
```

## 🐛 Troubleshooting

### Common Issues

#### "Registration failed" or "Login failed"

**Solution:**
1. Check backend is running on port 8000
2. Clear browser cache: `localStorage.clear()` in console
3. Check browser console for detailed errors
4. Verify CORS is configured in backend

#### CORS Errors

**Solution:**
1. Restart backend after CORS changes
2. Verify `allow_origins` includes your frontend URL
3. Clear browser cache

#### Network Errors

**Solution:**
1. Ensure backend is running: `python main.py`
2. Check backend URL in frontend `.env`
3. Verify firewall allows ports 3000 and 8000


## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style
- Write meaningful commit messages
- Test your changes locally
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspired by Instagram and X (Twitter)
- Built with FastAPI and React
- Icons from React Icons
- Styling with Tailwind CSS

## 📧 Contact

- **GitHub**: [mandeep347](https://github.com/mandeep347)
- **Email**: mandeepchauhan9952@gmail.com

## 🗺️ Roadmap

### Current Features
- ✅ User authentication
- ✅ Post creation with media
- ✅ Feed view
- ✅ User profiles
- ✅ Dark mode
- ✅ Responsive design

### Planned Features
- [ ] Real-time notifications
- [ ] Direct messaging
- [ ] Stories feature
- [ ] Advanced search
- [ ] User following system
- [ ] Post analytics
- [ ] Email verification
- [ ] Password reset
- [ ] Two-factor authentication
- [ ] Video processing
- [ ] Hashtags
- [ ] Mentions
- [ ] Bookmarks
- [ ] Share to external platforms

## 📊 Project Stats

- **Lines of Code**: ~5,000+
- **Components**: 15+
- **API Endpoints**: 10+
- **Pages**: 6
- **Supported Devices**: All (responsive)

## 🎯 Use Cases

- Personal social media platform
- Community forum
- Photo sharing app
- Micro-blogging platform
- Portfolio project
- Learning full-stack development

## 💡 Tips

### For Development
- Keep both backend and frontend running
- Check browser console (F12) for errors
- Use `testAPI()` function for debugging
- Read API docs at `/docs` endpoint

### For Production
- Use PostgreSQL instead of SQLite
- Set up proper environment variables
- Enable HTTPS (automatic on Vercel/Render)
- Monitor logs regularly
- Set up error tracking
- Use CDN for media files

## 🔐 Security

- JWT token authentication
- Password hashing
- CORS protection
- Input validation
- SQL injection prevention
- XSS protection

## ⚡ Performance

- Lazy loading images
- Code splitting
- Optimized builds
- CDN for static assets
- Database indexing
- Async operations

## 🌍 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📱 Mobile Support

- Responsive design
- Touch-friendly interface
- Mobile navigation
- Optimized images
- Fast loading

---

## 🚀 Get Started Now!

```bash
# Clone the repo
git clone https://github.com/yourusername/social-media-app.git

# Start backend
python main.py

# Start frontend (new terminal)
cd frontend && npm install && npm run dev

# Open http://localhost:3000
```

**Happy coding! 🎉**

---

<div align="center">

Made with ❤️ by [Mandeep Chauhan](https://github.com/mandeep347)

⭐ Star this repo if you find it helpful!

</div>
