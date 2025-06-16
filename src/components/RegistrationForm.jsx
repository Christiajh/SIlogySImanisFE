// src/components/RegistrationForm.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import '../styles/Event.css'; // Path relatif yang benar ke styling
import axiosInstance from "../services/axios"; // Import axiosInstance

const RegistrationForm = ({ event, onClose, onRegistrationSuccess }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        if (!name || !email) {
            setError('Nama dan Email harus diisi.');
            setLoading(false);
            return;
        }

        try {
            console.log(`Submitting registration for event ${event.id} by ${name} (${email})`);
            // ⭐ Menggunakan axiosInstance untuk PATCH request ⭐
            const response = await axiosInstance.patch(`/events/${event.id}/register`, {
                // Anda bisa mengirim detail pendaftar ke backend jika ingin menyimpannya
                // name,
                // email,
            });

            const result = response.data; // Axios otomatis mem-parsing JSON

            console.log('Registration API response:', result);

            if (result.event && result.event.registered !== undefined) {
                setSuccessMessage('Pendaftaran berhasil! Kartu kegiatan telah diperbarui.');
                onRegistrationSuccess(result.event.id, result.event.registered);
            } else {
                // Fallback if backend doesn't return updated 'registered' count
                setSuccessMessage('Pendaftaran berhasil! Perbarui halaman untuk melihat perubahan.');
                console.warn("Backend response missing 'registered' count. Updating optimistically.");
                onRegistrationSuccess(event.id, event.registered + 1); // Optimistically update
            }

            // Close modal after a short delay to show success message
            setTimeout(onClose, 2000);

        } catch (err) {
            console.error('Error during registration:', err);
            // ⭐ Penanganan error Axios ⭐
            if (err.response && err.response.data && err.response.data.error) {
                setError(err.response.data.error);
            } else if (err.message) {
                setError(err.message);
            } else {
                setError('Terjadi kesalahan saat pendaftaran.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            className="evt-modal-overlay" // Changed
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="evt-modal-card registration-form-card" // Changed
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
            >
                <motion.button
                    className="evt-modal-close-btn" // Changed
                    onClick={onClose}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <FaTimes />
                </motion.button>
                <h3 className="evt-modal-title">Daftar Kegiatan: {event.title}</h3>
                <p className="evt-modal-event-detail">
                    <FaCalendarAlt className="evt-card-icon" /> {new Date(event.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <p className="evt-modal-event-detail">
                    <FaMapMarkerAlt className="evt-card-icon" /> {event.location}
                </p>
                <p className="evt-modal-event-detail">
                    Kuota Tersisa: {event.capacity - event.registered}
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="evt-form-group">
                        <label htmlFor="name" className="evt-form-label">Nama Lengkap:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="evt-form-input" // Changed
                        />
                    </div>
                    <div className="evt-form-group">
                        <label htmlFor="email" className="evt-form-label">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="evt-form-input" // Changed
                        />
                    </div>
                    {error && <p className="evt-error-message">{error}</p>}
                    {successMessage && <p className="evt-success-message">{successMessage}</p>}
                    <motion.button
                        type="submit"
                        className="evt-submit-button" // Changed
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={loading || successMessage}
                    >
                        {loading ? 'Mendaftar...' : 'Kirim Pendaftaran'}
                    </motion.button>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default RegistrationForm;