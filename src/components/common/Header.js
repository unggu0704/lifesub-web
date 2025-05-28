// src/components/common/Header.js 수정 - 로그아웃 기능 추가
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout } = useAuth();

  const getTitle = () => {
    switch (location.pathname) {
      case '/':
        return '마이구독';
      case '/subscriptions':
        return '구독 서비스';
      default:
        if (location.pathname.startsWith('/subscriptions/')) {
          return '구독 상세';
        }
        return '마이구독';
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'white', color: 'black' }}>
      <Toolbar>
        {location.pathname !== '/' && (
          <IconButton edge="start" onClick={() => navigate(-1)} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {getTitle()}
        </Typography>
        {currentUser && (
          <Button color="inherit" onClick={handleLogout}>
            로그아웃
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;