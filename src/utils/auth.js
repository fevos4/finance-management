// Authentication utility with persistent token storage

export const AUTH_TOKEN_KEY = 'finance_auth_token'
export const STUDENT_DATA_KEY = 'finance_student_data'

export const authUtils = {
  // Store token and student data in localStorage
  setAuthData: (token, studentData) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token)
    localStorage.setItem(STUDENT_DATA_KEY, JSON.stringify(studentData))
  },

  // Get stored token
  getToken: () => {
    return localStorage.getItem(AUTH_TOKEN_KEY)
  },

  // Get stored student data
  getStudentData: () => {
    const data = localStorage.getItem(STUDENT_DATA_KEY)
    return data ? JSON.parse(data) : null
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem(AUTH_TOKEN_KEY)
  },

  // Clear authentication data
  logout: () => {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    localStorage.removeItem(STUDENT_DATA_KEY)
  },

  // Login API call
  login: async (slipNumber, idNumber) => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slipNumber, idNumber }),
      })

      if (!response.ok) {
        throw new Error('Invalid credentials')
      }

      const data = await response.json()
      
      // Store authentication data
      authUtils.setAuthData(data.token, {
        studentInfo: data.studentInfo,
        courses: data.courses,
        additionalFees: data.additionalFees,
      })

      return data
    } catch (error) {
      throw error
    }
  },
}

