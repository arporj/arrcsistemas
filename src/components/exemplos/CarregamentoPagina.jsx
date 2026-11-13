import React from 'react';
import './exemplos.css';

const ehEscuro = (cor) => {
  const n = parseInt(cor.replace('#', ''), 16);
  const luminancia = 0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255);
  return luminancia < 110;
};

/** Esqueleto na cor de fundo do site que está carregando, para a troca de tela ser imediata. */
export const EsqueletoPagina = ({ fundo = '#f4f2ee' }) => (
  <div
    className={`arrc-esqueleto${ehEscuro(fundo) ? ' arrc-esqueleto--escuro' : ''}`}
    style={{ '--esq-fundo': fundo }}
    role="status"
    aria-label="Carregando a página"
  >
    <i className="arrc-esqueleto__topo" />
    <i className="arrc-esqueleto__titulo" />
    <i className="arrc-esqueleto__titulo arrc-esqueleto__titulo--curto" />
    <i className="arrc-esqueleto__linha" />
    <i className="arrc-esqueleto__linha" />
    <i className="arrc-esqueleto__foto" />
  </div>
);

/**
 * Mostra uma mensagem simples quando o código da página não carrega
 * (por exemplo, internet caiu ou o site foi atualizado no meio da visita).
 */
export class ErroCarregamento extends React.Component {
  constructor(props) {
    super(props);
    this.state = { falhou: false };
  }

  static getDerivedStateFromError() {
    return { falhou: true };
  }

  componentDidCatch(erro, info) {
    console.error('Falha ao carregar a página de exemplo', erro, info.componentStack);
  }

  render() {
    if (!this.state.falhou) return this.props.children;
    return (
      <div className="arrc-erro" role="alert">
        <h1>Não conseguimos abrir esta página.</h1>
        <p>Pode ser a conexão com a internet. Confira se está conectado e tente de novo.</p>
        <button type="button" onClick={() => window.location.reload()}>Tentar de novo</button>
      </div>
    );
  }
}
