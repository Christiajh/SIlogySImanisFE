// frontend/src/App.js

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';

// --- Pastikan SEMUA KOMPONEN DIBAWAH INI TERIMPOR DENGAN BENAR ---
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

import Home from './pages/Home.jsx';
import CobaCoding from './pages/CobaCoding.jsx';
import VirtualTour from './pages/VirtualTour.jsx';
import MuseumHistory from './pages/MuseumHistory.jsx';
import Carakerja from './pages/Carakerja.jsx';
import OurTeam from './pages/OurTeam.jsx';
import PetaLokasi from './pages/PetaLokasi.jsx';
import Hubungi from './pages/Hubungi.jsx';
import Faq from './pages/Faq.jsx';
import Tips from './pages/Tips.jsx';
import Video from './pages/Video.jsx';
import Event from './pages/Event.jsx';
import Relawan from './pages/Relawan.jsx';
import BankSampah from './pages/BankSampah.jsx';
import Warga from './pages/Warga.jsx';
import Hijau from './pages/Hijau.jsx';
import Forum from './pages/Forum.jsx';
import Tipk from './pages/Tipk.jsx';
import Login from './pages/Login.jsx';
import Forgot from './pages/Forgot.jsx';
import Register from './pages/Register.jsx';
import Komunitas from './pages/Komunitas.jsx';
import Laporan from './pages/Laporan.jsx';
import Admin from './pages/Admin.jsx'; // Make sure Admin is imported
import AddEventForm from './components/AddEventForm.jsx';
import DeleteEventForm from './components/DeleteEventForm.jsx';
import MapComponent from './components/MapComponent.jsx';
// --- AKHIR DARI IMPORT ---

function LayoutWrapper() {
  const location = useLocation();

  // Sembunyikan navbar/footer di halaman login, register, forgot, dan ADMIN
  // Perbaikan di sini: 'admin' menjadi '/admin' agar sesuai dengan pathname
  const hideLayout = location.pathname === '/login' ||
                     location.pathname === '/register' ||
                     location.pathname === '/forgot' ||
                     location.pathname === '/admin'; // Corrected path for Admin

  return (
    <>
      {/* Conditionally render Navbar */}
      {!hideLayout && <Navbar />}

      <Routes>
        {/* Rute utama (root) akan otomatis mengarahkan ke halaman Login. */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Rute eksplisit untuk Login */}
        <Route path="/login" element={<Login />} />

        {/* Rute eksplisit untuk Register */}
        <Route path="/register" element={<Register />} />

        {/* Rute untuk halaman Home */}
        <Route path="/home" element={<Home />} />

        {/* --- RUTE-RUTE LAIN YANG SUDAH ADA, PASTIKAN TIDAK ADA YANG DIHAPUS --- */}
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/coba-coding" element={<CobaCoding />} />
        <Route path="/virtual-tour" element={<VirtualTour />} />
        <Route path="/museum-history" element={<MuseumHistory />} />
        <Route path="/cara-kerja" element={<Carakerja />} />
        <Route path="/peta-lokasi" element={<PetaLokasi />} />
        <Route path="/tentang" element={<OurTeam />} />
        <Route path="/admin" element={<Admin />} /> {/* Admin route */}
        <Route path="/komunitas" element={<Komunitas />} />
        <Route path="/tipk" element={<Tipk />} />
        <Route path="/our-team" element={<OurTeam />} />
        <Route path="/hubungi" element={<Hubungi />} />
        <Route path="/warga" element={<Warga />} />
        <Route path="/hijau" element={<Hijau />} />
        <Route path="/bank-sampah" element={<BankSampah />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/event" element={<Event />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/tips" element={<Tips />} />
        <Route path="/laporan" element={<Laporan />} />
        <Route path="/video" element={<Video />} />
        <Route path="/relawan" element={<Relawan />} />
        <Route path="/add-event-form" element={<AddEventForm />} />
        <Route path="/delete-event-form" element={<DeleteEventForm />} />
        <Route path="/map-component" element={<MapComponent />} />
      </Routes>

      {/* Conditionally render Footer */}
      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  useEffect(() => {
    // Kosong, tidak ada efek khusus
  }, []);

  return (
    <BrowserRouter>
      <LayoutWrapper />
    </BrowserRouter>
  );
}

export default App;