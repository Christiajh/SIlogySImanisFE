import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaSave, FaBan } from 'react-icons/fa'; // FaCalendarAlt, FaMapMarkerAlt, FaSeedling are not directly used here, removed for cleanliness.

const AddEventForm = ({ onAddEvent, onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        location: '',
        description: '',
        capacity: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        // Clear error for the current field when user starts typing
        if (errors[name]) {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
        }
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Judul kegiatan wajib diisi!';
        if (!formData.date.trim()) newErrors.date = 'Tanggal wajib diisi!';
        if (!formData.location.trim()) newErrors.location = 'Lokasi wajib diisi!';
        if (!formData.description.trim()) newErrors.description = 'Deskripsi wajib diisi!';
        
        // Capacity validation: must be a number, positive, and not empty
        if (!formData.capacity.trim() || isNaN(formData.capacity) || parseInt(formData.capacity) <= 0) {
            newErrors.capacity = 'Kapasitas harus angka positif!';
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const newEvent = {
            title: formData.title,
            date: formData.date,
            location: formData.location,
            description: formData.description,
            capacity: parseInt(formData.capacity),
            // registered will be 0 by default when added to eventsData in Event.jsx
        };
        onAddEvent(newEvent);
        onClose(); // Close the form
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 50 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 20, stiffness: 300 } },
        exit: { opacity: 0, scale: 0.8, y: -50, transition: { duration: 0.3 } }
    };

    // Note: The inputVariants for Framer Motion animation might be less crucial if
    // your CSS handles :focus and .evt-input-error styles effectively.
    // If you want more direct Framer Motion control for dynamic styles,
    // you'd typically manage inline styles or className dynamically based on state.
    // For now, I'm removing direct `variants` on inputs as CSS handles it.
    // The `onFocus` and `onBlur` listeners are also removed as the CSS `:focus` pseudo-class
    // handles the styling for focused inputs.
    
    return (
        <motion.div
            className="evt-modal-overlay" // Changed
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="evt-modal-card add-event-card" // Changed
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
                <h3 className="evt-modal-title">Tambah Kegiatan Baru</h3> 
                <form onSubmit={handleSubmit}>
                    <div className="evt-form-group"> 
                        <label htmlFor="title" className="evt-form-label">Judul Kegiatan</label> 
                        <input // motion.input changed to input
                            type="text"
                            id="title"
                            name="title"
                            className={`evt-form-input ${errors.title ? 'evt-input-error' : ''}`} 
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Contoh: Penanaman Pohon Bakau"
                            // Removed onFocus, onBlur, variants, animate as CSS handles focus/error state
                        />
                        {errors.title && <p className="evt-error-message">{errors.title}</p>} 
                    </div>
                    <div className="evt-form-group"> 
                        <label htmlFor="date" className="evt-form-label">Tanggal</label> 
                        <input // motion.input changed to input
                            type="date"
                            id="date"
                            name="date"
                            className={`evt-form-input ${errors.date ? 'evt-input-error' : ''}`} 
                            value={formData.date}
                            onChange={handleChange}
                            // Removed onFocus, onBlur, variants, animate
                        />
                        {errors.date && <p className="evt-error-message">{errors.date}</p>} 
                    </div>
                    <div className="evt-form-group"> 
                        <label htmlFor="location" className="evt-form-label">Lokasi</label> 
                        <input // motion.input changed to input
                            type="text"
                            id="location"
                            name="location"
                            className={`evt-form-input ${errors.location ? 'evt-input-error' : ''}`} 
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Contoh: Pantai Muara Stabat"
                            // Removed onFocus, onBlur, variants, animate
                        />
                        {errors.location && <p className="evt-error-message">{errors.location}</p>} 
                    </div>
                    <div className="evt-form-group"> 
                        <label htmlFor="description" className="evt-form-label">Deskripsi</label> 
                        <textarea // motion.textarea changed to textarea
                            id="description"
                            name="description"
                            className={`evt-form-input ${errors.description ? 'evt-input-error' : ''}`} 
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Jelaskan secara singkat kegiatan yang akan dilakukan..."
                            rows="3"
                            // Removed onFocus, onBlur, variants, animate
                        ></textarea>
                        {errors.description && <p className="evt-error-message">{errors.description}</p>} 
                    </div>
                    <div className="evt-form-group"> 
                        <label htmlFor="capacity" className="evt-form-label">Kapasitas Peserta</label> 
                        <input // motion.input changed to input
                            type="number"
                            id="capacity"
                            name="capacity"
                            className={`evt-form-input ${errors.capacity ? 'evt-input-error' : ''}`} 
                            value={formData.capacity}
                            onChange={handleChange}
                            placeholder="Jumlah peserta maksimal"
                            min="1"
                            // Removed onFocus, onBlur, variants, animate
                        />
                        {errors.capacity && <p className="evt-error-message">{errors.capacity}</p>} 
                    </div>
                    <div className="evt-button-group"> 
                        <motion.button
                            type="button"
                            className="evt-cancel-button" // Changed
                            onClick={onClose}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <FaBan className="evt-btn-icon" /> Batal 
                        </motion.button>
                        <motion.button
                            type="submit"
                            className="evt-submit-button" // Changed
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <FaSave className="evt-btn-icon" /> Selesai 
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default AddEventForm;