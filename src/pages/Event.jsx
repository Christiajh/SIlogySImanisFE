// src/pages/Event.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaSeedling, FaPlusCircle, FaTimes, FaTrashAlt, FaCheckCircle } from 'react-icons/fa';
import RegistrationForm from '../components/RegistrationForm.jsx';
import AddEventForm from '../components/AddEventForm.jsx';
import DeleteEventForm from '../components/DeleteEventForm.jsx';
import '../styles/Event.css'; // Pastikan path ini benar untuk styling

// IMPORT AXIOS INSTANCE
import axiosInstance from "../services/axios"; // Adjust the path as needed, assuming 'axiosInstance.js' is in a 'api' folder

const Event = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isRegistrationFormOpen, setIsRegistrationFormOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // States for Add Event feature
    const [isAddCodeInputOpen, setIsAddCodeInputOpen] = useState(false);
    const [isAddEventFormOpen, setIsAddEventFormOpen] = useState(false);
    const [addInputCode, setAddInputCode] = useState('');
    const [addCodeError, setAddCodeError] = useState('');

    // States for Delete Event feature
    const [isDeleteCodeInputOpen, setIsDeleteCodeInputOpen] = useState(false);
    const [isDeleteEventFormOpen, setIsDeleteEventFormOpen] = useState(false);
    const [deleteInputCode, setDeleteInputCode] = useState('');
    const [deleteCodeError, setDeleteCodeError] = useState('');
    const [notificationMessage, setNotificationMessage] = useState(null);
    const [notificationType, setNotificationType] = useState('success');

    const CORRECT_CODE = '222'; // Kode rahasia untuk admin

    // Fungsi untuk menampilkan notifikasi
    const showNotification = useCallback((message, type) => {
        setNotificationMessage(message);
        setNotificationType(type);
        setTimeout(() => {
            setNotificationMessage(null);
        }, 5000); // Notifikasi akan hilang setelah 5 detik
    }, []);

    // Fungsi untuk mengambil data event dari backend
    const fetchEvents = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            console.log('🔄 Fetching events from:', `${axiosInstance.defaults.baseURL}/events`);

            const response = await axiosInstance.get('/events', {
                timeout: 10000 // 10 second timeout
            });

            console.log('✅ Fetched events:', response.data);

            if (Array.isArray(response.data)) {
                const formattedEvents = response.data.map(event => ({
                    ...event,
                    date: new Date(event.date) // Pastikan ini objek Date
                }));
                setEvents(formattedEvents);
                setError(null);
            } else {
                throw new Error('Data yang diterima bukan array');
            }

        } catch (err) {
            console.error('❌ Error fetching events:', err);
            if (err.code === 'ECONNABORTED') {
                setError('Request timeout - Server tidak merespons');
            } else if (err.message.includes('Network Error')) {
                setError('Tidak dapat terhubung ke server. Pastikan backend berjalan dengan benar.');
            } else if (err.response) {
                // Server responded with a status other than 2xx
                setError(`Gagal memuat data kegiatan: ${err.response.status} - ${err.response.data.message || err.response.statusText}`);
            } else {
                setError(`Gagal memuat data kegiatan: ${err.message}`);
            }
        } finally {
            setLoading(false);
        }
    }, []);

    // Muat event saat komponen mount
    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    // Fungsi untuk menguji koneksi backend (untuk debugging error)
    const testConnection = async () => {
        try {
            console.log('🧪 Testing server connection...');
            // Use a direct path if your root ('/') provides a simple status check
            const response = await axiosInstance.get('/'); 

            if (response.status === 200) {
                console.log('✅ Server connection test:', response.data);
                setError(null);
                showNotification('Koneksi server berhasil!', 'success');
                return true;
            } else {
                setError(`Koneksi ke server gagal: Status ${response.status}. Pesan: ${response.data || response.statusText}`);
                showNotification(`Koneksi server gagal: ${response.data || response.statusText}`, 'error');
                return false;
            }
        } catch (err) {
            console.error('❌ Error testing connection:', err);
            let errorMessage = `Kesalahan jaringan: ${err.message}. Pastikan backend berjalan.`;
            if (err.response) {
                errorMessage = `Kesalahan server: ${err.response.status} - ${err.response.data.message || err.response.statusText}`;
            } else if (err.code === 'ECONNABORTED') {
                errorMessage = 'Koneksi ke server terputus (timeout).';
            }
            setError(errorMessage);
            showNotification(errorMessage, 'error');
            return false;
        }
    };

    // --- Registration Handlers ---
    const handleRegisterClick = (event) => {
        setSelectedEvent(event);
        setIsRegistrationFormOpen(true);
    };

    const handleCloseRegistrationForm = () => {
        setIsRegistrationFormOpen(false);
        setSelectedEvent(null);
    };

    const handleRegistrationSuccess = useCallback(async (updatedEventId, newRegisteredCount) => {
        console.log(`Pendaftaran berhasil untuk event ID ${updatedEventId}! Memperbarui jumlah peserta terdaftar menjadi ${newRegisteredCount}...`);

        setEvents(prevEvents =>
            prevEvents.map(event =>
                event.id === updatedEventId ? { ...event, registered: newRegisteredCount } : event
            )
        );

        setIsRegistrationFormOpen(false);
        setSelectedEvent(null);
        showNotification('Pendaftaran Anda berhasil! Kartu kegiatan telah diperbarui.', 'success');
    }, [showNotification]);


    // --- Add Event Handlers ---
    const handleAddEventClick = () => {
        setIsAddCodeInputOpen(true);
        setAddInputCode('');
        setAddCodeError('');
    };

    const handleAddCodeSubmit = () => {
        if (addInputCode === CORRECT_CODE) {
            setIsAddCodeInputOpen(false);
            setIsAddEventFormOpen(true);
            setAddCodeError('');
        } else {
            setAddCodeError('Kode salah! Silakan coba lagi.');
        }
    };

    const handleCloseAddCodeInput = () => {
        setIsAddCodeInputOpen(false);
        setAddInputCode('');
        setAddCodeError('');
    };

    const handleAddEvent = async (newEvent) => {
        try {
            const response = await axiosInstance.post('/events', newEvent);

            console.log('Event berhasil dibuat:', response.data);
            await fetchEvents();
            setIsAddEventFormOpen(false);
            setAddCodeError('');
            showNotification(`Event "${response.data.title}" berhasil ditambahkan!`, 'success');
        } catch (error) {
            console.error('Error menambahkan event:', error);
            const errorMessage = error.response?.data?.error || error.message || 'Gagal menambahkan event';
            setAddCodeError(errorMessage);
            showNotification(`Gagal menambahkan event: ${errorMessage}`, 'error');
        }
    };

    const handleCloseAddEventForm = () => {
        setIsAddEventFormOpen(false);
        setAddCodeError('');
    };

    // --- Delete Event Handlers ---
    const handleDeleteEventClick = () => {
        setIsDeleteCodeInputOpen(true);
        setDeleteInputCode('');
        setDeleteCodeError('');
        setNotificationMessage(null);
    };

    const handleDeleteCodeSubmit = () => {
        if (deleteInputCode === CORRECT_CODE) {
            setIsDeleteCodeInputOpen(false);
            setIsDeleteEventFormOpen(true);
            setDeleteCodeError('');
        } else {
            setDeleteCodeError('Kode salah! Silakan coba lagi.');
        }
    };

    const handleCloseDeleteCodeInput = () => {
        setIsDeleteCodeInputOpen(false);
        setDeleteInputCode('');
        setDeleteCodeError('');
    };

    const handleDeleteEvent = async (eventId) => {
        try {
            const eventToDelete = events.find(event => event.id === eventId);
            const response = await axiosInstance.delete(`/events/${eventId}`);

            console.log('Event berhasil dihapus:', response.data);
            await fetchEvents();
            setIsDeleteEventFormOpen(false);
            setDeleteCodeError('');
            showNotification(`Event "${eventToDelete?.title || 'Unknown'}" berhasil dihapus!`, 'success');
        } catch (error) {
            console.error('Error menghapus event:', error);
            const errorMessage = error.response?.data?.error || error.message || 'Gagal menghapus event';
            setDeleteCodeError(errorMessage);
            showNotification(`Gagal menghapus event: ${errorMessage}`, 'error');
        }
    };

    const handleCloseDeleteEventForm = () => {
        setIsDeleteEventFormOpen(false);
        setDeleteCodeError('');
    };

    if (loading) {
        return (
            <div className="evt-page-container">
                <div className="evt-loading-area">
                    <motion.div
                        className="evt-loading-spinner"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                        <FaSeedling size={40} />
                    </motion.div>
                    <p>Memuat kegiatan...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="evt-page-container">
                <div className="evt-error-area">
                    <p className="evt-error-message">{error}</p>
                    <div className="evt-debug-info">
                        <h4>Informasi Debug:</h4>
                        <p>URL API: {axiosInstance.defaults.baseURL}/events</p>
                        <p>Pastikan backend berjalan dan dapat diakses dari frontend.</p>
                        <p>Pastikan variabel lingkungan `VITE_API_URL` di `.env` (untuk Vite) atau sejenisnya sudah diatur dengan benar.</p>
                    </div>
                    <div className="evt-error-actions">
                        <motion.button
                            onClick={fetchEvents}
                            className="evt-retry-button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Coba Lagi
                        </motion.button>
                        <motion.button
                            onClick={testConnection}
                            className="evt-test-button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Test Koneksi Server
                        </motion.button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="evt-page-container">
            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="evt-main-title"
            >
                Kalender Kegiatan Tanam Pohon
            </motion.h1>

            <div className="evt-action-btns-wrap">
                <motion.button
                    onClick={handleAddEventClick}
                    className="evt-action-btn evt-add-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <FaPlusCircle className="evt-btn-icon" /> Tambah Event Baru
                </motion.button>

                <motion.button
                    onClick={handleDeleteEventClick}
                    className="evt-action-btn evt-delete-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <FaTrashAlt className="evt-btn-icon" /> Hapus Event
                </motion.button>
            </div>

            {notificationMessage && (
                <motion.div
                    className={`evt-app-notification ${notificationType === 'success' ? 'evt-notification-success' : 'evt-notification-error'}`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                >
                    {notificationType === 'success' ? <FaCheckCircle className="evt-notification-icon" /> : <FaTimes className="evt-notification-icon" />}
                    {notificationMessage}
                </motion.div>
            )}

            <div className="evt-grid-display">
                {events.length === 0 ? (
                    <div className="evt-no-events-msg">
                        <FaSeedling size={60} />
                        <p>Belum ada kegiatan yang tersedia</p>
                        <p>Jika backend berjalan, coba "Test Koneksi Server" atau "Coba Lagi".</p>
                    </div>
                ) : (
                    events.map((event, index) => {
                        if (!event || typeof event !== 'object' || typeof event.id === 'undefined' || event.id === null) {
                            console.warn('Skipping malformed event at index', index, ':', event);
                            return null;
                        }
                        const isEventFull = event.registered >= event.capacity;
                        return (
                            <motion.div
                                key={event.id}
                                className={`evt-event-card ${isEventFull ? 'evt-event-full' : ''}`}
                                whileHover={{ y: -5 }}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="evt-card-content">
                                    <div className="evt-date-section">
                                        <FaCalendarAlt className="evt-card-icon" />
                                        <p className="evt-date-text">
                                            {new Date(event.date).toLocaleDateString('id-ID', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <h2 className="evt-card-title">{event.title}</h2>
                                    <div className="evt-location-section">
                                        <FaMapMarkerAlt className="evt-card-icon evt-location-icon" />
                                        <p className="evt-location-text">{event.location}</p>
                                    </div>
                                    <p className="evt-description-text">{event.description}</p>
                                    <div className="evt-progress-stats">
                                        <span>
                                            Peserta Terdaftar: <strong className="evt-registered-count">{event.registered}</strong> dari {event.capacity}
                                        </span>
                                        <progress
                                            className="evt-progress-bar"
                                            value={event.registered}
                                            max={event.capacity}
                                        ></progress>
                                    </div>
                                    <motion.button
                                        onClick={() => handleRegisterClick(event)}
                                        className="evt-register-btn"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        disabled={isEventFull}
                                    >
                                        <FaSeedling className="evt-btn-seedling-icon" />
                                        {isEventFull ? 'Event Penuh' : 'Daftar Sekarang'}
                                    </motion.button>
                                </div>
                            </motion.div>
                        );
                    })
                )}
            </div>

            <AnimatePresence>
                {isRegistrationFormOpen && selectedEvent && (
                    <RegistrationForm
                        event={selectedEvent}
                        onClose={handleCloseRegistrationForm}
                        onRegistrationSuccess={handleRegistrationSuccess}
                    />
                )}

                {isAddCodeInputOpen && (
                    <motion.div
                        className="evt-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleCloseAddCodeInput}
                    >
                        <motion.div
                            className="evt-modal-card evt-code-input-card"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.button
                                className="evt-modal-close-btn"
                                onClick={handleCloseAddCodeInput}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FaTimes />
                            </motion.button>
                            <h3 className="evt-modal-title">Fitur Penambahan Event</h3>
                            <p className="evt-modal-message">
                               Ketik 222 untuk menambahkan event.
                            </p>
                            <input
                                type="password"
                                className={`evt-code-input-field ${addCodeError ? 'evt-input-error' : ''}`}
                                placeholder="Masukkan kode..."
                                value={addInputCode}
                                onChange={(e) => setAddInputCode(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleAddCodeSubmit()}
                            />
                            {addCodeError && <p className="evt-error-msg-inline">{addCodeError}</p>}
                            <motion.button
                                className="evt-code-submit-btn"
                                onClick={handleAddCodeSubmit}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Verifikasi Kode
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}

                {isAddEventFormOpen && (
                    <AddEventForm
                        onAddEvent={handleAddEvent}
                        onClose={handleCloseAddEventForm}
                        error={addCodeError}
                    />
                )}

                {isDeleteCodeInputOpen && (
                    <motion.div
                        className="evt-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleCloseDeleteCodeInput}
                    >
                        <motion.div
                            className="evt-modal-card evt-code-input-card"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.button
                                className="evt-modal-close-btn"
                                onClick={handleCloseDeleteCodeInput}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FaTimes />
                            </motion.button>
                            <h3 className="evt-modal-title">Hapus Event</h3>
                            <p className="evt-modal-message">
                                Ketik 222 untuk menghapus event.
                            </p>
                            <input
                                type="password"
                                className={`evt-code-input-field ${deleteCodeError ? 'evt-input-error' : ''}`}
                                placeholder="Masukkan kode..."
                                value={deleteInputCode}
                                onChange={(e) => setDeleteInputCode(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleDeleteCodeSubmit()}
                            />
                            {deleteCodeError && <p className="evt-error-msg-inline">{deleteCodeError}</p>}
                            <motion.button
                                className="evt-code-submit-btn"
                                onClick={handleDeleteCodeSubmit}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Verifikasi Kode
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}

                {isDeleteEventFormOpen && (
                    <DeleteEventForm
                        events={events}
                        onDeleteEvent={handleDeleteEvent}
                        onClose={handleCloseDeleteEventForm}
                        error={deleteCodeError}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Event;