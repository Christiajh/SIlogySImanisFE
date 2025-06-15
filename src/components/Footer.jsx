import { Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { FaEnvelope, FaGithub, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';
import '../styles/footer.css';

const LogoUsers = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="footer-svg-logo">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
  </svg>
);

const LogoHandRaised = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="footer-svg-logo">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002" />
  </svg>
);

const LogoChatBubble = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="footer-svg-logo">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
  </svg>
);

const LogoHandshake = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="footer-svg-logo">
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
);

const LogoLeaf = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="footer-svg-logo">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
  </svg>
);

const LogoHeart = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="footer-svg-logo">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>
);

const logos = [LogoUsers, LogoHandRaised, LogoChatBubble, LogoHandshake, LogoLeaf, LogoHeart];

export default function AppFooter() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('down');

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
      lastScrollY = currentScrollY;

      if (currentScrollY > 100) setIsVisible(true);
      else setIsVisible(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className="app-footer-section">
      <Container className="app-footer-container">
        {/* Left Group */}
        <div className={`app-footer-left-group ${isVisible ? (scrollDirection === 'down' ? 'slide-in-left' : 'slide-out-left') : ''}`}>
          <div className="app-footer-column">
            <h5 className="app-footer-title">Tentang WargaBantuin</h5>
            <p className="app-footer-text">
              WargaBantuin adalah platform digital yang membantu warga dan komunitas sekitar
              untuk berinteraksi, berkomunikasi, serta menyampaikan kebutuhan dan aspirasi mereka.
              Solusi kami bertujuan meningkatkan kualitas hidup masyarakat dan memperkuat peran komunitas lokal.
            </p>
          </div>

          <div className="app-footer-column">
            <h5 className="app-footer-title">Navigasi Cepat</h5>
            <ul className="app-footer-list">
              <li><a href="/forum" className="app-footer-link">Forum Diskusi</a></li>
              <li><a href="/peta-lokasi" className="app-footer-link">Peta Lokasi Hijau</a></li>
              <li><a href="/komunitas" className="app-footer-link">Event Komunitas</a></li>
              <li><a href="/event" className="app-footer-link">Event Tanam Pohon</a></li>
            </ul>
          </div>
        </div>

        {/* Logo Slider */}
        <div className="app-footer-logo-slider" aria-label="Community Icon Slider">
          <div className="app-slider-track">
            {[...logos, ...logos].map((LogoComp, i) => (
              <div key={i} className="app-slider-logo-item" tabIndex={0} aria-label="Community icon">
                <LogoComp />
              </div>
            ))}
          </div>
        </div>

        {/* Right Group */}
        <div className={`app-footer-right-group ${isVisible ? (scrollDirection === 'down' ? 'slide-in-right' : 'slide-out-right') : ''}`}>
          <div className="app-footer-column">
            <h5 className="app-footer-title">Kontak</h5>
            <ul className="app-footer-list">
              <li>
                <a href="mailto:chutahaean372@gmail.com" className="app-footer-link">
                  <FaEnvelope className="app-footer-icon" /> Email: chutahaean372@gmail.com
                </a>
              </li>
              <li>
                <a href="https://github.com/Elkana05" target="_blank" rel="noreferrer" className="app-footer-link">
                  <FaGithub className="app-footer-icon" /> GitHub: Elkana05
                </a>
              </li>
            </ul>
          </div>

          <div className="app-footer-column">
            <h5 className="app-footer-title">Sosial Media</h5>
            <ul className="app-footer-list">
              <li><a href="#" className="app-footer-link"><FaInstagram className="app-footer-icon" /> Instagram</a></li>
              <li><a href="#" className="app-footer-link"><FaYoutube className="app-footer-icon" /> YouTube</a></li>
              <li><a href="#" className="app-footer-link"><FaLinkedin className="app-footer-icon" /> LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </Container>

      <hr className="app-footer-divider" />

      <div className="app-footer-copyright">
        © 2025 WargaBantuin Project by <strong>Simanis</strong>
      </div>
    </footer>
  );
}
