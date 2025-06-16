// frontend/src/pages/AdminPage.jsx

import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../services/axios'; // axiosInstance should handle base URL and tokens
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChartLine, faUsers, faExclamationTriangle, faCalendarAlt,
    faSignOutAlt, faPlusCircle, faEdit, faTrashAlt, faEye, faSpinner,
    faMapMarkerAlt, faHandshake, faUserTie
} from '@fortawesome/free-solid-svg-icons';

import AdminUserTable from '../components/AdminUserTable';
import '../styles/Admin.css';

const Admin = () => {
    const navigate = useNavigate();
    const [adminInfo, setAdminInfo] = useState(null);
    const [dashboardStats, setDashboardStats] = useState({
        totalUsers: 0,
        totalEvents: 0,
        totalReports: 0,
        totalPartners: 0,
        totalVolunteers: 0,
        totalLocations: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const verifyAndLoadAdminData = useCallback(async () => {
        setLoading(true);
        setError('');

        const token = localStorage.getItem('authToken');
        const userString = localStorage.getItem('loggedInUser');

        if (!token || !userString) {
            console.warn('Tidak ada token atau info pengguna di localStorage. Mengalihkan ke halaman login.');
            navigate('/login', { replace: true });
            return;
        }

        try {
            const user = JSON.parse(userString);

            if (user.role !== 'admin') {
                console.warn(`Pengguna '${user.username}' mencoba mengakses halaman admin tanpa hak akses.`);
                alert('Akses Ditolak: Anda tidak memiliki hak akses administrator.');
                navigate('/home', { replace: true });
                return;
            }
            setAdminInfo(user);

            // ⭐ PERBAIKAN: Gunakan axiosInstance tanpa config manual untuk token ⭐
            // Asumsi axiosInstance sudah memiliki interceptor untuk menambahkan 'x-auth-token'
            const statsRes = await axiosInstance.get("/admin/dashboard-stats");

            setDashboardStats(statsRes.data);

        } catch (err) {
            console.error('Verifikasi atau Pengambilan Data Admin Gagal:', err.response?.data?.msg || err.message);
            localStorage.removeItem('authToken');
            localStorage.removeItem('loggedInUser');
            setError(err.response?.data?.msg || 'Sesi tidak valid atau terjadi kesalahan. Silakan login kembali.');
            navigate('/login', { replace: true });
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        verifyAndLoadAdminData();
    }, [verifyAndLoadAdminData]);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('loggedInUser');
        console.log('Admin berhasil logout.');
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="admin-page-container loading-screen">
                <FontAwesomeIcon icon={faSpinner} spin size="3x" className="loading-spinner" />
                <p>Memuat halaman Admin...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="admin-page-container error-screen">
                <p className="admin-error-message">Error: {error}</p>
                <button onClick={() => navigate('/login')} className="admin-login-redirect-btn">
                    Kembali ke Login
                </button>
            </div>
        );
    }

    return (
        <div className="admin-page-container">
            <header className="admin-header">
                <h1><FontAwesomeIcon icon={faChartLine} /> Dashboard Admin</h1>
                <div className="admin-header-right">
                    {adminInfo && <span className="admin-welcome"> Halo, WargaBantuin Admin!</span>}
                    <button onClick={handleLogout} className="admin-logout-btn">
                        <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                    </button>
                </div>
            </header>

            <main className="admin-content">
                <section className="admin-section welcome-section">
                    <h2>Selamat Datang di Panel Admin</h2>
                    <p>Kelola pengguna, event, laporan, dan statistik sistem Anda di sini dengan mudah.</p>
                </section>

                <section className="admin-section quick-stats-section">
                    <h3><FontAwesomeIcon icon={faChartLine} /> Statistik Cepat</h3>
                    <div className="admin-stats-grid">
                        <div className="stat-card">
                            <FontAwesomeIcon icon={faUsers} className="icon-card icon-card-users" />
                            <h4>Total Pengguna</h4>
                            <p>{dashboardStats.totalUsers}</p>
                        </div>
                        <div className="stat-card">
                            <FontAwesomeIcon icon={faCalendarAlt} className="icon-card icon-card-events" />
                            <h4>Total Event</h4>
                            <p>{dashboardStats.totalEvents}</p>
                        </div>
                        <div className="stat-card">
                            <FontAwesomeIcon icon={faExclamationTriangle} className="icon-card icon-card-reports" />
                            <h4>Total Laporan</h4>
                            <p>{dashboardStats.totalReports}</p>
                        </div>
                        <div className="stat-card">
                            <FontAwesomeIcon icon={faHandshake} className="icon-card icon-card-partners" />
                            <h4>Mitra Bank Sampah</h4>
                            <p>{dashboardStats.totalPartners}</p>
                        </div>
                        <div className="stat-card">
                            <FontAwesomeIcon icon={faUserTie} className="icon-card icon-card-volunteers" />
                            <h4>Relawan Terdaftar</h4>
                            <p>{dashboardStats.totalVolunteers}</p>
                        </div>
                        <div className="stat-card">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="icon-card icon-card-locations" />
                            <h4>Lokasi Terdaftar</h4>
                            <p>{dashboardStats.totalLocations}</p>
                        </div>
                    </div>
                </section>

                <section className="admin-section user-management-section">
                    <h2><FontAwesomeIcon icon={faUsers} /> Manajemen Pengguna</h2>
                    {/* AdminUserTable should also use axiosInstance and not rely on props for API URL/token */}
                    <AdminUserTable />
                </section>

                <section className="admin-section event-management-section">
                    <h2><FontAwesomeIcon icon={faCalendarAlt} /> Manajemen Event</h2>
                    <div className="admin-actions">
                        <button className="action-btn add-btn" onClick={() => alert('Fungsi Tambah Event akan datang!')}>
                            <FontAwesomeIcon icon={faPlusCircle} /> Tambah Event
                        </button>
                        <button className="action-btn manage-btn" onClick={() => alert('Fungsi Kelola Event akan datang!')}>
                            <FontAwesomeIcon icon={faEdit} /> Kelola Event
                        </button>
                        <button className="action-btn delete-btn" onClick={() => alert('Fungsi Hapus Event akan datang!')}>
                            <FontAwesomeIcon icon={faTrashAlt} /> Hapus Event
                        </button>
                    </div>
                </section>

                <section className="admin-section report-management-section">
                    <h2><FontAwesomeIcon icon={faEye} /> Verifikasi Laporan</h2>
                    <p>Tinjau dan tindak lanjuti laporan dari pengguna untuk menjaga kualitas data dan integritas sistem.</p>
                    <button className="action-btn view-reports-btn" onClick={() => alert('Fungsi Lihat Laporan akan datang!')}>
                        <FontAwesomeIcon icon={faEye} /> Lihat Semua Laporan
                    </button>
                </section>
            </main>

            <footer className="admin-footer">
                <p>&copy; {new Date().getFullYear()} WargaBantuin Admin. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Admin;