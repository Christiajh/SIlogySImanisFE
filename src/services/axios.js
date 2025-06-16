import axios from "axios";

// Mengambil URL API dari environment variable yang di-expose oleh Vite.
// Saat di Vercel (produksi), ini akan mengambil nilai VITE_API_URL dari pengaturan Vercel Anda.
// Saat di development lokal, ini akan menggunakan 'http://localhost:3001/api' sebagai fallback.
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL, // Menggunakan BASE_URL yang dinamis
  headers: {
    'Content-Type': 'application/json',
  },
  // Penting: Mengirimkan cookies dan header Authorization secara otomatis.
  // Pastikan backend Anda juga dikonfigurasi untuk mengizinkan kredensial (CORS).
  withCredentials: true,
});

// Interceptor request: Menambahkan token autentikasi ke setiap permintaan jika tersedia di localStorage.
axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      // Menambahkan header Authorization dengan format Bearer Token
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    // Menangani kesalahan pada request
    return Promise.reject(error);
  }
);

export default axiosInstance;