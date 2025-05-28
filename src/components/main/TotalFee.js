// src/components/main/TotalFee.js
import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { formatNumber } from '../../utils/formatters';

const feeLevelImages = {
  'liker': '/images/liker.png',
  'collector': '/images/collector.png',
  'addict': '/images/addict.png'
};

const TotalFee = ({ totalFee, feeLevel }) => {
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        mb: 3, 
        textAlign: 'center',
        borderRadius: 2
      }}
    >
      <Box 
        component="img"
        src={feeLevelImages[feeLevel]}
        alt={feeLevel}
        sx={{ 
          width: 120, 
          height: 120, 
          mb: 2,
          objectFit: 'contain'
        }}
      />
      <Typography variant="h6" gutterBottom>
        이번 달 총 구독료
      </Typography>
      <Typography variant="h4" color="primary" fontWeight="bold">
        {formatNumber(totalFee)}원
      </Typography>
    </Paper>
  );
};

export default TotalFee;