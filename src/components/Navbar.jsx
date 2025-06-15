// frontend/src/components/Navbar.jsx

import { useState, useEffect } from 'react'; // Import useEffect
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import '../styles/navbar.css'; // This will point to the new CSS file

const menuItems = [
  { name: 'Beranda', submenu: [], path: '/home' },
  {
    name: 'Aksi Hijau',
    path: '/aksi',
    submenu: [
      { name: 'Laporan Lingkungan', path: '/laporan' },
      { name: 'Peta Lokasi Hijau', path: '/peta-lokasi' },
      { name: 'Bank Sampah & Daur Ulang', path: '/bank-sampah' },
      { name: 'Event Tanam Pohon', path: '/event' }
    ]
  },
  {
    name: 'Edukasi',
    path: '/edukasi',
    submenu: [
      { name: 'Tips Hidup Ramah Lingkungan', path: '/tipk' },
      { name: 'Video Edukasi', path: '/video' }
    ]
  },
  {
    name: 'Komunitas',
    path: '/komunitas',
    submenu: [
      { name: 'Relawan Hijau', path: '/relawan' },
      { name: 'Forum Diskusi', path: '/forum' },
      { name: 'Event Komunitas', path: '/komunitas' }
    ]
  },
  {
    name: 'Blog',
    path: '/blog',
    submenu: [
      { name: 'Cerita Aksi Nyata', path: '/coba-coding' },
      { name: 'Tips Komunitas Hijau', path: '/tips' }
    ]
  },
  {
    name: 'Testimoni',
    path: '/testimoni',
    submenu: [
      { name: 'Warga Peduli Lingkungan', path: '/warga' },
      { name: 'Relawan Hijau', path: '/hijau' }
    ]
  }, {
    name: 'Tentang',
    path: '/tentang',
    submenu: [
      { name: 'Tentang WargaBantuin', path: '/virtual-tour' },
      { name: 'Tim Kami', path: '/our-team' },
      { name: 'Visi & Misi', path: '/museum-history' },
      { name: 'Cara Kerja Platform', path: '/cara-kerja' }
    ]
  },
  {
    name: 'Kontak',
    path: '/kontak',
    submenu: [
      { name: 'Hubungi Kami', path: '/hubungi' },
      { name: 'FAQ', path: '/faq' }
    ]
  }
];

export default function WargaBantuinNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showUserCard, setShowUserCard] = useState(false);
  const [userData, setUserData] = useState(null); // State to store user data from localStorage
  const navigate = useNavigate(); // Hook for navigation

  // Use useEffect to load user data from localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setUserData(JSON.parse(storedUser)); // Parse the stored JSON string back to an object
    }
  }, []); // Empty dependency array means this runs once on mount

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleUserIconClick = () => {
    setShowUserCard(!showUserCard); // Toggle the user card visibility
  };

  const handleLogout = () => {
    // Clear user data and token from localStorage
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('authToken'); // Clear the JWT token as well
    setUserData(null); // Clear user data from state
    setShowUserCard(false); // Hide the user card
    navigate('/login'); // Redirect to the login page
  };

  return (
    <nav className="celestial-ribbon">
      <div className="starlight-container">
        {/* Brand link to home page */}
        <Link className="galaxy-brand" to="/home">WargaBantuin</Link>

        <button
          className="nebula-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation"
        >
          {isMenuOpen ? <XMarkIcon className="constellation-icon" /> : <Bars3Icon className="constellation-icon" />}
        </button>

        <div className={`cosmic-menu ${isMenuOpen ? 'menu-unfurled' : ''}`}>
          <ul className="stellar-path">
            {menuItems.map((item, idx) => (
              <li
                key={idx}
                className={`celestial-point ${item.submenu.length > 0 ? 'has-galaxy' : ''} ${activeDropdown === idx ? 'illuminated' : ''}`}
                onClick={() => item.submenu.length > 0 && toggleDropdown(idx)}
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === 'Enter' && item.submenu.length > 0) toggleDropdown(idx);
                }}
              >
                <Link
                  to={item.path}
                  className="cosmic-link"
                  onClick={e => item.submenu.length > 0 && e.preventDefault()}
                >
                  {item.name}
                  {item.submenu.length > 0 && (
                    <span className={`comet-arrow ${activeDropdown === idx ? 'orbit-rotate' : ''}`}>&#9660;</span>
                  )}
                </Link>

                {item.submenu.length > 0 && (
                  <ul className={`galaxy-dropdown ${activeDropdown === idx ? 'show-galaxy' : ''}`}>
                    {item.submenu.map((sub, subIdx) => (
                      <li key={subIdx} className="planet-link">
                        <Link to={sub.path} className="stardust-link">
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}

            <li className="celestial-point voyager-profile">
              <button
                className="user-orb-toggle"
                onClick={handleUserIconClick}
                aria-label="User profile"
              >
                {/* Dynamically show user's profile image or a default icon */}
                {/* Assuming userData might have a profilePicture field from backend */}
                {userData && userData.profilePicture ? (
                  <img src={userData.profilePicture} alt="User Profile" className="constellation-icon-large profile-picture" />
                ) : (
                  <img src="https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-128.png" alt="Default User Icon" className="constellation-icon-large" />
                )}
              </button>

              {showUserCard && (
                <div className="explorer-welcome-card">
                  {userData ? (
                    <>
                      <h3>Selamat datang, {userData.username}!</h3>
                      <p>Daerah: {userData.daerah}</p> {/* Use userData.daerah */}
                      <p>Umur: {userData.umur} tahun</p> {/* Use userData.umur */}
                      <button onClick={handleLogout}>Log out</button>
                    </>
                  ) : (
                    <>
                      <h3>Jejak Pengguna</h3>
                      <p>Anda belum login. Silakan <Link to="/login">Masuk</Link> atau <Link to="/register">Daftar</Link>.</p>
                      <button onClick={() => setShowUserCard(false)}>Tutup</button>
                    </>
                  )}
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}