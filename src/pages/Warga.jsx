import React, { useState, useEffect } from 'react';
import '../styles/Warga.css';


const Warga = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: "Budi Santoso",
      role: "Ketua RW 05, Jakarta Selatan",
      quote: "Dengan website ini, kami bisa mengorganisir kegiatan bersih-bersih lingkungan lebih efektif. Partisipasi warga meningkat 70% sejak kami memulai kampanye digital.",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      initiative: "Gerakan 'Satu Rumah Satu Pohon'"
    },
    {
      id: 2,
      name: "Siti Aminah",
      role: "Penggiat Lingkungan, Bandung",
      quote: "Platform digital ini membantu kami menyebarkan kesadaran tentang pengelolaan sampah. Sekarang lebih banyak warga yang memilah sampah dari rumah.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      initiative: "Komunitas 'Bandung Zero Waste'"
    },
    {
      id: 3,
      name: "Agus Wijaya",
      role: "Petani Organik, Yogyakarta",
      quote: "Melalui website ini, saya bisa berbagi pengetahuan tentang pertanian organik dengan lebih banyak orang. Sudah 50 keluarga beralih ke kebun urban berkat informasi yang kami bagikan.",
      avatar: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      initiative: "Program 'Urban Farming for All'"
    },
    {
      id: 4,
      name: "Dewi Lestari",
      role: "Guru SD, Surabaya",
      quote: "Website ini menjadi alat pembelajaran yang luar biasa untuk mengajarkan anak-anak tentang pentingnya menjaga lingkungan. Mereka sekarang menjadi duta lingkungan kecil di keluarga masing-masing.",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      initiative: "Edukasi Lingkungan untuk Anak"
    }
  ];

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [activeTestimonial]);

  useEffect(() => {
    const autoRotate = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(autoRotate);
  }, []);

  return (
    <div className="warga-container">
      <div className="warga-header">
        <h2 className="warga-subtitle">Suara dari Masyarakat</h2>
        <h1 className="warga-title">Warga Peduli Lingkungan</h1>
        <div className="warga-divider"></div>
        <p className="warga-description">
          Kisah inspiratif dari mereka yang telah berpartisipasi dalam gerakan pelestarian lingkungan melalui solusi digital kami.
        </p>
      </div>

      <div className="warga-testimonials">
        <button className="warga-nav-button prev" onClick={handlePrev}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" fill="currentColor"/>
          </svg>
        </button>

        <div className={`warga-testimonial-container ${isAnimating ? 'animating' : ''}`}>
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className={`warga-testimonial ${index === activeTestimonial ? 'active' : ''}`}
              style={{ transform: `translateX(${(index - activeTestimonial) * 100}%)` }}
            >
              <div className="warga-quote-container">
                <svg className="warga-quote-icon" viewBox="0 0 24 24">
                  <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" fill="currentColor"/>
                </svg>
                <p className="warga-quote">{testimonial.quote}</p>
              </div>
              <div className="warga-person-info">
                <div className="warga-avatar-container">
                  <img src={testimonial.avatar} alt={testimonial.name} className="warga-avatar" />
                  <div className="warga-avatar-bg"></div>
                </div>
                <div className="warga-person-details">
                  <h3 className="warga-person-name">{testimonial.name}</h3>
                  <p className="warga-person-role">{testimonial.role}</p>
                  <div className="warga-initiative">
                    <svg className="warga-leaf-icon" viewBox="0 0 24 24">
                      <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17 1.03.3 1.58.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" fill="currentColor"/>
                    </svg>
                    <span>{testimonial.initiative}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="warga-nav-button next" onClick={handleNext}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" fill="currentColor"/>
          </svg>
        </button>
      </div>

      <div className="warga-indicators">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`warga-indicator ${index === activeTestimonial ? 'active' : ''}`}
            onClick={() => {
              if (index !== activeTestimonial && !isAnimating) {
                setIsAnimating(true);
                setActiveTestimonial(index);
              }
            }}
          />
        ))}
      </div>

      <div className="warga-cta">
        <p className="warga-cta-text">Bergabunglah dengan gerakan ini dan bagikan pengalaman Anda!</p>
     
      </div>
    </div>
  );
};

export default Warga;