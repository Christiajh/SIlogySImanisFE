// frontend/src/page/RelawanHijau.jsx
import React, { useState, useEffect } from 'react';
import "../styles/Relawan.css"; // Ensure this path is correct
import axiosInstance from "../services/axios"; // Import the configured axios instance

const RelawanHijau = () => {
  const [volunteerData, setVolunteerData] = useState([]);
  const [showVolunteerForm, setShowVolunteerForm] = useState(false);
  const [volunteerFormData, setVolunteerFormData] = useState({
    nama: '',
    email: '',
    daerah: '',
    aksi: '',
    motivasi: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAreaFilter, setSelectedAreaFilter] = useState('Semua');
  const [isContentLoading, setIsContentLoading] = useState(true);
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'email_exists', 'error', null

  // Define area options
  const areaOptions = ['Jakarta Selatan', 'Bandung', 'Yogyakarta', 'Bali', 'Surabaya', 'Medan'];
  const filterAreaOptions = ['Semua', ...areaOptions];

  // --- Fetch Volunteers from Backend ---
  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await axiosInstance.get('/volunteers'); // Use axiosInstance.get()
        setVolunteerData(response.data); // Axios wraps the response in a 'data' property
      } catch (error) {
        console.error("Failed to fetch volunteers:", error);
        // Optionally, display a user-friendly error message
      } finally {
        setIsContentLoading(false);
      }
    };

    fetchVolunteers();
  }, []);

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setVolunteerFormData({
      ...volunteerFormData,
      [name]: value
    });
  };

  // --- Handle Form Submission to Backend (updated) ---
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus(null); // Reset status on new submission attempt

    try {
      const response = await axiosInstance.post('/volunteers', volunteerFormData); // Use axiosInstance.post()
      setVolunteerData([...volunteerData, response.data]); // Add new volunteer from DB response
      setSubmissionStatus('success');
      setVolunteerFormData({ // Reset form fields only on success
        nama: '',
        email: '',
        daerah: '',
        aksi: '',
        motivasi: ''
      });
      // Optionally, close the form after a delay for success
      setTimeout(() => setShowVolunteerForm(false), 2000);

    } catch (error) {
      console.error("Error submitting volunteer form:", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 409 && error.response.data.message === 'Email sudah terdaftar.') {
          setSubmissionStatus('email_exists');
        } else {
          setSubmissionStatus('error');
          // You might want to show a more specific message from error.response.data.message
          console.error("Server error data:", error.response.data);
        }
      } else if (error.request) {
        // The request was made but no response was received
        setSubmissionStatus('error');
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        setSubmissionStatus('error');
        console.error("Error message:", error.message);
      }
    }
  };

  const filteredVolunteers = volunteerData.filter(volunteer => {
    const matchesSearch = volunteer.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      volunteer.daerah.toLowerCase().includes(searchQuery.toLowerCase()) ||
      volunteer.aksi.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesArea = selectedAreaFilter === 'Semua' || volunteer.daerah === selectedAreaFilter;
    return matchesSearch && matchesArea;
  });

  return (
    <div className="volunteer-page-layout">
      <div className="volunteer-page-header">
        <h1 className="volunteer-page-title">Komunitas Relawan Hijau</h1>
        <p className="volunteer-page-subtitle">
          Bergabunglah dengan para pejuang lingkungan untuk menciptakan bumi yang lebih hijau dan berkelanjutan.
        </p>
      </div>

      <div className="volunteer-action-controls">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Cari relawan..."
            className="volunteer-search-field"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="search-icon-display">🔍</span>
        </div>

        <div className="area-filter-selection">
          <label htmlFor="area-filter-dropdown" className="filter-label-text">Filter Daerah:</label>
          <select
            id="area-filter-dropdown"
            className="filter-area-select"
            value={selectedAreaFilter}
            onChange={(e) => setSelectedAreaFilter(e.target.value)}
          >
            {filterAreaOptions.map(daerah => (
              <option key={daerah} value={daerah}>{daerah}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        className="join-volunteer-button"
        onClick={() => {
          setShowVolunteerForm(true);
          setSubmissionStatus(null); // Reset status when opening form
        }}
      >
        <span>+</span> Bergabung Menjadi Relawan
      </button>

      {isContentLoading ? (
        <div className="loading-content-indicator">
          <div className="loading-spinner-animation"></div>
          <p>Memuat data relawan...</p>
        </div>
      ) : (
        <div className="volunteer-card-grid">
          {filteredVolunteers.length > 0 ? (
            filteredVolunteers.map(volunteer => (
              <div key={volunteer.id} className="individual-volunteer-card">
                <div className="volunteer-card-top-section">
                  <img src={volunteer.foto} alt={volunteer.nama} className="volunteer-profile-avatar" />
                  <div className="volunteer-info-text">
                    <h3>{volunteer.nama}</h3>
                    <p className="volunteer-location-text">{volunteer.daerah}</p>
                  </div>
                </div>
                <div className="volunteer-card-main-content">
                  <div className="volunteer-action-item">
                    <span className="action-icon-display">🌱</span>
                    <p>{volunteer.aksi}</p>
                  </div>
                  <div className="volunteer-join-date">
                    <span className="join-date-icon">📅</span>
                    <p>Bergabung: {volunteer.bergabung}</p>
                  </div>
                </div>
                
              </div>
            ))
          ) : (
            <div className="no-volunteer-results">
              <p>Tidak ditemukan relawan yang sesuai dengan kriteria pencarian.</p>
            </div>
          )}
        </div>
      )}

      {showVolunteerForm && (
        <div className="volunteer-registration-overlay">
          <div className="volunteer-registration-modal">
            <button
              className="registration-modal-close-btn"
              onClick={() => setShowVolunteerForm(false)}
            >
              &times;
            </button>
            <h2 className="registration-modal-title">Formulir Pendaftaran Relawan</h2>
            {submissionStatus === 'success' && (
              <p className="success-message">Pendaftaran berhasil! Terima kasih telah bergabung.</p>
            )}
            {submissionStatus === 'email_exists' && (
              <p className="error-message">Email sudah terdaftar. Silakan gunakan email lain.</p>
            )}
            {submissionStatus === 'error' && (
              <p className="error-message">Pendaftaran gagal. Terjadi kesalahan server.</p>
            )}
            <form onSubmit={handleFormSubmit}>
              <div className="form-input-group">
                <label htmlFor="fullName" className="form-input-label">Nama Lengkap</label>
                <input
                  type="text"
                  id="fullName"
                  name="nama"
                  className="form-control-input"
                  value={volunteerFormData.nama}
                  onChange={handleFormInputChange}
                  required
                />
              </div>
              <div className="form-input-group">
                <label htmlFor="emailAddress" className="form-input-label">Email</label>
                <input
                  type="email"
                  id="emailAddress"
                  name="email"
                  className="form-control-input"
                  value={volunteerFormData.email}
                  onChange={handleFormInputChange}
                  required
                />
              </div>
              <div className="form-input-group">
                <label htmlFor="domicileAreaSelect" className="form-input-label">Daerah Domisili</label>
                <select
                  id="domicileAreaSelect"
                  name="daerah"
                  className="form-control-input"
                  value={volunteerFormData.daerah}
                  onChange={handleFormInputChange}
                  required
                >
                  <option value="" disabled>Pilih Daerah</option>
                  {areaOptions.map(daerah => (
                    <option key={daerah} value={daerah}>{daerah}</option>
                  ))}
                </select>
              </div>
              <div className="form-input-group">
                <label htmlFor="desiredAction" className="form-input-label">Aksi Lingkungan yang Ingin Dilakukan</label>
                <textarea
                  id="desiredAction"
                  name="aksi"
                  className="form-control-input"
                  rows="3"
                  value={volunteerFormData.aksi}
                  onChange={handleFormInputChange}
                  required
                ></textarea>
              </div>
              <div className="form-input-group">
                <label htmlFor="motivationText" className="form-input-label">Motivasi Bergabung</label>
                <textarea
                  id="motivationText"
                  name="motivasi"
                  className="form-control-input"
                  rows="4"
                  value={volunteerFormData.motivasi}
                  onChange={handleFormInputChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-registration-button">
                Daftar Sebagai Relawan
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RelawanHijau;