// src/components/common/LoadingSpinner.js
/*
데이터 로딩 중 표시할 로딩 인디케이터
*/
import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const LoadingSpinner = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '200px'
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingSpinner;