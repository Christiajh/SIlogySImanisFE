import React, { useState } from 'react';
import { Calendar, MapPin, Users, Leaf, TreePine, Recycle, User, Mail, Phone, MessageSquare } from 'lucide-react';
import "../styles/Komunitas.css";

const EventKomunitas = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const events = [
    {
      id: 1,
      title: "Gotong Royong Bersih Sungai",
      date: "15 Juni 2025",
      time: "08:00 - 12:00",
      location: "Sungai Deli, Medan",
      description: "Mari bergabung dalam aksi bersih-bersih sungai untuk menjaga ekosistem air dan mencegah pencemaran lingkungan. Kita akan membersihkan sampah plastik dan edukasi masyarakat sekitar.",
      registered: 45,
      maxParticipants: 100,
      icon: <Recycle className="event-icon" />,
      category: "Gotong Royong"
    },
    {
      id: 2,
      title: "Diskusi: Solusi Sampah Plastik",
      date: "18 Juni 2025",
      time: "19:00 - 21:00",
      location: "Aula Komunitas Hijau, Medan",
      description: "Diskusi panel bersama aktivis lingkungan tentang inovasi pengelolaan sampah plastik dan cara mengurangi penggunaan plastik sekali pakai dalam kehidupan sehari-hari.",
      registered: 32,
      maxParticipants: 60,
      icon: <MessageSquare className="event-icon" />,
      category: "Diskusi"
    },
    {
      id: 3,
      title: "Kampanye Tanam 1000 Pohon",
      date: "22 Juni 2025",
      time: "06:00 - 10:00",
      location: "Hutan Kota Beringin, Medan",
      description: "Kampanye penanaman pohon massal untuk meningkatkan kualitas udara dan mencegah pemanasan global. Setiap peserta akan menanam minimal 5 bibit pohon.",
      registered: 78,
      maxParticipants: 120,
      icon: <TreePine className="event-icon" />,
      category: "Kampanye"
    },
    {
      id: 4,
      title: "Workshop Kompos Organik",
      date: "25 Juni 2025",
      time: "14:00 - 17:00",
      location: "Taman Edukasi Lingkungan, Medan",
      description: "Belajar membuat kompos dari sampah organik rumah tangga. Workshop praktis yang akan mengajarkan teknik composting yang mudah diterapkan di rumah.",
      registered: 28,
      maxParticipants: 40,
      icon: <Leaf className="event-icon" />,
      category: "Workshop"
    },
    {
      id: 5,
      title: "Gotong Royong Kebersihan Pantai",
      date: "29 Juni 2025",
      time: "07:00 - 11:00",
      location: "Pantai Cermin, Serdang Bedagai",
      description: "Aksi bersih pantai untuk melindungi ekosistem laut dan biota laut dari pencemaran sampah. Kegiatan ini juga mencakup edukasi tentang dampak sampah laut.",
      registered: 56,
      maxParticipants: 80,
      icon: <Recycle className="event-icon" />,
      category: "Gotong Royong"
    },
    {
      id: 6,
      title: "Kampanye Hemat Energi",
      date: "2 Juli 2025",
      time: "16:00 - 19:00",
      location: "Mall Centre Point, Medan",
      description: "Kampanye publik tentang pentingnya menghemat energi listrik dan penggunaan energi terbarukan. Akan ada demo produk ramah lingkungan dan tips hemat energi.",
      registered: 41,
      maxParticipants: 100,
      icon: <Leaf className="event-icon" />,
      category: "Kampanye"
    }
  ];

  const handleRegister = (event) => {
    setSelectedEvent(event);
    setShowRegistrationForm(true);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitRegistration = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Mohon lengkapi data yang wajib diisi!');
      return;
    }
    // Simulate registration process
    alert(`Terima kasih ${formData.name}! Pendaftaran Anda untuk "${selectedEvent.title}" telah berhasil. Kami akan mengirim konfirmasi ke email ${formData.email}.`);
    setShowRegistrationForm(false);
    setFormData({ name: '', email: '', phone: '', message: '' });
    setSelectedEvent(null);
  };

  const closeRegistration = () => {
    setShowRegistrationForm(false);
    setSelectedEvent(null);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const calculateProgress = (registered, max) => {
    return (registered / max) * 100;
  };

  return (
    <div className="event-page-container">
      <div className="page-header">
        <div className="header-icon">
          <Leaf size={48} />
        </div>
        <h1 className="event-title">Event Komunitas Lingkungan</h1>
        <p className="page-subtitle">
          Bergabunglah dalam gerakan menjaga lingkungan dan bumi yang lebih sehat. 
          Mari bersama-sama menciptakan perubahan positif untuk masa depan yang berkelanjutan.
        </p>
      </div>

      <div className="event-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <div className="event-card-content">
              <div className="event-category-badge">
                {event.category}
              </div>
              
              <div className="event-date-info">
                <Calendar className="event-icon" />
                <span className="event-date">{event.date}</span>
                <span className="event-time">• {event.time}</span>
              </div>

              <div className="event-location-info">
                <MapPin className="event-icon" />
                <span className="event-location">{event.location}</span>
              </div>

              <h3 className="event-card-title">{event.title}</h3>
              
              <p className="event-description">{event.description}</p>

              <div className="event-progress-info">
                <div className="participants-info">
                  <Users size={16} className="participants-icon" />
                  <span className="event-registered">{event.registered}</span>
                  <span>/{event.maxParticipants} peserta</span>
                </div>
                <span className="progress-percentage">
                  {Math.round(calculateProgress(event.registered, event.maxParticipants))}%
                </span>
              </div>

              <progress 
                className="event-progress-bar" 
                value={event.registered} 
                max={event.maxParticipants}
              ></progress>

              <button 
                className="event-register-button"
                onClick={() => handleRegister(event)}
              >
                <User className="event-button-icon" />
                Daftar Sekarang
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Registration Modal */}
      {showRegistrationForm && (
        <div className="registration-overlay">
          <div className="registration-form-modal">
            <button 
              className="registration-close-button"
              onClick={closeRegistration}
            >
              ×
            </button>
            
            <h2 className="registration-form-title">
              Daftar: {selectedEvent?.title}
            </h2>
            
            <div>
              <div className="form-group">
                <label className="form-label">
                  <User size={16} style={{display: 'inline', marginRight: '8px'}} />
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Masukkan nama lengkap Anda"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Mail size={16} style={{display: 'inline', marginRight: '8px'}} />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="nama@email.com"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Phone size={16} style={{display: 'inline', marginRight: '8px'}} />
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="08xx-xxxx-xxxx"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <MessageSquare size={16} style={{display: 'inline', marginRight: '8px'}} />
                  Pesan (Opsional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="form-input form-textarea"
                  placeholder="Tuliskan motivasi atau harapan Anda..."
                  rows="3"
                />
              </div>

                           <button onClick={handleSubmitRegistration} className="registration-submit-button">
                <Leaf size={20} style={{marginRight: '8px'}} />
                Konfirmasi Pendaftaran
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventKomunitas;
