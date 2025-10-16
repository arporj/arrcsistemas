
import React from 'react';
import { Helmet } from 'react-helmet';
import { Routes, Route } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import HomePage from '@/pages/HomePage';

import OficinaPage from '@/pages/OficinaPage';
import PadariaPage from '@/pages/PadariaPage';
import CasaDeFestasPage from '@/pages/CasaDeFestasPage';
import ConstrucaoPage from '@/pages/ConstrucaoPage';
import OdontoPage from '@/pages/OdontoPage';

function App() {
  return (
    <>
      <Helmet>
        <title>ARRC Sistemas - Desenvolvimento de Websites e Aplicativos SaaS</title>
        <meta name="description" content="ARRC Sistemas é especializada em criação de websites e aplicativos SaaS. Conheça nosso produto Recebimento Smart e transforme seu negócio digital." />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/exemplos/oficina" element={<OficinaPage />} />
            <Route path="/exemplos/padaria" element={<PadariaPage />} />
            <Route path="/exemplos/casa-de-festas" element={<CasaDeFestasPage />} />
            <Route path="/exemplos/construcao" element={<ConstrucaoPage />} />
            <Route path="/exemplos/odonto" element={<OdontoPage />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </>
  );
}

export default App;
