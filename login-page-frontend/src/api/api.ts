import axios from 'axios';
import { API_URL } from '../variables/apiUrl';

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    const isLoginRequest = error.config.url === '/auth/login';
    const isDeleteRequest = error.config.url === '/auth';

    if (error.response?.status === 401 && !isLoginRequest && !isDeleteRequest) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  },
);
