import axios from 'axios';

const url = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_URL_DEV : process.env.REACT_APP_URL_PROD;

const baseURL = url;
const axiosInstance = axios.create({
  baseURL: baseURL
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || '';
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
