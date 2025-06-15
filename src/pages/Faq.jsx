import React, { useState } from 'react';
import '../styles/Faq.css';

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    question: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const faqs = [
    {
      question: "Bagaimana saya bisa ikut tanam pohon?",
      answer: "Anda dapat berpartisipasi dalam program penanaman pohon kami dengan mengikuti kegiatan yang dijadwalkan atau menyumbang melalui platform kami. Setiap donasi akan dikonversi menjadi pohon yang akan ditanam oleh tim kami di lokasi yang membutuhkan."
    },
    {
      question: "Apa itu bank sampah?",
      answer: "Bank sampah adalah sistem pengelolaan sampah yang mengajak masyarakat untuk memilah dan menabung sampah yang bisa didaur ulang. Sampah yang terkumpul akan ditimbang dan dicatat sebagai tabungan, kemudian diolah menjadi produk bernilai ekonomi."
    },
    {
      question: "Bagaimana cara kerja platform pelestarian lingkungan ini?",
      answer: "Platform kami menghubungkan individu dan organisasi yang peduli lingkungan dengan berbagai inisiatif pelestarian. Anda bisa berpartisipasi dalam program, belajar tentang praktik berkelanjutan, atau memulai proyek lingkungan Anda sendiri dengan dukungan komunitas kami."
    },
    {
      question: "Apakah ada program khusus untuk sekolah atau perusahaan?",
      answer: "Ya, kami menyediakan program khusus untuk institusi pendidikan dan korporasi, termasuk workshop, program adopsi pohon, dan sistem pengelolaan limbah terpadu. Tim kami akan membantu menyesuaikan program dengan kebutuhan spesifik organisasi Anda."
    },
    {
      question: "Bagaimana saya bisa melacak dampak kontribusi saya?",
      answer: "Setiap kontribusi yang Anda berikan akan dilacak dan dilaporkan melalui dashboard personal Anda. Anda akan menerima update berkala termasuk foto lokasi, perkembangan proyek, dan laporan dampak lingkungan yang telah dihasilkan."
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setShowForm(false);
      setFormData({ name: '', email: '', question: '' });
    }, 3000);
  };

  return (
    <div className="faq-page-container">
      <div className="faq-header">
        <h1 className="faq-title">Tanya Jawab Umum</h1>
        <p className="faq-subtitle">Temukan jawaban untuk pertanyaan Anda tentang platform kami dan upaya pelestarian lingkungan</p>
      </div>

      <div className="faq-content">
        <div className="faq-accordion">
          {faqs.map((item, index) => (
            <div 
              key={index} 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              onClick={() => toggleAccordion(index)}
            >
              <div className="faq-question">
                <h3>{item.question}</h3>
                <span className="faq-icon">
                  {activeIndex === index ? '−' : '+'}
                </span>
              </div>
              <div 
                className="faq-answer" 
                style={{ 
                  maxHeight: activeIndex === index ? '500px' : '0',
                  opacity: activeIndex === index ? '1' : '0'
                }}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="faq-contact-section">
          <div className="contact-card">
            <h2>Tidak menemukan jawaban yang Anda cari?</h2>
            <p>Tim kami siap membantu menjawab pertanyaan khusus Anda tentang platform dan program pelestarian lingkungan.</p>
            <button 
              className="contact-button"
              onClick={() => setShowForm(true)}
            >
              Ajukan Pertanyaan
            </button>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="contact-form-overlay">
          <div className="contact-form-modal">
            <button 
              className="close-button"
              onClick={() => {
                setShowForm(false);
                setIsSubmitted(false);
              }}
            >
              &times;
            </button>
            
            {isSubmitted ? (
              <div className="success-message">
                <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                  <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                  <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
                <h3>Terima kasih!</h3>
                <p>Pertanyaan Anda telah terkirim. Tim kami akan segera menghubungi Anda.</p>
              </div>
            ) : (
              <>
                <h2 className="form-title">Ajukan Pertanyaan</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Nama Lengkap</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="question">Pertanyaan Anda</label>
                    <textarea
                      id="question"
                      name="question"
                      value={formData.question}
                      onChange={handleInputChange}
                      rows="5"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="submit-button">
                    Kirim Pertanyaan
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Faq;