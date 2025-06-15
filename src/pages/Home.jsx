import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

import HeroSection from '../components/HeroSection';
import FeatureSection from '../components/FeatureSection';
import VideoSection from '../components/VideoSection';
import StatsSection from '../components/StatsSection';
import QuotesSection from '../components/QuotesSection';
import CTASection from '../components/CTASection';

function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div style={{ background: '#f8fafc', color: '#1e293b' }}>
      
      <HeroSection />
       <VideoSection />
      <StatsSection />
        <FeatureSection />
      <QuotesSection />
      <CTASection />
    </div>
  );
}

export default Home;
