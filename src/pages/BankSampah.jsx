import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaRecycle, FaTrashAlt, FaTint, FaLeaf, FaLaptopCode, FaLightbulb,
  FaBrain, FaGlobeAsia, FaHandsHelping, FaCheckCircle, FaExclamationCircle, FaSpinner, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaComments, FaCalendarAlt
} from 'react-icons/fa';
import '../styles/BankSampah.css'; // Import CSS
import axiosInstance from '../services/axios'; // Import the configured axios instance

const BankSampah = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  // State to store the list of waste banks/partners
  const [bankSampahList, setBankSampahList] = useState([]);
  const [loadingPartners, setLoadingPartners] = useState(true);
  const [partnersError, setPartnersError] = useState(null);

  // Helper function to simulate partner data based on backend response
  const createPartnerDisplayData = (partner) => {
    return {
      id: partner.id,
      name: partner.name,
      address: partner.address || 'Alamat tidak tersedia', // Default if not provided
      contact: partner.phone,
      schedule: 'Jadwal akan dikonfirmasi', // Default schedule for new partners
      type: 'Berbagai Jenis Sampah', // Default type for new partners
    };
  };

  // --- Effect Hook: Fetch Partner Reports when Component Mounts ---
  useEffect(() => {
    const fetchPartners = async () => {
      setLoadingPartners(true);
      setPartnersError(null);
      try {
        const response = await axiosInstance.get('/partners'); // Use axiosInstance for GET request
        // Map data from database to display format
        const fetchedPartners = response.data.map(createPartnerDisplayData);
        setBankSampahList(fetchedPartners);
      } catch (error) {
        console.error("Failed to fetch partners:", error);
        setPartnersError('Gagal memuat daftar mitra. Silakan coba refresh halaman.');
      } finally {
        setLoadingPartners(false);
      }
    };

    fetchPartners();
  }, []); // Empty dependency array means this runs once on mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null); // Reset status

    // Client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setSubmitStatus('error');
      alert('Nama, Email, dan Nomor Telepon harus diisi.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axiosInstance.post('/partners', formData); // Use axiosInstance for POST request
      const newPartnerFromDb = response.data; // Axios puts the response data in .data
      const newPartnerDisplayData = createPartnerDisplayData(newPartnerFromDb);

      // Add new partner to the beginning of the list to show immediately
      setBankSampahList(prevList => [newPartnerDisplayData, ...prevList]);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', address: '', message: '' }); // Reset form
      console.log('Form Submitted and list updated:', newPartnerFromDb);

    } catch (error) {
      console.error('Submission Error Frontend:', error);
      // Check if the error has a response and data for more specific backend messages
      const errorMessage = error.response?.data?.message || 'Pendaftaran gagal. Silakan coba lagi.';
      setSubmitStatus('error');
      alert(errorMessage); // Show alert with specific error if available
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000); // Hide message after 5 seconds
    }
  };

  // Variants for Framer Motion animation
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1, y: 0,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
        duration: 0.6,
        ease: "easeOut"
      }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { scale: 1.02, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }
  };

  const formInputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div
      className="bank-sampah-page-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.header className="bank-sampah-hero" variants={itemVariants}>
        <div className="hero-content">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <FaRecycle className="hero-icon" /> Bank Sampah & Daur Ulang
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Bersama, kita wujudkan lingkungan yang lebih bersih dan berkelanjutan.
          </motion.p>
        </div>
      </motion.header>

      {/* List Bank Sampah Section */}
      <section className="bank-sampah-list-section">
        <motion.h2 variants={itemVariants} className="section-title">
          Daftar Bank Sampah di Sekitar Kita
        </motion.h2>
        <motion.p variants={itemVariants} className="section-description">
          Temukan lokasi bank sampah terdekat untuk menyalurkan sampahmu.
        </motion.p>
        <div className="bank-sampah-grid">
          {loadingPartners ? (
            <div className="loading-message">
              <FaSpinner className="spin-icon" /> Memuat daftar bank sampah...
            </div>
          ) : partnersError ? (
            <div className="error-message">
              <FaExclamationCircle /> {partnersError}
            </div>
          ) : bankSampahList.length === 0 ? (
            <p className="no-partners-message">Belum ada bank sampah terdaftar. Jadilah yang pertama!</p>
          ) : (
            bankSampahList.map((bank) => (
              <motion.div
                key={bank.id}
                className="bank-sampah-card"
                variants={cardVariants}
                whileHover="hover"
              >
                <h3 className="bank-name"><FaRecycle /> {bank.name}</h3>
                <p><strong><FaMapMarkerAlt /> Alamat:</strong> {bank.address}</p>
                <p><strong><FaPhone /> Kontak:</strong> {bank.contact}</p>
                <p><strong><FaCalendarAlt /> Jadwal:</strong> {bank.schedule}</p>
                <p><strong><FaTrashAlt /> Jenis:</strong> {bank.type}</p>
              </motion.div>
            ))
          )}
        </div>
      </section>

      {/* Partner Registration Form Section */}
      <section className="bank-sampah-form-section">
        <motion.div className="form-content-wrapper" variants={itemVariants}>
          <motion.h2 className="form-main-title" variants={itemVariants}>
            Bergabung Jadi Mitra Bank Sampah
          </motion.h2>

          <motion.div className="form-theme-box" variants={itemVariants}>
            <p className="theme-description">
              Ayo, kembangkan solusi digital inovatif yang mendukung pelestarian lingkungan
              dan gaya hidup ramah alam untuk keberlanjutan bumi kita!
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="partner-registration-form">
            <AnimatePresence>
              {submitStatus && (
                <motion.div
                  className={`submit-message ${submitStatus}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {submitStatus === 'success' && <FaCheckCircle className="message-icon" />}
                  {submitStatus === 'error' && <FaExclamationCircle className="message-icon" />}
                  {submitStatus === 'success' ? 'Pendaftaran berhasil! Terima kasih telah bergabung.' : 'Pendaftaran gagal. Silakan coba lagi.'}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div className="form-group" variants={formInputVariants}>
              <label htmlFor="name"><FaUser /> Nama Lengkap / Organisasi *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nama Anda atau Organisasi"
                required
                disabled={isSubmitting}
              />
            </motion.div>

            <motion.div className="form-group" variants={formInputVariants}>
              <label htmlFor="email"><FaEnvelope /> Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@contoh.com"
                required
                disabled={isSubmitting}
              />
            </motion.div>

            <motion.div className="form-group" variants={formInputVariants}>
              <label htmlFor="phone"><FaPhone /> Nomor Telepon *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Contoh: 081234567890"
                required
                disabled={isSubmitting}
              />
            </motion.div>

            <motion.div className="form-group" variants={formInputVariants}>
              <label htmlFor="address"><FaMapMarkerAlt /> Alamat (Opsional)</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Alamat lengkap (opsional)"
                rows="3"
                disabled={isSubmitting}
              ></textarea>
            </motion.div>

            <motion.div className="form-group" variants={formInputVariants}>
              <label htmlFor="message"><FaComments /> Pesan / Harapan Anda (Opsional)</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Sampaikan ide atau harapan Anda untuk lingkungan..."
                rows="4"
                disabled={isSubmitting}
              ></textarea>
            </motion.div>

            <motion.button
              type="submit"
              className="submit-btn"
              whileHover={{ scale: 1.03, boxShadow: '0 8px 18px rgba(0,0,0,0.2)' }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting || !formData.name.trim() || !formData.email.trim() || !formData.phone.trim()}
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="spin-icon" /> Mengirim...
                </>
              ) : (
                <>
                  <FaHandsHelping /> Gabung Sekarang!
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default BankSampah;