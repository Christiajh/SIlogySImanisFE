import React, { useState } from 'react';
import '../styles/Video.css';
import {
  FaRecycle,
  FaLightbulb,
  FaChild,
  FaUserGraduate,
  FaLaptopCode,
  FaGlobeAsia,
} from 'react-icons/fa';

const VideoPlaylist = () => {
  const [activeCategory, setActiveCategory] = useState('Semua');

  const allPlaylists = [
    {
      id: '1',
      title: 'Dapur Hijau & Rumah Tangga Berkelanjutan',
      category: 'Rumah Tangga',
      description:
        'Pelajari cara mengurangi jejak karbon di rumah, dari pengelolaan sampah hingga hemat energi sehari-hari.',
      icon: <FaRecycle />,
      videoUrl: 'https://youtu.be/PdM2lNQkdBY?si=KNYhtjDNDeaGFnQm',
    },
    {
      id: '2',
      title: 'Petualangan Eco-Kids: Bermain Sambil Belajar Lingkungan',
      category: 'Anak-anak',
      description:
        'Video edukasi yang menyenangkan untuk anak-anak tentang pentingnya menjaga bumi dan keanekaragaman hayati.',
      icon: <FaChild />,
      videoUrl: 'https://youtu.be/kJpfiVYotKA?si=k26Ld-iWo9RXVgDZ',
    },
    {
      id: '3',
      title: 'Aksi Lingkungan Generasi Z: Berinovasi untuk Bumi',
      category: 'Remaja',
      description:
        'Inspirasi bagi remaja untuk terlibat dalam isu lingkungan, memanfaatkan teknologi dan ide-ide kreatif.',
      icon: <FaUserGraduate />,
      videoUrl: 'https://youtu.be/vUGfoHU1n70?si=p2A5EaL0cp2w7E6p',
    },
    {
      id: '4',
      title: 'Inovasi Hijau: Solusi Teknologi untuk Lingkungan',
      category: 'Teknologi & Inovasi',
      description:
        'Lihat bagaimana teknologi, AI, dan data science diterapkan untuk memecahkan masalah lingkungan global.',
      icon: <FaLaptopCode />,
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // contoh link
    },
    {
      id: '5',
      title: 'Energi Bersih & Hidup Hemat: Tips & Trik',
      category: 'Rumah Tangga',
      description:
        'Panduan praktis untuk mengurangi konsumsi energi dan beralih ke sumber energi yang lebih bersih.',
      icon: <FaLightbulb />,
      videoUrl: 'https://youtu.be/iVnOSc6duv8?si=sQqqeYvH9gcxy1ps',
    },
    {
      id: '6',
      title: 'Menjelajahi Keajaiban Bumi & Melindunginya',
      category: 'Bumi & Ekosistem',
      description:
        'Dokumenter dan video inspiratif tentang keindahan alam dan pentingnya menjaga keseimbangan ekosistem.',
      icon: <FaGlobeAsia />,
      videoUrl: 'https://youtu.be/Qoxk12qU9p0?si=F4E2ZgDCvR4KEhKx',
    },
  ];

  const filteredPlaylists =
    activeCategory === 'Semua'
      ? allPlaylists
      : allPlaylists.filter((playlist) => playlist.category === activeCategory);

  const categories = ['Semua', ...new Set(allPlaylists.map((p) => p.category))];

  return (
    <div className="wb-video-playlist-container">
      <header className="wb-video-playlist-header">
        <h1>Video Inspirasi Lingkungan</h1>
        <p className="wb-subtitle">
          Transformasi Digital untuk Gaya Hidup Hijau Bersama{' '}
          <span className="wb-wargabuatin-highlight">WargaBuatin</span>
        </p>
      </header>

     

      <section className="wb-category-filter">
        {categories.map((category) => (
          <button
            key={category}
            className={`wb-filter-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </section>

      <section className="wb-playlists-grid">
        {filteredPlaylists.length > 0 ? (
          filteredPlaylists.map((playlist) => (
            <a
              key={playlist.id}
              href={playlist.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="wb-playlist-card-link"
            >
              <div className="wb-playlist-card elegant-card animate__animated animate__fadeInUp">
                <div className="wb-card-header">
                  <div className="wb-card-icon">{playlist.icon}</div>
                  <h2 className="wb-playlist-title">{playlist.title}</h2>
                </div>
                <p className="wb-playlist-category">
                  Kategori:{' '}
                  <span className="wb-category-label">{playlist.category}</span>
                </p>
                <p className="wb-playlist-description">{playlist.description}</p>
                <div className="wb-video-embed-container">
                  <iframe
                    src={playlist.videoUrl.replace('youtu.be/', 'www.youtube.com/embed/').replace('watch?v=', 'embed/').split('?')[0]}
                    title={playlist.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </a>
          ))
        ) : (
          <p className="wb-no-videos-message">Tidak ada video untuk kategori ini. Coba kategori lain!</p>
        )}
      </section>

      <section className="wb-call-to-action elegant-cta">
        <h2 className="wb-cta-title">Ayo, Berinovasi untuk Bumi Kita!</h2>
        <p className="wb-cta-text">
          Video-video ini hanyalah awal. Kami mengajak Anda, para inovator, untuk mengembangkan <em>website</em> dan aplikasi yang mendukung kesadaran lingkungan dan gaya hidup berkelanjutan. Manfaatkan <strong>teknologi, kreativitas, kecerdasan, dan pengetahuan</strong> Anda untuk menciptakan solusi digital yang nyata dan memberikan dampak positif bagi bumi kita.
        </p>
        <button
          className="wb-cta-button"
          onClick={() => alert('Mulai proyek inovasi Anda sekarang!')}
        >
          Mulai Proyek Inovasi Anda
        </button>
      </section>
    </div>
  );
};

export default VideoPlaylist;
