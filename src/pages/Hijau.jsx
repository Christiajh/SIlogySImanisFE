import React, { useState } from 'react';
import '../styles/Hijau.css';

const RelawanHijau = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const testimonials = [
    {
      name: "Ahmad Fauzi",
      role: "Relawan Hutan",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      message: "Bergabung dengan Relawan Hijau mengubah hidup saya. Tidak hanya membantu melestarikan alam, tapi juga menemukan komunitas yang peduli dengan bumi kita. Terima kasih atas kesempatan untuk berkontribusi!",
      shortMessage: "Bergabung dengan Relawan Hijau mengubah hidup saya..."
    },
    {
      name: "Dewi Lestari",
      role: "Relawan Pantai",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      message: "Sebagai relawan pantai, saya melihat langsung dampak positif dari gerakan ini. Website ini sangat membantu koordinasi antar relawan. Mari bersama-sama menjaga keindahan pantai kita!",
      shortMessage: "Sebagai relawan pantai, saya melihat langsung dampak positif..."
    },
    {
      name: "Budi Santoso",
      role: "Relawan Kota",
      avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      message: "Awalnya saya ragu bisa berkontribusi di kota besar. Ternyata banyak hal kecil yang bisa dilakukan. Website Relawan Hijau membuat semua lebih terorganisir dan terukur. Terima kasih!",
      shortMessage: "Awalnya saya ragu bisa berkontribusi di kota besar..."
    },
    {
      name: "Siti Rahayu",
      role: "Relawan Pendidikan",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      message: "Mengajar anak-anak tentang pentingnya lingkungan melalui platform digital ini sangat menyenangkan. Mereka antusias belajar sambil bermain. Inovasi yang sangat bermanfaat!",
      shortMessage: "Mengajar anak-anak tentang pentingnya lingkungan..."
    }
  ];

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    setIsExpanded(false);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsExpanded(false);
  };

  return (
    <div className="relawan-container">
      <div className="relawan-header">
        <h2 className="relawan-title">Testimoni Relawan Hijau</h2>
        <p className="relawan-subtitle">Suara mereka yang telah berkontribusi untuk bumi yang lebih hijau</p>
      </div>

      <div className="testimonial-carousel">
        <button className="nav-button prev-button" onClick={prevTestimonial}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
          </svg>
        </button>

        <div className="testimonial-card">
          <div className="testimonial-avatar">
            <img src={testimonials[activeTestimonial].avatar} alt={testimonials[activeTestimonial].name} />
            <div className="avatar-decoration"></div>
          </div>
          
          <div className="testimonial-content">
            <h3 className="testimonial-name">{testimonials[activeTestimonial].name}</h3>
            <p className="testimonial-role">{testimonials[activeTestimonial].role}</p>
            
            <div className={`testimonial-message ${isExpanded ? 'expanded' : ''}`}>
              {isExpanded ? testimonials[activeTestimonial].message : testimonials[activeTestimonial].shortMessage}
            </div>
            
            <button 
              className="read-more-button" 
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Baca lebih sedikit' : 'Baca lebih lanjut'}
            </button>
          </div>
        </div>

        <button className="nav-button next-button" onClick={nextTestimonial}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
          </svg>
        </button>
      </div>

      <div className="testimonial-indicators">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === activeTestimonial ? 'active' : ''}`}
            onClick={() => {
              setActiveTestimonial(index);
              setIsExpanded(false);
            }}
          />
        ))}
      </div>

     
    </div>
  );
};

export default RelawanHijau;