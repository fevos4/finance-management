import React, { createContext, useContext, useState, useEffect } from "react";
import { authUtils } from "../utils/auth";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On app load, restore auth state from localStorage and validate token
    const initializeAuth = async () => {
      const token = authUtils.getToken();
      const data = authUtils.getStudentData();

      if (token && data) {
        // Validate token with server
        const isValid = await authUtils.validateToken();
        if (isValid) {
          setIsAuthenticated(true);
          setStudentData(data);
        } else {
          // Token is invalid, clear local storage
          authUtils.logout();
          setIsAuthenticated(false);
          setStudentData(null);
        }
      }

      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (slipNumber, idNumber) => {
    try {
      const data = await authUtils.login(slipNumber, idNumber);
      setIsAuthenticated(true);
      setStudentData(data);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Call server logout endpoint
      await authUtils.logoutFromServer();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local state
      setIsAuthenticated(false);
      setStudentData(null);
    }
  };

  const refreshStudentData = async () => {
    if (!studentData?.slipNumber) {
      return;
    }

    try {
      const response = await fetch(`/dashboard/${studentData.slipNumber}`, {
        headers: authUtils.getAuthHeaders(),
      });

      if (response.ok) {
        const data = await response.json();
        setStudentData(prevData => ({
          ...prevData,
          ...data
        }));
      }
    } catch (error) {
      console.error('Failed to refresh student data:', error);
    }
  };

  const value = {
    isAuthenticated,
    studentData,
    login,
    logout,
    loading,
    refreshStudentData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
