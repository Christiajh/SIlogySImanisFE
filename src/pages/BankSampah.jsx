import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from '../services/axios'; // sesuaikan path jika file ini bukan di src/pages

import {
  FaRecycle, FaTrashAlt, FaTint, FaLeaf, FaLaptopCode, FaLightbulb,
  FaBrain, FaGlobeAsia, FaHandsHelping, FaCheckCircle, FaExclamationCircle, FaSpinner, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaComments, FaCalendarAlt // Make sure FaCalendarAlt is imported
} from 'react-icons/fa';
import '../styles/BankSampah.css'; // Impor CSS

// Definisikan URL dasar API Anda
const API_BASE_URL = 'https://silogyexpowebsimanis-production.up.railway.app';// Pastikan ini sesuai dengan port backend Anda (misal: 3001)

// ... [IMPORTS Tetap Sama]

const BankSampah = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const [bankSampahList, setBankSampahList] = useState([]);
  const [loadingPartners, setLoadingPartners] = useState(true);
  const [partnersError, setPartnersError] = useState(null);

  const createPartnerDisplayData = (partner) => {
    return {
      id: partner.id,
      name: partner.name,
      address: partner.address || 'Alamat tidak tersedia',
      contact: partner.phone,
      schedule: 'Jadwal akan dikonfirmasi',
      type: 'Berbagai Jenis Sampah',
    };
  };

  useEffect(() => {
    const fetchPartners = async () => {
      setLoadingPartners(true);
      setPartnersError(null);
      try {
        const response = await axios.get('/partners');
        const data = response.data;
        const fetchedPartners = data.map(createPartnerDisplayData);
        setBankSampahList(fetchedPartners);
      } catch (error) {
        console.error("Failed to fetch partners:", error);
        setPartnersError('Gagal memuat daftar mitra. Silakan coba refresh halaman.');
      } finally {
        setLoadingPartners(false);
      }
    };
    fetchPartners();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setSubmitStatus('error');
      alert('Nama, Email, dan Nomor Telepon harus diisi.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post('/partners', formData);
      const newPartnerFromDb = response.data;
      const newPartnerDisplayData = createPartnerDisplayData(newPartnerFromDb);

      setBankSampahList(prevList => [newPartnerDisplayData, ...prevList]);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', address: '', message: '' });
      console.log('Form Submitted and list updated:', newPartnerFromDb);
    } catch (error) {
      console.error('Submission Error Frontend:', error.response?.data || error.message);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  // SISA CODE (bagian UI & animasi) tetap seperti yang kamu punya
  return (
    <motion.div
      className="bank-sampah-page-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ... Semua UI dan form tetap seperti sebelumnya */}
    </motion.div>
  );
};

export default BankSampah;
