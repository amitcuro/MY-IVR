import axios from 'axios'

// API Base URL - Change this to your backend URL
// Use import.meta.env instead of process.env for Vite
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

console.log('🔧 API Base URL:', API_BASE_URL)

// Create axios instance with better error handling
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add request interceptor
apiClient.interceptors.request.use(
  (config) => {
    console.log(`📤 API Request: ${config.method.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// Add response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log(`📥 API Response: ${response.status}`)
    return response
  },
  (error) => {
    if (error.response) {
      console.error(`API Error: ${error.response.status}`, error.response.data)
    } else if (error.request) {
      console.error('No response received:', error.request)
    } else {
      console.error('Error setting up request:', error.message)
    }
    return Promise.reject(error)
  }
)

// Contact API Service
export const contactAPI = {
  // Save contact/call log
  saveContact: async (contactData) => {
    try {
      const response = await apiClient.post('/contacts', {
        phoneNumber: contactData.phoneNumber,
        name: contactData.name || 'Unknown',
        duration: contactData.duration || 0,
        menuPath: contactData.menuPath || 'main',
        timestamp: new Date().toISOString()
      })
      console.log('✅ Contact saved:', response.data)
      return { success: true, data: response.data }
    } catch (error) {
      console.error('❌ Error saving contact:', error.message)
      return { success: false, error: error.message }
    }
  },

  // Get all contacts
  getContacts: async () => {
    try {
      const response = await apiClient.get('/contacts')
      console.log('✅ Contacts fetched:', response.data)
      return { success: true, data: response.data }
    } catch (error) {
      console.error('❌ Error fetching contacts:', error.message)
      return { success: false, error: error.message }
    }
  },

  // Get contact by phone number
  getContactByPhone: async (phoneNumber) => {
    try {
      const response = await apiClient.get(`/contacts/${phoneNumber}`)
      console.log('✅ Contact fetched:', response.data)
      return { success: true, data: response.data }
    } catch (error) {
      console.error('❌ Error fetching contact:', error.message)
      return { success: false, error: error.message }
    }
  },

  // Update contact
  updateContact: async (phoneNumber, updateData) => {
    try {
      const response = await apiClient.put(`/contacts/${phoneNumber}`, updateData)
      console.log('✅ Contact updated:', response.data)
      return { success: true, data: response.data }
    } catch (error) {
      console.error('❌ Error updating contact:', error.message)
      return { success: false, error: error.message }
    }
  },

  // Delete contact
  deleteContact: async (phoneNumber) => {
    try {
      const response = await apiClient.delete(`/contacts/${phoneNumber}`)
      console.log('✅ Contact deleted:', response.data)
      return { success: true, data: response.data }
    } catch (error) {
      console.error('❌ Error deleting contact:', error.message)
      return { success: false, error: error.message }
    }
  }
}

// Call/Session API Service
export const callAPI = {
  // Save call record
  saveCall: async (callData) => {
    try {
      const response = await apiClient.post('/calls', {
        phoneNumber: callData.phoneNumber,
        duration: callData.duration,
        menuPath: callData.menuPath,
        status: 'completed',
        timestamp: new Date().toISOString()
      })
      console.log('✅ Call saved:', response.data)
      return { success: true, data: response.data }
    } catch (error) {
      console.error('❌ Error saving call:', error.message)
      return { success: false, error: error.message }
    }
  },

  // Get all calls
  getCalls: async () => {
    try {
      const response = await apiClient.get('/calls')
      console.log('✅ Calls fetched:', response.data)
      return { success: true, data: response.data }
    } catch (error) {
      console.error('❌ Error fetching calls:', error.message)
      return { success: false, error: error.message }
    }
  },

  // Get call statistics
  getCallStats: async () => {
    try {
      const response = await apiClient.get('/calls/stats')
      console.log('✅ Call stats fetched:', response.data)
      return { success: true, data: response.data }
    } catch (error) {
      console.error('❌ Error fetching call stats:', error.message)
      return { success: false, error: error.message }
    }
  }
}

export default apiClient
