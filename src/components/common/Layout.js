// src/components/common/Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import Header from './Header';

const Layout = () => {
  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ pt: 2, pb: 4 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;