# Troubleshooting Guide

## Authentication Issues (Login/Register Not Working)

### Quick Fixes

1. **Restart the Backend Server**
   ```bash
   # Stop the backend if running, then restart
   python main.py
   ```

2. **Check Backend is Running**
   - Open http://localhost:8000/docs in your browser
   - You should see the FastAPI Swagger documentation
   - If not, the backend is not running

3. **Clear Browser Cache and Tokens**
   ```javascript
   // Open browser console (F12) and run:
   localStorage.clear()
   location.reload()
   ```

4. **Check CORS Configuration**
   - Make sure the backend has CORS middleware enabled (already added in app/app.py)
   - Restart the backend after the CORS changes

### Common Issues

#### Issue 1: "Registration failed" or "Login failed"

**Symptoms:**
- Generic error messages
- No specific error details

**Solutions:**

1. **Check Browser Console**
   - Open Developer Tools (F12)
   - Go to Console tab
   - Look for detailed error messages
   - Check Network tab for failed requests

2. **Test API Directly**
   ```javascript
   // In browser console:
   testAPI()
   ```

3. **Verify Backend Logs**
   - Check the terminal where FastAPI is running
   - Look for error messages or stack traces

#### Issue 2: CORS Errors

**Symptoms:**
- Console shows: "Access to fetch at 'http://localhost:8000' from origin 'http://localhost:3000' has been blocked by CORS policy"

**Solutions:**

1. **Verify CORS Middleware** (already added):
   ```python
   # In app/app.py
   from fastapi.middleware.cors import CORSMiddleware
   
   app.add_middleware(
       CORSMiddleware,
       allow_origins=["http://localhost:3000", "http://localhost:5173"],
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )
   ```

2. **Restart Backend** after adding CORS middleware

#### Issue 3: Network Errors

**Symptoms:**
- "Network Error" in console
- "Failed to fetch"

**Solutions:**

1. **Check Backend is Running**
   ```bash
   # Should show FastAPI server running
   curl http://localhost:8000/docs
   ```

2. **Check Port Conflicts**
   - Make sure port 8000 is not used by another application
   - Try changing the port in both backend and frontend

3. **Check Firewall**
   - Temporarily disable firewall to test
   - Add exception for ports 3000 and 8000

#### Issue 4: 422 Unprocessable Entity

**Symptoms:**
- Registration fails with 422 error
- "Validation error" messages

**Solutions:**

1. **Check Password Requirements**
   - Password must be at least 8 characters
   - Email must be valid format

2. **Check Request Format**
   - Registration uses JSON: `{ "email": "...", "password": "..." }`
   - Login uses form data: `username=...&password=...`

### Testing Steps

1. **Test Backend Directly**
   ```bash
   # Test registration
   curl -X POST "http://localhost:8000/auth/register" \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"testpass123"}'
   
   # Test login
   curl -X POST "http://localhost:8000/auth/jwt/login" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "username=test@example.com&password=testpass123"
   ```

2. **Test Frontend API**
   ```javascript
   // In browser console:
   
   // Test registration
   fetch('http://localhost:8000/auth/register', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       email: 'test@example.com',
       password: 'testpass123'
     })
   }).then(r => r.json()).then(console.log)
   
   // Test login
   const formData = new URLSearchParams()
   formData.append('username', 'test@example.com')
   formData.append('password', 'testpass123')
   
   fetch('http://localhost:8000/auth/jwt/login', {
     method: 'POST',
     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
     body: formData
   }).then(r => r.json()).then(console.log)
   ```

3. **Use the Test Utility**
   ```javascript
   // In browser console:
   testAPI()
   ```

### Debug Mode

Enable detailed logging:

1. **Frontend**: Already enabled in `src/services/api.js`
   - Check browser console for detailed API logs

2. **Backend**: Add logging
   ```python
   # In app/app.py
   import logging
   logging.basicConfig(level=logging.DEBUG)
   ```

### Still Not Working?

1. **Check Environment Variables**
   ```bash
   # In frontend/.env
   VITE_API_URL=http://localhost:8000
   ```

2. **Verify Dependencies**
   ```bash
   # Frontend
   cd frontend
   npm install
   
   # Backend
   pip install fastapi fastapi-users[sqlalchemy] aiosqlite
   ```

3. **Check Database**
   ```bash
   # Delete and recreate database
   rm test.db
   python main.py
   ```

4. **Try Different Browser**
   - Test in incognito/private mode
   - Try a different browser

5. **Check Network Tab**
   - Open DevTools → Network tab
   - Try to login/register
   - Click on the failed request
   - Check Request/Response details

### Getting Help

When asking for help, provide:

1. **Browser Console Errors**
   - Screenshot or copy full error messages

2. **Network Tab Details**
   - Request URL
   - Request Method
   - Status Code
   - Response body

3. **Backend Logs**
   - Copy terminal output from FastAPI

4. **Environment**
   - OS (Windows/Mac/Linux)
   - Browser and version
   - Node.js version
   - Python version
