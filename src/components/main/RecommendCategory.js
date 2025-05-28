// src/components/main/RecommendCategory.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Box, Button } from '@mui/material';

const RecommendCategory = ({ categoryName, spendingCategory, totalSpending, baseDate }) => {
  const navigate = useNavigate();

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        mb: 3,
        borderRadius: 2
      }}
    >
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {baseDate} 기준
      </Typography>
      <Typography variant="h6" gutterBottom>
        이런 구독은 어떠세요?
      </Typography>
      <Typography variant="body1" gutterBottom>
        지난 달 <strong>{spendingCategory}</strong> 카테고리에서<br />
        가장 많은 지출이 있었네요!
      </Typography>
      <Box 
        sx={{ 
          mt: 2, 
          mb: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Button 
          variant="contained" 
          color="primary"
          fullWidth
          onClick={() => navigate(`/subscriptions?category=${categoryName}`)}
          sx={{ mt: 2 }}
        >
          추천 구독 서비스 보기
        </Button>
      </Box>
    </Paper>
  );
};

export default RecommendCategory;