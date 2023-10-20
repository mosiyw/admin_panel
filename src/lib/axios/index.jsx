/* eslint-disable no-param-reassign */
import Axios from "axios";
import storage from "../../utils/storage";

const defaultOptions = {
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json",
  },
};

export const axios = Axios.create(defaultOptions);

axios.interceptors.request.use((config) => {
  const token = storage.getToken();
  // const tokenType = storage.getTokenType();

  if (token) {
    config.headers = config.headers || {};
    config.headers.Cookie = `token=${token}`;
  }

  return config;
});

axios.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);
