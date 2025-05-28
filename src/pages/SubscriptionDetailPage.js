// src/pages/SubscriptionDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SubscriptionDetail from '../components/subscriptions/SubscriptionDetail';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { mySubscriptionApi, handleApiResponse } from '../services/api';

const SubscriptionDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, authInitialized } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (authInitialized && !currentUser) { // login여부가 완료되고 현재 유저 정보가 없을때 로그인 페이지로 보냄 
      navigate('/login');
      return;
    }

    if(authInitialized) {
      const fetchData = async () => {
        try {
          setLoading(true);
          setError(null);
          
          // 구독 상세 정보와 사용자의 구독 목록을 동시에 조회
          const [detailResponse, mySubsResponse] = await Promise.all([
            mySubscriptionApi.getSubscriptionDetail(id),
            mySubscriptionApi.getMySubscriptions(currentUser.userId)
          ]);
  
          const detailData = handleApiResponse(detailResponse);
          const mySubsData = handleApiResponse(mySubsResponse);
  
          setSubscription(detailData);
          
          // 현재 서비스가 사용자의 구독 목록에 있는지 확인
          setIsSubscribed(mySubsData.some(sub => sub.id === parseInt(id)));
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();    
    }
  }, [currentUser, navigate, id, authInitialized]);

  const handleSubscribe = async () => {
    try {
      await mySubscriptionApi.subscribe(id, currentUser.userId);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancel = async () => {
    try {
      await mySubscriptionApi.cancelSubscription(id);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!subscription) return <ErrorMessage message="구독 서비스를 찾을 수 없습니다." />;

  return (
    <SubscriptionDetail
      {...subscription}
      isSubscribed={isSubscribed}
      onSubscribe={handleSubscribe}
      onCancel={handleCancel}
    />
  );
};

export default SubscriptionDetailPage;
