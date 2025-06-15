import React, { useRef, useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import '../styles/FeatureSection.css';

const features = [
    {
        icon: "📢",
      
        desc: "Laporkan masalah lingkungan di sekitarmu dengan mudah dan cepat",
        link: "/laporan"
    },
    {
        icon: "🗺️",
       
        desc: "Temukan taman kota, bank sampah, dan titik aksi hijau di sekitarmu",
        link: "/peta-lokasi"
    },
    {
        icon: "🔄",
       
        desc: "Gabung program daur ulang dan edukasi pengelolaan sampah berkelanjutan",
        link: "/bank-sampah"
    },
    {
        icon: "🌳",
       
        desc: "Ikuti aksi nyata bersama komunitas untuk menghijaukan bumi",
        link: "/event"
    }
];

export default function FeatureSection() {
    const navigate = useNavigate();
    const controls = useAnimation();
    const trackRef = useRef(null);

    useEffect(() => {
        const animateScroll = async () => {
            const track = trackRef.current;
            const totalWidth = track.scrollWidth;

            while (true) {
                await controls.start({
                    x: [`0`, `-${totalWidth / 2}px`],
                    transition: {
                        duration: 30,
                        ease: "linear"
                    }
                });
                controls.set({ x: 0 });
            }
        };
        animateScroll();
    }, [controls]);

    return (
        <>
            {/* Feature Section */}
            <section className="sek_fitur_ajaib py-5">
                <Container>
                    <h2 className="text-center mb-5 judul_lingkungan_hebat">
                        🌍 Jelajahi Fitur Hijau & Aksi Nyata di <span className="text-success fw-bold">WargaBantuin</span>
                    </h2>

                    <div className="wadah_gulir_ajaib">
                        <motion.div
                            ref={trackRef}
                            className="karusel_kartu_gila"
                            animate={controls}
                        >
                            {features.map((f, i) => (
                                <motion.div
                                    key={i}
                                    className="kartu_fitur_unik text-center shadow-sm border border-success border-2"
                                    onClick={() => navigate(f.link)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyPress={(e) => e.key === 'Enter' && navigate(f.link)}
                                    whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(0, 76, 38, 0.2)" }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Card.Body>
                                        <div className="ikon_fitur_fantastis">{f.icon}</div>
                                        <Card.Title className="text-success fw-bold judul_kartu_hijau">{f.title}</Card.Title>
                                        <Card.Text className="deskripsi_fitur_detail text-muted small">{f.desc}</Card.Text>
                                    </Card.Body>
                                </motion.div>
                            ))}

                            {/* Duplikasi kartu agar animasi terasa seamless */}
                            {features.map((f, i) => (
                                <motion.div
                                    key={`duplicate-${i}`}
                                    className="kartu_fitur_unik text-center shadow-sm border border-success border-2"
                                    onClick={() => navigate(f.link)}
                                    role="button"
                                    tabIndex={0}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Card.Body>
                                        <div className="ikon_fitur_fantastis">{f.icon}</div>
                                        <Card.Title className="text-success fw-bold judul_kartu_hijau">{f.title}</Card.Title>
                                        <Card.Text className="deskripsi_fitur_detail text-muted small">{f.desc}</Card.Text>
                                    </Card.Body>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </Container>
            </section>

            {/* CTA Section */}
            <section className="cta-section-wrapper">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="cta-title">
                        🌱 Mari Bersama Wujudkan Bumi yang Lebih Sehat!
                    </h2>
                    <p className="cta-description">
                        Bergabunglah dengan komunitas kami untuk mengembangkan solusi digital inovatif yang mendukung pelestarian lingkungan dan gaya hidup ramah alam. Bersama, kita ciptakan masa depan yang berkelanjutan.
                    </p>
                  <button
  onClick={() => window.location.href = '/komunitas'}
  className="cta-button"
>
  Gabung Komunitas Sekarang!
</button>

                </div>
            </section>
        </>
    );
}
