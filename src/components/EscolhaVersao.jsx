import React, { createContext, useCallback, useContext, useEffect, useId, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { NIVEIS, caminhoVersao, exemploPorSlug } from '@/conteudo/exemplos';

const ContextoEscolha = createContext(null);

/** Abre o menu de versões de um exemplo a partir de qualquer ponto da home (vitrine ou menu do topo). */
export const useEscolhaVersao = () => {
  const contexto = useContext(ContextoEscolha);
  if (!contexto) throw new Error('useEscolhaVersao precisa estar dentro de EscolhaVersaoProvider');
  return contexto;
};

const SELETOR_FOCAVEL = 'a[href], button:not([disabled])';

const Janela = ({ slug, aoFechar }) => {
  const exemplo = exemploPorSlug(slug);
  const reduzido = useReducedMotion();
  const painelRef = useRef(null);
  const idTitulo = useId();

  useEffect(() => {
    const anterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    painelRef.current?.querySelector('a[href]')?.focus();

    const aoTeclar = (e) => {
      if (e.key === 'Escape') aoFechar();
      if (e.key !== 'Tab') return;
      const focaveis = [...painelRef.current.querySelectorAll(SELETOR_FOCAVEL)];
      const primeiro = focaveis[0];
      const ultimo = focaveis[focaveis.length - 1];
      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
      }
    };
    document.addEventListener('keydown', aoTeclar);
    return () => {
      document.body.style.overflow = anterior;
      document.removeEventListener('keydown', aoTeclar);
    };
  }, [aoFechar]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-end md:items-center justify-center bg-[#0b0c0c]/75 backdrop-blur-sm p-0 md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={aoFechar}
    >
      <motion.div
        ref={painelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={idTitulo}
        className="relative w-full md:max-w-[560px] bg-[#1a1c1c] border border-[#d1c79d]/25 p-6 md:p-8 shadow-2xl max-h-[90dvh] overflow-y-auto"
        initial={reduzido ? false : { y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={reduzido ? undefined : { y: 16, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={aoFechar}
          className="absolute top-3 right-3 h-11 w-11 flex items-center justify-center text-[#ccc6b8] hover:text-[#d1c79d] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d1c79d]"
          aria-label="Fechar"
        >
          <X size={20} />
        </button>
        <p className="font-['JetBrains_Mono'] text-[10px] text-[#d1c79d] uppercase tracking-[0.15em] mb-2">{exemplo.segmento}</p>
        <h2 id={idTitulo} className="font-['Anybody'] font-bold text-2xl md:text-3xl text-[#e2e2e2] pr-10">{exemplo.nome}</h2>
        <p className="font-['Hanken_Grotesk'] text-[#ccc6b8] mt-2 mb-6">Escolha a versão que quer ver. Dá para trocar de versão depois, pela barra no canto da tela.</p>
        <ul className="space-y-3">
          {NIVEIS.map((n, i) => (
            <li key={n.id}>
              <Link
                to={caminhoVersao(slug, n.id)}
                className="group flex items-center gap-4 border border-[#d1c79d]/15 px-4 py-4 hover:border-[#d1c79d]/60 hover:bg-[#d1c79d]/[0.06] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d1c79d]"
              >
                <span className="font-['JetBrains_Mono'] text-xs text-[#d1c79d] w-6" aria-hidden="true">0{i + 1}</span>
                <span className="flex-1">
                  <span className="block font-['Hanken_Grotesk'] font-semibold text-lg text-[#e2e2e2]">{n.nome}</span>
                  <span className="block font-['Hanken_Grotesk'] text-sm text-[#ccc6b8]">{n.resumo}</span>
                </span>
                <ArrowUpRight size={20} className="text-[#ccc6b8] group-hover:text-[#d1c79d] transition-colors" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

export const EscolhaVersaoProvider = ({ children }) => {
  const [slug, setSlug] = useState(null);
  const origemRef = useRef(null);

  const abrir = useCallback((novo) => {
    origemRef.current = document.activeElement;
    setSlug(novo);
  }, []);

  const fechar = useCallback(() => {
    setSlug(null);
    origemRef.current?.focus?.();
  }, []);

  const valor = useMemo(() => ({ abrir }), [abrir]);

  return (
    <ContextoEscolha.Provider value={valor}>
      {children}
      <AnimatePresence>{slug && <Janela key={slug} slug={slug} aoFechar={fechar} />}</AnimatePresence>
    </ContextoEscolha.Provider>
  );
};
