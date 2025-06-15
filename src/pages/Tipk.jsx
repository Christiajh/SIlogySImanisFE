import React, { useState } from 'react';
import "../styles/Tipk.css";

const TipsKomunitasHijau = () => {
  const [showPosterModal, setShowPosterModal] = useState(false);
  const [showWebsiteModal, setShowWebsiteModal] = useState(false);
  const [showAppListModal, setShowAppListModal] = useState(false); // New state for app list modal
  const [activeTab, setActiveTab] = useState('article');

  // Carbon calculator states
  const [carbonData, setCarbonData] = useState({
    transport: '',
    electricity: '',
    meat: '',
    recycling: ''
  });
  const [carbonResult, setCarbonResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const togglePosterModal = () => setShowPosterModal(prev => !prev);
  const toggleWebsiteModal = () => setShowWebsiteModal(prev => !prev);
  const toggleAppListModal = () => setShowAppListModal(prev => !prev); // New toggle function

  const handleCarbonInputChange = (field, value) => {
    // Validasi input numerik agar hanya angka yang masuk
    const numericValue = value === '' ? '' : Number(value);
    setCarbonData(prev => ({
      ...prev,
      [field]: numericValue
    }));
  };

  const calculateCarbonFootprint = (e) => {
    e.preventDefault(); // Pastikan form tidak refresh halaman
    setIsCalculating(true);

    // Simulate calculation delay
    setTimeout(() => {
      // Pastikan nilai adalah angka; gunakan 0 jika input kosong atau tidak valid
      const transport = parseFloat(carbonData.transport) || 0;
      const electricity = parseFloat(carbonData.electricity) || 0;
      const meat = parseFloat(carbonData.meat) || 0;
      const recycling = parseFloat(carbonData.recycling) || 0;

      // Carbon footprint calculation formulas (simplified)
      // Penjelasan lebih lanjut tentang faktor emisi dapat ditambahkan di UI atau dokumentasi
      const transportCarbon = (transport * 52 * 0.2) / 1000; // km/minggu * minggu/tahun * faktor emisi kg CO2/km / 1000 untuk ton
      const electricityCarbon = (electricity * 12 * 0.5) / 1000; // kWh/bulan * bulan/tahun * faktor emisi kg CO2/kWh / 1000 untuk ton
      const meatCarbon = (meat * 52 * 0.05) / 1000; // porsi/minggu * minggu/tahun * faktor emisi kg CO2/porsi / 1000 untuk ton
      const recyclingReduction = (recycling / 100) * 0.5; // % daur ulang * faktor pengurangan (misal: 0.5 ton CO2/tahun)

      const totalCarbon = Math.max(0, transportCarbon + electricityCarbon + meatCarbon - recyclingReduction);

      // Generate personalized tips based on inputs
      const tips = [];
      if (transport > 50) tips.push("Pertimbangkan menggunakan **transportasi umum** atau **bersepeda** untuk perjalanan pendek.");
      if (electricity > 300) tips.push("Ganti ke **lampu LED** dan **matikan peralatan** saat tidak digunakan.");
      if (meat > 5) tips.push("Coba **kurangi konsumsi daging** menjadi 3-4 porsi per minggu.");
      if (recycling < 50) tips.push("Tingkatkan **daur ulang sampah** hingga minimal 70%.");

      if (tips.length === 0) {
        tips.push("Anda sudah melakukan dengan baik! Pertahankan gaya hidup ramah lingkungan.");
      }

      setCarbonResult({
        total: totalCarbon.toFixed(2),
        breakdown: {
          transport: transportCarbon.toFixed(2),
          electricity: electricityCarbon.toFixed(2),
          meat: meatCarbon.toFixed(2),
          recycling: recyclingReduction.toFixed(2)
        },
        tips: tips,
        status: totalCarbon < 2 ? 'excellent' : totalCarbon < 4 ? 'good' : totalCarbon < 6 ? 'average' : 'high'
      });

      setIsCalculating(false);
    }, 1500); // Penundaan untuk simulasi perhitungan
  };

  const resetCalculator = () => {
    setCarbonData({
      transport: '',
      electricity: '',
      meat: '',
      recycling: ''
    });
    setCarbonResult(null);
  };

  return (
    <div className="green-tips-page-container">
      <div className="green-tips-header">
        <h1 className="green-tips-title">Menjaga Lingkungan & Bumi Lebih Sehat</h1>
        <p className="green-tips-subtitle">Solusi Digital untuk Keberlanjutan Bumi</p>
      </div>

      <div className="green-tips-tabs">
        <button
          className={`green-tab-button ${activeTab === 'article' ? 'active' : ''}`}
          onClick={() => setActiveTab('article')}
          aria-controls="article-panel"
          id="article-tab"
          role="tab"
          aria-selected={activeTab === 'article'}
        >
          Tips Praktis
        </button>
        <button
          className={`green-tab-button ${activeTab === 'resources' ? 'active' : ''}`}
          onClick={() => setActiveTab('resources')}
          aria-controls="resources-panel"
          id="resources-tab"
          role="tab"
          aria-selected={activeTab === 'resources'}
        >
          Sumber Daya
        </button>
        <button
          className={`green-tab-button ${activeTab === 'technology' ? 'active' : ''}`}
          onClick={() => setActiveTab('technology')}
          aria-controls="technology-panel"
          id="technology-tab"
          role="tab"
          aria-selected={activeTab === 'technology'}
        >
          Solusi Digital
        </button>
      </div>

      <div className="green-tips-content">
        {activeTab === 'article' && (
          <div className="green-article-section" id="article-panel" role="tabpanel" aria-labelledby="article-tab">
            <div className="green-article-card">
              <h2 className="green-article-title">Tips Hidup Ramah Lingkungan Sehari-hari</h2>
              <div className="green-article-meta">
                <span className="green-meta-item"><i className="fas fa-clock green-meta-icon" aria-hidden="true"></i> 5 min read</span>
                <span className="green-meta-item"><i className="fas fa-calendar green-meta-icon" aria-hidden="true"></i> 12 Jun 2025</span>
              </div>
              <div className="green-article-content">
                <p>Menerapkan gaya hidup ramah lingkungan tidak harus sulit. Berikut langkah-langkah praktis yang bisa Anda lakukan:</p>

                <div className="green-step">
                  <div className="green-step-number">1</div>
                  <div className="green-step-content">
                    <h3>Kurangi Penggunaan Plastik</h3>
                    <p>Bawa tas belanja sendiri, gunakan botol minum isi ulang, dan hindari sedotan plastik. Setiap tahun, 8 juta ton plastik berakhir di lautan.</p>
                  </div>
                </div>

                <div className="green-step">
                  <div className="green-step-number">2</div>
                  <div className="green-step-content">
                    <h3>Hemat Energi</h3>
                    <p>Matikan peralatan elektronik saat tidak digunakan, gunakan lampu LED, dan manfaatkan pencahayaan alami. Ini bisa mengurangi emisi karbon hingga 30%.</p>
                  </div>
                </div>

                <div className="green-step">
                  <div className="green-step-number">3</div>
                  <div className="green-step-content">
                    <h3>Kelola Sampah dengan Bijak</h3>
                    <p>Pisahkan sampah organik dan anorganik, komposkan sisa makanan, dan daur ulang kemasan. Sampah organik yang terkomposkan bisa menyuburkan tanah.</p>
                  </div>
                </div>

                <div className="green-step">
                  <div className="green-step-number">4</div>
                  <div className="green-step-content">
                    <h3>Transportasi Ramah Lingkungan</h3>
                    <p>Gunakan transportasi umum, bersepeda, atau berjalan kaki untuk jarak dekat. Setiap 10 km dengan sepeda menghemat 1,5 kg emisi CO2.</p>
                  </div>
                </div>

                <div className="green-step">
                  <div className="green-step-number">5</div>
                  <div className="green-step-content">
                    <h3>Dukung Produk Lokal dan Organik</h3>
                    <p>Membeli produk lokal mengurangi jejak karbon dari transportasi. Produk organik juga lebih ramah lingkungan karena tanpa pestisida kimia.</p>
                  </div>
                </div>
              </div>
              <div className="green-article-footer">

                <div className="green-tags">
                  <span className="green-tag">#HidupHijau</span>
                  <span className="green-tag">#BumiSehat</span>
                  <span className="green-tag">#RamahLingkungan</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="green-resources-section" id="resources-panel" role="tabpanel" aria-labelledby="resources-tab">
            <div className="green-resource-card green-poster-card">
              <div className="green-resource-image">
                <img src="https://images.unsplash.com/photo-1466611653911-95081537e5b7" alt="Ilustrasi Panduan Hidup Ramah Lingkungan" loading="lazy" />
              </div>
              <div className="green-resource-content">
                <h3>Panduan Lengkap Hidup Ramah Lingkungan</h3>
                <p>E-book gratis berisi 101 cara sederhana mengurangi jejak karbon dalam kehidupan sehari-hari.</p>
                {/* --- MODIFIED CODE START --- */}
                <a
                  href="/panduan-hidup-ramah-lingkungan.pdf" // Path to your PDF in the public folder
                  download="panduan-hidup-ramah-lingkungan.pdf" // Suggested filename for download
                  className="green-download-button"
                  aria-label="Unduh Panduan Lengkap Hidup Ramah Lingkungan"
                >
                  <i className="fas fa-book-open" aria-hidden="true"></i> Unduh Panduan
                </a>
                {/* --- MODIFIED CODE END --- */}
              </div>
            </div>

            <div className="green-resource-card green-guide-card">
              <div className="green-resource-image">
                <img src="https://images.unsplash.com/photo-1488197047962-b48492212cda" alt="Ilustrasi Kalkulator Jejak Karbon" loading="lazy" />
              </div>
              <div className="green-resource-content">
                <h3>Kalkulator Jejak Karbon</h3>
                <p>Alat untuk menghitung dampak aktivitas harian Anda terhadap lingkungan dan tips menguranginya.</p>
                <button className="green-download-button" onClick={togglePosterModal}>
                  <i className="fas fa-calculator" aria-hidden="true"></i> Hitung Jejak Karbon
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'technology' && (
          <div className="green-technology-section" id="technology-panel" role="tabpanel" aria-labelledby="technology-tab">
            <div className="green-tech-card">
              <div className="green-tech-icon">
                <i className="fas fa-leaf" aria-hidden="true"></i>
              </div>
              <h3>Platform Digital Hijau</h3>
              <p>Solusi teknologi untuk meningkatkan kesadaran lingkungan dan mempromosikan gaya hidup berkelanjutan.</p>
              {/* This button already opens the existing 'showWebsiteModal' */}
              <button className="green-tech-button" onClick={toggleWebsiteModal}>
                Pelajari Lebih Lanjut
              </button>
            </div>

            <div className="green-tech-card">
              <div className="green-tech-icon">
                <i className="fas fa-mobile-alt" aria-hidden="true"></i>
              </div>
              <h3>Aplikasi Eco-Friendly</h3>
              <p>Rekomendasi aplikasi mobile yang membantu Anda hidup lebih ramah lingkungan setiap hari.</p>
              {/* Modified to open the new app list modal */}
              <button className="green-tech-button" onClick={toggleAppListModal}>
                <i className="fas fa-download" aria-hidden="true"></i> Lihat Daftar
              </button>
            </div>

            <div className="green-tech-card">
              <div className="green-tech-icon">
                <i className="fas fa-users" aria-hidden="true"></i>
              </div>
              <h3>Komunitas Digital Hijau</h3>
              <p>Bergabunglah dengan jaringan aktivis lingkungan untuk berbagi ide dan kolaborasi.</p>
              {/* Modified to be a link */}
              <a href="/komunitas" className="green-tech-button">
                <i className="fas fa-arrow-right" aria-hidden="true"></i> Gabung Sekarang
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Carbon Calculator Modal */}
      {showPosterModal && (
        <div className="green-modal-overlay">
          <div className="green-modal-content _carbon-modal">
            <button className="green-modal-close" onClick={togglePosterModal} aria-label="Tutup kalkulator jejak karbon">
              <i className="fas fa-times" aria-hidden="true"></i>
            </button>
            <div className="_carbon-header">
              <div className="_carbon-icon">
                <i className="fas fa-leaf" aria-hidden="true"></i>
              </div>
              <h2 className="_modal-title-centered">Kalkulator Jejak Karbon</h2>
              <p className="_carbon-subtitle">Hitung dampak lingkungan aktivitas harian Anda</p>
            </div>

            <div className="green-modal-body">
              <div className="_carbon-calculator-form">
                <form onSubmit={calculateCarbonFootprint}>
                  <div className="_form-grid">
                    <div className="_form-group">
                      <label htmlFor="transport-input">
                        <i className="fas fa-car" aria-hidden="true"></i>
                        Transportasi (km/minggu)
                      </label>
                      <input
                        id="transport-input"
                        type="number"
                        placeholder="Jarak tempuh kendaraan pribadi"
                        value={carbonData.transport}
                        onChange={(e) => handleCarbonInputChange('transport', e.target.value)}
                        min="0"
                        max="1000"
                        aria-label="Input jarak tempuh transportasi per minggu"
                      />
                    </div>

                    <div className="_form-group">
                      <label htmlFor="electricity-input">
                        <i className="fas fa-bolt" aria-hidden="true"></i>
                        Konsumsi Listrik (kWh/bulan)
                      </label>
                      <input
                        id="electricity-input"
                        type="number"
                        placeholder="Pemakaian listrik rumah tangga"
                        value={carbonData.electricity}
                        onChange={(e) => handleCarbonInputChange('electricity', e.target.value)}
                        min="0"
                        max="2000"
                        aria-label="Input konsumsi listrik per bulan"
                      />
                    </div>

                    <div className="_form-group">
                      <label htmlFor="meat-input">
                        <i className="fas fa-utensils" aria-hidden="true"></i>
                        Konsumsi Daging (porsi/minggu)
                      </label>
                      <input
                        id="meat-input"
                        type="number"
                        placeholder="Porsi daging yang dikonsumsi"
                        value={carbonData.meat}
                        onChange={(e) => handleCarbonInputChange('meat', e.target.value)}
                        min="0"
                        max="21"
                        aria-label="Input konsumsi daging per minggu"
                      />
                    </div>

                    <div className="_form-group">
                      <label htmlFor="recycling-input">
                        <i className="fas fa-recycle" aria-hidden="true"></i>
                        Daur Ulang (% sampah)
                      </label>
                      <input
                        id="recycling-input"
                        type="number"
                        placeholder="Persentase sampah yang didaur ulang"
                        value={carbonData.recycling}
                        onChange={(e) => handleCarbonInputChange('recycling', e.target.value)}
                        min="0"
                        max="100"
                        aria-label="Input persentase sampah yang didaur ulang"
                      />
                    </div>
                  </div>

                  <div className="_button-group">
                    <button
                      type="submit"
                      className="_calculate-button"
                      disabled={isCalculating}
                      aria-label={isCalculating ? "Sedang menghitung jejak karbon" : "Hitung jejak karbon Anda"}
                    >
                      {isCalculating ? (
                        <>
                          <i className="fas fa-spinner fa-spin" aria-hidden="true"></i>
                          Menghitung...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-calculator" aria-hidden="true"></i>
                          Hitung Jejak Karbon Saya
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      className="_reset-button"
                      onClick={resetCalculator}
                      disabled={isCalculating}
                      aria-label="Reset kalkulator"
                    >
                      <i className="fas fa-redo" aria-hidden="true"></i>
                      Reset
                    </button>
                  </div>
                </form>

                {carbonResult && (
                  <div className="_carbon-result" role="region" aria-live="polite">
                    <div className="_result-header">
                      <h4>Hasil Perhitungan Jejak Karbon Anda</h4>
                    </div>

                    <div className="_carbon-footprint">
                      <div className={`_footprint-visual ${carbonResult.status}`}>
                        <div className="_footprint-icon">
                          <i className="fas fa-shoe-prints" aria-hidden="true"></i>
                        </div>
                        <div className="_footprint-data">
                          <span className="_footprint-value">{carbonResult.total}</span>
                          <span className="_footprint-unit">ton CO2/tahun</span>
                        </div>
                        <div className={`_status-badge ${carbonResult.status}`}>
                          {carbonResult.status === 'excellent' && 'Sangat Baik'}
                          {carbonResult.status === 'good' && 'Baik'}
                          {carbonResult.status === 'average' && 'Sedang'}
                          {carbonResult.status === 'high' && 'Tinggi'}
                        </div>
                      </div>

                      <div className="_footprint-comparison">
                        <div className="_comparison-item">
                          <span className="_comparison-label">Rata-rata Indonesia:</span>
                          <span className="_comparison-value">2.3 ton CO2/tahun</span>
                        </div>
                        <div className="_comparison-item">
                          <span className="_comparison-label">Rata-rata Global:</span>
                          <span className="_comparison-value">4.8 ton CO2/tahun</span>
                        </div>
                      </div>
                    </div>

                    <div className="_carbon-breakdown">
                      <h5>Rincian Emisi:</h5>
                      <div className="_breakdown-grid">
                        <div className="_breakdown-item">
                          <i className="fas fa-car" aria-hidden="true"></i>
                          <span>Transportasi</span>
                          <strong>{carbonResult.breakdown.transport} ton</strong>
                        </div>
                        <div className="_breakdown-item">
                          <i className="fas fa-bolt" aria-hidden="true"></i>
                          <span>Listrik</span>
                          <strong>{carbonResult.breakdown.electricity} ton</strong>
                        </div>
                        <div className="_breakdown-item">
                          <i className="fas fa-utensils" aria-hidden="true"></i>
                          <span>Makanan</span>
                          <strong>{carbonResult.breakdown.meat} ton</strong>
                        </div>
                        <div className="_breakdown-item reduction">
                          <i className="fas fa-recycle" aria-hidden="true"></i>
                          <span>Pengurangan</span>
                          <strong>-{carbonResult.breakdown.recycling} ton</strong>
                        </div>
                      </div>
                    </div>

                    <div className="_carbon-tips">
                      <h5>
                        <i className="fas fa-lightbulb" aria-hidden="true"></i>
                        Rekomendasi untuk Anda:
                      </h5>
                      <ul>
                        {carbonResult.tips.map((tip, index) => (
                          <li key={index} dangerouslySetInnerHTML={{ __html: tip }}></li>
                        ))}
                      </ul>
                    </div>

                    <div className="_action-buttons">
                      {/* Modified "Bagikan Hasil" button to "Tutup" and added onClick to close the modal */}
                      <button className="_share-result-button" onClick={togglePosterModal}>
                        <i className="fas fa-times" aria-hidden="true"></i>
                        Tutup
                      </button>
                      <button className="_save-result-button">
                        <i className="fas fa-download" aria-hidden="true"></i>
                        Simpan Report
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Solusi Digital Modal */}
      {showWebsiteModal && (
        <div className="green-modal-overlay">
          <div className="green-modal-content green-tech-modal">
            <button className="green-modal-close" onClick={toggleWebsiteModal} aria-label="Tutup informasi solusi digital">
              <i className="fas fa-times" aria-hidden="true"></i>
            </button>
            <h2 className="green-modal-title">Kembangkan Solusi Digital untuk Lingkungan</h2>
            <div className="green-modal-body">
              <p className="green-modal-description">
                Mari bersama-sama menciptakan platform digital yang mendukung pelestarian lingkungan dan gaya hidup berkelanjutan.
              </p>

              <div className="green-tech-features">
                <div className="green-feature">
                  <div className="green-feature-icon">
                    <i className="fas fa-tree" aria-hidden="true"></i>
                  </div>
                  <h4>Pemantauan Lingkungan</h4>
                  <p>Platform real-time untuk memantau kualitas udara, air, dan tutupan hutan.</p>
                </div>

                <div className="green-feature">
                  <div className="green-feature-icon">
                    <i className="fas fa-recycle" aria-hidden="true"></i>
                  </div>
                  <h4>Manajemen Sampah Digital</h4>
                  <p>Sistem penjadwalan pengambilan sampah dan lokasi bank sampah terdekat.</p>
                </div>

                <div className="green-feature">
                  <div className="green-feature-icon">
                    <i className="fas fa-solar-panel" aria-hidden="true"></i>
                  </div>
                  <h4>Energi Terbarukan</h4>
                  <p>Kalkulator dan simulator pemasangan panel surya di rumah.</p>
                </div>
              </div>

              <div className="green-tech-form">
                <h3>Ikut Berkontribusi</h3>
                <p>Bergabunglah sebagai relawan pengembang, desainer, atau content creator untuk platform hijau kami.</p>
                <form>
                  <div className="green-form-group">
                    <label htmlFor="name">Nama Lengkap</label>
                    <input type="text" id="name" placeholder="Nama Anda" aria-label="Input nama lengkap Anda" />
                  </div>
                  <div className="green-form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="alamat@email.com" aria-label="Input alamat email Anda" />
                  </div>
                  <div className="green-form-group">
                    <label htmlFor="role">Peran yang Diminati</label>
                    <select id="role" aria-label="Pilih peran yang diminati">
                      <option value="">Pilih peran</option>
                      <option value="web-dev">Pengembang Web</option>
                      <option value="mobile-dev">Pengembang Mobile</option>
                      <option value="designer">Desainer UI/UX</option>
                      <option value="content">Penulis Konten</option>
                    </select>
                  </div>
                  <div className="green-form-group">
                    <label htmlFor="message">Pesan/Keterampilan</label>
                    <textarea id="message" placeholder="Ceritakan tentang minat dan keahlian Anda" aria-label="Input pesan atau keterampilan Anda"></textarea>
                  </div>
                  <button type="submit" className="green-submit-button">
                    <i className="fas fa-paper-plane" aria-hidden="true"></i> Kirim Permohonan
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Eco-Friendly App List Modal */}
      {showAppListModal && (
        <div className="green-modal-overlay">
          <div className="green-modal-content _app-list-modal">
            <button className="green-modal-close" onClick={toggleAppListModal} aria-label="Tutup daftar aplikasi eco-friendly">
              <i className="fas fa-times" aria-hidden="true"></i>
            </button>
            <h2 className="green-modal-title">Aplikasi Eco-Friendly Terbaik</h2>
            <div className="green-modal-body">
              <p className="green-modal-description">
                Berikut adalah beberapa aplikasi rekomendasi yang dapat membantu Anda dalam perjalanan gaya hidup ramah lingkungan:
              </p>
              <ul className="_app-list">
                <li>
                  <div className="_app-item">
                    <i className="fas fa-seedling _app-icon"></i>
                    <div className="_app-details">
                      <h4>Ecosia</h4>
                      <p>Mesin pencari yang menanam pohon dengan setiap pencarian Anda. Sebuah cara mudah untuk berkontribusi.</p>
                      <a href="https://www.ecosia.org/" target="_blank" rel="noopener noreferrer" className="_app-link">Kunjungi Website</a>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="_app-item">
                    <i className="fas fa-leaf _app-icon"></i>
                    <div className="_app-details">
                      <h4>Too Good To Go</h4>
                      <p>Selamatkan makanan enak dari pembuangan di restoran dan toko terdekat.</p>
                      <a href="https://toogoodtogo.com/" target="_blank" rel="noopener noreferrer" className="_app-link">Pelajari Lebih Lanjut</a>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="_app-item">
                    <i className="fas fa-lightbulb _app-icon"></i>
                    <div className="_app-details">
                      <h4>Jejak Karbon Pribadi</h4>
                      <p>Aplikasi untuk melacak dan mengurangi jejak karbon pribadi Anda dengan tips yang dipersonalisasi.</p>
                      <span className="_app-link">Tersedia di App Store & Google Play</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="_app-item">
                    <i className="fas fa-recycle _app-icon"></i>
                    <div className="_app-details">
                      <h4>RecycleNation</h4>
                      <p>Temukan lokasi daur ulang terdekat untuk berbagai jenis material.</p>
                      <a href="https://recyclenation.com/" target="_blank" rel="noopener noreferrer" className="_app-link">Kunjungi Website</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TipsKomunitasHijau;