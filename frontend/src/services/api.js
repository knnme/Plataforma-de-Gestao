import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://localhost:5000'
    baseURL: 'https://plataforma-de-gestao.onrender.com'
});

export default api;