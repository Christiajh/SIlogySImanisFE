// frontend/src/services/axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://silogyexpowebsimanis-production.up.railway.app/api", // Ganti sesuai URL backend kamu
});

export default axiosInstance;
