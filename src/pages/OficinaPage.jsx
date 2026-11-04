
import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import { AlertTriangle, ArrowLeft, ArrowRight, ArrowUpRight, Check, Eye, Menu, X } from 'lucide-react';
import EngrenagensCanvas from '@/components/oficina/EngrenagensCanvas';
import ArteServico from '@/components/oficina/ArteServico';
import Torquimetro from '@/components/oficina/Torquimetro';
import { irPara, mascararTelefone, telefoneValido, useTelaLarga } from '@/components/exemplos/utilitarios';
import './OficinaPage.css';

const servicos = [
  { n: '01', arte: 'revisao', titulo: 'Revisão completa', texto: 'Olhamos 40 pontos do carro com scanner e seguimos o aperto indicado no manual do fabricante. Você recebe a lista do que está bom e do que precisa de atenção.' },
  { n: '02', arte: 'freios', titulo: 'Freios', texto: 'Troca de pastilhas, sangria do fluido, retífica de discos e avaliação das pinças, para o pedal voltar a responder como deve.' },
  { n: '03', arte: 'suspensao', titulo: 'Suspensão e direção', texto: 'Alinhamento 3D, balanceamento e inspeção de amortecedores, buchas e terminais. O carro para de puxar e de bater em lombada.' },
  { n: '04', arte: 'eletrica', titulo: 'Parte elétrica', texto: 'Diagnóstico eletrônico, reparo de chicotes e teste de bateria, alternador e módulos, para achar a causa da luz acesa no painel.' },
  { n: '05', arte: 'oleo', titulo: 'Troca de óleo', texto: 'Óleo sintético e filtros originais, com limpeza do motor quando necessária e análise do óleo usado.' },
];

const laudo = [
  { item: 'Pastilhas dianteiras', leitura: '7,2 mm', situacao: 'Em dia', nivel: 'ok' },
  { item: 'Fluido de freio', leitura: '3,1% de água', situacao: 'Trocar agora', nivel: 'trocar' },
  { item: 'Bateria', leitura: '12,4 V', situacao: 'Observar', nivel: 'observar' },
  { item: 'Amortecedores', leitura: '68% de carga', situacao: 'Em dia', nivel: 'ok' },
  { item: 'Óleo do motor', leitura: '6.200 km de uso', situacao: 'Em dia', nivel: 'ok' },
];

const iconesSituacao = { ok: Check, trocar: AlertTriangle, observar: Eye };

const numeros = [
  { valor: 40, prefixo: '', titulo: 'pontos verificados', texto: 'em cada revisão completa, com scanner de nível de concessionária.' },
  { valor: 15, prefixo: '+', titulo: 'anos de oficina', texto: 'trabalhando em carros de passeio e em preparação para pista.' },
  { valor: 15, prefixo: '<', titulo: 'minutos para responder', texto: 'depois que você envia o pedido de orçamento.' },
];

const tiposServico = ['Revisão programada', 'Diagnóstico de falha', 'Manutenção corretiva', 'Melhoria de desempenho'];
const faixaServicos = ['Revisão', 'Freios', 'Suspensão', 'Elétrica', 'Óleo', 'Diagnóstico'];
const manifesto = 'Mecânico bom não adivinha. Ele mede, mostra a peça e explica o que precisa ser feito agora e o que pode esperar.';
const formularioVazio = { nome: '', whatsapp: '', veiculo: '', tipo: tiposServico[0], descricao: '' };

const validarFormulario = ({ nome, whatsapp, veiculo }) => {
  const erros = {};
  if (nome.trim().length < 2) erros.nome = 'Escreva seu nome para sabermos com quem falar.';
  if (!telefoneValido(whatsapp)) erros.whatsapp = 'Confira o número: faltam dígitos. Exemplo: (22) 99999-9999.';
  if (veiculo.trim().length < 2) erros.veiculo = 'Conte qual é o carro. Exemplo: Onix 2019.';
  return erros;
};

const moverHolofote = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--of-x', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--of-y', `${e.clientY - r.top}px`);
};

