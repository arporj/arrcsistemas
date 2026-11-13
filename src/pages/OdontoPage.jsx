
import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import BarraVersoes from '@/components/exemplos/BarraVersoes';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Check, Pause, Play } from 'lucide-react';
import Arcada from '@/components/odonto/Arcada';
import { irPara, mascararTelefone } from '@/components/exemplos/utilitarios';
import { PERIODOS, contato, depoimentos, tratamentos } from '@/conteudo/odonto';
import { validarContatoAgendamento } from '@/dominio/odonto';
import './OdontoPage.css';

const TEMPO_RESPIRACAO = 4000;
const TEMPO_TRATAMENTO = 6000;

const cuidados = [
  { titulo: 'Levantou a mão, a gente para.', texto: 'Combinamos um sinal antes de começar. Você mantém o controle durante todo o atendimento.', classe: 'od-bloco--destaque' },
  { titulo: 'Sem surpresa no valor.', texto: 'O orçamento vem por escrito, etapa por etapa, antes de qualquer procedimento.', classe: '' },
  { titulo: 'Música ou silêncio?', texto: 'Você escolhe o som da sala e pode pedir uma pausa quando quiser.', classe: 'od-bloco--suave' },
];

const passosAgenda = ['O que você procura?', 'Qual período é melhor?', 'Como falamos com você?'];

const Respiracao = ({ reduzido }) => {
  const [inspirando, setInspirando] = useState(true);
  const [ativa, setAtiva] = useState(!reduzido);

  useEffect(() => {
    if (!ativa) return undefined;
    const intervalo = setInterval(() => setInspirando((v) => !v), TEMPO_RESPIRACAO);
    return () => clearInterval(intervalo);
  }, [ativa]);

  return (
    <div className="od-respiracao">
      <div className={`od-respiracao__circulos${ativa ? '' : ' od-respiracao__circulos--parado'}`} aria-hidden="true">
        <i /><i /><i />
      </div>
      <p className="od-respiracao__guia" aria-hidden="true">{ativa ? (inspirando ? 'Inspire' : 'Solte o ar') : 'Pausado'}</p>
      <button type="button" className="od-respiracao__botao" onClick={() => setAtiva(!ativa)} aria-label={ativa ? 'Pausar a respiração guiada' : 'Retomar a respiração guiada'}>
        {ativa ? <Pause size={18} /> : <Play size={18} />}
      </button>
    </div>
  );
};

const FotoClinica = ({ reduzido }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const raio = useTransform(scrollYProgress, [0, 1], ['50%', '3%']);
  const escala = useTransform(scrollYProgress, [0, 1], [0.62, 1]);

  return (
    <section ref={ref} className="od-clinica">
      <motion.figure style={reduzido ? undefined : { borderRadius: raio, scale: escala }}>
        <img src="/images/exemplos/odonto/consultorio.jpg" alt="Consultório claro, com cadeira odontológica e janela ampla" loading="lazy" width="1600" height="1068" />
      </motion.figure>
    </section>
  );
};

