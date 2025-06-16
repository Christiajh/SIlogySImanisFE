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
  // ❌ withCredentials: true hanya perlu jika backend pakai cookie auth
  // Hapus atau beri komentar jika kamu pakai Authorization header (JWT)
  // withCredentials: true,

  // ⏱ Timeout diperpanjang hingga 30 detik (30000 ms)
  timeout: 30000,
});

// ✅ Interceptor request: Menambahkan token autentikasi ke setiap permintaan jika tersedia di localStorage.
axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      config.headers['Authorization'] = `Bearer ${authToken}`; // Gunakan cara eksplisit
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
