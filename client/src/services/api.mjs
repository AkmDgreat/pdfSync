import axios from 'axios';
const PORT = 3000

const api = axios.create({
    baseURL: `http://localhost:${PORT}/`,
    withCredentials: true,
});

export const googleAuth = (code) => api.get(`/auth/google?code=${code}`);