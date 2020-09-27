import axios from 'axios';
import _localStorage from '@helpers/_localStorage';

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API,
});

api.interceptors.request.use(config => {
  const tokens = _localStorage.getJSON('tokens');
  if (tokens && tokens.accessToken) config.headers.Authorization = `Bearer ${tokens.accessToken}`;
  return config;
});

api.interceptors.response.use(
  res => res.data,
  error => Promise.reject(error.response.data)
);

export default api;
