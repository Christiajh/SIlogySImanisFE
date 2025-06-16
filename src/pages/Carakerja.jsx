import React, { useEffect } from 'react';
import '../styles/Carakerja.css'; // Pastikan path ini benar

const CaraKerjaPlatform = () => {
  useEffect(() => {
    // Remove the IntersectionObserver for number animation as 'Dampak Real-Time' is removed
    // const observerOptions = {
    //   threshold: 0.5,
    //   rootMargin: '0px 0px -100px 0px'
    // };

    // const observer = new IntersectionObserver((entries) => {
    //   entries.forEach(entry => {
    //     if (entry.isIntersecting) {
    //       const metrics = entry.target.querySelectorAll('.impact-count');
    //       metrics.forEach(metric => {
    //         const target = parseInt(metric.dataset.target);
    //         animateNumber(metric, 0, target, 1500);
    //       });
    //     }
    //   });
    // }, observerOptions);

    // const metricsSection = document.querySelector('.platform-impact-overview');
    // if (metricsSection) observer.observe(metricsSection);

    // function animateNumber(element, start, end, duration) {
    //   const range = end - start;
    //   const increment = range / (duration / 16);
    //   let current = start;

    //   const timer = setInterval(() => {
    //     current += increment;
    //     if (current >= end) {
    //       current = end;
    //       clearInterval(timer);
    //     }
    //     element.textContent = Math.floor(current).toLocaleString();
    //   }, 16);
    // }

    const handleScroll = () => {
      const elements = document.querySelectorAll('.feature-highlight-card, .process-journey-step, .environmental-vision-card'); // Add new card class
      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    // Initialize elements to be hidden for animation
    document.querySelectorAll('.feature-highlight-card, .process-journey-step, .environmental-vision-card').forEach(element => { // Add new card class
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'all 0.6s ease';
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      // if (metricsSection) observer.unobserve(metricsSection); // Unobserve if it was observed
    };
  }, []);

  const showStepDetails = (stepNumber) => {
    const details = {
      1: "Akses halaman register atau login. Anda dapat membuat akun baru dengan mengisi nama, email, dan password. Password akan di-hash secara otomatis menggunakan bcrypt untuk keamanan. Setelah registrasi, Anda dapat login menggunakan JWT untuk akses yang aman.",
      2: "Laporkan kerusakan lingkungan dengan mudah. Klik tombol “Laporkan Kerusakan”, lalu isi form yang tersedia termasuk nama pelapor, lokasi kejadian (manual teks), jenis kerusakan (misal: polusi sungai, sampah), deskripsi singkat, dan tanggal kejadian. Data akan tersimpan ke database PostgreSQL dengan status 'Menunggu validasi admin'.",
      3: "Tambahkan lokasi hijau baru ke platform. Isi form dengan nama lokasi hijau, deskripsi, dan koordinat yang diambil otomatis melalui Geolocation API. Lokasi akan muncul di peta interaktif (Leaflet.js) setelah divalidasi oleh admin.",
      4: "Jelajahi peta interaktif untuk melihat semua lokasi hijau yang telah diverifikasi oleh admin. Peta ini menampilkan titik-titik lokasi dan informasi terkait aksi hijau yang telah dilakukan atau yang bisa Anda ikuti."
    };

    alert(details[stepNumber]);
  };

  const playVideo = () => {
    alert("Video tutorial akan segera tersedia. Sementara ini, Anda bisa mengeksplorasi platform melalui demo interaktif!");
  };

  const startJourney = () => {
    alert("Terima kasih! Anda akan diarahkan ke halaman registrasi untuk memulai perjalanan hijau bersama WargaBantuin.");
  };

  return (
    <div className="main-content-wrapper">
      <div className="hero-banner-section">
        <h1 className="main-heading-title">Cara Kerja Platform</h1>
        <p className="hero-sub-text">Memahami Alur Sistem WargaBantuin untuk Dampak Lingkungan yang Maksimal</p>
      </div>

      <div className="platform-workflow-area">
        <h2 className="content-section-title">Alur Kerja Pengguna Umum (Warga)</h2>
        <div className="process-journey-flow">
          <div className="process-journey-step" data-step="1" onClick={() => showStepDetails("1")}>
            <div className="step-icon-container">
              <span className="step-order-indicator">1</span>
              🎯
            </div>
            <h3 className="step-card-title">Registrasi </h3>
            <p className="step-card-description">Mulai dengan membuat akun atau login untuk akses penuh ke fitur platform.</p>
          </div>

          <div className="process-flow-arrow">→</div>

          <div className="process-journey-step" data-step="2" onClick={() => showStepDetails("2")}>
            <div className="step-icon-container">
              <span className="step-order-indicator">2</span>
              📄
            </div>
            <h3 className="step-card-title">Pelaporan Kerusakan Lingkungan</h3>
            <p className="step-card-description">Laporkan insiden kerusakan lingkungan dengan detail lokasi dan jenisnya.</p>
          </div>

          <div className="process-flow-arrow">→</div>

          <div className="process-journey-step" data-step="3" onClick={() => showStepDetails("3")}>
            <div className="step-icon-container">
              <span className="step-order-indicator">3</span>
              📍
            </div>
            <h3 className="step-card-title">Tambah Lokasi Hijau</h3>
            <p className="step-card-description">Sumbangkan informasi lokasi untuk aksi lingkungan yang positif.</p>
          </div>

          <div className="process-flow-arrow">→</div>

          <div className="process-journey-step" data-step="4" onClick={() => showStepDetails("4")}>
            <div className="step-icon-container">
              <span className="step-order-indicator">4</span>
              🗺️
            </div>
            <h3 className="step-card-title">Lihat Peta Aksi Hijau</h3>
            <p className="step-card-description">Eksplorasi peta interaktif untuk melihat semua lokasi aksi lingkungan.</p>
          </div>
        </div>
      </div>

   <div className="platform-features-grid">
  <div className="feature-highlight-card">
    <div className="feature-card-icon">🌿</div>
    <h3 className="feature-card-title">Aksi Hijau Cerdas</h3>
    <p className="feature-card-description">
      Sistem cerdas yang merekomendasikan aksi lingkungan sesuai minat dan lokasi pengguna. Membantu masyarakat berkontribusi secara langsung pada pelestarian alam di sekitar mereka.
    </p>
  </div>

  <div className="feature-highlight-card">
    <div className="feature-card-icon">📊</div>
    <h3 className="feature-card-title">Pelacakan Dampak Lingkungan</h3>
    <p className="feature-card-description">
      Teknologi transparan untuk mencatat setiap langkah aksi lingkungan. Memberikan laporan real-time terhadap kontribusi pengguna dalam mengurangi emisi dan menjaga ekosistem.
    </p>
  </div>

  <div className="feature-highlight-card">
    <div className="feature-card-icon">🌳</div>
    <h3 className="feature-card-title">Event Tanam Pohon</h3>
    <p className="feature-card-description">
      Pengguna diajak berpartisipasi dalam kegiatan tanam pohon yang terorganisir secara digital. Setiap pohon yang ditanam akan tercatat, dipantau pertumbuhannya, dan menjadi bagian dari aksi kolektif menjaga bumi lebih hijau.
    </p>
  </div>
</div>


    <div className="video-demonstration-section">
  <h2 className="content-section-title text-color-white">Lihat Platform Beraksi</h2>
  <p className="video-intro-paragraph text-color-white">
    Video panduan lengkap tentang cara menggunakan setiap fitur platform WargaBantuin
  </p>
  <a
    href="https://youtu.be/6P6mpus4tws"
    target="_blank"
    rel="noopener noreferrer"
    className="video-player-frame"
  >
    <div className="video-play-button">▶</div>
    <h3 className="video-frame-title">Tutorial Interaktif Platform</h3>
    <p className="video-frame-duration">Durasi: 12 menit 13 detik</p>
  </a>
</div>


      {/* New section: Menjaga Lingkungan & Bumi Lebih Sehat */}
      <div className="environmental-vision-section">
        <h2 className="content-section-title">Menjaga Lingkungan & Bumi Lebih Sehat</h2>
        <p className="vision-intro-paragraph">WargaBantuin hadir sebagai solusi digital yang berkontribusi pada keberlanjutan bumi dan kesadaran lingkungan masyarakat.</p>
        <div className="environmental-vision-grid">
          <div className="environmental-vision-card">
            <div className="vision-card-icon">🌍</div>
            <h3 className="vision-card-title">Meningkatkan Kesadaran</h3>
            <p className="vision-card-description">Mengedukasi masyarakat tentang pentingnya menjaga lingkungan melalui berbagai program dan informasi.</p>
          </div>
          <div className="environmental-vision-card">
            <div className="vision-card-icon">🤝</div>
            <h3 className="vision-card-title">Mendorong Partisipasi Aktif</h3>
            <p className="vision-card-description">Memfasilitasi partisipasi langsung dalam aksi nyata pelestarian lingkungan.</p>
          </div>
          <div className="environmental-vision-card">
            <div className="vision-card-icon">💡</div>
            <h3 className="vision-card-title">Inovasi Solusi Digital</h3>
            <p className="vision-card-description">Mengembangkan fitur-fitur inovatif untuk mempermudah dan memperluas jangkauan gerakan hijau.</p>
          </div>
        </div>
      </div>

      <div className="main-call-to-action-area">
        <h2 className="cta-main-headline">Siap Memulai Perjalanan Hijau?</h2>
        <p className="cta-support-text">Bergabunglah dengan ribuan warga yang telah merasakan dampak positif</p>
        <button className="cta-action-button" onClick={startJourney}>Mulai Sekarang</button>
      </div>
    </div>
  );
};

export default CaraKerjaPlatform;