const Navegacao = () => {
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => setRolou(y > 40));

  const links = [['servicos', 'Serviços'], ['laudo', 'Como trabalhamos'], ['orcamento', 'Orçamento']];
  const clicar = (id) => (e) => {
    setAberto(false);
    irPara(id)(e);
  };

  return (
    <nav className={`of-nav${rolou || aberto ? ' of-nav--solida' : ''}`} aria-label="Principal">
      <div className="of-nav__linha">
        <a href="#inicio" onClick={clicar('inicio')} className="of-nav__marca">Bom Torque</a>
        <div className="of-nav__links">
          {links.slice(0, 2).map(([id, nome]) => <a key={id} href={`#${id}`} onClick={clicar(id)}>{nome}</a>)}
          <a href="#orcamento" onClick={clicar('orcamento')} className="of-botao of-botao--pequeno">Pedir orçamento</a>
        </div>
        <button type="button" className="of-nav__menu" onClick={() => setAberto(!aberto)} aria-expanded={aberto} aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}>
          {aberto ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {aberto && (
        <div className="of-nav__gaveta">
          {links.map(([id, nome]) => <a key={id} href={`#${id}`} onClick={clicar(id)}>{nome}</a>)}
        </div>
      )}
    </nav>
  );
};

const LinhaTitulo = ({ children, atraso, reduzido }) => (
  <span className="of-hero__mascara">
    <motion.span
      className="of-hero__linha"
      initial={reduzido ? false : { y: '108%' }}
      animate={{ y: 0 }}
      transition={{ duration: 1.1, delay: atraso, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.span>
  </span>
);

const Abertura = ({ reduzido }) => {
  const { scrollY } = useScroll();
  const largura = useTransform(scrollY, [0, 620], [100, 62], { clamp: true });
  const peso = useTransform(scrollY, [0, 620], [800, 500], { clamp: true });
  const variacao = useMotionTemplate`"wdth" ${largura}, "wght" ${peso}`;
  const subida = useTransform(scrollY, [0, 700], [0, -90]);

  const aparecer = (atraso) => (reduzido ? {} : {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: atraso, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <header id="inicio" className="of-hero">
      <EngrenagensCanvas estatico={reduzido} />
      <div className="of-hero__veu" />
      <motion.div className="of-hero__conteudo" style={reduzido ? undefined : { y: subida }}>
        <motion.p className="of-rotulo" {...aparecer(0.1)}>Auto center em Rio das Ostras, RJ</motion.p>
        <motion.h1 className="of-hero__titulo" style={reduzido ? undefined : { fontVariationSettings: variacao }}>
          <LinhaTitulo atraso={0.15} reduzido={reduzido}>Seu carro</LinhaTitulo>
          <LinhaTitulo atraso={0.25} reduzido={reduzido}>no torque</LinhaTitulo>
          <LinhaTitulo atraso={0.35} reduzido={reduzido}><em>certo.</em></LinhaTitulo>
        </motion.h1>
        <div className="of-hero__rodape">
          <motion.p className="of-hero__texto" {...aparecer(0.7)}>
            Revisão, freios, suspensão, elétrica e óleo, com diagnóstico por scanner e um laudo com fotos de cada peça. Você decide sabendo o que está pagando.
          </motion.p>
          <motion.div className="of-hero__acoes" {...aparecer(0.85)}>
            <a href="#orcamento" onClick={irPara('orcamento')} className="of-botao">
              Pedir orçamento <ArrowRight size={18} />
            </a>
            <a href="#servicos" onClick={irPara('servicos')} className="of-link">Ver serviços</a>
          </motion.div>
        </div>
      </motion.div>
    </header>
  );
};

const Palavra = ({ progresso, indice, total, children }) => {
  const opacidade = useTransform(progresso, [indice / total, (indice + 1.5) / total], [0.14, 1]);
  return <motion.span style={{ opacity: opacidade }}>{children} </motion.span>;
};

const Manifesto = ({ reduzido }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const palavras = manifesto.split(' ');

  if (reduzido) {
    return (
      <section className="of-manifesto of-manifesto--estatico">
        <p className="of-manifesto__texto">{manifesto}</p>
      </section>
    );
  }

  return (
    <section ref={ref} className="of-manifesto">
      <div className="of-manifesto__fixo">
        <p className="of-manifesto__texto" aria-label={manifesto}>
          {palavras.map((p, i) => (
            <Palavra key={`${p}-${i}`} progresso={scrollYProgress} indice={i} total={palavras.length}>{p}</Palavra>
          ))}
        </p>
      </div>
    </section>
  );
};

const CartaoServico = ({ servico }) => (
  <article className="of-servico" onPointerMove={moverHolofote}>
    <div className="of-servico__topo">
      <span className="of-servico__numero" aria-hidden="true">{servico.n}</span>
      <ArteServico tipo={servico.arte} />
    </div>
    <div>
      <h3 className="of-servico__titulo">{servico.titulo}</h3>
      <p className="of-servico__texto">{servico.texto}</p>
    </div>
  </article>
);

const Servicos = ({ reduzido }) => {
  const larga = useTelaLarga();
  const fixado = larga && !reduzido;
  const secaoRef = useRef(null);
  const trilhaRef = useRef(null);
  const [distancia, setDistancia] = useState(0);
  const { scrollYProgress } = useScroll({ target: secaoRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distancia]);

  useEffect(() => {
    const trilha = trilhaRef.current;
    if (!fixado || !trilha) return undefined;
    const medir = () => setDistancia(Math.max(0, trilha.scrollWidth - document.documentElement.clientWidth));
    const observador = new ResizeObserver(medir);
    observador.observe(trilha);
    window.addEventListener('resize', medir);
    medir();
    return () => {
      observador.disconnect();
      window.removeEventListener('resize', medir);
    };
  }, [fixado]);

  return (
    <section
      id="servicos"
      ref={secaoRef}
      className={`of-servicos${fixado ? ' of-servicos--fixado' : ''}`}
      style={fixado ? { height: `calc(100dvh + ${distancia}px)` } : undefined}
    >
      <div className="of-servicos__janela">
        <motion.div ref={trilhaRef} className="of-servicos__trilha" style={fixado ? { x } : undefined}>
          <div className="of-servicos__intro">
            <p className="of-rotulo">O que fazemos</p>
            <h2 className="of-titulo">Cinco serviços. Um jeito de trabalhar.</h2>
            <p className="of-servicos__apoio">Medimos antes de trocar. Se a peça ainda está boa, ela fica no carro.</p>
          </div>
          {servicos.map((s) => <CartaoServico key={s.n} servico={s} />)}
        </motion.div>
        {fixado && (
          <div className="of-servicos__barra" aria-hidden="true">
            <motion.div style={{ scaleX: scrollYProgress }} />
          </div>
        )}
      </div>
    </section>
  );
};

const Laudo = ({ reduzido }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const [linhas, setLinhas] = useState(reduzido ? laudo.length : 0);
  const posicao = useTransform(scrollYProgress, [0.06, 0.86], [0, 100], { clamp: true });
  const topo = useMotionTemplate`${posicao}%`;
  const recorte = useMotionTemplate`inset(0 0 calc(100% - ${posicao}%) 0)`;

  useMotionValueEvent(posicao, 'change', (p) => {
    if (!reduzido) setLinhas(Math.min(laudo.length, Math.floor(p / (100 / laudo.length) + 0.25)));
  });

  return (
    <section id="laudo" ref={ref} className={`of-laudo${reduzido ? ' of-laudo--estatico' : ''}`}>
      <div className="of-laudo__fixo">
        <div className="of-laudo__cabeca">
          <p className="of-rotulo">Como trabalhamos</p>
          <h2 className="of-titulo">Você vê o que a gente vê.</h2>
        </div>
        <div className="of-laudo__grade">
          <figure className="of-laudo__foto">
            <img src="/images/exemplos/oficina/freio-medicao.jpg" alt="Mão de mecânico medindo um freio com micrômetro" loading="lazy" width="1600" height="1067" />
            {!reduzido && (
              <>
                <motion.img src="/images/exemplos/oficina/freio-medicao.jpg" alt="" className="of-laudo__revelada" style={{ clipPath: recorte }} loading="lazy" width="1600" height="1067" />
                <motion.span className="of-laudo__linha" style={{ top: topo }} aria-hidden="true" />
              </>
            )}
          </figure>
          <div className="of-laudo__painel">
            <p className="of-laudo__aviso">Exemplo de laudo</p>
            <ul>
              {laudo.map((l, i) => {
                const Icone = iconesSituacao[l.nivel];
                return (
                  <li key={l.item} className={i < linhas ? 'of-laudo__item of-laudo__item--visivel' : 'of-laudo__item'}>
                    <span className="of-laudo__nome">{l.item}<small>{l.leitura}</small></span>
                    <span className={`of-situacao of-situacao--${l.nivel}`}><Icone size={15} aria-hidden="true" /> {l.situacao}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const FotoDisco = ({ reduzido }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const lateral = useTransform(scrollYProgress, [0, 1], [14, 0], { clamp: true });
  const recorte = useMotionTemplate`inset(${lateral}% ${lateral}% ${lateral}% ${lateral}%)`;
  const escala = useTransform(scrollYProgress, [0, 1], [1.28, 1], { clamp: true });

  return (
    <figure ref={ref} className="of-foto">
      <motion.div className="of-foto__janela" style={reduzido ? undefined : { clipPath: recorte }}>
        <motion.img
          src="/images/exemplos/oficina/disco-freio.jpg"
          alt="Disco de freio perfurado de um carro erguido no elevador"
          loading="lazy"
          width="1600"
          height="1069"
          style={reduzido ? undefined : { scale: escala }}
        />
        <figcaption>Disco novo só quando o antigo não passa na medição.</figcaption>
      </motion.div>
    </figure>
  );
};

const Contador = ({ valor, prefixo, reduzido }) => {
  const ref = useRef(null);
  const visto = useInView(ref, { once: true, margin: '-15% 0px' });
  const [atual, setAtual] = useState(reduzido ? valor : 0);

  useEffect(() => {
    if (!visto || reduzido) return undefined;
    const controle = animate(0, valor, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setAtual(Math.round(v)) });
    return () => controle.stop();
  }, [visto, valor, reduzido]);

  return <span ref={ref} className="of-numero__valor">{prefixo}{atual}</span>;
};

const Numeros = ({ reduzido }) => (
  <section className="of-numeros" aria-label="A oficina em números">
    {numeros.map((n) => (
      <div key={n.titulo} className="of-numero">
        <Contador valor={n.valor} prefixo={n.prefixo} reduzido={reduzido} />
        <div>
          <h3>{n.titulo}</h3>
          <p>{n.texto}</p>
        </div>
      </div>
    ))}
  </section>
);

const Faixa = ({ reduzido }) => {
  const { scrollY } = useScroll();
  const velocidade = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 300 });
  const inclinacao = useTransform(velocidade, [-2500, 2500], [-7, 7], { clamp: true });
  const itens = [...faixaServicos, ...faixaServicos];

  return (
    <div className="of-faixa" aria-hidden="true">
      <motion.div className="of-faixa__trilha" style={reduzido ? undefined : { skewX: inclinacao }}>
        {[0, 1].map((bloco) => (
          <div key={bloco} className="of-faixa__bloco">
            {itens.map((t, i) => <span key={`${t}-${i}`}>{t}<i>/</i></span>)}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const Campo = ({ id, rotulo, erro, children }) => (
  <div className={`of-campo${erro ? ' of-campo--erro' : ''}`}>
    {children}
    <label htmlFor={id}>{rotulo}</label>
    {erro && <p id={`${id}-erro`} className="of-campo__erro" role="alert"><AlertTriangle size={14} aria-hidden="true" /> {erro}</p>}
  </div>
);

const Orcamento = () => {
  const [form, setForm] = useState(formularioVazio);
  const [erros, setErros] = useState({});
  const [enviado, setEnviado] = useState(false);

  const alterar = (campo) => (e) => {
    const valor = campo === 'whatsapp' ? mascararTelefone(e.target.value) : e.target.value;
    const novo = { ...form, [campo]: valor };
    setForm(novo);
    if (erros[campo]) setErros((atuais) => ({ ...atuais, [campo]: validarFormulario(novo)[campo] }));
  };

  const validarCampo = (campo) => () => {
    setErros((atuais) => ({ ...atuais, [campo]: validarFormulario(form)[campo] }));
  };

  const enviar = (e) => {
    e.preventDefault();
    const encontrados = validarFormulario(form);
    setErros(encontrados);
    if (Object.keys(encontrados).length === 0) setEnviado(true);
  };

  const recomecar = () => {
    setForm(formularioVazio);
    setErros({});
    setEnviado(false);
  };

  const propsCampo = (campo) => ({
    id: `of-${campo}`,
    value: form[campo],
    onChange: alterar(campo),
    placeholder: ' ',
    'aria-invalid': Boolean(erros[campo]),
    'aria-describedby': erros[campo] ? `of-${campo}-erro` : undefined,
  });

  return (
    <section id="orcamento" className="of-orcamento">
      <div className="of-orcamento__intro">
        <p className="of-rotulo">Orçamento</p>
        <h2 className="of-titulo">Conte o que o carro está fazendo.</h2>
        <p>Barulho, luz no painel ou só a revisão em dia: em menos de 15 minutos alguém da oficina responde no seu WhatsApp.</p>
        <address>
          Rua das Garagens, 1020, Rio das Ostras, RJ<br />
          <a href="tel:+5522999999999">(22) 99999-9999</a>
        </address>
      </div>

      <div className="of-orcamento__caixa" onPointerMove={moverHolofote}>
        {enviado ? (
          <motion.div className="of-sucesso" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} role="status">
            <span className="of-sucesso__icone"><Check size={30} aria-hidden="true" /></span>
            <h3>Tudo preenchido, {form.nome.trim().split(' ')[0]}.</h3>
            <p>Este é um site de demonstração, então nada foi enviado nem guardado. No site de verdade, o pedido chegaria na hora ao WhatsApp da oficina.</p>
            <button type="button" className="of-link" onClick={recomecar}>Preencher de novo</button>
          </motion.div>
        ) : (
          <form onSubmit={enviar} noValidate>
            <div className="of-form__linha">
              <Campo id="of-nome" rotulo="Seu nome" erro={erros.nome}>
                <input {...propsCampo('nome')} type="text" autoComplete="name" onBlur={validarCampo('nome')} />
              </Campo>
              <Campo id="of-whatsapp" rotulo="WhatsApp" erro={erros.whatsapp}>
                <input {...propsCampo('whatsapp')} type="tel" inputMode="tel" autoComplete="tel" onBlur={validarCampo('whatsapp')} />
              </Campo>
            </div>
            <Campo id="of-veiculo" rotulo="Carro, modelo e ano" erro={erros.veiculo}>
              <input {...propsCampo('veiculo')} type="text" onBlur={validarCampo('veiculo')} />
            </Campo>
            <fieldset className="of-opcoes">
              <legend>O que você precisa?</legend>
              <div>
                {tiposServico.map((t) => (
                  <label key={t} className={form.tipo === t ? 'of-opcao of-opcao--ativa' : 'of-opcao'}>
                    <input type="radio" name="of-tipo" value={t} checked={form.tipo === t} onChange={alterar('tipo')} />
                    {t}
                  </label>
                ))}
              </div>
            </fieldset>
            <Campo id="of-descricao" rotulo="O que está acontecendo? (opcional)">
              <textarea {...propsCampo('descricao')} rows={3} />
            </Campo>
            <div className="of-form__fim">
              <p>Usamos estes dados só para responder ao seu pedido.</p>
              <button type="submit" className="of-botao">Pedir orçamento <ArrowRight size={18} /></button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

const OficinaPage = () => {
  const reduzido = useReducedMotion();

  return (
    <div className="oficina-page">
      <Helmet>
        <title>Auto Center Bom Torque | Exemplo ARRC Sistemas</title>
        <meta name="description" content="Exemplo de site para oficina mecânica, com cena 3D em tempo real e animações ligadas à rolagem, desenvolvido pela ARRC Sistemas." />
      </Helmet>

      <a href="#conteudo" className="of-pular">Pular para o conteúdo</a>
      <div className="of-grao" aria-hidden="true" />

      <Link to="/" className="of-voltar">
        <ArrowLeft size={16} /> ARRC Sistemas
      </Link>

      <Navegacao />
      <Torquimetro />
      <Abertura reduzido={reduzido} />

      <main id="conteudo">
        <Manifesto reduzido={reduzido} />
        <Servicos reduzido={reduzido} />
        <Laudo reduzido={reduzido} />
        <FotoDisco reduzido={reduzido} />
        <Faixa reduzido={reduzido} />
        <Numeros reduzido={reduzido} />
        <Orcamento />
      </main>

      <footer className="of-rodape">
        <div className="of-rodape__marca" aria-hidden="true">Bom Torque</div>
        <div className="of-rodape__linha">
          <p>Site de exemplo. A oficina, o endereço, o telefone e os números são fictícios. Fotos: Pexels.</p>
          <Link to="/" className="of-link">Criado pela ARRC Sistemas <ArrowUpRight size={16} /></Link>
        </div>
      </footer>
    </div>
  );
};

export default OficinaPage;
