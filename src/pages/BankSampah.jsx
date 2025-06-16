import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from '../services/axios';

import {
  FaRecycle, FaTrashAlt, FaTint, FaLeaf, FaLaptopCode, FaLightbulb,
  FaBrain, FaGlobeAsia, FaHandsHelping, FaCheckCircle, FaExclamationCircle,
  FaSpinner, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaComments, FaCalendarAlt
} from 'react-icons/fa';

import '../styles/BankSampah.css';

// ✅ Tambahkan ini untuk animasi halaman
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

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
    } catch (error) {
      console.error('Submission Error Frontend:', error.response?.data || error.message);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <motion.div
      className="bank-sampah-page-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h1><FaRecycle /> Daftar Mitra Bank Sampah</h1>

      {loadingPartners ? (
        <div className="loading"><FaSpinner className="spin" /> Memuat data...</div>
      ) : partnersError ? (
        <div className="error"><FaExclamationCircle /> {partnersError}</div>
      ) : (
        <ul className="partner-list">
          {bankSampahList.map(partner => (
            <li key={partner.id} className="partner-item">
              <h3>{partner.name}</h3>
              <p><FaMapMarkerAlt /> {partner.address}</p>
              <p><FaPhone /> {partner.contact}</p>
              <p><FaCalendarAlt /> {partner.schedule}</p>
              <p><FaLeaf /> {partner.type}</p>
            </li>
          ))}
        </ul>
      )}

      <h2><FaHandsHelping /> Daftar Mitra Baru</h2>
      <form onSubmit={handleSubmit} className="bank-sampah-form">
        <input type="text" name="name" placeholder="Nama" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Telepon" value={formData.phone} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Alamat" value={formData.address} onChange={handleChange} />
        <textarea name="message" placeholder="Pesan (opsional)" value={formData.message} onChange={handleChange}></textarea>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <><FaSpinner className="spin" /> Mengirim...</> : <>Kirim</>}
        </button>
      </form>

      <AnimatePresence>
        {submitStatus === 'success' && (
          <motion.div className="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <FaCheckCircle /> Data berhasil dikirim!
          </motion.div>
        )}
        {submitStatus === 'error' && (
          <motion.div className="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <FaExclamationCircle /> Terjadi kesalahan. Silakan coba lagi.
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BankSampah;
