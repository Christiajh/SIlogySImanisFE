import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import '../styles/hero.css'; // Pastikan path ini benar

function HeroSection() {
  return (
    <section className="sek-hero-8d2x9j position-relative overflow-hidden">
      {/* Background video */}
      <div className="vid-wrap-p7q0m1">
        <video
          className="vid-bg-n4s5t6"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/hero-chatbot.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Overlay gelap */}
      <div className="overlay-dark-w1e2r3"></div>

      {/* Konten utama */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="konten-utama-a7b8c9 text-center py-5 px-3 position-relative z-1"
      >
        <h1 className="judul-besar-f0g1h2 fw-bold mb-4 text-white">
          🌱 Jelajahi Aksi Hijau & Inovasi Ramah Lingkungan bersama{" "}
          <span style={{ color: "#198754" }}>WargaBantuin</span>
        </h1>
        <p className="paragraf-lead-j3k4l5 mb-4 text-light">
          🌍 Ikuti perjalanan warga dalam menciptakan perubahan nyata dari pelestarian alam,
          pengelolaan sampah, hingga gaya hidup berkelanjutan demi bumi yang lebih sehat dan masa
          depan yang lestari.
        </p>
     <button
  onClick={() => window.location.href = '/event'}
  className="btn-mulai-z6x7c8 d-inline-flex align-items-center gap-2 px-4 py-2 fw-bold"
  style={{
    borderRadius: "10px",
    fontSize: "1rem",
    transition: "all 0.3s ease"
  }}
>
  Mulai Jelajahi Sekarang <ArrowRightIcon className="h-5 w-5" />
</button>
      </motion.div>
    </section>
  );
}

export default HeroSection;