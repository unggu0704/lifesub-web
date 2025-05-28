// src/pages/MainPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import TotalFee from '../components/main/TotalFee';
import MySubscriptions from '../components/main/MySubscriptions';
import RecommendCategory from '../components/main/RecommendCategory';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { mySubscriptionApi, recommendApi, handleApiResponse } from '../services/api';

const MainPage = () => {
  const navigate = useNavigate();
  const { currentUser, authInitialized } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalFee, setTotalFee] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [recommendedCategory, setRecommendedCategory] = useState(null);

  useEffect(() => {
    // 로그인 체크
    if (authInitialized && !currentUser) { // loading 상태 체크 추가
      navigate('/login');
      return;
    }

    if(authInitialized) {
      const fetchData = async () => {
        try {
          setLoading(true);
          setError(null);
  
          const [totalFeeResponse, subscriptionsResponse, recommendResponse] = await Promise.all([
            mySubscriptionApi.getTotalFee(currentUser.userId),
            mySubscriptionApi.getMySubscriptions(currentUser.userId),
            recommendApi.getRecommendedCategory(currentUser.userId)
          ]);
  
          setTotalFee(handleApiResponse(totalFeeResponse));
          setSubscriptions(handleApiResponse(subscriptionsResponse));
          setRecommendedCategory(handleApiResponse(recommendResponse));
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }

  }, [currentUser, navigate, authInitialized]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <Box>
      <TotalFee 
        totalFee={totalFee?.totalFee} 
        feeLevel={totalFee?.feeLevel}
      />
      <MySubscriptions subscriptions={subscriptions} />
      {recommendedCategory && (
        <RecommendCategory {...recommendedCategory} />
      )}
    </Box>
  );
};

export default MainPage;