
import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import BarraVersoes from '@/components/exemplos/BarraVersoes';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Clock, MapPin, Minus, Phone, Plus } from 'lucide-react';
import Farinha from '@/components/padaria/Farinha';
import { formatarReais, irPara } from '@/components/exemplos/utilitarios';
import { ABRE, FECHA, cardapio, contato, depoimento, fornadas } from '@/conteudo/padaria';
import { ajustarQuantidade, horaEmSaoPaulo, resumirEncomenda, situacaoAgora } from '@/dominio/padaria';
import './PadariaPage.css';

const HORA_INICIAL = 4;
const HORA_FINAL = 20;
const itensEncomenda = cardapio.filter((c) => c.encomenda);

const useTemaPorSecao = (raizRef) => {
  const [tema, setTema] = useState('madrugada');
  useEffect(() => {
    const secoes = raizRef.current.querySelectorAll('[data-tema]');
    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => {
        if (e.isIntersecting) setTema(e.target.dataset.tema);
      });
    }, { rootMargin: '-50% 0px -50% 0px' });
    secoes.forEach((s) => observador.observe(s));
    return () => observador.disconnect();
  }, [raizRef]);
  return tema;
};

const Surgir = ({ children, atraso = 0, className }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 36 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-12% 0px' }}
    transition={{ type: 'spring', stiffness: 70, damping: 18, delay: atraso }}
  >
    {children}
  </motion.div>
);

const RelogioDoDia = () => {
  const { scrollYProgress } = useScroll();
  const suave = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });
  const angulo = useTransform(suave, [0, 1], [-90, 90]);
  const hora = useTransform(suave, (p) => {
    const minutos = Math.round((HORA_INICIAL + Math.min(Math.max(p, 0), 1) * (HORA_FINAL - HORA_INICIAL)) * 6) * 10;
    return `${String(Math.floor(minutos / 60)).padStart(2, '0')}h${String(minutos % 60).padStart(2, '0')}`;
  });

  return (
    <div className="pd-relogio" aria-hidden="true">
      <svg viewBox="0 0 80 44">
        <path d="M6 40 A34 34 0 0 1 74 40" />
        <motion.g style={{ rotate: angulo, originX: '40px', originY: '40px' }}>
          <circle cx="40" cy="6" r="5.5" />
        </motion.g>
      </svg>
      <motion.span>{hora}</motion.span>
    </div>
  );
};

const SeloGiratorio = ({ reduzido }) => {
  const { scrollY } = useScroll();
  const giro = useTransform(scrollY, [0, 3000], [0, 360]);
  return (
    <motion.svg viewBox="0 0 120 120" className="pd-selo" style={reduzido ? undefined : { rotate: giro }} aria-hidden="true">
      <defs>
        <path id="pd-circulo" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
      </defs>
      <circle cx="60" cy="60" r="59" />
      <text><textPath href="#pd-circulo">desde 1980 · Rio das Ostras · forno aceso ·</textPath></text>
    </motion.svg>
  );
};

