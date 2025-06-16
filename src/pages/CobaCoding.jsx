import React, { useEffect, useState } from 'react';
import '../styles/CobaCoding.css';

const CobaCoding = () => {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Smooth scroll animation for cards
    const storyCards = document.querySelectorAll('.eko-story-card');
    const storyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          storyObserver.unobserve(entry.target); // stop observing after animation
        }
      });
    }, { threshold: 0.1 }); // Adjust threshold as needed for when the animation triggers

    storyCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'all 0.6s ease';
      storyObserver.observe(card);
    });

    // Counter animation for stats
    function animateValue(element, start, end, duration) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        // Add plus sign if original text had a plus
        element.innerHTML = value + (element.dataset.hasPlus === 'true' ? '+' : '');
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }

    const ekoStatsSection = document.querySelector('.eko-stats-section');
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statNumbers = document.querySelectorAll('.eko-stat-number');
          statNumbers.forEach(stat => {
            // Mark if original text had a plus, so animateValue knows
            stat.dataset.hasPlus = stat.textContent.includes('+') ? 'true' : 'false';
            const value = parseInt(stat.textContent.replace(/\D/g, ''), 10);
            animateValue(stat, 0, isNaN(value) ? 0 : value, 2000);
          });
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 }); // Adjust threshold for when stats animation triggers

    if (ekoStatsSection) statsObserver.observe(ekoStatsSection);

    // Clean up observers on component unmount
    return () => {
      storyObserver.disconnect();
      statsObserver.disconnect();
    };
  }, []);

  const handleInfoClick = () => {
    setShowNotification(true);
    // Hide notification after 3 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 3000); // 3 seconds
  };

  return (
    <div className="eko-container">
      <div className="eko-floating-elements">
        <div className="eko-leaf"></div>
        <div className="eko-leaf"></div>
        <div className="eko-leaf"></div>
        <div className="eko-leaf"></div>
      </div>

      <div className="eko-header-section">
        <h1>Cerita Aksi Nyata</h1>
        <p>
          Menjaga Lingkungan & Bumi Lebih Sehat - Kisah inspiratif dari para pejuang
          lingkungan yang menciptakan solusi digital untuk keberlanjutan bumi dan kesadaran
          lingkungan masyarakat
        </p>
        <div className="eko-info-icon" onClick={handleInfoClick}>
          !
        </div>
      </div>

      {showNotification && (
        <div className="eko-info-notification">
          <p>Hubungi Admin jika ingin menambahkan kisah nyata.</p>
        </div>
      )}

      <div className="eko-stories-grid">
        <div className="eko-story-card">
          <div className="eko-story-icon">🌱</div>
          <div className="eko-story-title">EcoTracker - Jejak Karbon Digital</div>
          <div className="eko-story-content">
            Sarah, mahasiswa Teknik Informatika, mengembangkan aplikasi web yang membantu
            individu melacak jejak karbon harian mereka. Platform ini tidak hanya menghitung
            emisi dari aktivitas sehari-hari, tetapi juga memberikan rekomendasi praktis untuk
            mengurangi dampak lingkungan.
          </div>
          <div className="eko-story-impact">
            <div className="eko-impact-title">Dampak Positif:</div>
            <div className="eko-impact-stat">Lebih dari 5,000 pengguna aktif berhasil mengurangi jejak karbon rata-rata 25% dalam 6 bulan pertama penggunaan aplikasi.</div>
          </div>
        </div>

        <div className="eko-story-card">
          <div className="eko-story-icon">♻️</div>
          <div className="eko-story-title">WasteMap - Peta Daur Ulang Cerdas</div>
          <div className="eko-story-content">
            Tim developer dari Bandung menciptakan platform yang memetakan lokasi pusat daur
            ulang terdekat dengan teknologi GPS. Sistem ini juga menampilkan jenis sampah yang
            diterima setiap lokasi dan memberikan poin reward untuk setiap kontribusi daur ulang.
          </div>
          <div className="eko-story-impact">
            <div className="eko-impact-title">Dampak Positif:</div>
            Platform ini telah memfasilitasi daur ulang lebih dari 50 ton sampah dan menghubungkan
            200+ tempat daur ulang di seluruh Indonesia.
          </div>
        </div>

        <div className="eko-story-card">
          <div className="eko-story-icon">💧</div>
          <div className="eko-story-title">AquaGuard - Monitor Kualitas Air</div>
          <div className="eko-story-content">
            Komunitas mahasiswa teknik mengembangkan sistem monitoring kualitas air berbasis IoT
            dengan dashboard web real-time. Sistem ini memberikan peringatan dini tentang pencemaran
            air dan edukasi tentang pentingnya menjaga sumber daya air bersih.
          </div>
          <div className="eko-story-impact">
            <div className="eko-impact-title">Dampak Positif:</div>
            Telah dipasang di 15 desa dan berhasil mendeteksi pencemaran air lebih awal,
            melindungi kesehatan 10,000+ penduduk.
          </div>
        </div>


        <div className="eko-story-card">
  <div className="eko-story-icon">🌱</div>
  <div className="eko-story-title">EcoFertil - Pupuk Organik dari Sampah Pasar</div>
  <div className="eko-story-content">
    Sekelompok pemuda di Surabaya memprakarsai pengolahan limbah organik dari pasar tradisional
    menjadi pupuk cair dan kompos padat. Mereka bekerja sama dengan pedagang dan dinas kebersihan 
    untuk mengurangi sampah sekaligus meningkatkan pertanian organik lokal.
  </div>
  <div className="eko-story-impact">
    <div className="eko-impact-title">Dampak Positif:</div>
    Mengolah 2 ton sampah per hari, mengurangi emisi gas metana dan menghasilkan 500 liter pupuk cair 
    untuk petani lokal setiap bulan.
  </div>
</div>

<div className="eko-story-card">
  <div className="eko-story-icon">🔋</div>
  <div className="eko-story-title">LiteraListrik - Penerangan dari Sampah Plastik</div>
  <div className="eko-story-content">
    Di Nusa Tenggara Timur, guru dan siswa SMA merancang pembangkit listrik sederhana berbasis gasifikasi
    dari sampah plastik rumah tangga. Listrik yang dihasilkan digunakan untuk menyalakan lampu belajar
    malam hari di desa yang belum terjangkau PLN.
  </div>
  <div className="eko-story-impact">
    <div className="eko-impact-title">Dampak Positif:</div>
    Menyediakan penerangan malam untuk 25 rumah dan meningkatkan waktu belajar siswa di desa
    terpencil selama 3 jam per malam.
  </div>
</div>


        <div className="eko-story-card">
          <div className="eko-story-icon">🌳</div>
          <div className="eko-story-title">GreenSpace - Adopsi Pohon Virtual</div>
          <div className="eko-story-content">
            Platform inovatif yang memungkinkan masyarakat untuk "mengadopsi" pohon secara digital,
            memantau pertumbuhannya melalui kamera IoT, dan berkontribusi pada program penanaman
            pohon massal. Setiap adopsi disertai dengan sertifikat digital NFT yang ramah lingkungan.
          </div>
          <div className="eko-story-impact">
            <div className="eko-impact-title">Dampak Positif:</div>
            Lebih dari 25,000 pohon telah diadopsi dan ditanam, menyerap sekitar 375 ton CO2 per tahun.
          </div>
        </div>
      </div>

      <div className="eko-stats-section">
        <h2 style={{ marginBottom: '1rem', color: '#4CAF50' }}>Dampak Kolektif Aksi Nyata</h2>
        <p style={{ opacity: 0.9, marginBottom: '2rem' }}>
          Pencapaian luar biasa dari para innovator lingkungan digital
        </p>

        <div className="eko-stats-grid">
          <div className="eko-stat-item">
            <span className="eko-stat-number">0</span>
            <div className="eko-stat-label">Project Lingkungan Digital</div>
          </div>
          <div className="eko-stat-item">
            <span className="eko-stat-number">0</span>
            <div className="eko-stat-label">Pengguna Aktif</div>
          </div>
          <div className="eko-stat-item">
            <span className="eko-stat-number">0</span>
            <div className="eko-stat-label">Ton CO2 Berkurang</div>
          </div>
          <div className="eko-stat-item">
            <span className="eko-stat-number">0</span>
            <div className="eko-stat-label">Pohon Ditanam</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CobaCoding;