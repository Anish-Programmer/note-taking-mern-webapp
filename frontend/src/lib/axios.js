import axios from 'axios';

// dynamic base URL based on the environment
const BASE_URL = import.meta.env.MODE === 'development' ? "http://localhost:5001/api" : "/api";

// axiosInstance is used for global axios configuration of URL, headers, etc.
const api = axios.create({
    baseURL : BASE_URL,
})


export default api;
