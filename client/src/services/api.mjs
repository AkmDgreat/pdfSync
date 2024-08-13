import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.REACT_APP_PORT || 8000

const api = axios.create({
    baseURL: `http://localhost:${PORT}/`,
    withCredentials: true,
});

export const googleAuth = (code) => api.get(`/auth/google?code=${code}`);