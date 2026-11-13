import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import BarraVersoes from '@/components/exemplos/BarraVersoes';
import { MetaVersao, Revelar } from '@/components/exemplos/Demonstracao';
import { useFormulario } from '@/components/exemplos/useFormulario';
import { irPara } from '@/components/exemplos/utilitarios';
import { contato, depoimento, eventos, foto, incluso } from '@/conteudo/festas';
import { CONVIDADOS_MAXIMO, CONVIDADOS_MINIMO, calcularMontagem, hojeIso, validarPedidoOrcamento } from '@/dominio/festas';
import './FestasProfissional.css';

const galeria = [foto.velas, foto.claro, foto.menu, foto.luzes, foto.moderno, foto.branca];
const vazio = { nome: '', email: '', tipo: '', data: '', convidados: '120', formato: 'banquete' };

const Ampliada = ({ indice, aoMudar, aoFechar }) => {
  const reduzido = useReducedMotion();
  const fecharRef = useRef(null);
  const atual = galeria[indice];
  const passo = (delta) => aoMudar((indice + delta + galeria.length) % galeria.length);

  useEffect(() => {
    fecharRef.current?.focus();
    const anterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const aoTeclar = (e) => {
      if (e.key === 'Escape') aoFechar();
      if (e.key === 'ArrowRight') aoMudar((i) => (i + 1) % galeria.length);
      if (e.key === 'ArrowLeft') aoMudar((i) => (i - 1 + galeria.length) % galeria.length);
    };
    document.addEventListener('keydown', aoTeclar);
    return () => {
      document.body.style.overflow = anterior;
      document.removeEventListener('keydown', aoTeclar);
    };
  }, [aoFechar, aoMudar]);

  return (
    <motion.div
      className="fep-ampliada"
      role="dialog"
      aria-modal="true"
      aria-label={`Foto ${indice + 1} de ${galeria.length}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={aoFechar}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={atual.src}
          src={atual.src}
          alt={atual.alt}
          onClick={(e) => e.stopPropagation()}
          initial={reduzido ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduzido ? undefined : { opacity: 0 }}
          transition={{ duration: 0.25 }}
        />
      </AnimatePresence>
      <p className="fep-ampliada__legenda" onClick={(e) => e.stopPropagation()}>{atual.alt} · {indice + 1} de {galeria.length}</p>
      <button ref={fecharRef} type="button" className="fep-ampliada__fechar" onClick={aoFechar} aria-label="Fechar a foto"><X size={22} /></button>
      <button type="button" className="fep-ampliada__seta fep-ampliada__seta--antes" onClick={(e) => { e.stopPropagation(); passo(-1); }} aria-label="Foto anterior"><ChevronLeft size={26} /></button>
      <button type="button" className="fep-ampliada__seta fep-ampliada__seta--depois" onClick={(e) => { e.stopPropagation(); passo(1); }} aria-label="Próxima foto"><ChevronRight size={26} /></button>
    </motion.div>
  );
};

const Galeria = () => {
  const [aberta, setAberta] = useState(null);
  const origemRef = useRef(null);
  const abrir = (i) => (e) => {
    origemRef.current = e.currentTarget;
    setAberta(i);
  };
  const fechar = useCallback(() => {
    setAberta(null);
    origemRef.current?.focus();
  }, []);

  return (
    <section id="fep-galeria" className="fep-secao">
      <Revelar className="fep-secao__topo">
        <p className="fep-sobrelinha">Galeria</p>
        <h2>Veja o salão montado</h2>
      </Revelar>
      <div className="fep-galeria">
        {galeria.map((f, i) => (
          <button key={f.src} type="button" className="fep-galeria__item" onClick={abrir(i)} aria-label={`Ampliar: ${f.alt}`}>
            <img src={f.src} alt="" loading="lazy" width="1600" height="1067" />
            <span aria-hidden="true"><Expand size={18} /></span>
          </button>
        ))}
      </div>
      <AnimatePresence>{aberta !== null && <Ampliada indice={aberta} aoMudar={setAberta} aoFechar={fechar} />}</AnimatePresence>
    </section>
  );
};

const montagemOuNada = (convidados, formato) => {
  const n = Number(convidados);
  if (!Number.isInteger(n) || n < CONVIDADOS_MINIMO || n > CONVIDADOS_MAXIMO) return null;
  return calcularMontagem(n, formato);
};

const Orcamento = ({ tipoInicial }) => {
  const { valores, erros, enviado, definir, enviar, recomecar, ligar, alterar } = useFormulario(vazio, validarPedidoOrcamento);
  const montagem = montagemOuNada(valores.convidados, valores.formato);

  useEffect(() => {
    // Reage só ao tipo escolhido nos cartões de evento; definir é recriado a cada render.
    if (tipoInicial) definir('tipo', tipoInicial);
  }, [tipoInicial]);

  if (enviado) {
    return (
      <div className="fep-resposta" role="status">
        <span className="fep-resposta__icone"><Check size={26} aria-hidden="true" /></span>
        <h3>Pedido preenchido, {valores.nome.trim().split(' ')[0]}.</h3>
        <p>Este é um site de demonstração, então nada foi enviado nem guardado. No site de verdade, a equipe da casa responderia por e-mail com o orçamento.</p>
        <button type="button" className="fep-link" onClick={recomecar}>Fazer outro pedido</button>
      </div>
    );
  }

  const erroDe = (campo) => erros[campo] && <p id={`fep-${campo}-erro`} className="fep-erro" role="alert">{erros[campo]}</p>;

  return (
    <form className="fep-form" onSubmit={enviar} noValidate>
      <div className="fep-form__duas">
        <div className="fep-campo">
          <label htmlFor="fep-nome">Seu nome</label>
          <input {...ligar('nome', 'fep')} type="text" autoComplete="name" />
          {erroDe('nome')}
        </div>
        <div className="fep-campo">
          <label htmlFor="fep-email">E-mail</label>
          <input {...ligar('email', 'fep')} type="email" inputMode="email" autoComplete="email" />
          {erroDe('email')}
        </div>
      </div>
      <div className="fep-form__duas">
        <div className="fep-campo">
          <label htmlFor="fep-tipo">Tipo de evento</label>
          <select {...ligar('tipo', 'fep')}>
            <option value="">Escolha uma opção</option>
            {eventos.map((ev) => <option key={ev.id} value={ev.id}>{ev.nome}</option>)}
            <option value="outro">Outro</option>
          </select>
          {erroDe('tipo')}
        </div>
        <div className="fep-campo">
          <label htmlFor="fep-data">Data da festa</label>
          <input {...ligar('data', 'fep')} type="date" min={hojeIso()} />
          {erroDe('data')}
        </div>
      </div>
      <div className="fep-form__duas">
        <div className="fep-campo">
          <label htmlFor="fep-convidados">Convidados</label>
          <input {...ligar('convidados', 'fep')} type="number" inputMode="numeric" min={CONVIDADOS_MINIMO} max={CONVIDADOS_MAXIMO} step="1" />
          {erroDe('convidados')}
        </div>
        <fieldset className="fep-formato">
          <legend>Formato</legend>
          <div>
            {[['banquete', 'Jantar à mesa'], ['coquetel', 'Coquetel']].map(([id, nome]) => (
              <label key={id} className={valores.formato === id ? 'fep-formato__opcao fep-formato__opcao--ativa' : 'fep-formato__opcao'}>
                <input type="radio" name="fep-formato" value={id} checked={valores.formato === id} onChange={alterar('formato')} />
                {nome}
              </label>
            ))}
          </div>
        </fieldset>
      </div>
      <p className="fep-montagem" aria-live="polite">
        {montagem
          ? <>Para {valores.convidados} convidados: <strong>{montagem.mesas} mesas</strong> de {montagem.pessoasPorMesa} lugares no <strong>{montagem.salao.nome}</strong>.</>
          : `Informe de ${CONVIDADOS_MINIMO} a ${CONVIDADOS_MAXIMO} convidados para ver a montagem.`}
      </p>
      <button type="submit" className="fep-botao">Pedir orçamento <ArrowRight size={18} aria-hidden="true" /></button>
    </form>
  );
};

const FestasProfissional = () => {
  const [tipo, setTipo] = useState('');
  const escolher = (id) => (e) => {
    setTipo(id);
    irPara('fep-orcamento')(e);
  };

  return (
    <div className="fep">
      <MetaVersao titulo={contato.nome} descricao="Versão Profissional do site de exemplo para casa de festas: galeria ampliável, tipos de evento e pedido de orçamento com cálculo de mesas." />
      <a href="#fep-conteudo" className="fep-pular">Pular para o conteúdo</a>

      <nav className="fep-nav" aria-label="Principal">
        <span className="fep-nav__marca">{contato.marca}</span>
        <div className="fep-nav__links">
          <a href="#fep-eventos" onClick={irPara('fep-eventos')}>Eventos</a>
          <a href="#fep-galeria" onClick={irPara('fep-galeria')}>Galeria</a>
          <a href="#fep-orcamento" onClick={irPara('fep-orcamento')} className="fep-nav__destaque">Orçamento</a>
        </div>
      </nav>

      <header className="fep-abertura">
        <Revelar className="fep-abertura__texto">
          <p className="fep-sobrelinha">Casa de festas em Rio das Ostras</p>
          <h1>Sua festa num salão claro, com <em>tudo incluso.</em></h1>
          <p>Três salões de 120 a 400 convidados, buffet próprio e uma equipe que cuida de cada detalhe do dia.</p>
          <a href="#fep-orcamento" onClick={irPara('fep-orcamento')} className="fep-botao">Pedir orçamento <ArrowRight size={18} aria-hidden="true" /></a>
        </Revelar>
        <img src={foto.salao.src} alt={foto.salao.alt} width="1600" height="1067" className="fep-abertura__foto" />
      </header>

      <main id="fep-conteudo">
        <section id="fep-eventos" className="fep-secao">
          <Revelar className="fep-secao__topo">
            <p className="fep-sobrelinha">Eventos</p>
            <h2>Para cada ocasião, uma montagem</h2>
          </Revelar>
          <div className="fep-eventos">
            {eventos.map((ev, i) => (
              <Revelar key={ev.id} como="article" atraso={i * 0.06} className="fep-evento">
                <img src={ev.foto.src} alt={ev.foto.alt} loading="lazy" width="1600" height="1067" />
                <div>
                  <h3>{ev.nome}</h3>
                  <p>{ev.texto}</p>
                  <a href="#fep-orcamento" onClick={escolher(ev.id)} className="fep-link">Orçar {ev.nome.toLowerCase()} <ArrowRight size={16} aria-hidden="true" /></a>
                </div>
              </Revelar>
            ))}
          </div>
        </section>

        <section className="fep-incluso">
          <Revelar>
            <h2>Já incluso no aluguel</h2>
            <ul>{incluso.map((i) => <li key={i}><Check size={18} aria-hidden="true" /> {i}</li>)}</ul>
          </Revelar>
          <Revelar como="blockquote" atraso={0.1}>
            <p>“{depoimento.texto}”</p>
            <cite>{depoimento.autor}</cite>
          </Revelar>
        </section>

        <Galeria />

        <section id="fep-orcamento" className="fep-secao fep-orcamento">
          <div className="fep-orcamento__intro">
            <p className="fep-sobrelinha">Orçamento</p>
            <h2>Conte como você imagina a festa</h2>
            <p>Mostramos na hora quantas mesas serão necessárias e em qual salão a festa cabe. O orçamento completo chega por e-mail.</p>
            <p className="fep-orcamento__visitas">{contato.visitas}.</p>
          </div>
          <div className="fep-orcamento__caixa"><Orcamento tipoInicial={tipo} /></div>
        </section>
      </main>

      <footer className="fep-rodape">
        <p className="fep-rodape__marca">{contato.marca}</p>
        <p>{contato.endereco}</p>
        <p><a href={contato.telefoneLink}>{contato.telefone}</a> · <a href={`mailto:${contato.email}`}>{contato.email}</a></p>
        <p className="fep-rodape__nota">Site de exemplo. A casa, os salões, o depoimento e os contatos são fictícios. Fotos: Pexels. <Link to="/">Criado pela ARRC Sistemas</Link>.</p>
      </footer>

      <BarraVersoes slug="casa-de-festas" nivel="profissional" />
    </div>
  );
};

export default FestasProfissional;
