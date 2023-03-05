import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_URL
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use((response) => {
  if (response.status === 401) {
    localStorage.removeItem('token');
  }
  return response;
});

export default axiosInstance;
