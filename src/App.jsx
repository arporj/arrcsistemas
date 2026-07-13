
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from '@/pages/HomePage';

import OficinaPage from '@/pages/OficinaPage';
import PadariaPage from '@/pages/PadariaPage';
import CasaDeFestasPage from '@/pages/CasaDeFestasPage';
import ConstrucaoPage from '@/pages/ConstrucaoPage';
import OdontoPage from '@/pages/OdontoPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <>
      <Helmet>
        <title>ARRC Sistemas - Desenvolvimento de Websites e Aplicativos SaaS</title>
        <meta name="description" content="ARRC Sistemas é especializada em criação de websites e aplicativos SaaS. Conheça nosso produto Recebimento Smart e transforme seu negócio digital." />
      </Helmet>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/exemplos/oficina" element={<OficinaPage />} />
        <Route path="/exemplos/padaria" element={<PadariaPage />} />
        <Route path="/exemplos/casa-de-festas" element={<CasaDeFestasPage />} />
        <Route path="/exemplos/construcao" element={<ConstrucaoPage />} />
        <Route path="/exemplos/odonto" element={<OdontoPage />} />
      </Routes>
    </>
  );
}

export default App;
