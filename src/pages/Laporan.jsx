import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaRegLightbulb, FaPlusCircle, FaMapMarkerAlt, FaInfoCircle,
  FaRegCheckCircle, FaExclamationCircle, FaSpinner, FaUser, FaCalendarAlt
} from 'react-icons/fa';
import '../styles/Laporan.css';

// ✅ Ubah BASE URL agar langsung mengarah ke /api
const API_BASE_URL = 'https://silogyexpowebsimanis-production.up.railway.app';



const LaporanLingkungan = () => {
  const [formData, setFormData] = useState({
    reporterName: '',
    location: '',
    damageType: '',
    description: '',
    incidentDate: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [reports, setReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(true);
  const [reportsError, setReportsError] = useState(null);

  const formatDisplayDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.warn('Invalid date string:', dateString);
      return dateString;
    }
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  useEffect(() => {
    const fetchReports = async () => {
      setLoadingReports(true);
      setReportsError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/api/reports`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        const formattedReports = data.map(report => ({
          ...report,
          createdAtFormatted: formatDisplayDate(report.created_at),
          incidentDateFormatted: formatDisplayDate(report.incident_date)
        }));
        setReports(formattedReports);
      } catch (error) {
        console.error("Failed to fetch reports:", error);
        setReportsError('Gagal memuat laporan. Silakan coba refresh halaman.');
      } finally {
        setLoadingReports(false);
      }
    };
    fetchReports();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    if (!formData.reporterName.trim() || !formData.location.trim() || !formData.damageType.trim() || !formData.description.trim() || !formData.incidentDate.trim()) {
      setSubmitStatus('error');
      alert('Semua kolom bertanda (*) harus diisi.');
      setIsSubmitting(false);
      return;
    }

    const reportData = {
      reporter_name: formData.reporterName,
      location: formData.location,
      damage_type: formData.damageType,
      description: formData.description,
      incident_date: formData.incidentDate,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/reports
`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal mengirim laporan ke server.');
      }

      const newReportFromDb = await response.json();
      const formattedNewReport = {
        ...newReportFromDb,
        createdAtFormatted: formatDisplayDate(newReportFromDb.created_at),
        incidentDateFormatted: formatDisplayDate(newReportFromDb.incident_date)
      };

      setReports(prevReports => [formattedNewReport, ...prevReports]);
      setSubmitStatus('success');
      setFormData({
        reporterName: '',
        location: '',
        damageType: '',
        description: '',
        incidentDate: '',
      });
    } catch (error) {
      console.error('Submission Error Frontend:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1, y: 0,
      transition: { staggerChildren: 0.1, when: "beforeChildren", duration: 0.6, ease: "easeOut" }
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
    <motion.div className="laporan-lingkungan-page-container" variants={containerVariants} initial="hidden" animate="visible">
      <motion.header className="laporan-lingkungan-hero" variants={itemVariants}>
        <div className="hero-content">
          <motion.h1 initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
            <FaRegLightbulb className="hero-icon" /> Laporan Kerusakan Lingkungan
          </motion.h1>
          <motion.p initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }}>
            Jadilah bagian dari solusi! Laporkan kerusakan lingkungan di sekitarmu.
          </motion.p>
        </div>
      </motion.header>

      <section className="report-form-section">
        <motion.h2 className="section-title" variants={itemVariants}><FaPlusCircle /> Laporkan Kerusakan Lingkungan</motion.h2>
        <motion.p className="section-description" variants={itemVariants}>
          Bantu kami menjaga lingkungan. Isi formulir di bawah ini untuk melaporkan kerusakan.
        </motion.p>

        <motion.div className="form-card" variants={cardVariants}>
          <form onSubmit={handleSubmit} className="environment-report-form">
            <AnimatePresence>
              {submitStatus && (
                <motion.div className={`submit-message ${submitStatus}`} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  {submitStatus === 'success' && <FaRegCheckCircle className="message-icon" />}
                  {submitStatus === 'error' && <FaExclamationCircle className="message-icon" />}
                  {submitStatus === 'success' ? 'Laporan berhasil dikirim! Terima kasih atas kontribusimu.' : 'Laporan gagal dikirim. Silakan coba lagi.'}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form Inputs */}
            <motion.div className="form-group" variants={formInputVariants}>
              <label htmlFor="reporterName"><FaUser /> Nama Pelapor *</label>
              <input type="text" id="reporterName" name="reporterName" value={formData.reporterName} onChange={handleChange} placeholder="Masukkan nama Anda" required disabled={isSubmitting} />
            </motion.div>

            <motion.div className="form-group" variants={formInputVariants}>
              <label htmlFor="location"><FaMapMarkerAlt /> Lokasi Kejadian *</label>
              <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} placeholder="Contoh: Sungai Wampu dekat jembatan" required disabled={isSubmitting} />
            </motion.div>

            <motion.div className="form-group" variants={formInputVariants}>
              <label htmlFor="damageType"><FaInfoCircle /> Jenis Kerusakan *</label>
              <input type="text" id="damageType" name="damageType" value={formData.damageType} onChange={handleChange} placeholder="Contoh: sampah berserakan, pencemaran air" required disabled={isSubmitting} />
            </motion.div>

            <motion.div className="form-group" variants={formInputVariants}>
              <label htmlFor="description"><FaInfoCircle /> Deskripsi Singkat Kerusakan *</label>
              <textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Jelaskan detail kerusakan yang Anda lihat" rows="5" required disabled={isSubmitting}></textarea>
            </motion.div>

            <motion.div className="form-group" variants={formInputVariants}>
              <label htmlFor="incidentDate"><FaCalendarAlt /> Tanggal Kejadian *</label>
              <input type="date" id="incidentDate" name="incidentDate" value={formData.incidentDate} onChange={handleChange} required disabled={isSubmitting} />
            </motion.div>

            <motion.button type="submit" className="submit-report-btn" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} disabled={isSubmitting}>
              {isSubmitting ? (<><FaSpinner className="spin-icon" /> Mengirim Laporan...</>) : (<><FaPlusCircle /> Kirim Laporan</>)}
            </motion.button>
          </form>
        </motion.div>
      </section>

      <section className="reports-list-section">
        <h3 className="list-title">Daftar Laporan Terbaru</h3>
        <div className="reports-list-grid">
          {loadingReports ? (
            <div className="loading-message"><FaSpinner className="spin-icon" /> Memuat daftar laporan...</div>
          ) : reportsError ? (
            <div className="error-message"><FaExclamationCircle /> {reportsError}</div>
          ) : reports.length === 0 ? (
            <p className="no-reports-message">Belum ada laporan yang tersedia. Ayo jadi yang pertama!</p>
          ) : (
            reports.map((report) => (
              <motion.div key={report.id} className="report-item-card" variants={cardVariants} whileHover="hover">
                <h4><FaMapMarkerAlt /> Lokasi: {report.location}</h4>
                <p><strong>Jenis:</strong> {report.damage_type}</p>
                <p>{report.description}</p>
                <p className="report-detail"><strong>Pelapor:</strong> {report.reporter_name}</p>
                <span className="report-date">
                  <strong>Tanggal Kejadian:</strong> {report.incidentDateFormatted}
                  <br />
                  Dilaporkan: {report.createdAtFormatted}
                </span>
              </motion.div>
            ))
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default LaporanLingkungan;
