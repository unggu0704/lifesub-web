// src/pages/SubscriptionListPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Box } from '@mui/material';
import CategoryList from '../components/subscriptions/CategoryList';
import SubscriptionList from '../components/subscriptions/SubscriptionList';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { mySubscriptionApi, handleApiResponse } from '../services/api';

const SubscriptionListPage = () => {
  const navigate = useNavigate();
  const { currentUser, authInitialized } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const selectedCategory = searchParams.get('category') || '';

  useEffect(() => {
    if (authInitialized && !currentUser) { // login여부가 완료되고 현재 유저 정보가 없을때 로그인 페이지로 보냄 
      navigate('/login');
      return;
    }

    if(authInitialized) {
      const fetchCategories = async () => {
        try {
          setLoading(true);
          setError(null);
          const response = await mySubscriptionApi.getCategories();
          const categoryList = handleApiResponse(response);
          setCategories(categoryList);
          
          // 선택된 카테고리가 없으면 첫 번째 카테고리 선택
          if (!selectedCategory && categoryList.length > 0) {
            setSearchParams({ category: categoryList[0].categoryId });
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCategories();    
    }

  }, [currentUser, navigate, selectedCategory, setSearchParams, authInitialized]);

  useEffect(() => {
    if(authInitialized) {
      const fetchServices = async () => {
        if (!selectedCategory) return;
        
        try {
          setLoading(true);
          setError(null);
          const response = await mySubscriptionApi.getServicesByCategory(selectedCategory);
          setServices(handleApiResponse(response));
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchServices();   
    }
 
  }, [selectedCategory, authInitialized]);

  const handleCategoryChange = (categoryId) => {
    setSearchParams({ category: categoryId });
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <Box>
      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <SubscriptionList services={services} />
    </Box>
  );
};

export default SubscriptionListPage;