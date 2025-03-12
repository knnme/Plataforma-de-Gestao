import axios from 'axios';

const api = axios.create({
    baseURL: 'https://plataforma-de-gestao.onrender.com'
});

export default api;