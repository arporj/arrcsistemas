
import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Portfolio from '@/components/Portfolio';
import ServicesShowcase from '@/components/ServicesShowcase';
import Footer from '@/components/Footer';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="arrc-page min-h-screen flex flex-col antialiased selection:bg-[#d1c79d] selection:text-[#373013]">
      <Helmet>
        <title>ARRC Sistemas - Desenvolvimento de Websites e Aplicativos SaaS</title>
      </Helmet>
      <div className="arrc-noise"></div>
      <Header />
      <main className="flex-grow pt-32 relative z-10">
        <Hero />
        <Portfolio />
        <ServicesShowcase />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
