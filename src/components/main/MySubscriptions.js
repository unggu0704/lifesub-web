// src/components/main/MySubscriptions.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import SubscriptionCard from '../common/SubscriptionCard';

const MySubscriptions = ({ subscriptions }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        나의 구독 서비스
      </Typography>
      {subscriptions.length === 0 ? (
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          아직 구독한 서비스가 없어요
        </Typography>
      ) : (
        subscriptions.map((subscription) => (
          <SubscriptionCard
            key={subscription.id}
            {...subscription}
            onClick={() => navigate(`/subscriptions/${subscription.id}`)}
          />
        ))
      )}
    </Box>
  );
};

export default MySubscriptions;