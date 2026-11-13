
import React, { useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import BarraVersoes from '@/components/exemplos/BarraVersoes';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { CONVIDADOS_MAXIMO, CONVIDADOS_MINIMO, calcularMontagem } from '@/dominio/festas';
import { emailValido, irPara } from '@/components/exemplos/utilitarios';
import { contato, depoimento, eventos, foto } from '@/conteudo/festas';
import './CasaDeFestasPage.css';

const colunas = [
  { fotos: [foto.claro, foto.velas, foto.menu], faixa: ['-3%', '-22%'] },
  { fotos: [foto.menu, foto.branca, foto.luzes], faixa: ['-24%', '-5%'] },
  { fotos: [foto.moderno, foto.claro, foto.branca], faixa: ['-22%', '-3%'] },
  { fotos: [foto.velas, foto.luzes, foto.moderno], faixa: ['-5%', '-24%'] },
];

const REPETICOES_COLUNA = 3;

const formatos = [
  { id: 'banquete', nome: 'Jantar à mesa' },
  { id: 'coquetel', nome: 'Coquetel' },
];

const DIAS_SEMANA = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const inicioDoDia = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const dataCurta = (d) => d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

// Agenda simulada, sempre igual para o mesmo dia: sábados e parte das sextas aparecem ocupados.
const dataReservada = (d) => {
  const semana = d.getDay();
  const semente = d.getDate() * 7 + d.getMonth() * 3;
  return (semana === 6 && semente % 2 === 0) || (semana === 5 && semente % 5 === 0);
};

const ColunaFotos = ({ coluna, progresso, reduzido }) => {
  const y = useTransform(progresso, [0, 1], coluna.faixa);
  return (
    <motion.div className="fe-coluna" style={reduzido ? undefined : { y }} aria-hidden="true">
      {Array.from({ length: REPETICOES_COLUNA }, () => coluna.fotos).flat().map((f, i) => <img key={`${f.src}-${i}`} src={f.src} alt="" />)}
    </motion.div>
  );
};

const Abertura = ({ reduzido }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const aparecer = (atraso) => (reduzido ? {} : {
    initial: { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.2, delay: atraso, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <header ref={ref} className="fe-abertura">
      <div className="fe-abertura__fixo">
        <div className="fe-colunas fe-colunas--esquerda">
          <ColunaFotos coluna={colunas[0]} progresso={scrollYProgress} reduzido={reduzido} />
          <ColunaFotos coluna={colunas[1]} progresso={scrollYProgress} reduzido={reduzido} />
        </div>
        <div className="fe-abertura__centro">
          <motion.p className="fe-sobrelinha" {...aparecer(0.1)}>Casa de festas em Rio das Ostras</motion.p>
          <motion.h1 {...aparecer(0.2)}>Encanto</motion.h1>
          <motion.p className="fe-abertura__frase" {...aparecer(0.35)}>Luz natural, jardins e uma equipe que cuida de tudo para você só aproveitar a festa.</motion.p>
          <motion.a href="#fe-convite" onClick={irPara('fe-convite')} className="fe-botao" {...aparecer(0.5)}>Agendar uma visita <ArrowRight size={18} /></motion.a>
        </div>
        <div className="fe-colunas fe-colunas--direita">
          <ColunaFotos coluna={colunas[2]} progresso={scrollYProgress} reduzido={reduzido} />
          <ColunaFotos coluna={colunas[3]} progresso={scrollYProgress} reduzido={reduzido} />
        </div>
      </div>
    </header>
  );
};

const Eventos = ({ aoEscolher }) => {
  const [ativo, setAtivo] = useState(eventos[0].id);
  return (
    <section id="fe-eventos" className="fe-eventos">
      <div className="fe-secao-topo">
        <p className="fe-sobrelinha">O que celebramos</p>
        <h2>Cada festa pede um <em>cenário.</em></h2>
      </div>
      <div className="fe-paineis">
        {eventos.map((ev) => {
          const aberto = ativo === ev.id;
          return (
            <article key={ev.id} className={aberto ? 'fe-painel fe-painel--aberto' : 'fe-painel'} onPointerEnter={(e) => e.pointerType === 'mouse' && setAtivo(ev.id)}>
              <img src={ev.foto.src} alt={ev.foto.alt} loading="lazy" />
              <button type="button" className="fe-painel__titulo" onClick={() => setAtivo(ev.id)} aria-expanded={aberto}>
                <span>{ev.nome}</span>
              </button>
              <div className="fe-painel__corpo" hidden={!aberto}>
                <p>{ev.texto}</p>
                <button type="button" className="fe-link fe-link--claro" onClick={() => aoEscolher(ev.id)}>Quero este evento <ArrowRight size={16} /></button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

const posicoesDasMesas = (total) => {
  const LARGURA = 360;
  const ALTURA = 200;
  const TOPO_PISTA = 46;
  const colunasMesas = Math.max(3, Math.ceil(Math.sqrt(total * (LARGURA / (ALTURA - TOPO_PISTA)))));
  const linhas = Math.ceil(total / colunasMesas);
  const passoX = LARGURA / colunasMesas;
  const passoY = (ALTURA - TOPO_PISTA) / linhas;
  const raio = Math.max(3.2, Math.min(passoX, passoY) * 0.36);
  return Array.from({ length: total }, (_, i) => ({
    cx: passoX * ((i % colunasMesas) + 0.5),
    cy: TOPO_PISTA + passoY * (Math.floor(i / colunasMesas) + 0.5),
    r: raio,
  }));
};

const Simulador = ({ reduzido }) => {
  const [convidados, setConvidados] = useState(120);
  const [formato, setFormato] = useState('banquete');
  const montagem = useMemo(() => calcularMontagem(convidados, formato), [convidados, formato]);
  const mesas = useMemo(() => posicoesDasMesas(montagem.mesas), [montagem.mesas]);
  const mola = reduzido ? { duration: 0 } : { type: 'spring', stiffness: 170, damping: 20 };

  return (
    <section className="fe-simulador">
      <div className="fe-secao-topo">
        <p className="fe-sobrelinha">Monte sua festa</p>
        <h2>Quantas pessoas você quer <em>por perto?</em></h2>
      </div>
      <div className="fe-simulador__grade">
        <div className="fe-simulador__controles">
          <label htmlFor="fe-convidados">Convidados</label>
          <output htmlFor="fe-convidados" className="fe-simulador__numero">{convidados}</output>
          <input
            id="fe-convidados"
            type="range"
            min={CONVIDADOS_MINIMO}
            max={CONVIDADOS_MAXIMO}
            step="10"
            value={convidados}
            onChange={(e) => setConvidados(Number(e.target.value))}
          />
          <div className="fe-formatos" role="group" aria-label="Formato da festa">
            {formatos.map((f) => (
              <button type="button" key={f.id} aria-pressed={formato === f.id} className={formato === f.id ? 'fe-formato fe-formato--ativo' : 'fe-formato'} onClick={() => setFormato(f.id)}>
                {formato === f.id && <Check size={16} aria-hidden="true" />} {f.nome}
              </button>
            ))}
          </div>
          <p className="fe-simulador__resultado" aria-live="polite">
            <strong>{montagem.salao.nome}</strong>, com {montagem.mesas} mesas para {montagem.pessoasPorMesa} pessoas.
          </p>
          <p className="fe-simulador__nota">Simulação ilustrativa. A planta final é feita com a nossa equipe.</p>
        </div>
        <div className="fe-planta">
          <svg viewBox="0 0 360 200" role="img" aria-label={`Planta do salão com ${montagem.mesas} mesas e pista de dança`}>
            <rect x="110" y="6" width="140" height="30" rx="3" className="fe-planta__pista" />
            <text x="180" y="25" textAnchor="middle" className="fe-planta__texto">pista de dança</text>
            {mesas.map((m, i) => (
              <motion.circle
                key={i}
                className="fe-planta__mesa"
                initial={reduzido ? false : { cx: 180, cy: 21, r: 0 }}
                animate={{ cx: m.cx, cy: m.cy, r: m.r }}
                transition={mola}
              />
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
};

const Calendario = ({ selecionada, aoSelecionar }) => {
  const hoje = useMemo(() => inicioDoDia(new Date()), []);
  const [mes, setMes] = useState(() => new Date(hoje.getFullYear(), hoje.getMonth(), 1));
  const noMesAtual = mes.getFullYear() === hoje.getFullYear() && mes.getMonth() === hoje.getMonth();
  const totalDias = new Date(mes.getFullYear(), mes.getMonth() + 1, 0).getDate();
  const titulo = mes.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  const mudarMes = (delta) => setMes(new Date(mes.getFullYear(), mes.getMonth() + delta, 1));

  return (
    <div className="fe-calendario">
      <div className="fe-calendario__topo">
        <button type="button" onClick={() => mudarMes(-1)} disabled={noMesAtual} aria-label="Mês anterior"><ChevronLeft size={20} /></button>
        <p aria-live="polite">{titulo}</p>
        <button type="button" onClick={() => mudarMes(1)} aria-label="Próximo mês"><ChevronRight size={20} /></button>
      </div>
      <div className="fe-calendario__grade">
        {DIAS_SEMANA.map((d, i) => <span key={`${d}-${i}`} className="fe-calendario__semana" aria-hidden="true">{d}</span>)}
        {Array.from({ length: mes.getDay() }, (_, i) => <span key={`vazio-${i}`} />)}
        {Array.from({ length: totalDias }, (_, i) => {
          const dia = new Date(mes.getFullYear(), mes.getMonth(), i + 1);
          const passado = dia < hoje;
          const reservada = !passado && dataReservada(dia);
          const marcada = selecionada && dia.getTime() === selecionada.getTime();
          const situacao = reservada ? ', reservada' : marcada ? ', escolhida' : '';
          return (
            <button
              type="button"
              key={i}
              disabled={passado || reservada}
              onClick={() => aoSelecionar(dia)}
              aria-pressed={Boolean(marcada)}
              aria-label={`${dataCurta(dia)}${situacao}`}
              className={`fe-dia${reservada ? ' fe-dia--reservada' : ''}${marcada ? ' fe-dia--marcada' : ''}`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
      <p className="fe-calendario__legenda">Datas riscadas já estão reservadas. Agenda ilustrativa.</p>
    </div>
  );
};

const validar = ({ nome, email, tipo }) => {
  const erros = {};
  if (nome.trim().length < 2) erros.nome = 'Conte seu nome para sabermos com quem falar.';
  if (!emailValido(email)) erros.email = 'Confira o e-mail. Exemplo: voce@email.com.';
  if (!tipo) erros.tipo = 'Escolha o tipo de evento.';
  return erros;
};

const Convite = ({ form, setForm }) => {
  const [data, setData] = useState(null);
  const [erros, setErros] = useState({});
  const [enviado, setEnviado] = useState(false);

  const alterar = (campo) => (e) => {
    const novo = { ...form, [campo]: e.target.value };
    setForm(novo);
    if (erros[campo]) setErros((a) => ({ ...a, [campo]: validar(novo)[campo] }));
  };

  const enviar = (e) => {
    e.preventDefault();
    const encontrados = validar(form);
    setErros(encontrados);
    if (Object.keys(encontrados).length === 0) setEnviado(true);
  };

  const propsCampo = (campo) => ({
    id: `fe-${campo}`,
    value: form[campo],
    onChange: alterar(campo),
    'aria-invalid': Boolean(erros[campo]),
    'aria-describedby': erros[campo] ? `fe-${campo}-erro` : undefined,
  });
  const erroDe = (campo) => erros[campo] && <p id={`fe-${campo}-erro`} className="fe-erro" role="alert">{erros[campo]}</p>;

  return (
    <section id="fe-convite" className="fe-convite">
      <div className="fe-secao-topo">
        <p className="fe-sobrelinha">Sua data</p>
        <h2>Venha conhecer o salão <em>antes de decidir.</em></h2>
      </div>
      <div className="fe-convite__grade">
        <Calendario selecionada={data} aoSelecionar={setData} />
        {enviado ? (
          <motion.div className="fe-resposta" role="status" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <span className="fe-resposta__icone"><Check size={28} aria-hidden="true" /></span>
            <h3>Pedido preenchido, {form.nome.trim().split(' ')[0]}.</h3>
            <p>Este é um site de demonstração, então nada foi enviado nem guardado. No site de verdade, o pedido de visita chegaria à equipe da casa.</p>
          </motion.div>
        ) : (
          <form onSubmit={enviar} noValidate className="fe-form">
            <p className="fe-form__data">{data ? `Visita no dia ${dataCurta(data)}` : 'Escolha um dia no calendário, se já tiver uma data em mente.'}</p>
            <div className="fe-campo">
              <label htmlFor="fe-nome">Seu nome</label>
              <input {...propsCampo('nome')} type="text" autoComplete="name" />
              {erroDe('nome')}
            </div>
            <div className="fe-campo">
              <label htmlFor="fe-email">E-mail</label>
              <input {...propsCampo('email')} type="email" inputMode="email" autoComplete="email" />
              {erroDe('email')}
            </div>
            <div className="fe-campo">
              <label htmlFor="fe-tipo">Tipo de evento</label>
              <select {...propsCampo('tipo')}>
                <option value="">Escolha uma opção</option>
                {eventos.map((ev) => <option key={ev.id} value={ev.id}>{ev.nome}</option>)}
                <option value="outro">Outro</option>
              </select>
              {erroDe('tipo')}
            </div>
            <div className="fe-campo">
              <label htmlFor="fe-mensagem">Como você imagina a festa? (opcional)</label>
              <textarea {...propsCampo('mensagem')} rows={2} />
            </div>
            <button type="submit" className="fe-botao fe-botao--inteiro">Pedir minha visita <ArrowRight size={18} /></button>
          </form>
        )}
      </div>
    </section>
  );
};

const CasaDeFestasPage = () => {
  const reduzido = useReducedMotion();
  const [form, setForm] = useState({ nome: '', email: '', tipo: '', mensagem: '' });

  const escolherEvento = (id) => {
    setForm((atual) => ({ ...atual, tipo: id }));
    document.getElementById('fe-convite')?.scrollIntoView({ behavior: reduzido ? 'auto' : 'smooth' });
  };

  return (
    <div className="encanto-page">
      <Helmet>
        <title>Casa de Festas Encanto | Exemplo ARRC Sistemas</title>
        <meta name="description" content="Exemplo de site para casa de festas, com galeria em movimento, simulador de mesas e agenda interativa, desenvolvido pela ARRC Sistemas." />
      </Helmet>

      <a href="#fe-conteudo" className="fe-pular">Pular para o conteúdo</a>
      <BarraVersoes slug="casa-de-festas" nivel="premium" />

      <Abertura reduzido={reduzido} />

      <main id="fe-conteudo">
        <Eventos aoEscolher={escolherEvento} />
        <Simulador reduzido={reduzido} />
        <section className="fe-depoimento">
          <motion.blockquote
            initial={reduzido ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p>“{depoimento.texto}”</p>
            <cite>{depoimento.autor}</cite>
          </motion.blockquote>
        </section>
        <Convite form={form} setForm={setForm} />
      </main>

      <footer className="fe-rodape">
        <p className="fe-rodape__marca">Encanto</p>
        <div>
          <p>{contato.endereco}</p>
          <p><a href={contato.telefoneLink}>{contato.telefone}</a> · <a href={`mailto:${contato.email}`}>{contato.email}</a></p>
          <p>Site de exemplo. A casa, os salões, a agenda, o depoimento e os contatos são fictícios. Fotos: Pexels. <Link to="/">Criado pela ARRC Sistemas</Link>.</p>
        </div>
      </footer>
    </div>
  );
};

export default CasaDeFestasPage;
