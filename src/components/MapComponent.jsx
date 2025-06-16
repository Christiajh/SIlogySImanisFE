import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios'; // axios tidak digunakan langsung di sini, karena data diterima melalui props
import { useNavigate } from 'react-router-dom'; // navigate tidak digunakan di sini
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet'; // Ensure Leaflet library is imported directly
import 'leaflet/dist/leaflet.css'; // Import Leaflet's core CSS
import { FaMapMarkerAlt, FaInfoCircle, FaImage } from 'react-icons/fa';
import { motion } from 'framer-motion'; // AnimatePresence is not used here, so removed it from import

// --- FIX LEAFLET DEFAULT ICON ISSUE ---
// This is a common workaround for Leaflet's default marker icons not loading correctly in some bundlers (like Webpack).
// It's important to use the correct property '_getIconUrl'.
delete L.Icon.Default.prototype._getIconUrl; // Corrected line
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom Icon for damage reports (optional, if you have a custom image)
// Make sure 'icon_pin_kerusakan.png' actually exists in your 'public' folder
// or is correctly handled by your build process if in 'assets'.
// For `create-react-app` or similar, if you place it in `src/assets`, you need to import it.
// If it's in the `public` folder, you can use a direct path like '/icon_pin_kerusakan.png'.
// Let's assume it's in 'public' for simplicity here, or adjust the path if imported.

// If `icon_pin_kerusakan.png` is in `src/assets/`, you'd import it:
// import customPinImage from '../assets/icon_pin_kerusakan.png';
// Then use it like: iconUrl: customPinImage,

const customDamageIcon = new L.Icon({
    iconUrl: '/icon_pin_kerusakan.png', // Assuming it's in the 'public' folder or root
    iconSize: [38, 38], // size of the icon
    iconAnchor: [19, 38], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -40]  // point from which the popup should open relative to the iconAnchor
});

const MapComponent = ({ reports, onMapClick, selectedReport, onReportSelect }) => {
  // Use `useRef` for the map instance
  const mapRef = useRef(null); // Initialize with null

  // MapEvents component to handle map clicks
  const MapEvents = () => {
    useMapEvents({
      click: (e) => {
        if (onMapClick) {
          onMapClick(e.latlng.lat, e.latlng.lng);
        }
      },
    });
    return null;
  };

  // Effect to pan map to selected report
  useEffect(() => {
    if (selectedReport && mapRef.current) {
      // Ensure the map instance is ready before calling its methods
      mapRef.current.setView([selectedReport.latitude, selectedReport.longitude], mapRef.current.getZoom(), {
        animate: true,
        duration: 0.8
      });
    }
  }, [selectedReport]); // Re-run effect when selectedReport changes

  // Use `whenCreated` prop to get the map instance
  // This is better than `useRef` in some cases for Leaflet's `MapContainer`
  const handleMapCreated = (mapInstance) => {
    mapRef.current = mapInstance;
  };

  return (
    <MapContainer
      center={[-3.5882, 98.6750]} // Default center for Stabat, Langkat, North Sumatra
      zoom={13}
      scrollWheelZoom={true}
      whenCreated={handleMapCreated} // Set mapRef.current when map is created
      className="interactive-map"
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapEvents /> {/* Component for map click events */}

      {reports.map((report) => (
        <Marker
          key={report.id}
          position={[report.latitude, report.longitude]}
          icon={customDamageIcon} // Use custom icon for damage reports
          eventHandlers={{
            click: () => onReportSelect(report.id), // Handle marker click
          }}
        >
          <Popup>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="report-popup-content"
            >
              <h4><FaMapMarkerAlt /> Laporan Kerusakan Lingkungan</h4>
              <p><strong>Lokasi:</strong> {report.location}</p>
              <p><strong>Deskripsi:</strong> {report.description}</p>
              {report.photo && (
                <div>
                  <FaImage /> <a href={report.photo} target="_blank" rel="noopener noreferrer">Lihat Foto</a>
                </div>
              )}
              <p className="popup-date">Dilaporkan pada: {report.date}</p>
            </motion.div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
