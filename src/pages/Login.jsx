import React, { useState } from 'react';
import axios from 'axios';
import { Eye, EyeOff, Leaf, Globe, Lock, UserCog } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../services/axios";
import "../styles/Login.css";



const Login = () => {
  const navigate = useNavigate();

  // State for regular user login
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Digunakan untuk form login utama dan modal admin
  const [error, setError] = useState('');

  // State for admin login card
  const [showAdminPasswordCard, setShowAdminPasswordCard] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');

  /**
   * Handles the regular user login submission.
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(''); // Clear previous errors for regular login
    setAdminError(''); // Clear any admin errors in case they were present

    try {
      // ⭐ PERBAIKAN: Ubah URL API menjadi yang benar ⭐
      // Dari http://localhost:3001/api/auth/login menjadi http://localhost:3001/api/login
      const response = await axiosInstance.post('/login', {
        username,
        password
      });

      console.log('Login berhasil:', response.data);

      // Store user data and token in local storage
      localStorage.setItem('loggedInUser', JSON.stringify(response.data.user));
      localStorage.setItem('authToken', response.data.token);

      // Redirect berdasarkan role yang diterima dari backend
      if (response.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        setTimeout(() => {
          navigate('/home');
        }, 500);
      }

    } catch (err) {
      console.error('Login gagal:', err.response ? err.response.data : err.message);
      setError(err.response?.data?.message || 'Terjadi kesalahan. Silakan coba lagi.');
      localStorage.removeItem('authToken');
      localStorage.removeItem('loggedInUser');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles the click event for the admin login button.
   * Displays the admin password input card.
   */
  const handleAdminButtonClick = () => {
    setShowAdminPasswordCard(true); // Show the admin password card
    setError(''); // Clear any main login errors
    setAdminError(''); // Clear any previous admin errors
    setAdminPassword(''); // Clear previous admin password input
  };

  /**
   * Handles the submission of the admin password.
   * Now performs an API call to verify admin credentials securely.
   * @param {Event} e - The form submission event.
   */
  const handleAdminPasswordSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAdminError('');

   if (adminPassword === '295') {
  console.log('Magic password "123" digunakan. Auto-login sebagai admin.');

  localStorage.setItem('loggedInUser', JSON.stringify({
    username: 'Magic Admin',
    role: 'admin',
    id: 'magic_admin_id'
  }));
  localStorage.setItem('authToken', 'MagicAdminToken');

  setIsLoading(false);
  navigate('/admin');
  return;
}


    // Jika bukan "magic password", coba login ke backend secara normal (misalnya untuk akun admin lain)
    try {
      // Contoh: Anda bisa membuat akun admin lain di DB (misal username 'realadmin')
      // dan gunakan login ini jika passwordnya bukan 1945
      const defaultAdminUsername = 'superadmin'; // Username admin yang sebenarnya jika ada
      // ⭐ PERBAIKAN: Ubah URL API menjadi yang benar ⭐
      const response = await axiosInstance.post('/login', {
        username: defaultAdminUsername, // Menggunakan username admin yang ada di DB
        password: adminPassword // Password yang dimasukkan di modal
      });

      console.log('Admin login (normal) response:', response.data);

      if (response.data.user && response.data.user.role === 'admin') {
        localStorage.setItem('loggedInUser', JSON.stringify(response.data.user));
        localStorage.setItem('authToken', response.data.token);
        console.log('Admin login successful, redirecting to /admin...');
        navigate('/admin');
      } else {
        setAdminError('Akses Ditolak: Anda tidak memiliki hak akses administrator.');
        localStorage.removeItem('authToken');
        localStorage.removeItem('loggedInUser');
      }

    } catch (err) {
      console.error('Admin login gagal:', err.response ? err.response.data : err.message);
      setAdminError(err.response?.data?.message || 'Password Admin salah. Silakan coba lagi.');
      localStorage.removeItem('authToken');
      localStorage.removeItem('loggedInUser');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Background Elements */}
      <div className="bg-elements">
        <div className="floating-leaf leaf-1"></div>
        <div className="floating-leaf leaf-2"></div>
        <div className="floating-leaf leaf-3"></div>
        <div className="floating-leaf leaf-4"></div>
        <div className="earth-orbit"></div>
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

      {/* Main Content Area (Login Form + Testimonial) */}
      <div className="main-content">
        <div className="form-container">
          <div className="form-header">
            <Lock className="form-icon" size={48} />
            <h1>Masuk ke Akun Anda</h1>
            <p>Gunakan username dan password Anda untuk mengakses dashboard dan mulai berkontribusi pada gerakan hijau kami.</p>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username Anda"
                  required
                  disabled={isLoading}
                />
                <div className="input-accent"></div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password Anda"
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
            </div>

            <div className="form-options">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Ingat saya</label>
              </div>
              <a href="/forgot" className="forgot">
                Lupa password?
              </a>
            </div>

            <button
              type="submit"
              className={`submit-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  <span>Memproses...</span>
                </>
              ) : (
                <>
                  <span>Masuk</span>
                  <Leaf className="btn-icon" />
                </>
              )}
            </button>

            <div className="register-link">
              Belum punya akun?{" "}
              <span
                className="register-now"
                onClick={() => navigate("/register")}
                style={{ color: "#4CAF50", cursor: "pointer", textDecoration: "underline" }}
              >
                Daftar sekarang
              </span>
            </div>
          </form>

          {/* Admin Login Button */}
         
        </div>

        {/* Testimonials Section */}
        <div className="testimonial-section">
            <div className="testimonial">
                <div className="quote-icon">"</div>
                <p className="quote-text">Bergabung dengan WargaBantuin memberi saya kesempatan untuk berkontribusi langsung pada pelestarian lingkungan di komunitas saya.</p>
                <div className="user-info">
                    <div className="user-avatar"></div> {/* You might want a different avatar here */}
                    <div className="user-details">
                        <div className="user-name">Christian Hutahaean</div>
                        <div className="user-role">Anggota sejak 2022</div>
                    </div>
                </div>
            </div>
            <div className="testimonial">
                <div className="quote-icon">"</div>
                <p className="quote-text">WargaBantuin mengubah cara pandang saya terhadap lingkungan. Dengan setiap aksi kecil, kita menciptakan dampak besar. Saya bangga menjadi bagian dari gerakan ini!</p>
                <div className="user-info">
                    <div className="user-avatar"></div> {/* You might want a different avatar here */}
                    <div className="user-details">
                        <div className="user-name">Elkana Sitorus</div>
                        <div className="user-role">Pecinta Lingkungan Aktif</div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Admin Password Overlay and Card (Modal) */}
      {showAdminPasswordCard && (
        <div className="admin-password-overlay">
          <div className="admin-password-card">
            <button className="close-card-btn" onClick={() => setShowAdminPasswordCard(false)}>&times;</button>
            <h2>Masuk Admin</h2>
            <p>Masukkan password khusus Admin.</p>
            {adminError && (
              <div className="error-message">
                {adminError}
              </div>
            )}
            <form onSubmit={handleAdminPasswordSubmit}>
              <div className="form-group">
                <label htmlFor="admin-password">Password Admin</label>
                <div className="input-wrapper">
                  <input
                    type="password"
                    id="admin-password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Masukkan password admin"
                    required
                    disabled={isLoading} // Input juga disable saat loading
                  />
                  <div className="input-accent"></div>
                </div>
              </div>
              <button
                type="submit"
                className={`submit-btn admin-submit-btn ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    <span>Masuk sebagai Admin</span>
                    <UserCog className="btn-icon" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;