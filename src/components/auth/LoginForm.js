// src/components/auth/LoginForm.js
import React, { useState } from 'react';
import { 
 Box, 
 TextField, 
 Button, 
 Typography,
 InputAdornment,
 IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const LoginForm = ({ onSubmit, error }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userId, password);
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
        maxWidth: 400,
        margin: '0 auto'
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mb: 3 
        }}
      >
        <img 
          src="/images/logo192.png" 
          alt="마이구독 로고" 
          style={{ 
            width: '100px',
            height: '100px',
            objectFit: 'contain'
          }} 
        />
      </Box>

      <TextField
        label="아이디"
        variant="outlined"
        fullWidth
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        error={!!error}
        autoComplete="username"
        required
      />
      
      <TextField
        label="비밀번호"
        type={showPassword ? 'text' : 'password'}
        variant="outlined"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!error}
        autoComplete="current-password"
        required
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}

      <Button 
        type="submit" 
        variant="contained" 
        color="primary" 
        size="large"
        fullWidth
        sx={{ mt: 2 }}
      >
        로그인
      </Button>
    </Box>
  );
};

export default LoginForm;