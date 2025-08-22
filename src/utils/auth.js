const AUTH_KEY = "authData";

export const authUtils = {
  // ✅ Save auth data to localStorage
  setAuthData: (token, studentData) => {
    const authData = { token, studentData };
    localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
  },

  // ✅ Get auth data from localStorage
  getAuthData: () => {
    const authData = localStorage.getItem(AUTH_KEY);
    return authData ? JSON.parse(authData) : null;
  },

  // ✅ Clear auth data from localStorage
  clearAuthData: () => {
    localStorage.removeItem(AUTH_KEY);
  },

  // ✅ Check if user is authenticated
  isAuthenticated: () => {
    return !!authUtils.getAuthData();
  },

  // ✅ Return headers with token
  getAuthHeaders: () => {
    const authData = authUtils.getAuthData();
    return {
      "Content-Type": "application/json",
      ...(authData?.token && { Authorization: `Bearer ${authData.token}` }),
    };
  },

  // ✅ Login API call
  login: async (slipNumber, idNumber) => {
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slipNumber, idNumber }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Invalid credentials");
        }
        throw new Error("Login failed. Please try again.");
      }

      const data = await response.json();

      // ✅ Ensure studentInfo exists with a profileImage fallback
      const fullStudentData = {
        ...data,
        slipNumber,
        studentInfo: {
          ...data.studentInfo,
          profileImage:
            data.studentInfo?.profileImage ||
            "https://randomuser.me/api/portraits/women/1.jpg", // fallback
        },
      };

      authUtils.setAuthData(data.token, fullStudentData);
      return fullStudentData;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
};
