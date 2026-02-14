
import { createContext, useState, useContext, useEffect } from 'react';

// 1. Create the Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 2. Initialize state with a "Safe Parse" to prevent JSON errors
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      // If savedUser exists and is not the string "undefined", parse it
      if (savedUser && savedUser !== "undefined") {
        return JSON.parse(savedUser);
      }
      return null;
    } catch (error) {
      console.error("Auth Initialization Error:", error);
      return null;
    }
  });

  // 3. Login function: Stores data in state AND localStorage
  const login = (userData) => {
    if (userData && userData.token) {
      localStorage.setItem('token', userData.token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    }
  };

  // 4. Logout function: Clears state AND localStorage
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 5. Custom Hook for easy access in components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};