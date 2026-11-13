
import React, { Suspense, lazy, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import { EsqueletoPagina, ErroCarregamento } from '@/components/exemplos/CarregamentoPagina';
import { caminhoVersao, exemploPorSlug } from '@/conteudo/exemplos';

// Cada site de exemplo carrega só o próprio código: a versão Essencial não baixa o 3D da Premium.
const paginas = {
  oficina: {
    essencial: lazy(() => import('@/pages/oficina/OficinaEssencial')),
    profissional: lazy(() => import('@/pages/oficina/OficinaProfissional')),
    premium: lazy(() => import('@/pages/OficinaPage')),
  },
  padaria: {
    essencial: lazy(() => import('@/pages/padaria/PadariaEssencial')),
    profissional: lazy(() => import('@/pages/padaria/PadariaProfissional')),
    premium: lazy(() => import('@/pages/PadariaPage')),
  },
  'casa-de-festas': {
    essencial: lazy(() => import('@/pages/festas/FestasEssencial')),
    profissional: lazy(() => import('@/pages/festas/FestasProfissional')),
    premium: lazy(() => import('@/pages/CasaDeFestasPage')),
  },
  construcao: {
    essencial: lazy(() => import('@/pages/construcao/ConstrucaoEssencial')),
    profissional: lazy(() => import('@/pages/construcao/ConstrucaoProfissional')),
    premium: lazy(() => import('@/pages/ConstrucaoPage')),
  },
  odonto: {
    essencial: lazy(() => import('@/pages/odonto/OdontoEssencial')),
    profissional: lazy(() => import('@/pages/odonto/OdontoProfissional')),
    premium: lazy(() => import('@/pages/OdontoPage')),
  },
};

const rotasExemplos = Object.entries(paginas).flatMap(([slug, versoes]) =>
  Object.entries(versoes).map(([nivel, Pagina]) => ({ slug, nivel, Pagina, caminho: caminhoVersao(slug, nivel) })),
);

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
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
        {rotasExemplos.map(({ slug, nivel, Pagina, caminho }) => (
          <Route
            key={caminho}
            path={caminho}
            element={(
              <ErroCarregamento>
                <Suspense fallback={<EsqueletoPagina fundo={exemploPorSlug(slug).fundo} />}>
                  <Pagina nivel={nivel} />
                </Suspense>
              </ErroCarregamento>
            )}
          />
        ))}
      </Routes>
    </>
  );
}

export default App;
