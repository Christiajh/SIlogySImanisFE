import React from 'react';
import '../styles/VirtualTour.css'; // Pastikan path ini benar

function VirtualTour() {
  return (
    <div className="about-page-container">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-main-title">WargaBantuin</h1>
          <p className="hero-sub-title">Membangun Masa Depan Hijau Bersama-sama</p>
        </div>
      </section>

      {/* Konten Utama - Disini akan ada batasan lebar */}
      <div className="main-content-wrapper"> {/* Wrapper baru untuk konten agar tetap di tengah */}
        <div className="main-content-grid">
          <div className="info-card">
            <div className="card-icon">🌱</div>
            <h2 className="card-title">Latar Belakang</h2>
            <p className="card-text">WargaBantuin lahir dari keprihatinan mendalam terhadap kondisi lingkungan yang semakin memburuk. Platform ini dikembangkan sebagai respons terhadap krisis iklim global dan kebutuhan mendesak akan aksi kolektif dalam melestarikan bumi. Kami percaya bahwa perubahan besar dimulai dari langkah kecil yang dilakukan bersama-sama oleh setiap warga.</p>
          </div>

          <div className="info-card">
            <div className="card-icon">🌍</div>
            <h2 className="card-title">Visi Global</h2>
            <p className="card-text">Menjadi platform digital terdepan yang menghubungkan jutaan orang di seluruh dunia dalam misi bersama menjaga kelestarian lingkungan. Kami membayangkan masa depan di mana setiap individu memiliki akses mudah untuk berkontribusi dalam gerakan hijau, mulai dari aksi lokal hingga dampak global yang berkelanjutan.</p>
          </div>
        </div>

        <div className="history-timeline">
          <h2 className="timeline-heading">Perjalanan Kami</h2>
          <div className="timeline-item">
            <div className="timeline-year-box">2025</div>
            <div className="timeline-description">
              <h3>Konsep Awal</h3>
              <p>Ide WargaBantuin muncul dari diskusi para aktivis lingkungan tentang perlunya platform yang dapat menyatukan berbagai gerakan hijau dalam satu ekosistem digital.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-year-box">2025</div>
            <div className="timeline-description">
              <h3>Pengembangan Platform</h3>
              <p>Tim multidisiplin mulai membangun arsitektur platform dengan fokus pada user experience yang intuitif dan fitur-fitur inovatif untuk mendukung aksi lingkungan.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-year-box">2025</div>
            <div className="timeline-description">
              <h3>Peluncuran & Ekspansi</h3>
              <p>WargaBantuin resmi diluncurkan dengan berbagai fitur unggulan dan mulai memperluas jangkauan ke berbagai komunitas lingkungan di seluruh Indonesia.</p>
            </div>
          </div>
        </div>

        <div className="info-card">
          <div className="card-icon">🤝</div>
          <h2 className="card-title">Mengapa WargaBantuin?</h2>
          <p className="card-text">Berbeda dengan platform lingkungan lainnya, WargaBantuin berfokus pada pendekatan community-driven yang mengintegrasikan teknologi modern dengan kearifan lokal. Kami tidak hanya menyediakan informasi, tetapi juga memfasilitasi aksi nyata melalui sistem gamifikasi, reward berkelanjutan, dan jejaring komunitas yang kuat. Platform ini dirancang khusus untuk generasi digital yang peduli lingkungan namun membutuhkan cara yang praktis dan menyenangkan untuk berkontribusi.</p>
        </div>

        <div className="impact-stats-section">
          <h2 className="stats-heading">Dampak Bersama</h2>
          <p className="stats-subheading">Bergabunglah dengan ribuan warga yang telah berkontribusi</p>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">0+</span>
              <span className="stat-label">Pengguna Aktif</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">0K</span>
              <span className="stat-label">Proyek Hijau</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">0+</span>
              <span className="stat-label">Kota Terjangkau</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">0K</span>
              <span className="stat-label">Pohon Ditanam</span>
            </div>
          </div>
        </div>

        <div className="call-to-action-section">
          <h2 className="cta-heading">Bergabunglah Dengan Gerakan Hijau</h2>
          <p className="cta-subheading">Setiap aksi kecil Anda berkontribusi pada perubahan besar untuk bumi</p>
          <button className="cta-button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Mulai Berkontribusi</button>
        </div>
      </div> {/* End main-content-wrapper */}
    </div>
  );
}

export default VirtualTour;