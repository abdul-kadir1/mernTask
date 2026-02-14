import axios from 'axios';

const api = axios.create({
  baseURL:'https://merntask-1-xwah.onrender.com/api',
});

// Automatically attach JWT to headers if it exists in localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;