import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios'; // ⭐ Hapus ini jika Anda hanya akan menggunakan axiosInstance
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Leaf, Globe, Users, Shield, CheckCircle, AlertCircle } from 'lucide-react';

// ⭐ PENTING: Impor axiosInstance yang sudah dikonfigurasi
import axiosInstance from "../services/axios";

import "../styles/Register.css";

// ⭐ Hapus definisi API_BASE_URL di sini, karena sudah diatur di axiosInstance.js
// const API_BASE_URL = 'https://silogyexpowebsimanis-production.up.railway.app';

const WargaBantuin = () => {
    const navigate = useNavigate();

    // Mengubah nama properti di formData menjadi snake_case sesuai dengan backend
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        daerah: '',
        umur: '',
        pertanyaan_keamanan: '', // Sesuai dengan backend
        jawaban_keamanan: ''     // Sesuai dengan backend
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showProvinsiDropdown, setShowProvinsiDropdown] = useState(false);
    const [error, setError] = useState(null);
    const dropdownRef = useRef(null);

    // State untuk validasi password
    const [passwordErrors, setPasswordErrors] = useState({});

    const provinsiIndonesia = [
        'Aceh', 'Sumatera Utara', 'Sumatera Barat', 'Riau', 'Kepulauan Riau',
        'Jambi', 'Sumatera Selatan', 'Bangka Belitung', 'Bengkulu', 'Lampung',
        'DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'DI Yogyakarta', 'Jawa Timur',
        'Banten', 'Bali', 'Nusa Tenggara Barat', 'Nusa Tenggara Timur',
        'Kalimantan Barat', 'Kalimantan Tengah', 'Kalimantan Selatan',
        'Kalimantan Timur', 'Kalimantan Utara', 'Sulawesi Utara', 'Sulawesi Tengah',
        'Sulawesi Selatan', 'Sulawesi Tenggara', 'Gorontalo', 'Sulawesi Barat',
        'Maluku', 'Maluku Utara', 'Papua', 'Papua Barat'
    ];

    const pertanyaanKeamanan = [
        'Nama hewan peliharaan pertama?',
        'Kota kelahiran?',
        'Makanan favorit masa kecil?',
        'Nama guru favorit Anda di sekolah dasar?',
        'Nama guru favorit?',
    ];

    // Fungsi untuk memvalidasi password berdasarkan kriteria
    const validatePassword = (password) => {
        const errors = {};
        if (password.length < 8) {
            errors.length = true;
        }
        if (!/[A-Z]/.test(password)) {
            errors.uppercase = true;
        }
        if (!/[a-z]/.test(password)) {
            errors.lowercase = true;
        }
        if (!/[0-9]/.test(password)) {
            errors.number = true;
        }
        if (!/[^A-Za-z0-9]/.test(password)) { // Memeriksa karakter simbol
            errors.symbol = true;
        }
        return errors;
    };

    // Handler untuk perubahan input form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value // Nama atribut di JSX akan langsung cocok dengan properti formData
        }));

        if (name === 'password') {
            setPasswordErrors(validatePassword(value));
        }
    };

    // Handler untuk memilih provinsi dari dropdown kustom
    const handleProvinsiSelect = (provinsi) => {
        setFormData(prev => ({
            ...prev,
            daerah: provinsi
        }));
        setShowProvinsiDropdown(false);
    };

    // Effect untuk menutup dropdown provinsi saat klik di luar
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowProvinsiDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Handler untuk submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        // Validasi password sebelum submit
        const currentPasswordErrors = validatePassword(formData.password);
        if (Object.keys(currentPasswordErrors).length > 0) {
            setPasswordErrors(currentPasswordErrors);
            setError('Mohon lengkapi semua persyaratan password.');
            setIsLoading(false);
            return;
        }

        // Validasi semua bidang tidak boleh kosong atau hanya spasi
        if (!formData.username.trim() ||
            !formData.daerah.trim() ||
            !formData.umur ||
            !formData.pertanyaan_keamanan.trim() ||
            !formData.jawaban_keamanan.trim())
        {
            setError('Mohon lengkapi semua bidang.');
            setIsLoading(false);
            return;
        }

        // Pastikan umur adalah angka valid dan dalam rentang yang sesuai
        const parsedUmur = parseInt(formData.umur);
        if (isNaN(parsedUmur) || parsedUmur < 13 || parsedUmur > 100) {
            setError('Umur harus angka antara 13 dan 100.');
            setIsLoading(false);
            return;
        }

        try {
            // ⭐ PERBAIKAN: Menggunakan axiosInstance.post('/register', formData);
            // axiosInstance sudah memiliki baseURL yang benar.
            const response = await axiosInstance.post('/register', formData);

            console.log('Registration successful:', response.data);
            setIsSubmitted(true);

            // Navigasi ke halaman login setelah beberapa saat
            setTimeout(() => {
                navigate('/login');
            }, 1500);

        } catch (err) {
            console.error('Registration failed:', err.response ? err.response.data : err.message);
            setError(err.response?.data?.message || 'Terjadi kesalahan. Silakan coba lagi.');
            setIsSubmitted(false);
        } finally {
            setIsLoading(false);
        }
    };

    // Data langkah-langkah progres
    const steps = [
        { icon: Users, title: "Identitas", desc: "Data pribadi Anda" },
        { icon: Globe, title: "Lokasi", desc: "Daerah tempat tinggal" },
        { icon: Shield, title: "Keamanan", desc: "Pertanyaan keamanan" }
    ];

    return (
        <div className="warga-container">
            {/* Background Elements */}
            <div className="bg-elements">
                <div className="floating-leaf leaf-1"></div>
                <div className="floating-leaf leaf-2"></div>
                <div className="floating-leaf leaf-3"></div>
                <div className="floating-leaf leaf-4"></div>
                <div className="floating-leaf leaf-5"></div>
                <div className="floating-leaf leaf-6"></div>
                <div className="earth-orbit"></div>
                <div className="earth-orbit-2"></div>
            </div>

            {/* Header */}
            <div className="header">
                <div className="logo">
                    <Leaf className="logo-icon" />
                    <span>WargaBantuin</span>
                </div>
                <div className="tagline">
                    <Globe className="tagline-icon" />
                    <span>Bersama Menjaga Bumi Lebih Hijau</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
                <div className="form-container">
                    <div className="form-header">
                        <h1>Bergabung dengan Gerakan Hijau</h1>
                        <p>Daftarkan diri Anda untuk ikut serta dalam misi pelestarian lingkungan dan menciptakan masa depan yang berkelanjutan bagi generasi mendatang.</p>
                    </div>

                    {/* Progress Steps */}
                    <div className="progress-steps">
                        {steps.map((step, index) => (
                            <div key={index} className="step active">
                                <div className="step-icon">
                                    <step.icon size={20} />
                                </div>
                                <div className="step-content">
                                    <div className="step-title">{step.title}</div>
                                    <div className="step-desc">{step.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="register-form">
                        {error && <div className="error-message" style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>{error}</div>}
                        <div className="form-grid">
                            {/* Username */}
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <div className="input-wrapper">
                                    <input
                                        type="text"
                                        id="username"
                                        name="username" // Name sudah benar
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        placeholder="Masukkan username unik Anda"
                                        required
                                        disabled={isLoading}
                                    />
                                    <div className="input-accent"></div>
                                </div>
                            </div>

                            {/* Password */}
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <div className="input-wrapper password-wrapper">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password" // Name sudah benar
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Buat password yang kuat"
                                        required
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                        disabled={isLoading}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                    <div className="input-accent"></div>
                                </div>
                                {/* Password Requirements / Validation Feedback */}
                                {formData.password && (
                                    <div className="password-requirements">
                                        <div className="requirement-item">
                                            {passwordErrors.length ? <AlertCircle size={16} color="red" /> : <CheckCircle size={16} color="green" />}
                                            <span className={passwordErrors.length ? 'invalid' : 'valid'}>Minimal 8 karakter</span>
                                        </div>
                                        <div className="requirement-item">
                                            {passwordErrors.uppercase ? <AlertCircle size={16} color="red" /> : <CheckCircle size={16} color="green" />}
                                            <span className={passwordErrors.uppercase ? 'invalid' : 'valid'}>Huruf besar (A-Z)</span>
                                        </div>
                                        <div className="requirement-item">
                                            {passwordErrors.lowercase ? <AlertCircle size={16} color="red" /> : <CheckCircle size={16} color="green" />}
                                            <span className={passwordErrors.lowercase ? 'invalid' : 'valid'}>Huruf kecil (a-z)</span>
                                        </div>
                                        <div className="requirement-item">
                                            {passwordErrors.number ? <AlertCircle size={16} color="red" /> : <CheckCircle size={16} color="green" />}
                                            <span className={passwordErrors.number ? 'invalid' : 'valid'}>Angka (0-9)</span>
                                        </div>
                                        <div className="requirement-item">
                                            {passwordErrors.symbol ? <AlertCircle size={16} color="red" /> : <CheckCircle size={16} color="green" />}
                                            <span className={passwordErrors.symbol ? 'invalid' : 'valid'}>Simbol (!@#$%)</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Daerah - Custom Dropdown */}
                            <div className="form-group full-width">
                                <label htmlFor="daerah">Daerah</label>
                                <div className="input-wrapper custom-select-wrapper" ref={dropdownRef}>
                                    <div
                                        className="custom-select-display"
                                        onClick={() => setShowProvinsiDropdown(!showProvinsiDropdown)}
                                        role="button"
                                        tabIndex="0"
                                        aria-haspopup="listbox"
                                        aria-expanded={showProvinsiDropdown}
                                        disabled={isLoading}
                                    >
                                        {formData.daerah || "Pilih provinsi tempat tinggal Anda"}
                                    </div>
                                    {showProvinsiDropdown && (
                                        <ul className="custom-select-options">
                                            {provinsiIndonesia.map((provinsi, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => handleProvinsiSelect(provinsi)}
                                                    className={formData.daerah === provinsi ? 'selected' : ''}
                                                >
                                                    {provinsi}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    <div className="input-accent"></div>
                                </div>
                            </div>

                            {/* Umur */}
                            <div className="form-group">
                                <label htmlFor="umur">Umur</label>
                                <div className="input-wrapper">
                                    <input
                                        type="number"
                                        id="umur"
                                        name="umur" // Name sudah benar
                                        value={formData.umur}
                                        onChange={handleInputChange}
                                        placeholder="Usia Anda saat ini"
                                        min="13"
                                        max="100"
                                        required
                                        disabled={isLoading}
                                    />
                                    <div className="input-accent"></div>
                                </div>
                            </div>

                            {/* Pertanyaan Keamanan */}
                            <div className="form-group full-width">
                                <label htmlFor="pertanyaan_keamanan">Pertanyaan Keamanan</label>
                                <div className="input-wrapper">
                                    {/* Name atribut sesuai dengan backend */}
                                    <select
                                        id="pertanyaan_keamanan"
                                        name="pertanyaan_keamanan"
                                        value={formData.pertanyaan_keamanan}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isLoading}
                                    >
                                        <option value="">Pilih pertanyaan keamanan untuk akun Anda</option>
                                        {pertanyaanKeamanan.map((pertanyaan, index) => (
                                            <option key={index} value={pertanyaan}>{pertanyaan}</option>
                                        ))}
                                    </select>
                                    <div className="input-accent"></div>
                                </div>
                            </div>

                            {/* Jawaban Keamanan */}
                            <div className="form-group full-width">
                                <label htmlFor="jawaban_keamanan">Jawaban Pertanyaan Keamanan</label>
                                <div className="input-wrapper">
                                    {/* Name atribut sesuai dengan backend */}
                                    <input
                                        type="text"
                                        id="jawaban_keamanan"
                                        name="jawaban_keamanan"
                                        value={formData.jawaban_keamanan}
                                        onChange={handleInputChange}
                                        placeholder="Masukkan jawaban untuk pertanyaan keamanan"
                                        required
                                        disabled={isLoading}
                                    />
                                    <div className="input-accent"></div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`submit-btn ${isSubmitted ? 'success' : ''} ${isLoading ? 'loading' : ''}`}
                            disabled={isLoading || Object.keys(passwordErrors).length > 0}
                        >
                            {isLoading ? (
                                <>
                                    <div className="spinner"></div>
                                    <span>Mendaftarkan...</span>
                                </>
                            ) : isSubmitted ? (
                                <>
                                    <CheckCircle className="btn-icon" />
                                    <span>Berhasil Terdaftar!</span>
                                </>
                            ) : (
                                <>
                                    <span>Bergabung Sekarang</span>
                                    <Leaf className="btn-icon" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="footer-text">
                        <p>Dengan mendaftar, Anda setuju untuk berkontribusi dalam misi pelestarian lingkungan dan berkomitmen untuk gaya hidup yang ramah terhadap alam. Mari bersama membangun masa depan yang berkelanjutan! 🌱</p>
                    </div>
                </div>

                {/* Side Panel */}
                <div className="side-panel">
                    <div className="mission-card">
                        <div className="mission-icon">
                            <Globe size={40} />
                        </div>
                        <h3>Misi Kami</h3>
                        <p>Menciptakan komunitas digital yang peduli lingkungan dan berkontribusi aktif dalam pelestarian bumi untuk generasi mendatang melalui solusi teknologi berkelanjutan.</p>
                        <div className="mission-features">
                            <div className="feature-item">
                                <Leaf size={16} />
                                <span>Ramah Lingkungan</span>
                            </div>
                            <div className="feature-item">
                                <Users size={16} />
                                <span>Komunitas Peduli</span>
                            </div>
                            <div className="feature-item">
                                <Globe size={16} />
                                <span>Dampak Global</span>
                            </div>
                        </div>
                    </div>

                   <div className="environmental-tips">
           <h4>🔐 Tips Keamanan Akun</h4>
<div className="tip-item">Password telah diacak (hash) agar tetap aman</div>
<div className="tip-item">Ingat username, pertanyaan & jawabannya untuk reset password</div>

</div>

                </div>
            </div>
        </div>
    );
};

export default WargaBantuin;