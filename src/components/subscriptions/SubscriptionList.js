// src/components/subscriptions/SubscriptionList.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import SubscriptionCard from '../common/SubscriptionCard';

const SubscriptionList = ({ services }) => {
  const navigate = useNavigate();

  if (!services.length) {
    return (
      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        해당 카테고리에 구독 서비스가 없습니다.
      </Typography>
    );
  }

  return (
    <Box>
      {services.map((service) => (
        <SubscriptionCard
          key={service.serviceId}
          {...service}
          onClick={() => navigate(`/subscriptions/${service.serviceId}`)}
        />
      ))}
    </Box>
  );
};

export default SubscriptionList;