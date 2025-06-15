import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaTrashAlt, FaCheckCircle, FaBan } from 'react-icons/fa';

const DeleteEventForm = ({ events, onDeleteEvent, onClose }) => {
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [confirmationText, setConfirmationText] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [deleteError, setDeleteError] = useState('');

    const handleSelectEvent = (e) => {
        setSelectedEventId(parseInt(e.target.value)); // Convert value to integer
        setDeleteError(''); // Clear error on new selection
        setShowConfirmation(false); // Hide confirmation on new selection
        setConfirmationText(''); // Clear confirmation text
    };

    const handleConfirmDelete = () => {
        if (!selectedEventId) {
            setDeleteError('Silakan pilih event yang akan dihapus.');
            return;
        }
        setShowConfirmation(true);
        setDeleteError('');
    };

    const handleFinalDelete = () => {
        // Find the event to be deleted to show its title in the error message
        const eventToDelete = events.find(event => event.id === selectedEventId);
        const eventTitle = eventToDelete ? eventToDelete.title : 'Event';

        if (selectedEventId && confirmationText.toLowerCase() === 'hapus') {
            onDeleteEvent(selectedEventId); // Call the delete function passed from parent
            onClose(); // Close modal after successful deletion
        } else {
            setDeleteError(`Teks konfirmasi tidak sesuai untuk "${eventTitle}" atau event belum dipilih. Ketik "hapus" untuk mengonfirmasi.`);
        }
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 50 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 20, stiffness: 300 } },
        exit: { opacity: 0, scale: 0.8, y: -50, transition: { duration: 0.3 } }
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
                className="evt-modal-card delete-event-card" // Changed
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
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
                <h3 className="evt-modal-title">Hapus Kegiatan</h3> 

                {events.length === 0 ? (
                    <div className="evt-empty-events-message"> 
                        <p>Tidak ada event yang tersedia untuk dihapus.</p>
                        <p>Silakan tambahkan event terlebih dahulu.</p>
                    </div>
                ) : (
                    <>
                        <div className="evt-form-group"> 
                            <label htmlFor="selectEvent" className="evt-form-label">Pilih Event yang Akan Dihapus</label> 
                            <select
                                id="selectEvent"
                                className={`evt-form-input ${deleteError ? 'evt-input-error' : ''}`} 
                                value={selectedEventId || ''}
                                onChange={handleSelectEvent}
                            >
                                <option value="" disabled>-- Pilih Event --</option>
                                {events.map((event) => (
                                    <option key={event.id} value={event.id}>
                                        {event.title} ({new Date(event.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })})
                                    </option>
                                ))}
                            </select>
                            {deleteError && <p className="evt-error-message">{deleteError}</p>} 
                        </div>

                        {!showConfirmation ? (
                            <motion.button
                                className="evt-confirm-delete-button" // Changed
                                onClick={handleConfirmDelete}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={!selectedEventId}
                            >
                                <FaTrashAlt className="evt-btn-icon" /> Konfirmasi Hapus 
                            </motion.button>
                        ) : (
                            <div className="evt-confirmation-section"> 
                                <p className="evt-confirmation-message">Untuk mengonfirmasi penghapusan, ketik "hapus" di bawah:</p> 
                                <input
                                    type="text"
                                    className={`evt-form-input ${deleteError ? 'evt-input-error' : ''}`} 
                                    placeholder='ketik "hapus"'
                                    value={confirmationText}
                                    onChange={(e) => setConfirmationText(e.target.value)}
                                />
                                {deleteError && <p className="evt-error-message">{deleteError}</p>} 
                                <div className="evt-button-group"> 
                                    <motion.button
                                        type="button"
                                        className="evt-cancel-button" // Changed
                                        onClick={() => setShowConfirmation(false)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <FaBan className="evt-btn-icon" /> Kembali 
                                    </motion.button>
                                    <motion.button
                                        type="button"
                                        className="evt-submit-button" // Changed
                                        onClick={handleFinalDelete}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        disabled={confirmationText.toLowerCase() !== 'hapus'}
                                    >
                                        <FaCheckCircle className="evt-btn-icon" /> Hapus Sekarang 
                                    </motion.button>
                                </div>
                            </div>
                        )}
                    </>
                )}
               
                <div className="evt-button-group-bottom"> 
                    <motion.button
                        type="button"
                        className="evt-modal-cancel-btn" 
                        onClick={onClose}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Tutup
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default DeleteEventForm;