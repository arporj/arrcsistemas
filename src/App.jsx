import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <>
      <Helmet>
        <title>ARRC Sistemas - Desenvolvimento de Websites e Aplicativos SaaS</title>
        <meta name="description" content="ARRC Sistemas é especializada em criação de websites e aplicativos SaaS. Conheça nosso produto Recebimento Smart e transforme seu negócio digital." />
      </Helmet>
      <div className="min-h-screen">
        <Header />
        <Hero />
        <Services />
        <About />
        <Contact />
        <Footer />
        <Toaster />
      </div>
    </>
  );
}

export default App;