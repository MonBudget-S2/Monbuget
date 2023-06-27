import axios from 'axios';

const baseURL = 'http://127.0.0.1:3000'; // Set your API base URL here

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
