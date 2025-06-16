import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import '../styles/Hubungi.css';

const Hubungi = () => {
  const form = useRef();
  const [submitState, setSubmitState] = useState('Kirim Pesan');
  const [successVisible, setSuccessVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitState('🌱 Mengirim...');
    
    emailjs.sendForm(
      'service_wd0n3mz', // ganti dengan service ID EmailJS
      'template_5aagx4j', // ganti dengan template ID EmailJS
      form.current,
      'MNzQcHQRbIpQr6pAu' // ganti dengan Public Key EmailJS
    )
    .then(() => {
      setSubmitState('✅ Terkirim!');
      setSuccessVisible(true);

      setTimeout(() => {
        form.current.reset();
        setSubmitState('Kirim Pesan');
        setSuccessVisible(false);
      }, 3000);
    }, () => {
      setSubmitState('❌ Gagal Mengirim');
      setTimeout(() => setSubmitState('Kirim Pesan'), 2000);
    });
  };

  return (
    <div className="contact-container">
      <div className="contact-info">
        <h1 className="contact-title">Hubungi Kami</h1>
        <p className="contact-subtitle">
          Mari berkolaborasi menciptakan solusi digital yang berkelanjutan untuk masa depan bumi yang lebih hijau.
        </p>

        <div className="contact-item"><div className="contact-icon">📧</div><div className="contact-details"><h3>Email</h3><p>chutahaean372@gmail.com<br />elkanasitorus5@gmail.com</p></div></div>
        <div className="contact-item"><div className="contact-icon">📱</div><div className="contact-details"><h3>Telepon & WhatsApp</h3><p>+62 832-3456-7890<br />+62 811-9876-5432</p></div></div>
        <div className="contact-item"><div className="contact-icon">📍</div><div className="contact-details"><h3>Alamat</h3><p>Jl Danau singkarak Binjai<br />Jl. Lingkungan Hijau No. 88<br />Jakarta Selatan 12560</p></div></div>
        <div className="contact-item"><div className="contact-icon">⏰</div><div className="contact-details"><h3>Jam Operasional</h3><p>Senin - Jumat: 09:00 - 17:00<br />Sabtu: 09:00 - 15:00</p></div></div>

        <div className="social-links">
          <a href="#" className="social-link">📘</a>
          <a href="#" className="social-link">📷</a>
          <a href="#" className="social-link">🐦</a>
          <a href="#" className="social-link">💼</a>
        </div>
      </div>

      <div className="contact-form">
        {successVisible && (
          <div className="success-message show">
            ✅ <strong>Berhasil Terkirim!</strong> Pesan Anda telah dikirim ke <em>santaynie@gmail.com</em>. Kami akan segera menghubungi Anda.
          </div>
        )}

        <h2 className="form-title">Kirim Pesan</h2>
        <p className="form-subtitle">Ceritakan ide atau proyek teknologi hijau Anda kepada kami</p>

        <form ref={form} onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Nama Lengkap</label>
              <input type="text" name="user_name" className="form-input" required placeholder="Masukkan nama lengkap Anda" />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" name="user_email" className="form-input" required placeholder="nama@email.com" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Nomor Telepon</label>
              <input type="tel" name="user_phone" className="form-input" placeholder="+62 812-3456-7890" />
            </div>
            <div className="form-group">
              <label className="form-label">Kategori Proyek</label>
              <select name="project_category" className="form-input" required>
                <option value="">Pilih kategori</option>
                <option value="web">Website Ramah Lingkungan</option>
                <option value="app">Aplikasi Mobile Hijau</option>
                <option value="iot">IoT untuk Sustainability</option>
                <option value="ai">AI untuk Environment</option>
                <option value="other">Lainnya</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Subjek</label>
            <input type="text" name="subject" className="form-input" required placeholder="Ringkasan singkat proyek Anda" />
          </div>

          <div className="form-group">
            <label className="form-label">Pesan</label>
            <textarea name="message" className="form-textarea" required placeholder="Deskripsikan visi dan tujuan proyek teknologi hijau Anda..." />
          </div>

          <button type="submit" className="submit-btn">{submitState}</button>
        </form>
      </div>
    </div>
  );
};

export default Hubungi;
