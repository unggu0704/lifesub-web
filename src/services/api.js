// src/services/api.js
import axios from 'axios';

// 서비스별 base URL
const MEMBER_URL = window.__runtime_config__.MEMBER_URL || 'http://localhost:8081/api/auth';
const MYSUB_URL = window.__runtime_config__.MYSUB_URL || 'http://localhost:8082/api/mysub';
const RECOMMEND_URL = window.__runtime_config__.RECOMMEND_URL || 'http://localhost:8083/api/recommend';

// 서비스별 axios 인스턴스 생성
const createAxiosInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // 토큰 인터셉터 추가
  instance.interceptors.request.use(
    (config) => {
      // login API는 토큰이 필요없음
      if (config.url === '/api/auth/login') {
        return config;
      }
      
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

const memberApi = createAxiosInstance(MEMBER_URL);
const mysubApi = createAxiosInstance(MYSUB_URL);
const recommendationApi = createAxiosInstance(RECOMMEND_URL);

// 인증 관련 API
export const authApi = {
  login: (loginRequest) => memberApi.post('/login', loginRequest),
  logout: (logoutRequest) => memberApi.post('/logout', logoutRequest)
};

// 마이구독 관련 API
export const mySubscriptionApi = {
  getTotalFee: (userId) => mysubApi.get(`/total-fee?userId=${userId}`),
  getMySubscriptions: (userId) => mysubApi.get(`/list?userId=${userId}`),
  getSubscriptionDetail: (id) => mysubApi.get(`/services/${id}`),
  subscribe: (id, userId) => mysubApi.post(`/services/${id}/subscribe?userId=${userId}`),
  cancelSubscription: (id) => mysubApi.delete(`/services/${id}`),
  getCategories: () => mysubApi.get('/categories'),
  getServicesByCategory: (categoryId) => mysubApi.get(`/services?categoryId=${categoryId}`)
};

// 추천 관련 API
export const recommendApi = {  // 이름을 recommendationApi로 변경
  getRecommendedCategory: (userId) => recommendationApi.get(`/categories?userId=${userId}`)
};

// API 응답 처리 헬퍼 함수
export const handleApiResponse = (response) => {
  const { status, message, data } = response.data;
  if (status === 200) {
    return data;
  } else {
    throw new Error(message);
  }
};

// 인증 토큰 관리 헬퍼 함수
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const removeAuthToken = () => {
  localStorage.removeItem('token');
};