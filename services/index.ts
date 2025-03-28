import axios from "axios";
// import {store} from '../redux/store'
console.log(process.env.EXPO_PUBLIC_API_URL);
const axiosInstance = axios.create({
  // baseURL: 'https://run-shift-backend.onrender.com/', //base URL
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the bearer token in the header
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Retrieve the token gotten back from the login stored in redux
//     const token = store.getState().user?.token;
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;

//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
