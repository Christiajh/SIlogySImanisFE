// src/api.js
import axios from 'axios';

const api = axios.create({
    // ⭐ PERBAIKAN PENTING: Ganti dengan URL backend Railway Anda ⭐
    // Pastikan ini adalah URL dasar ke API Anda di Railway.
    // Jika endpoint Anda langsung di root /api, maka ini sudah benar.
    baseURL: 'https://silogyexpowebsimanis-production.up.railway.app/api', 
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor untuk menambahkan token ke setiap request
api.interceptors.request.use(
    (config) => {
        // Menggunakan 'authToken' karena ini yang Anda gunakan di komponen lain
        // Jika backend Anda mengharapkan 'token', pastikan konsisten.
        const token = localStorage.getItem('authToken'); 
        if (token) {
            // Header otorisasi biasanya menggunakan 'Bearer <token>'
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;