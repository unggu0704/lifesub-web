// src/components/common/SubscriptionCard.js
/*
구독 서비스 정보를 카드 형태로 표시
서비스 로고, 이름, 설명, 가격 표시
클릭 이벤트 처리 가능
*/
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { formatNumber } from '../../utils/formatters';

const SubscriptionCard = ({ 
  logoUrl, 
  serviceName, 
  description, 
  price, 
  onClick,
  showPrice = true
}) => {
  return (
    <Card 
      sx={{ 
        display: 'flex', 
        mb: 2, 
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 3
        }
      }}
      onClick={onClick}
    >
      <CardMedia
        component="img"
        sx={{ width: 100, p: 2, objectFit: 'contain' }}
        image={`${logoUrl}`}
        alt={serviceName}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <CardContent>
          <Typography variant="h6" component="div">
            {serviceName}
          </Typography>
          {description && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {description}
            </Typography>
          )}
          {showPrice && price && (
            <Typography variant="subtitle1" color="primary">
              월 {formatNumber(price)}원
            </Typography>
          )}
        </CardContent>
      </Box>
    </Card>
  );
};

export default SubscriptionCard;