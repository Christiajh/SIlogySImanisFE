// src/pages/TipsKomunitasHijau.jsx
import React, { useState } from 'react';
import "../styles/Tips.css";

const TipsKomunitasHijau = () => {
  const [showPosterModal, setShowPosterModal] = useState(false);
  const [showWebsiteModal, setShowWebsiteModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [showInnovateModal, setShowInnovateModal] = useState(false);
  const [showExploreTechModal, setShowExploreTechModal] = useState(false);

  const [activeTab, setActiveTab] = useState('article');

  const togglePosterModal = () => setShowPosterModal(!showPosterModal);
  const toggleWebsiteModal = () => setShowWebsiteModal(!showWebsiteModal);
  const toggleGuideModal = () => setShowGuideModal(!showGuideModal);
  const toggleInnovateModal = () => setShowInnovateModal(!showInnovateModal);
  const toggleExploreTechModal = () => setShowExploreTechModal(!showExploreTechModal);

  return (
    <div className="tips-page-container">
      <div className="tips-header">
        <h1 className="tips-title">Tips Komunitas Hijau</h1>
        <p className="tips-subtitle">Membangun Masa Depan yang Berkelanjutan</p>
      </div>

      <div className="tips-tabs">
        <button 
          className={`tab-button ${activeTab === 'article' ? 'active' : ''}`}
          onClick={() => setActiveTab('article')}
        >
          Artikel
        </button>
        <button 
          className={`tab-button ${activeTab === 'resources' ? 'active' : ''}`}
          onClick={() => setActiveTab('resources')}
        >
          Sumber Daya
        </button>
        <button 
          className={`tab-button ${activeTab === 'technology' ? 'active' : ''}`}
          onClick={() => setActiveTab('technology')}
        >
          Teknologi Hijau
        </button>
      </div>

      <div className="tips-content">
        {activeTab === 'article' && (
          <div className="article-section">
            <div className="article-card">
              <h2 className="article-title">Cara Membentuk Komunitas Lingkungan yang Efektif</h2>
              <div className="article-meta">
                <span className="meta-item"><i className="fas fa-clock meta-icon"></i> 5 min read</span>
                <span className="meta-item"><i className="fas fa-calendar meta-icon"></i> 11 Juni 2025</span>
              </div>
              <div className="article-content">
                <p>Membentuk komunitas lingkungan yang kuat adalah fondasi untuk menciptakan perubahan positif dan berkelanjutan. Ikuti langkah-langkah terstruktur ini untuk memulai inisiatif Anda:</p>
                
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h3>Identifikasi Tujuan & Visi Bersama</h3>
                    <p>Mulailah dengan menentukan masalah lingkungan spesifik yang ingin Anda atasi atau tujuan yang ingin dicapai. Apakah fokusnya pada daur ulang, penghijauan, konservasi air, atau edukasi publik? Visi yang jelas akan menyatukan anggota.</p>
                  </div>
                </div>
                
                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h3>Bangun Jaringan & Rekrut Anggota</h3>
                    <p>Cari individu yang memiliki minat dan semangat yang sama. Manfaatkan media sosial, acara komunitas lokal, atau jaringan pribadi untuk menjaring calon anggota. Gelar pertemuan awal untuk membahas ide dan harapan.</p>
                  </div>
                </div>
                
                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h3>Susun Rencana Aksi Konkret</h3>
                    <p>Setelah tim terbentuk, kembangkan rencana kegiatan yang spesifik, terukur, dapat dicapai, relevan, dan berbatas waktu (SMART). Contohnya, program bersih-bersih lingkungan, workshop daur ulang, kampanye hemat energi, atau penanaman pohon.</p>
                  </div>
                </div>
                
                <div className="step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h3>Jalin Kolaborasi & Kemitraan</h3>
                    <p>Perluas dampak komunitas Anda dengan bekerja sama dengan pemerintah daerah, lembaga pendidikan, bisnis lokal, atau organisasi non-profit lainnya. Kemitraan dapat membuka akses ke sumber daya, pendanaan, dan dukungan yang lebih luas.</p>
                  </div>
                </div>
                
                <div className="step">
                  <div className="step-number">5</div>
                  <div className="step-content">
                    <h3>Pertahankan Momentum & Evaluasi</h3>
                    <p>Selenggarakan pertemuan rutin untuk mengevaluasi kemajuan, merayakan pencapaian, dan mengatasi tantangan. Dokumentasikan setiap aktivitas dan hasilnya untuk menjaga transparansi, menginspirasi, dan menarik anggota baru.</p>
                  </div>
                </div>
              </div>
              <div className="article-footer">
                <div className="tags">
                  <span className="tag">#KomunitasHijau</span>
                  <span className="tag">#LingkunganHidup</span>
                  <span className="tag">#AksiNyata</span>
                  <span className="tag">#Berkelanjutan</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="resources-section">
            <div className="resource-card poster-card">
              <div className="resource-image">
                <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09" alt="Poster Komunitas Hijau" />
              </div>
              <div className="resource-content">
                <h3>Template Poster/Leaflet Komunitas</h3>
                <p>Unduh template profesional untuk mempromosikan kegiatan komunitas lingkungan Anda.</p>
                <button className="download-button" onClick={togglePosterModal}>
                  <i className="fas fa-download"></i> Lihat Template
                </button>
              </div>
            </div>

            <div className="resource-card guide-card">
              <div className="resource-image">
                <img src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735" alt="Panduan Komunitas" />
              </div>
              <div className="resource-content">
                <h3>Panduan Lengkap Komunitas Hijau</h3>
                <p>E-book gratis berisi strategi membangun dan mengelola komunitas lingkungan yang efektif.</p>
                <button className="download-button" onClick={toggleGuideModal}>
                  <i className="fas fa-book-open"></i> Baca Panduan
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'technology' && (
          <div className="technology-section">
            <div className="tech-card">
              <div className="tech-icon">
                <i className="fas fa-globe-americas"></i>
              </div>
              <h3>Solusi Digital untuk Lingkungan</h3>
              <p>Mengajak peserta untuk mengembangkan website yang mendukung upaya pelestarian lingkungan dan gaya hidup yang ramah terhadap alam.</p>
              <button className="tech-button" onClick={toggleWebsiteModal}>
                Pelajari Lebih Lanjut
              </button>
            </div>

            <div className="tech-card">
              <div className="tech-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3>Innovate Technology</h3>
              <p>"Innovate Technology with Creativity, Intelligence, and Knowledge" - Temukan solusi inovatif untuk tantangan lingkungan.</p>
              <button className="tech-button" onClick={toggleInnovateModal}>
                <i className="fas fa-rocket"></i> Mulai Inovasi
              </button>
            </div>

            <div className="tech-card">
              <div className="tech-icon">
                <i className="fas fa-seedling"></i>
              </div>
              <h3>Teknologi Hijau</h3>
              <p>Platform digital yang berkontribusi pada keberlanjutan bumi dan kesadaran lingkungan masyarakat.</p>
              <button className="tech-button" onClick={toggleExploreTechModal}>
                <i className="fas fa-arrow-right"></i> Jelajahi
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Poster Template Modal */}
      {showPosterModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={togglePosterModal}>
              <i className="fas fa-times"></i>
            </button>
            <h2 className="modal-title">Template Poster Komunitas Hijau</h2>
            <div className="modal-body">
              <div className="poster-preview">
                <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09" alt="Poster Template" />
              </div>
              <div className="poster-actions">
                <button className="action-button download-full">
                  <i className="fas fa-file-download"></i> Unduh Versi Lengkap
                </button>
                <button className="action-button customize">
                  <i className="fas fa-edit"></i> Sesuaikan Online
                </button>
                <button className="action-button share">
                  <i className="fas fa-share-square"></i> Bagikan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Website Development Modal */}
      {showWebsiteModal && (
        <div className="modal-overlay">
          <div className="modal-content tech-modal">
            <button className="modal-close" onClick={toggleWebsiteModal}>
              <i className="fas fa-times"></i>
            </button>
            <h2 className="modal-title">Kembangkan Website Lingkungan</h2>
            <div className="modal-body">
              <p className="modal-description">
                Mari bersama-sama membangun platform digital yang mendukung pelestarian lingkungan dan gaya hidup berkelanjutan.
              </p>
              
              <div className="tech-features">
                <div className="feature">
                  <div className="feature-icon">
                    <i className="fas fa-leaf"></i>
                  </div>
                  <h4>Kalkulator Jejak Karbon</h4>
                  <p>Alat interaktif untuk menghitung dan mengurangi jejak karbon pengguna.</p>
                </div>
                
                <div className="feature">
                  <div className="feature-icon">
                    <i className="fas fa-recycle"></i>
                  </div>
                  <h4>Panduan Daur Ulang</h4>
                  <p>Database lengkap tentang cara mendaur ulang berbagai jenis material.</p>
                </div>
                
                <div className="feature">
                  <div className="feature-icon">
                    <i className="fas fa-users"></i>
                  </div>
                  <h4>Komunitas Online</h4>
                  <p>Forum diskusi dan kolaborasi untuk aktivis lingkungan.</p>
                </div>
              </div>
              
              <div className="tech-form">
                <h3>Bergabung dengan Inisiatif Kami</h3>
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Nama Lengkap</label>
                    <input type="text" id="name" placeholder="Nama Anda" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="alamat@email.com" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="skills">Keahlian</label>
                    <select id="skills">
                      <option value="">Pilih keahlian Anda</option>
                      <option value="design">Desain</option>
                      <option value="development">Pengembangan Web</option>
                      <option value="content">Konten</option>
                      <option value="marketing">Pemasaran</option>
                    </select>
                  </div>
                  <button type="submit" className="submit-button">
                    <i className="fas fa-paper-plane"></i> Kirim
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Guide Modal (New) */}
      {showGuideModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={toggleGuideModal}>
              <i className="fas fa-times"></i>
            </button>
            <h2 className="modal-title">Panduan Lengkap Komunitas Hijau</h2>
            <div className="modal-body">
              <p>Ini adalah bagian dari Panduan Lengkap Komunitas Hijau. Anda dapat menemukan informasi mendalam tentang strategi membangun dan mengelola komunitas lingkungan yang efektif, mulai dari perencanaan hingga implementasi dan pemeliharaan.</p>
              <button className="action-button download-full">
                <i className="fas fa-file-download"></i> Unduh E-book (PDF)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Innovate Technology Modal (New) */}
      {showInnovateModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={toggleInnovateModal}>
              <i className="fas fa-times"></i>
            </button>
            <h2 className="modal-title">Mulai Inovasi Teknologi</h2>
            <div className="modal-body">
              <p>Temukan solusi inovatif untuk tantangan lingkungan dengan kreativitas, kecerdasan, dan pengetahuan. Jelajahi proyek-proyek inovasi terbaru atau ajukan ide Anda sendiri untuk masa depan yang lebih hijau.</p>
              <form>
                <div className="form-group">
                  <label htmlFor="inovation-idea">Ide Inovasi Anda</label>
                  <textarea id="inovation-idea" rows="5" placeholder="Jelaskan ide inovasi Anda di sini..."></textarea>
                </div>
                <button type="submit" className="action-button submit">
                  <i className="fas fa-paper-plane"></i> Kirim Ide
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {showExploreTechModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={toggleExploreTechModal}>
              <i className="fas fa-times"></i>
            </button>
            <h2 className="modal-title">Jelajahi Teknologi Hijau</h2>
            <div className="modal-body">
              <p>Temukan platform digital yang berkontribusi pada keberlanjutan bumi dan kesadaran lingkungan masyarakat. Dari aplikasi daur ulang hingga alat monitoring energi, jelajahi bagaimana teknologi dapat mendukung gaya hidup ramah lingkungan.</p>
              <ul>
                <li><strong>Aplikasi Daur Ulang:</strong> Temukan pusat daur ulang terdekat dan panduan pemilahan sampah.</li>
                <li><strong>Platform Energi Terbarukan:</strong> Informasi tentang sumber energi bersih dan tips penghematan energi.</li>
                <li><strong>Sistem Pemantauan Lingkungan:</strong> Data real-time tentang kualitas udara dan air di sekitar Anda.</li>
              </ul>
              <button className="action-button explore-link">
                <i className="fas fa-external-link-alt"></i> Kunjungi Sumber Daya Eksternal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TipsKomunitasHijau;