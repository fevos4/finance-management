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
  const [studentData, setStudentData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Initialize auth on app load
  useEffect(() => {
    const authData = authUtils.getAuthData();

    if (authData?.token && authData?.studentData) {
      setIsAuthenticated(true);
      setStudentData(authData.studentData);
    }

    setLoading(false);
  }, []);

  const login = async (slipNumber, idNumber) => {
    const data = await authUtils.login(slipNumber, idNumber);
    setStudentData(data);
    setIsAuthenticated(true);
    return data;
  };

  const logout = () => {
    authUtils.clearAuthData();
    setStudentData(null);
    setIsAuthenticated(false);
  };

  // ✅ Allow refreshing student data after actions (like payments)
  const refreshStudentData = async () => {
    const authData = authUtils.getAuthData();
    if (authData?.studentData?.slipNumber) {
      try {
        const response = await fetch(
          `/dashboard/${authData.studentData.slipNumber}`,
          { headers: authUtils.getAuthHeaders() }
        );

        if (response.ok) {
          const data = await response.json();
          setStudentData({
            ...authData.studentData,
            studentInfo: data.studentInfo,
          });
        } else {
          console.error("Failed to refresh student data:", response.status);
        }
      } catch (error) {
        console.error("Error refreshing student data:", error);
      }
    }
  };

  const value = {
    studentData,
    isAuthenticated,
    login,
    logout,
    loading,
    refreshStudentData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
