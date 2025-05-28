// src/components/subscriptions/SubscriptionDetail.js
import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardMedia, 
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText 
} from '@mui/material';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import GroupIcon from '@mui/icons-material/Group';
import CategoryIcon from '@mui/icons-material/Category';
import { formatNumber } from '../../utils/formatters';

const SubscriptionDetail = ({ 
  serviceName, 
  logoUrl, 
  category,
  description, 
  price,
  maxSharedUsers,
  isSubscribed,
  onSubscribe,
  onCancel
}) => {
  return (
    <Card sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
        <CardMedia
          component="img"
          sx={{ width: 200, height: 200, objectFit: 'contain', mb: 2 }}
          image={`${logoUrl}`}
          alt={serviceName}
        />
        <Typography variant="h5" component="div" gutterBottom>
          {serviceName}
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <List>
        <ListItem>
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText 
            primary="카테고리"
            secondary={category}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PriceCheckIcon />
          </ListItemIcon>
          <ListItemText 
            primary="월 구독료"
            secondary={`${formatNumber(price)}원`}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText 
            primary="최대 공유 인원"
            secondary={`${maxSharedUsers}명`}
          />
        </ListItem>
      </List>

      <Typography variant="body1" sx={{ mt: 2, mb: 3 }}>
        {description}
      </Typography>

      <Box sx={{ mt: 3 }}>
        {isSubscribed ? (
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={onCancel}
          >
            구독 취소하기
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={onSubscribe}
          >
            구독하기
          </Button>
        )}
      </Box>
    </Card>
  );
};

export default SubscriptionDetail;