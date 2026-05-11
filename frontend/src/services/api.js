import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    })
    
    if (error.response?.status === 401) {
      // Only redirect if not on login/register pages
      const currentPath = window.location.pathname
      if (currentPath !== '/login' && currentPath !== '/register') {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  login: async (email, password) => {
    try {
      const formData = new URLSearchParams()
      formData.append('username', email)
      formData.append('password', password)
      
      console.log('Attempting login for:', email)
      
      const response = await api.post('/auth/jwt/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      
      console.log('Login successful:', response.data)
      return response.data
    } catch (error) {
      console.error('Login API error:', error.response?.data || error.message)
      throw error
    }
  },

  register: async (email, password) => {
    try {
      console.log('Attempting registration for:', email)
      
      const response = await api.post('/auth/register', {
        email,
        password,
      })
      
      console.log('Registration successful:', response.data)
      return response.data
    } catch (error) {
      console.error('Registration API error:', error.response?.data || error.message)
      throw error
    }
  },

  logout: async () => {
    try {
      const response = await api.post('/auth/jwt/logout')
      return response.data
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get('/users/me')
      console.log('Current user:', response.data)
      return response.data
    } catch (error) {
      console.error('Get current user error:', error)
      throw error
    }
  },
}

// Posts API
export const postsAPI = {
  getFeed: async () => {
    const response = await api.get('/feed')
    return response.data
  },

  uploadPost: async (file, caption) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('caption', caption)

    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  deletePost: async (postId) => {
    const response = await api.delete(`/posts/${postId}`)
    return response.data
  },
}

// Users API
export const usersAPI = {
  getUser: async (userId) => {
    const response = await api.get(`/users/${userId}`)
    return response.data
  },

  updateUser: async (userId, data) => {
    const response = await api.patch(`/users/${userId}`, data)
    return response.data
  },
}

export default api
