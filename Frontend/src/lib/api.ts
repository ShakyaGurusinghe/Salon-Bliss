// src/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api/v1',
});

// // Request interceptor for auth token
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// Enhanced response interceptor
api.interceptors.response.use(
  (response) => {
    // Standardize successful responses
    if (response.data && !response.data.success) {
      return {
        ...response,
        data: {
          success: true,
          data: response.data
        }
      };
    }
    return response;
  },
  (error) => {
    // Handle errors consistently
    if (error.response?.status === 401) {
      // Redirect to login or handle unauthorized
    }
    return Promise.reject(
      error.response?.data?.error || 
      error.response?.data?.message || 
      error.message || 
      'An error occurred'
    );
  }
);

export default api;