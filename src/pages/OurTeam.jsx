import React from 'react';
import '../styles/OurTeam.css'; // Pastikan path ke CSS sudah benar

export default function OurTeam() {
  return (
    <div className="ot-halaman-tim-kami">

      {/* Bagian Hero */}
      <section className="ot-area-hero">
        <div className="ot-konten-area-hero"> {/* Konten ini sekarang menyatu dengan latar belakang hero */}
          <h1>🌿 Simanis — Digital Hijau</h1>
          <p className="ot-subjudul-area-hero">Dibuat oleh dua mahasiswa Informatika IT del  angkatan 2023.</p>
        </div>
      </section>

      <main className="ot-konten-utama-area">

        {/* Profil Tim */}
        <section id="profil-tim" className="ot-bagian-konten-area">
          <div className="ot-kartu-kaca-area"> {/* Ini adalah "card" di bagian isi */}
            <h2 className="ot-judul-bagian-area">
              <span className="ot-ikon-bagian-area">👥</span>
              Tim Pengembang
            </h2>

            <div className="ot-grid-tim-area">

              {/* Elkana */}
              <div className="ot-kartu-tim-area">
                <img
                  src="/elkana.jpg"
                  alt="Elkana Sitorus"
                  className="ot-avatar-tim-area"
                />
                <h3 className="ot-nama-tim-area">Elkana Sitorus</h3>
                <p className="ot-peran-tim-area">Lead Developer & UI/UX Designer</p>
                <p className="ot-deskripsi-tim-area">
                  Full-stack developer yang berfokus pada desain antarmuka ramah pengguna. Elkana ingin membuat aplikasi yang tidak hanya menarik secara visual tapi juga memudahkan pengguna dalam pelestarian lingkungan.
                </p>
                <p style={{ fontStyle: 'italic', marginTop: '0.5rem' }}>
                  “Teknologi adalah jembatan untuk menjaga bumi. Saya ingin membuat solusi nyata dengan dampak positif.”
                </p>
              
              </div>

              {/* Christian */}
              <div className="ot-kartu-tim-area">
                <img
                  src="/Tian.jpg"
                  alt="Christian Hutahaean"
                  className="ot-avatar-tim-area"
                />

                <h3 className="ot-nama-tim-area">Christian Hutahaean</h3>
                <p className="ot-peran-tim-area">Backend Developer & Content Strategist</p>
                <p className="ot-deskripsi-tim-area">
                  Berpengalaman dalam pengembangan backend dan edukasi digital. Christian memastikan fitur WargaBantuin mendukung keberlanjutan serta mudah diakses oleh semua kalangan.
                </p>
                <p style={{ fontStyle: 'italic', marginTop: '0.5rem' }}>
                  “Edukasi dan teknologi harus berjalan bersama untuk mendorong perubahan sosial berkelanjutan.”
                </p>
               

              </div>
            </div>
          </div>
        </section>

        {/* Nilai & Filosofi Tim */}
        <section className="ot-bagian-konten-area">
          <div className="ot-kartu-kaca-area ot-bagian-nilai-filosofi">
            <h2 className="ot-judul-bagian-area">
              <span className="ot-ikon-bagian-area">💡</span>
              Nilai & Filosofi Tim
            </h2>
            <p className="ot-konten-bagian-area">
              Kami percaya kolaborasi, inovasi, dan keberlanjutan adalah fondasi dalam mengembangkan teknologi yang bermanfaat bagi masyarakat dan lingkungan.
              Dengan semangat keterbukaan dan pembelajaran terus-menerus, kami berupaya menciptakan dampak positif nyata.
            </p>
            <ul className="ot-konten-bagian-area">
              <li><strong>Kolaborasi:</strong> Bekerja bersama komunitas untuk solusi yang inklusif.</li>
              <li><strong>Inovasi:</strong> Terus mencari cara baru untuk mempermudah akses dan penggunaan teknologi.</li>
              <li><strong>Keberlanjutan:</strong> Fokus pada dampak jangka panjang untuk lingkungan.</li>
            </ul>
          </div>
        </section>

        {/* Teknologi yang Digunakan */}
        <section className="ot-bagian-konten-area">
          <div className="ot-kartu-kaca-area ot-bagian-teknologi">
            <h2 className="ot-judul-bagian-area">
              <span className="ot-ikon-bagian-area">🛠️</span>
              Teknologi yang Digunakan
            </h2>
            <p className="ot-konten-bagian-area">
              Dalam membangun WargaBantuin, kami menggabungkan teknologi modern untuk memastikan performa tinggi, keamanan data, dan pengalaman pengguna yang optimal.
            </p>
            <ul className="ot-konten-bagian-area">
              <li>⚛️ ReactJS – Antarmuka pengguna interaktif berbasis komponen</li>
              <li>⚡ Vite – Build tool super cepat untuk pengembangan React modern</li>
              <li>📦 Node.js & Express – Backend handal untuk API dan logika aplikasi</li>
              <li>🌐 Fetch / Axios – Komunikasi data antara frontend dan backend secara asynchronous</li>
              <li>🗃️ PostgreSQL – Memastikan penyimpanan data yang terstruktur dan handal.</li>
              <li>🎨 Bootstrap – Desain responsif dan UI yang mudah disesuaikan</li>
              <li>🛡️ CORS & Middleware Express – Menjaga keamanan API dan mengelola request/response</li>
              <li>🧩 React Hooks (useState, useEffect) – Pengelolaan state dan efek aplikasi yang efisien</li>
              <li>🌍 Git & GitHub – Kolaborasi tim, version control, dan dokumentasi proyek</li>
            </ul>
          </div>
        </section>

        {/* Ajakan Bergabung / Kontak */}
        <section className="ot-bagian-konten-area">
          <div className="ot-kartu-kaca-area ot-bagian-kolaborasi" style={{ textAlign: 'center' }}>
            <h2 className="ot-judul-bagian-area">
              <span className="ot-ikon-bagian-area">🤝</span>
              Ingin Berkolaborasi?
            </h2>
            <p className="ot-konten-bagian-area">
              Kami terbuka untuk kolaborasi, ide baru, dan dukungan dari komunitas. Jangan ragu untuk menghubungi kami melalui LinkedIn atau WhatsApp.
            </p>
            <a
              href="https://wa.me/6283821751692"
              target="blank"
              rel="noopener noreferrer"
              className="ot-tombol-whatsapp-area"
            >
              Hubungi Kami via WhatsApp
            </a>
          </div>
        </section>

      </main>
    </div>
  );
}
