import React, { useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, ChevronUp } from 'lucide-react';
import { NIVEIS, caminhoVersao, exemploPorSlug, nomeDoNivel } from '@/conteudo/exemplos';
import './exemplos.css';

/**
 * Barra fixa da ARRC sobre os sites de exemplo: volta para a home e troca a versão
 * (Essencial, Profissional ou Premium) durante a apresentação ao cliente.
 */
const BarraVersoes = ({ slug, nivel }) => {
  const exemplo = exemploPorSlug(slug);
  const [aberta, setAberta] = useState(false);
  const raizRef = useRef(null);
  const botaoRef = useRef(null);
  const idMenu = useId();

  useEffect(() => {
    if (!aberta) return undefined;
    const aoClicarFora = (e) => {
      if (!raizRef.current?.contains(e.target)) setAberta(false);
    };
    const aoTeclar = (e) => {
      if (e.key === 'Escape') {
        setAberta(false);
        botaoRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', aoClicarFora);
    document.addEventListener('keydown', aoTeclar);
    return () => {
      document.removeEventListener('pointerdown', aoClicarFora);
      document.removeEventListener('keydown', aoTeclar);
    };
  }, [aberta]);

  return (
    <div ref={raizRef} className="arrc-versoes">
      {aberta && (
        <div id={idMenu} className="arrc-versoes__menu">
          <p className="arrc-versoes__titulo">{exemplo.nome}</p>
          <ul>
            {NIVEIS.map((n) => (
              <li key={n.id}>
                <Link
                  to={caminhoVersao(slug, n.id)}
                  className="arrc-versoes__opcao"
                  aria-current={n.id === nivel ? 'page' : undefined}
                  onClick={() => setAberta(false)}
                >
                  <span className="arrc-versoes__nome">
                    {n.nome}
                    {n.id === nivel && <Check size={15} aria-label="versão atual" />}
                  </span>
                  <span className="arrc-versoes__resumo">{n.resumo}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="arrc-versoes__barra">
        <Link to="/#exemplos" className="arrc-versoes__voltar" aria-label="Voltar para a ARRC Sistemas">
          <ArrowLeft size={16} aria-hidden="true" /> <span>ARRC</span>
        </Link>
        <button
          ref={botaoRef}
          type="button"
          className="arrc-versoes__botao"
          aria-expanded={aberta}
          aria-controls={aberta ? idMenu : undefined}
          onClick={() => setAberta(!aberta)}
        >
          <span className="arrc-versoes__rotulo">Versão</span> {nomeDoNivel(nivel)}
          <ChevronUp size={16} aria-hidden="true" className={aberta ? '' : 'arrc-versoes__seta--fechada'} />
        </button>
      </div>
    </div>
  );
};

export default BarraVersoes;
