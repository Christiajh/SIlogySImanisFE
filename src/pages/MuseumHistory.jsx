import React, { useState, useEffect } from 'react';
import '../styles/MuseumHistory.css';

export default function VisiMisiPage() {
  return (
    <div className="vision-mission-page-container">
      <section className="hero-section">
        <div className="hero-content-wrapper">
          <h1>🌱 Visi & Misi</h1>
          <div className="hero-tagline">Menjaga Lingkungan & Bumi Lebih Sehat</div>
          <p>Mengajak peserta untuk mengembangkan solusi digital yang mendukung pelestarian lingkungan, gaya hidup ramah alam, dan kesadaran masyarakat terhadap keberlanjutan bumi.</p>

          <div className="key-pillars-grid">
            <div className="pillar-item">🌍 Edukasi Lingkungan</div>
            <div className="pillar-item">♻️ Inovasi Berkelanjutan</div>
            <div className="pillar-item">🌳 Teknologi Hijau</div>
            <div className="pillar-item">🔋 Energi Terbarukan</div>
          </div>
        </div>
      </section>

      <main className="main-content-area">
        <div className="vision-mission-card">
          <div className="section-header-top">
            <div className="section-title-main">
              <span>🌿</span>
              Visi Kami
              <span>💡</span>
            </div>
            <div className="section-subtitle-description">
              Mewujudkan dunia digital yang turut menjaga keseimbangan ekosistem bumi melalui teknologi yang berkelanjutan dan ramah lingkungan.
            </div>

            <div className="eco-solutions-showcase">
              <div className="solution-card">
                <span className="solution-icon">💧</span>
                <div>Konservasi Air</div>
                <small>Pemanfaatan air secara bijak</small>
              </div>
              <div className="solution-card">
                <span className="solution-icon">🌞</span>
                <div>Energi Surya</div>
                <small>Solusi bebas emisi</small>
              </div>
              <div className="solution-card">
                <span className="solution-icon">🍃</span>
                <div>Pertanian Cerdas</div>
                <small>Teknologi hijau</small>
              </div>
              <div className="solution-card">
                <span className="solution-icon">🚮</span>
                <div>Pengelolaan Sampah</div>
                <small>3R: Reduce, Reuse, Recycle</small>
              </div>
              <div className="solution-card">
                <span className="solution-icon">🏞️</span>
                <div>Pelestarian Alam</div>
                <small>Peran komunitas</small>
              </div>
            </div>
          </div>

          <div className="content-breakdown-grid">
            <div className="content-panel">
              <h3 className="panel-title">
                <span>🎯</span>
                Misi Kami
              </h3>
              <ul className="mission-list">
                <li className="mission-item">
                  <div className="mission-name">Edukasi Digital</div>
                  <div className="mission-description">Menyediakan platform yang menyadarkan pentingnya menjaga lingkungan</div>
                </li>
                <li className="mission-item">
                  <div className="mission-name">Kolaborasi Komunitas</div>
                  <div className="mission-description">Mengajak komunitas untuk ikut serta dalam inovasi teknologi hijau</div>
                </li>
                <li className="mission-item">
                  <div className="mission-name">Solusi Berkelanjutan</div>
                  <div className="mission-description">Mengembangkan aplikasi yang mendukung gaya hidup ramah lingkungan</div>
                </li>
              </ul>
            </div>

            <div className="content-panel">
              <h3 className="panel-title">
                <span>💡</span>
                Fokus Utama
              </h3>
              <ul className="mission-list">
                <li className="mission-item">
                  <div className="mission-name">Sistem Monitoring Lingkungan</div>
                  <div className="mission-description">Pemantauan kualitas udara, air, dan penggunaan energi</div>
                </li>
                <li className="mission-item">
                  <div className="mission-name">Aplikasi Edukasi Hijau</div>
                  <div className="mission-description">Memberikan pengetahuan kepada generasi muda melalui teknologi</div>
                </li>
                <li className="mission-item">
                  <div className="mission-name">Digitalisasi Solusi Ramah Lingkungan</div>
                  <div className="mission-description">Mempermudah akses solusi hijau bagi masyarakat luas</div>
                </li>
              </ul>
            </div>
          </div>

         
           
            
         

          <div className="strategic-timeline-section">
            <h3 className="timeline-section-title">📅 Langkah Strategis</h3>
            <div className="timeline-events-list">
              <div className="timeline-event-item">
                <div className="event-year-badge">2025</div>
                <div className="event-details">
                  <div className="event-title-text">Pencanangan Inisiatif Hijau</div>
                  <div>Fokus teknologi untuk lingkungan</div>
                </div>
              </div>
              <div className="timeline-event-item">
                <div className="event-year-badge">2025</div>
                <div className="event-details">
                  <div className="event-title-text">Kolaborasi Lintas Komunitas</div>
                  <div>Sinergi antar developer & aktivis lingkungan</div>
                </div>
              </div>
              <div className="timeline-event-item">
                <div className="event-year-badge">2025</div>
                <div className="event-details">
                  <div className="event-title-text">Solusi Digital untuk Bumi</div>
                  <div>Website, IoT, dan aplikasi untuk keberlanjutan</div>
                </div>
              </div>
            </div>
          </div>

          <div className="impact-statistics-grid">
            <div className="statistic-card">
              <div className="statistic-number">100%</div>
              <div className="statistic-label">Partisipasi Komunitas Hijau</div>
            </div>
            <div className="statistic-card">
              <div className="statistic-number">1+</div>
              <div className="statistic-label">Aplikasi Edukasi Lingkungan</div>
            </div>
            <div className="statistic-card">
              <div className="statistic-number">1+</div>
              <div className="statistic-label">Inovasi Teknologi Berkelanjutan</div>
            </div>
            <div className="statistic-card">
              <div className="statistic-number">1 Planet</div>
              <div className="statistic-label">Yang Harus Kita Jaga</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}