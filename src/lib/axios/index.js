import Axios from 'axios';
import storage from '../../utils/storage';

const defaultOptions = {
  baseURL: process.env.REACT_APP_VAR_NAME || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const axios = Axios.create(defaultOptions);

axios.interceptors.request.use((config) => {
  const token = storage.getToken();
  const tokenType = storage.getTokenType();

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `${tokenType} ${token}`;
  }

  return config;
});

axios.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);