const Encomenda = () => {
  const [quantidades, setQuantidades] = useState({});
  const [confirmada, setConfirmada] = useState(false);

  const alterar = (id, delta) => {
    setConfirmada(false);
    setQuantidades((atuais) => ({ ...atuais, [id]: ajustarQuantidade(atuais[id], delta) }));
  };

  const { total, itens } = resumirEncomenda(itensEncomenda, quantidades);

  return (
    <div className="pd-encomenda">
      <ul className="pd-menu">
        {itensEncomenda.map((c) => {
          const q = quantidades[c.id] || 0;
          return (
            <li key={c.id} className={q > 0 ? 'pd-menu__item pd-menu__item--ativo' : 'pd-menu__item'}>
              <div className="pd-menu__texto">
                <h3>{c.nome}</h3>
                <p>{c.detalhe}</p>
              </div>
              <span className="pd-menu__preco">{formatarReais(c.preco)}</span>
              <div className="pd-contador">
                <button type="button" onClick={() => alterar(c.id, -1)} disabled={q === 0} aria-label={`Tirar um: ${c.nome}`}><Minus size={18} /></button>
                <span aria-live="polite" aria-label={`${q} na encomenda: ${c.nome}`}>{q}</span>
                <button type="button" onClick={() => alterar(c.id, 1)} aria-label={`Colocar mais um: ${c.nome}`}><Plus size={18} /></button>
              </div>
            </li>
          );
        })}
      </ul>

      <aside className="pd-sacola" aria-label="Resumo da encomenda">
        <p className="pd-sacola__titulo">Sua encomenda</p>
        {itens === 0 ? (
          <p className="pd-sacola__vazia">Ainda está vazia. Use o botão + para escolher o que vai levar.</p>
        ) : (
          <>
            <p className="pd-sacola__itens">{itens} {itens === 1 ? 'item' : 'itens'}</p>
            <motion.p key={total} className="pd-sacola__total" initial={{ scale: 0.92 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 18 }}>
              {formatarReais(total)}
            </motion.p>
            <button type="button" className="pd-botao" onClick={() => setConfirmada(true)}>Reservar para retirar</button>
          </>
        )}
        {confirmada && itens > 0 && (
          <p className="pd-sacola__aviso" role="status">Este é um site de demonstração, então a encomenda não foi enviada. No site de verdade, ela chegaria ao balcão na hora.</p>
        )}
      </aside>
    </div>
  );
};

