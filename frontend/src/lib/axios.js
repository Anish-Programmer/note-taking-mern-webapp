import axios from 'axios';


// axiosInstance is used for global axios configuration of URL, headers, etc.
const api = axios.create({
    baseURL : "http://localhost:5001/api"
})


export default api;
