// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi, setAuthToken, removeAuthToken } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authInitialized, setAuthInitialized] = useState(false); // 변수명 변경

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setAuthInitialized(true); // 변수명 변경
  }, []);

  const login = async (userId, password) => {
    removeAuthToken();
    setCurrentUser(null);
    
    try {
      const response = await authApi.login({ userId, password });
      const { accessToken } = response.data.data;
      setAuthToken(accessToken);
      const user = { userId };
      setCurrentUser(user);
      setAuthInitialized(true); 
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      if (currentUser) {
        await authApi.logout({ userId: currentUser.userId });
      }
    } finally {
      removeAuthToken();
      setCurrentUser(null);
      localStorage.removeItem('user');
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, authInitialized }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};