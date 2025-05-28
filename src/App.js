// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/common/Layout';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SubscriptionListPage from './pages/SubscriptionListPage';
import SubscriptionDetailPage from './pages/SubscriptionDetailPage';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="subscriptions">
              <Route index element={<SubscriptionListPage />} />
              <Route path=":id" element={<SubscriptionDetailPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;