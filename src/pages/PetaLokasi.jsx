import MapView from "../components/MapView";
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaPlusCircle, FaMapMarkedAlt, FaSpinner, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import "../styles/Map.css";

const PetaLokasi = () => {
  const [form, setForm] = useState({ name: "", description: "", latitude: "", longitude: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);
  const [messageType, setMessageType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      let lat = form.latitude;
      let lon = form.longitude;
      let usedGeocoding = false;

      // Jika latitude atau longitude kosong ATAU diisi tapi formatnya tidak valid (misal user ngisi tapi dihapus lagi via dev tools)
      // Kita tetap lakukan geocoding jika form.name ada.
      if ((!lat || isNaN(parseFloat(lat))) || (!lon || isNaN(parseFloat(lon)))) {
        if (!form.name.trim()) {
            setSubmitMessage("Nama lokasi wajib diisi untuk geocoding otomatis.");
            setMessageType('error');
            setIsSubmitting(false);
            return;
        }

        setSubmitMessage("Mencari koordinat lokasi otomatis...");
        setMessageType('info');

        const geoRes = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(form.name)}&limit=1&addressdetails=1`
        );
        const geoData = await geoRes.json();

        if (!geoData || geoData.length === 0) {
          setSubmitMessage("Lokasi tidak ditemukan. Coba masukkan nama lokasi yang lebih spesifik.");
          setMessageType('error');
          setIsSubmitting(false);
          return;
        }

        lat = geoData[0].lat;
        lon = geoData[0].lon;
        // Update form state with the new lat/lon, so it reflects in the readOnly fields
        setForm(prevForm => ({ ...prevForm, latitude: lat, longitude: lon }));
        usedGeocoding = true;
      }

      setSubmitMessage("Mengirim data lokasi...");
      setMessageType('info');

      await axios.post("/api/locations", {
        name: form.name,
        description: form.description,
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
      });

      setSubmitMessage("Lokasi berhasil ditambahkan!");
      setMessageType('success');
      setForm({ name: "", description: "", latitude: "", longitude: "" }); // Reset form, including lat/lon
    } catch (error) {
      console.error("Error adding location:", error);
      let errorMessage = "Gagal menambahkan lokasi. Silakan coba lagi.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = `Gagal: ${error.response.data.message}`;
      }
      setSubmitMessage(errorMessage);
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
      // Hapus pesan setelah 3 detik jika bukan error
      if (messageType === 'success' || messageType === 'info') {
        setTimeout(() => setSubmitMessage(null), 3000);
      }
    }
  };

  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, delay: 0.3, ease: "easeOut" } },
  };

  const notificationVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
  };

  return (
    <motion.div
      className="peta-lokasi-page-container"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <motion.h1
        className="peta-lokasi-title-main"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <FaMapMarkedAlt className="title-icon" /> Peta Aksi Hijau Kita
      </motion.h1>

      <motion.div
        className="map-view-wrapper"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <MapView />
      </motion.div>

      <motion.section
        className="form-add-location-section"
        initial="hidden"
        animate="visible"
        variants={formVariants}
      >
        <h2 className="form-add-location-title">
          <FaPlusCircle className="form-title-icon" /> Tambah Lokasi Hijau Baru
        </h2>

        {submitMessage && (
          <motion.div
            className={`submit-notification ${messageType}`}
            variants={notificationVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {messageType === 'info' && <FaSpinner className="notification-icon spin" />}
            {messageType === 'success' && <FaCheckCircle className="notification-icon" />}
            {messageType === 'error' && <FaExclamationCircle className="notification-icon" />}
            <span>{submitMessage}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="form-add-location-grid">
          <div className="form-group">
            <label htmlFor="locationName" className="form-label">Nama Lokasi *</label>
            <input
              type="text"
              id="locationName"
              placeholder="Ex: Taman Kota Stabat"
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="input-field"
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">Deskripsi</label>
            <textarea
              id="description"
              placeholder="Ex: Area penanaman pohon buah, tempat berkumpul komunitas."
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="textarea-field"
              rows={3}
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="latitude" className="form-label">Latitude (Otomatis)</label>
            <input
              type="text" // Ubah ke text agar bisa menampilkan nilai yang kosong sebelum geocoding
              id="latitude"
              placeholder="Akan terisi otomatis"
              value={form.latitude}
              // onChange={e => setForm({ ...form, latitude: e.target.value })} // Hapus ini
              className="input-field read-only-field" // Tambah kelas baru
              readOnly // Tambah atribut readOnly
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="longitude" className="form-label">Longitude (Otomatis)</label>
            <input
              type="text" // Ubah ke text
              id="longitude"
              placeholder="Akan terisi otomatis"
              value={form.longitude}
              // onChange={e => setForm({ ...form, longitude: e.target.value })} // Hapus ini
              className="input-field read-only-field" // Tambah kelas baru
              readOnly // Tambah atribut readOnly
              disabled={isSubmitting}
            />
          </div>

          <motion.button
            type="submit"
            className="btn-submit-location"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting || !form.name.trim()}
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="button-icon spin" /> Menambahkan...
              </>
            ) : (
              <>
                <FaPlusCircle className="button-icon" /> Tambah Lokasi
              </>
            )}
          </motion.button>
        </form>
      </motion.section>
    </motion.div>
  );
};

export default PetaLokasi;