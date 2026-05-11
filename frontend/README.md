# Social Media Frontend

A modern, responsive social media web application built with React, Tailwind CSS, and Vite.

## Features

- 🎨 **Modern UI Design** - Minimalist design inspired by Instagram and X
- 🌓 **Dark Mode** - Full dark mode support with smooth transitions
- 📱 **Responsive** - Mobile-first design with desktop optimizations
- 🔐 **Authentication** - Login and registration with JWT tokens
- 📸 **Media Upload** - Support for images and videos
- 💬 **Social Features** - Posts, likes, comments, and sharing
- ⚡ **Fast** - Built with Vite for lightning-fast development
- 🎭 **Animations** - Smooth hover effects and transitions

## Tech Stack

- **React 18** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **React Icons** - Icon library
- **date-fns** - Date formatting
- **Vite** - Build tool and dev server

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- FastAPI backend running on `http://localhost:8000`

### Installation

1. **Install dependencies:**
```bash
cd frontend
npm install
```

2. **Create environment file (optional):**
```bash
cp .env.example .env
```

3. **Verify setup:**
```bash
node verify-setup.js
```

### Starting the Application

**IMPORTANT: Start backend FIRST, then frontend**

1. **Start the Backend** (in project root directory):
```bash
python main.py
```
   - Backend will run on http://localhost:8000
   - Verify by opening http://localhost:8000/docs

2. **Start the Frontend** (in frontend directory):
```bash
npm run dev
```
   - Frontend will run on http://localhost:3000 or http://localhost:5173
   - Open in your browser

### Troubleshooting

If login/register is not working:

1. **Check backend is running:**
   - Open http://localhost:8000/docs
   - Should see FastAPI documentation

2. **Check browser console:**
   - Press F12 to open DevTools
   - Look for error messages in Console tab
   - Check Network tab for failed requests

3. **Clear browser cache:**
   ```javascript
   // In browser console (F12):
   localStorage.clear()
   location.reload()
   ```

4. **Test API connectivity:**
   ```javascript
   // In browser console (F12):
   testAPI()
   ```

5. **See detailed troubleshooting guide:**
   - Read `TROUBLESHOOTING.md` for comprehensive solutions

### Common Issues

- **"Registration failed"**: Backend not running or CORS not configured
- **CORS errors**: Restart backend after CORS middleware was added
- **Network errors**: Check if backend is on port 8000
- **401 errors**: Clear localStorage and try again

### Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── CreatePostModal.jsx
│   │   ├── EmptyState.jsx
│   │   ├── ErrorState.jsx
│   │   ├── Layout.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── MobileNav.jsx
│   │   ├── PostCard.jsx
│   │   ├── PostSkeleton.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── RightSidebar.jsx
│   │   └── Sidebar.jsx
│   ├── context/           # React context providers
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── pages/             # Page components
│   │   ├── Explore.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Notifications.jsx
│   │   ├── PostDetail.jsx
│   │   ├── Profile.jsx
│   │   └── Register.jsx
│   ├── services/          # API services
│   │   └── api.js
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── postcss.config.js
```

## API Integration

The frontend integrates with the FastAPI backend through the following endpoints:

### Authentication
- `POST /auth/jwt/login` - Login with email/password
- `POST /auth/register` - Register new user
- `POST /auth/jwt/logout` - Logout
- `GET /users/me` - Get current user

### Posts
- `GET /feed` - Get all posts
- `POST /upload` - Upload new post with image/video
- `DELETE /posts/{post_id}` - Delete a post

### Users
- `GET /users/{user_id}` - Get user profile
- `PATCH /users/{user_id}` - Update user profile

## Features Overview

### Pages

1. **Login/Register** - Authentication pages with form validation
2. **Home Feed** - Main feed with all posts, create post button
3. **Profile** - User profile with posts grid and stats
4. **Post Detail** - Individual post view with comments
5. **Explore** - Search and discover trending content
6. **Notifications** - Activity notifications

### Components

- **PostCard** - Displays post with media, actions, and metadata
- **CreatePostModal** - Modal for creating new posts
- **Sidebar** - Desktop navigation with theme toggle
- **MobileNav** - Bottom navigation for mobile devices
- **RightSidebar** - Trending topics and suggested users
- **Loading States** - Skeleton loaders for better UX
- **Empty States** - Friendly messages when no content
- **Error States** - Error handling with retry options

### Styling

- Minimalist design with clean typography
- Rounded cards with soft shadows
- Smooth hover animations and transitions
- Blue and purple accent colors
- Responsive breakpoints for all screen sizes
- Dark mode with proper contrast ratios

## Environment Variables

- `VITE_API_URL` - Backend API URL (default: http://localhost:8000)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

MIT License