const Tratamentos = ({ reduzido }) => {
  const [atual, setAtual] = useState(tratamentos[0].id);
  const [automatico, setAutomatico] = useState(!reduzido);
  const ref = useRef(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const observador = new IntersectionObserver(([e]) => setVisivel(e.isIntersecting), { threshold: 0.4 });
    observador.observe(ref.current);
    return () => observador.disconnect();
  }, []);

  useEffect(() => {
    if (!automatico || !visivel) return undefined;
    const intervalo = setInterval(() => {
      setAtual((id) => tratamentos[(tratamentos.findIndex((t) => t.id === id) + 1) % tratamentos.length].id);
    }, TEMPO_TRATAMENTO);
    return () => clearInterval(intervalo);
  }, [automatico, visivel]);

  const dados = tratamentos.find((t) => t.id === atual);

  return (
    <section id="od-tratamentos" ref={ref} className="od-tratamentos">
      <div className="od-tratamentos__texto">
        <p className="od-rotulo">Tratamentos</p>
        <div className="od-pilulas" role="group" aria-label="Escolha um tratamento">
          {tratamentos.map((t) => (
            <button
              type="button"
              key={t.id}
              aria-pressed={atual === t.id}
              className={atual === t.id ? 'od-pilula od-pilula--ativa' : 'od-pilula'}
              onClick={() => { setAtual(t.id); setAutomatico(false); }}
            >
              {t.nome}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={dados.id}
            initial={reduzido ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduzido ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            aria-live="polite"
          >
            <h2>{dados.titulo}</h2>
            <p>{dados.texto}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="od-tratamentos__arte">
        <Arcada key={dados.id} tratamento={dados.id} reduzido={reduzido} />
      </div>
    </section>
  );
};

const Agenda = ({ reduzido }) => {
  const [passo, setPasso] = useState(0);
  const [dados, setDados] = useState({ tratamento: '', periodo: '', nome: '', whatsapp: '' });
  const [erros, setErros] = useState({});
  const [pronto, setPronto] = useState(false);
  const opcoesTratamento = [...tratamentos.map((t) => t.nome), 'Ainda não sei'];

  const escolher = (campo, valor) => {
    setDados({ ...dados, [campo]: valor });
    setPasso(passo + 1);
  };

  const enviar = (e) => {
    e.preventDefault();
    const encontrados = validarContatoAgendamento(dados);
    setErros(encontrados);
    if (Object.keys(encontrados).length === 0) setPronto(true);
  };

  const recomecar = () => {
    setDados({ tratamento: '', periodo: '', nome: '', whatsapp: '' });
    setErros({});
    setPasso(0);
    setPronto(false);
  };

  const animacao = reduzido ? {} : { initial: { opacity: 0, x: 24 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -24 }, transition: { duration: 0.28 } };

  return (
    <section id="od-agenda" className="od-agenda">
      <div className="od-agenda__caixa">
        {pronto ? (
          <div role="status" className="od-agenda__pronto">
            <span className="od-agenda__ok"><Check size={28} aria-hidden="true" /></span>
            <h2>Tudo certo, {dados.nome.trim().split(' ')[0]}.</h2>
            <p>Você escolheu {dados.tratamento.toLowerCase()}, no período da {dados.periodo.toLowerCase()}. Este é um site de demonstração, então nada foi enviado nem guardado.</p>
            <button type="button" className="od-link" onClick={recomecar}>Começar de novo</button>
          </div>
        ) : (
          <>
            <div className="od-agenda__topo">
              <p>Passo {passo + 1} de {passosAgenda.length}</p>
              {passo > 0 && <button type="button" className="od-link" onClick={() => setPasso(passo - 1)}>Voltar</button>}
            </div>
            <div className="od-agenda__barra" aria-hidden="true"><motion.i animate={{ scaleX: (passo + 1) / passosAgenda.length }} initial={false} /></div>
            <AnimatePresence mode="wait">
              <motion.div key={passo} {...animacao}>
                <h2 aria-live="polite">{passosAgenda[passo]}</h2>
                {passo === 0 && (
                  <div className="od-pilulas">
                    {opcoesTratamento.map((o) => <button type="button" key={o} className="od-pilula od-pilula--grande" onClick={() => escolher('tratamento', o)}>{o}</button>)}
                  </div>
                )}
                {passo === 1 && (
                  <div className="od-pilulas">
                    {PERIODOS.map((o) => <button type="button" key={o} className="od-pilula od-pilula--grande" onClick={() => escolher('periodo', o)}>{o}</button>)}
                  </div>
                )}
                {passo === 2 && (
                  <form onSubmit={enviar} noValidate>
                    <label htmlFor="od-nome">Como podemos chamar você?</label>
                    <input id="od-nome" type="text" autoComplete="given-name" value={dados.nome} aria-invalid={Boolean(erros.nome)} aria-describedby={erros.nome ? 'od-nome-erro' : undefined} onChange={(e) => setDados({ ...dados, nome: e.target.value })} />
                    {erros.nome && <p id="od-nome-erro" className="od-erro" role="alert">{erros.nome}</p>}
                    <label htmlFor="od-whats">WhatsApp</label>
                    <input id="od-whats" type="tel" inputMode="tel" autoComplete="tel" value={dados.whatsapp} aria-invalid={Boolean(erros.whatsapp)} aria-describedby={erros.whatsapp ? 'od-whats-erro' : undefined} onChange={(e) => setDados({ ...dados, whatsapp: mascararTelefone(e.target.value) })} />
                    {erros.whatsapp && <p id="od-whats-erro" className="od-erro" role="alert">{erros.whatsapp}</p>}
                    <p className="od-agenda__nota">Usamos estes dados só para confirmar seu horário.</p>
                    <button type="submit" className="od-botao">Pedir meu horário <ArrowRight size={18} /></button>
                  </form>
                )}
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>
    </section>
  );
};

const OdontoPage = () => {
  const reduzido = useReducedMotion();

  return (
    <div className="odonto-page">
      <Helmet>
        <title>Odonto Sorriso Rio | Exemplo ARRC Sistemas</title>
        <meta name="description" content="Exemplo de site para clínica odontológica, com respiração guiada e arcada animada por tratamento, desenvolvido pela ARRC Sistemas." />
      </Helmet>

      <a href="#od-conteudo" className="od-pular">Pular para o conteúdo</a>
      <BarraVersoes slug="odonto" nivel="premium" />

      <nav className="od-nav" aria-label="Principal">
        <span className="od-nav__marca">Sorriso Rio</span>
        <div className="od-nav__links">
          <a href="#od-tratamentos" onClick={irPara('od-tratamentos')}>Tratamentos</a>
          <a href="#od-agenda" onClick={irPara('od-agenda')} className="od-nav__agendar">Agendar</a>
        </div>
      </nav>

      <header className="od-abertura">
        <div className="od-aurora" aria-hidden="true"><i /><i /><i /></div>
        <Respiracao reduzido={reduzido} />
        <motion.div
          className="od-abertura__texto"
          initial={reduzido ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1>Respira. <em>A gente cuida do resto.</em></h1>
          <p>Uma clínica em Rio das Ostras para quem tem receio de dentista: atendimento sem pressa, explicações claras e um ambiente pensado para o seu conforto.</p>
          <a href="#od-agenda" onClick={irPara('od-agenda')} className="od-botao">Agendar minha consulta <ArrowRight size={18} /></a>
        </motion.div>
      </header>

      <main id="od-conteudo">
        <FotoClinica reduzido={reduzido} />

        <section className="od-cuidados" aria-label="Como cuidamos de você">
          {cuidados.map((c, i) => (
            <motion.article
              key={c.titulo}
              className={`od-bloco ${c.classe}`}
              initial={reduzido ? false : { opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ type: 'spring', stiffness: 80, damping: 16, delay: i * 0.08 }}
            >
              <h2>{c.titulo}</h2>
              <p>{c.texto}</p>
            </motion.article>
          ))}
          <motion.figure
            className="od-bloco od-bloco--foto"
            initial={reduzido ? false : { opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
          >
            <img src="/images/exemplos/odonto/equipamento.jpg" alt="Equipamento odontológico limpo em consultório claro" loading="lazy" width="1600" height="1067" />
          </motion.figure>
        </section>

        <Tratamentos reduzido={reduzido} />

        <section className="od-relatos">
          <p className="od-rotulo">Quem já veio</p>
          <div className="od-relatos__lista">
            {depoimentos.map((d, i) => (
              <motion.blockquote
                key={d.nome}
                initial={reduzido ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ type: 'spring', stiffness: 70, damping: 16, delay: i * 0.1 }}
              >
                <p>{d.texto}</p>
                <footer><span aria-hidden="true">{d.nome[0]}</span><cite>{d.nome}</cite></footer>
              </motion.blockquote>
            ))}
          </div>
        </section>

        <Agenda reduzido={reduzido} />
      </main>

      <footer className="od-rodape">
        <p className="od-rodape__marca">Sorriso Rio</p>
        <p>{contato.endereco} · <a href={contato.telefoneLink}>{contato.telefone}</a></p>
        <p>Site de exemplo. A clínica, os relatos e os contatos são fictícios. Em um site real, aqui entram o nome e o CRO do responsável técnico. Fotos: Pexels. <Link to="/">Criado pela ARRC Sistemas</Link>.</p>
      </footer>
    </div>
  );
};

export default OdontoPage;
