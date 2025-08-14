// Authentication utility with persistent token storage

export const AUTH_TOKEN_KEY = 'finance_auth_token';
export const STUDENT_DATA_KEY = 'finance_student_data';

export const authUtils = {
  // Store token and student data in localStorage
  setAuthData: (token, studentData) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(STUDENT_DATA_KEY, JSON.stringify(studentData));
  },

  // Get stored token
  getToken: () => {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },

  // Get stored student data
  getStudentData: () => {
    const data = localStorage.getItem(STUDENT_DATA_KEY);
    return data ? JSON.parse(data) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem(AUTH_TOKEN_KEY);
  },

  // Clear authentication data
  logout: () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(STUDENT_DATA_KEY);
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
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid credentials');
        }
        throw new Error('Login failed. Please try again.');
      }

      const data = await response.json();

      // Store authentication data INCLUDING slipNumber
      const fullStudentData = {
        ...data,
        slipNumber, // add slipNumber here
      };

      authUtils.setAuthData(data.token, fullStudentData);

      return fullStudentData;
    } catch (error) {
      throw error;
    }
  },

  // Validate token with server
  validateToken: async () => {
    const token = authUtils.getToken();
    if (!token) {
      return false;
    }

    try {
      const response = await fetch('/validate-token', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      return response.ok;
    } catch (error) {
      console.error('Token validation failed:', error);
      return false;
    }
  },

  // Logout API call
  logoutFromServer: async () => {
    const token = authUtils.getToken();
    if (!token) {
      return;
    }

    try {
      await fetch('/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Server logout failed:', error);
    } finally {
      // Always clear local storage regardless of server response
      authUtils.logout();
    }
  },

  // Get authorization headers for API calls
  getAuthHeaders: () => {
    const token = authUtils.getToken();
    return token ? {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    } : {
      'Content-Type': 'application/json',
    };
  }
};
