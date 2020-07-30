import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_FIREBASE_PROJECT_URL
});

export default axiosInstance;
