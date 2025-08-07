import React, { createContext, useContext, useState, useEffect } from 'react'
import { authUtils } from '../utils/auth'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [studentData, setStudentData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing authentication on app load
    const token = authUtils.getToken()
    const data = authUtils.getStudentData()
    
    if (token && data) {
      setIsAuthenticated(true)
      setStudentData(data)
    }
    
    setLoading(false)
  }, [])

  const login = async (slipNumber, idNumber) => {
    try {
      const data = await authUtils.login(slipNumber, idNumber)
      setIsAuthenticated(true)
      setStudentData({
        studentInfo: data.studentInfo,
        courses: data.courses,
        additionalFees: data.additionalFees,
      })
      return data
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    authUtils.logout()
    setIsAuthenticated(false)
    setStudentData(null)
  }

  const value = {
    isAuthenticated,
    studentData,
    login,
    logout,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

