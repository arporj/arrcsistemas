import { useEffect, useState } from 'react';

const QUERY_TELA_LARGA = '(min-width: 900px)';

export const irPara = (id) => (e) => {
  e.preventDefault();
  const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduzido ? 'auto' : 'smooth' });
};

export const mascararTelefone = (valor) => {
  const d = valor.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : '';
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

export const telefoneValido = (valor) => valor.replace(/\D/g, '').length >= 10;

export const emailValido = (valor) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim());

export const formatarReais = (valor) => valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export const useTelaLarga = () => {
  const [larga, setLarga] = useState(() => window.matchMedia(QUERY_TELA_LARGA).matches);
  useEffect(() => {
    const consulta = window.matchMedia(QUERY_TELA_LARGA);
    const aoMudar = (e) => setLarga(e.matches);
    consulta.addEventListener('change', aoMudar);
    return () => consulta.removeEventListener('change', aoMudar);
  }, []);
  return larga;
};
