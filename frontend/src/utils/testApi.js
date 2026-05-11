// Test API connectivity
// Run this in browser console: import('./utils/testApi.js').then(m => m.testAPI())

export async function testAPI() {
  const API_URL = 'http://localhost:8000'
  
  console.log('🔍 Testing API connectivity...')
  console.log('API URL:', API_URL)
  
  // Test 1: Check if API is reachable
  try {
    const response = await fetch(`${API_URL}/docs`)
    console.log('✅ API is reachable:', response.status)
  } catch (error) {
    console.error('❌ API is not reachable:', error.message)
    console.log('Make sure your FastAPI backend is running on port 8000')
    return
  }
  
  // Test 2: Test registration
  const testEmail = `test${Date.now()}@example.com`
  const testPassword = 'testpassword123'
  
  console.log('\n📝 Testing registration...')
  console.log('Email:', testEmail)
  
  try {
    const registerResponse = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword,
      }),
    })
    
    const registerData = await registerResponse.json()
    
    if (registerResponse.ok) {
      console.log('✅ Registration successful:', registerData)
    } else {
      console.error('❌ Registration failed:', registerData)
      return
    }
  } catch (error) {
    console.error('❌ Registration error:', error)
    return
  }
  
  // Test 3: Test login
  console.log('\n🔐 Testing login...')
  
  try {
    const formData = new URLSearchParams()
    formData.append('username', testEmail)
    formData.append('password', testPassword)
    
    const loginResponse = await fetch(`${API_URL}/auth/jwt/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    })
    
    const loginData = await loginResponse.json()
    
    if (loginResponse.ok) {
      console.log('✅ Login successful!')
      console.log('Access token:', loginData.access_token?.substring(0, 20) + '...')
      
      // Test 4: Test authenticated request
      console.log('\n👤 Testing authenticated request...')
      
      const meResponse = await fetch(`${API_URL}/users/me`, {
        headers: {
          'Authorization': `Bearer ${loginData.access_token}`,
        },
      })
      
      const meData = await meResponse.json()
      
      if (meResponse.ok) {
        console.log('✅ Authenticated request successful:', meData)
      } else {
        console.error('❌ Authenticated request failed:', meData)
      }
    } else {
      console.error('❌ Login failed:', loginData)
    }
  } catch (error) {
    console.error('❌ Login error:', error)
  }
  
  console.log('\n✨ API test complete!')
}

// Auto-run if in development
if (import.meta.env.DEV) {
  console.log('💡 Tip: Run testAPI() in console to test API connectivity')
  window.testAPI = testAPI
}