const PadariaPage = () => {
  const raizRef = useRef(null);
  const tema = useTemaPorSecao(raizRef);
  const reduzido = useReducedMotion();
  const [situacao] = useState(() => situacaoAgora(horaEmSaoPaulo()));

  const historiaRef = useRef(null);
  const { scrollYProgress: progressoHistoria } = useScroll({ target: historiaRef, offset: ['start end', 'center center'] });
  const inclinacao = useTransform(progressoHistoria, [0, 1], [-9, -2]);

  const fornadaRef = useRef(null);
  const { scrollYProgress: progressoFornada } = useScroll({ target: fornadaRef, offset: ['start end', 'end start'] });
  const deslocamento = useTransform(progressoFornada, [0, 1], ['-9%', '9%']);

  return (
    <div ref={raizRef} className={`padaria-page pd-tema-${tema}`}>
      <Helmet>
        <title>Padaria do Seu Antônio | Exemplo ARRC Sistemas</title>
        <meta name="description" content="Exemplo de site para padaria, com cores que seguem a hora do dia e encomenda com total automático, desenvolvido pela ARRC Sistemas." />
      </Helmet>

      <a href="#pd-conteudo" className="pd-pular">Pular para o conteúdo</a>
      <BarraVersoes slug="padaria" nivel="premium" />
      <RelogioDoDia />

      <nav className="pd-nav" aria-label="Principal">
        <span className="pd-nav__marca">Seu Antônio</span>
        <div className="pd-nav__links">
          <a href="#pd-cardapio" onClick={irPara('pd-cardapio')}>Cardápio</a>
          <a href="#pd-historia" onClick={irPara('pd-historia')}>História</a>
          <a href="#pd-visita" onClick={irPara('pd-visita')}>Visitar</a>
        </div>
      </nav>

      <main id="pd-conteudo">
        <header data-tema="madrugada" className="pd-abertura">
          <Farinha />
          <div className="pd-abertura__texto">
            <p className="pd-hora">04h00. A rua dorme, o forno não.</p>
            <h1>Tradição em cada <em>pedaço.</em></h1>
            <p className="pd-abertura__apoio">Há mais de quatro décadas, a família do Seu Antônio acorda antes da cidade para o pão sair quente em Rio das Ostras.</p>
            <p className="pd-agora">
              <Clock size={16} aria-hidden="true" />
              <span><strong>{situacao.aberto ? 'Aberto agora.' : 'Fechado agora.'}</strong> {situacao.texto}</span>
            </p>
          </div>
          <motion.figure
            className="pd-arco"
            initial={reduzido ? false : { clipPath: 'inset(100% 0 0 0 round 999px 999px 0 0)' }}
            animate={{ clipPath: 'inset(0% 0 0 0 round 999px 999px 0 0)' }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src="/images/exemplos/padaria/pao-farinha.jpg" alt="Pão artesanal dourado, com farinha e cortes na casca" width="1300" height="1900" />
          </motion.figure>
        </header>

        <section data-tema="manha" className="pd-fornada" ref={fornadaRef}>
          <Surgir className="pd-fornada__titulo">
            <p className="pd-hora">06h30. Primeira fornada no balcão.</p>
            <h2>A fila chega com o <em>cheiro</em> do pão.</h2>
          </Surgir>
          <div className="pd-fornada__foto">
            <motion.img
              src="/images/exemplos/padaria/fornada.jpg"
              alt="Dezenas de pães artesanais recém-saídos do forno"
              loading="lazy"
              width="1600"
              height="1067"
              style={reduzido ? undefined : { y: deslocamento }}
            />
            <SeloGiratorio reduzido={reduzido} />
          </div>
          <ol className="pd-horarios" aria-label="Horários das fornadas">
            {fornadas.map((f) => (
              <li key={`${f.hora}-${f.nome}`}><strong>{f.hora}h</strong> {f.nome}</li>
            ))}
          </ol>
        </section>

        <section id="pd-cardapio" data-tema="meiodia" className="pd-cardapio">
          <Surgir>
            <p className="pd-hora">12h00. Hora de escolher.</p>
            <h2>Monte a sua <em>encomenda.</em></h2>
            <p className="pd-cardapio__apoio">Escolha o que vai levar e veja o total na hora. Nós separamos para você retirar no balcão.</p>
          </Surgir>
          <Encomenda />
        </section>

        <section id="pd-historia" data-tema="tarde" className="pd-historia" ref={historiaRef}>
          <motion.figure className="pd-historia__foto" style={reduzido ? undefined : { rotate: inclinacao }}>
            <img src="/images/exemplos/padaria/maos-pao.jpg" alt="Mãos de padeiro segurando um pão de casca dourada" loading="lazy" width="1600" height="1067" />
          </motion.figure>
          <Surgir className="pd-historia__texto">
            <p className="pd-hora">16h00. O forno descansa, a conversa não.</p>
            <h2>Começou com um forno a lenha, em <em>1980.</em></h2>
            <p>A Padaria do Seu Antônio nasceu pequena, no coração de Rio das Ostras. As receitas continuam as mesmas, e cada massa ainda fermenta o tempo que precisa.</p>
            <blockquote>
              <p>“{depoimento.texto}”</p>
              <cite>{depoimento.autor}</cite>
            </blockquote>
          </Surgir>
        </section>

        <section id="pd-visita" data-tema="noite" className="pd-visita">
          <Surgir>
            <p className="pd-hora">19h30. Última chance de levar pão para casa.</p>
            <h2>Passa <em>aqui.</em></h2>
          </Surgir>
          <div className="pd-visita__dados">
            <Surgir><MapPin aria-hidden="true" /><h3>Endereço</h3><p>{contato.endereco}<br />{contato.cidade}</p></Surgir>
            <Surgir atraso={0.08}><Clock aria-hidden="true" /><h3>Horário</h3><p>Todos os dias<br />das {ABRE}h às {FECHA}h</p></Surgir>
            <Surgir atraso={0.16}><Phone aria-hidden="true" /><h3>Telefone</h3><p><a href={contato.telefoneLink}>{contato.telefone}</a></p></Surgir>
          </div>
        </section>
      </main>

      <footer className="pd-rodape">
        <p>Site de exemplo. A padaria, os preços, os horários e os dados de contato são fictícios. Fotos: Pexels.</p>
        <Link to="/">Criado pela ARRC Sistemas</Link>
      </footer>
    </div>
  );
};

export default PadariaPage;
