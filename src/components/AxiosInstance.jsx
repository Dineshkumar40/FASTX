// src/utils/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:7177',
  timeout: 10000, // Your API's base URL
});

export default axiosInstance;
