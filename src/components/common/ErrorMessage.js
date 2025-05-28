// src/components/common/ErrorMessage.js
/*
에러 메시지를 일관된 형태로 표시
*/
import React from 'react';
import { Alert, Box } from '@mui/material';

const ErrorMessage = ({ message }) => {
  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <Alert severity="error">
        {message || '오류가 발생했습니다. 다시 시도해주세요.'}
      </Alert>
    </Box>
  );
};

export default ErrorMessage;