
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronDown, Menu, X } from 'lucide-react';
import './CasaDeFestasPage.css';

const eventos = [
  {
    numeral: 'I.',
    nome: 'Casamentos',
    desc: 'Celebrações íntimas ou grandiosas, desenhadas sob medida. Nossos salões oferecem o cenário perfeito para selar compromissos eternos, com um serviço de protocolo impecável.',
    img: '/images/exemplos/casa-de-festas/casamentos.jpg',
    cta: 'Explorar Visão',
    imgFirst: false,
  },
  {
    numeral: 'II.',
    nome: 'Corporativo',
    desc: 'Eleve a imagem da sua marca. Simpósios, lançamentos e galas executivas executadas com precisão cirúrgica e discrição absoluta, em um ambiente que respira sucesso.',
    img: '/images/exemplos/casa-de-festas/corporativo.jpg',
    cta: 'Detalhes Técnicos',
    imgFirst: true,
  },
  {
    numeral: 'III.',
    nome: 'Formaturas',
    desc: 'O culminar de uma jornada merece um palco à altura. Bailes de gala inesquecíveis com infraestrutura completa de som, luz e gastronomia de vanguarda.',
    img: '/images/exemplos/casa-de-festas/formaturas.jpg',
    cta: null,
    imgFirst: false,
  },
  {
    numeral: 'IV.',
    nome: 'Aniversários',
    desc: 'Marcos temporais celebrados com exclusividade. Festas privativas que refletem a personalidade única do anfitrião, envolvidas em uma atmosfera de mistério e fascínio.',
    img: '/images/exemplos/casa-de-festas/aniversarios.jpg',
    cta: null,
    imgFirst: true,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } },
};

const CasaDeFestasPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ nome: '', email: '', tipo: '', data: '', mensagem: '' });

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="encanto-page min-h-screen antialiased overflow-x-hidden selection:bg-[#d4af37] selection:text-black">
      <Helmet>
        <title>Casa de Festas Encanto | Exemplo ARRC Sistemas</title>
        <meta name="description" content="Exemplo de site premium para espaço de eventos, desenvolvido pela ARRC Sistemas." />
      </Helmet>
      <div className="encanto-film-grain"></div>

      <Link
        to="/"
        className="fixed bottom-5 left-5 z-50 flex items-center gap-2 bg-[#d4af37] text-black text-xs uppercase tracking-widest px-4 py-2 rounded-full shadow-lg hover:bg-[#e2e2e2] transition-colors"
      >
        <ArrowLeft size={14} /> ARRC Sistemas
      </Link>

      <nav className={`fixed top-0 w-full z-40 transition-all duration-700 ease-in-out px-6 md:px-20 py-6 md:py-8 ${
        isScrolled || mobileOpen ? 'bg-black/90 backdrop-blur-md border-b border-[#444748]/20' : 'bg-gradient-to-b from-black/40 to-transparent'
      }`}>
        <div className="flex justify-between items-center">
          <span className="text-lg md:text-2xl tracking-tighter text-[#e9c349]" style={{ fontFamily: "'Playfair Display', serif" }}>CASA DE FESTAS ENCANTO</span>
          <div className="hidden md:flex items-center space-x-12">
            <span className="text-xs tracking-[0.2em] uppercase text-[#e9c349] border-b border-[#e9c349] pb-1">O Espaço</span>
            <span className="text-xs tracking-[0.2em] uppercase text-[#c4c7c7] hover:text-[#e9c349] transition-colors duration-500 cursor-default">Experiências</span>
            <span className="text-xs tracking-[0.2em] uppercase text-[#c4c7c7] hover:text-[#e9c349] transition-colors duration-500 cursor-default">Eventos Privados</span>
            <button
              onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-xs tracking-[0.2em] uppercase border border-[#d4af37] text-[#d4af37] px-8 py-3 hover:bg-[#d4af37] hover:text-black transition-all duration-500"
            >
              Reservar Agora
            </button>
          </div>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-[#e9c349]" aria-label="Abrir menu">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden flex flex-col gap-6 pt-8 pb-4">
            <span className="text-xs tracking-[0.2em] uppercase text-[#e9c349]">O Espaço</span>
            <span className="text-xs tracking-[0.2em] uppercase text-[#c4c7c7]">Experiências</span>
            <span className="text-xs tracking-[0.2em] uppercase text-[#c4c7c7]">Eventos Privados</span>
            <button
              onClick={() => { document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' }); setMobileOpen(false); }}
              className="text-xs tracking-[0.2em] uppercase border border-[#d4af37] text-[#d4af37] px-8 py-3 w-fit hover:bg-[#d4af37] hover:text-black transition-all duration-500"
            >
              Reservar Agora
            </button>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="bg-cover bg-center w-full h-full scale-105" style={{ backgroundImage: "url('/images/exemplos/casa-de-festas/hero-hall.jpg')" }}></div>
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 text-center max-w-5xl mx-auto px-6 mt-20">
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} className="text-5xl md:text-8xl text-[#e2e2e2] mb-8 tracking-tighter drop-shadow-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>
            A Arte de Celebrar<br />O Extraordinário
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }} className="text-lg md:text-xl font-light text-[#c4c7c7] max-w-2xl mx-auto mb-12">
            Onde a arquitetura clássica encontra a sofisticação moderna. Um santuário para momentos inesquecíveis, desenhado para a mais alta exigência.
          </motion.p>
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.4 }}>
            <button onClick={() => document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex flex-col items-center text-[#c4c7c7] hover:text-[#e9c349] transition-colors duration-500">
              <span className="text-xs tracking-[0.2em] uppercase mb-4">Descobrir</span>
              <ChevronDown className="animate-bounce" size={28} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Editorial Intro */}
      <section id="discover" className="py-40 px-6 md:px-20 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-8 items-center">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="col-span-12 md:col-span-5 md:col-start-2"
          >
            <h2 className="text-4xl md:text-5xl text-[#e2e2e2] mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>Refúgio de<br />Elegância</h2>
            <p className="text-base text-[#c4c7c7] mb-6 font-light leading-relaxed">
              A Casa de Festas Encanto não é apenas um espaço; é uma experiência curada. Cada detalhe, desde os salões amplos banhados por luz natural até os jardins meticulosamente desenhados, reflete um compromisso inabalável com a excelência estética e o conforto absoluto.
            </p>
            <div className="h-px w-24 bg-[#d4af37] mt-12"></div>
          </motion.div>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}
            className="col-span-12 md:col-span-4 md:col-start-9 relative mt-12 md:mt-0"
          >
            <div className="aspect-[3/4] bg-[#1a1c1c] encanto-ambient-shadow relative z-10">
              <img className="object-cover w-full h-full grayscale-[20%] hover:grayscale-0 transition-all duration-700" src="/images/exemplos/casa-de-festas/table-setting.jpg" alt="Mesa posta luxuosa" />
            </div>
            <div className="absolute -bottom-10 -left-10 w-full h-full border border-[#444748]/30 z-0"></div>
          </motion.div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-32 overflow-hidden bg-[#1a1c1c] relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative z-10 pl-12 md:pl-24 border-l border-[#d4af37]/30">
            <p className="text-3xl md:text-5xl text-[#e2e2e2] italic leading-tight opacity-90 max-w-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>
              "O silêncio do luxo fala mais alto que qualquer opulência. Nós orquestramos a atmosfera; você vive a memória."
            </p>
            <p className="text-xs tracking-[0.2em] text-[#d4af37] uppercase mt-12">A Direção</p>
          </motion.div>
        </div>
        <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-[#121414] to-transparent opacity-50 z-0"></div>
      </section>

      {/* Event Types */}
      <section className="py-40 px-6 md:px-20 max-w-[1440px] mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-24 flex justify-between items-end">
          <h2 className="text-4xl md:text-5xl text-[#e2e2e2]" style={{ fontFamily: "'Playfair Display', serif" }}>Curadoria de<br />Eventos</h2>
          <div className="hidden md:block h-px w-32 bg-[#444748]/50 mb-4"></div>
        </motion.div>

        <div className="grid grid-cols-12 gap-y-24 md:gap-y-32 gap-x-8">
          {eventos.map((ev) => (
            <div key={ev.numeral} className="col-span-12 group">
              <div className="grid grid-cols-12 gap-8 items-center">
                {!ev.imgFirst && (
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="col-span-12 md:col-span-5 relative z-10">
                    <span className="text-2xl text-[#d4af37] mb-6 block" style={{ fontFamily: "'Playfair Display', serif" }}>{ev.numeral}</span>
                    <h3 className="text-3xl text-[#e2e2e2] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>{ev.nome}</h3>
                    <p className="text-base text-[#c4c7c7] mb-8 max-w-md font-light leading-relaxed">{ev.desc}</p>
                    {ev.cta && (
                      <span className="inline-flex items-center space-x-4 text-xs uppercase text-[#e2e2e2] group-hover:text-[#d4af37] transition-colors duration-300">
                        <span>{ev.cta}</span>
                        <span className="w-8 h-px bg-current transition-all duration-300 group-hover:w-12"></span>
                      </span>
                    )}
                  </motion.div>
                )}
                <motion.div
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}
                  className={`col-span-12 md:col-span-7 ${!ev.imgFirst ? 'md:col-start-6' : ''}`}
                >
                  <div className="aspect-[16/9] overflow-hidden encanto-ambient-shadow">
                    <img className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" src={ev.img} alt={ev.nome} />
                  </div>
                </motion.div>
                {ev.imgFirst && (
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }} className="col-span-12 md:col-span-4 md:col-start-9 relative z-10">
                    <span className="text-2xl text-[#d4af37] mb-6 block" style={{ fontFamily: "'Playfair Display', serif" }}>{ev.numeral}</span>
                    <h3 className="text-3xl text-[#e2e2e2] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>{ev.nome}</h3>
                    <p className="text-base text-[#c4c7c7] mb-8 font-light leading-relaxed">{ev.desc}</p>
                    {ev.cta && (
                      <span className="inline-flex items-center space-x-4 text-xs uppercase text-[#e2e2e2] group-hover:text-[#d4af37] transition-colors duration-300">
                        <span>{ev.cta}</span>
                        <span className="w-8 h-px bg-current transition-all duration-300 group-hover:w-12"></span>
                      </span>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-40 bg-[#1a1c1c] border-y border-[#444748]/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20 text-center">
          <motion.span initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-xs tracking-[0.2em] text-[#8e9192] uppercase mb-16 block">
            Reconhecimento
          </motion.span>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }} className="max-w-4xl mx-auto relative">
            <span className="absolute -top-10 -left-6 md:-left-10 text-8xl text-[#333535] opacity-50" style={{ fontFamily: "'Playfair Display', serif" }}>"</span>
            <h4 className="text-2xl md:text-4xl text-[#e2e2e2] leading-tight mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
              A execução superou a expectativa. A Casa Encanto entregou não apenas um espaço lindíssimo, mas um nível de serviço invisível e impecável que permitiu aos meus convidados apenas desfrutarem do momento.
            </h4>
            <p className="text-sm text-[#d4af37] uppercase tracking-widest">— Família Monteiro, Gala de Inverno</p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section id="contato" className="py-40 px-6 md:px-20 max-w-4xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-[#e2e2e2] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Inicie o Diálogo</h2>
          <p className="text-base text-[#c4c7c7] font-light">Permita-nos compreender a sua visão. Preencha os dados abaixo para agendarmos uma visita privativa.</p>
        </motion.div>

        {submitted ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#1a1c1c] p-16 encanto-ambient-shadow text-center">
            <h3 className="text-2xl text-[#e2e2e2] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Obrigado.</h3>
            <p className="text-[#c4c7c7]">Sua solicitação foi recebida. Nossa equipe entrará em contato em breve para agendar sua visita privativa.</p>
          </motion.div>
        ) : (
          <motion.form
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-[#1a1c1c] p-8 md:p-16 encanto-ambient-shadow relative"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-[#d4af37]"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <div className="col-span-1 encanto-input-group">
                <input required value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} className="encanto-lux-input" id="nome" placeholder="Nome Completo" type="text" />
                <label className="encanto-lux-label" htmlFor="nome">Nome Completo</label>
              </div>
              <div className="col-span-1 encanto-input-group">
                <input required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="encanto-lux-input" id="email" placeholder="Endereço Eletrônico" type="email" />
                <label className="encanto-lux-label" htmlFor="email">Endereço Eletrônico</label>
              </div>
              <div className="col-span-1 encanto-input-group">
                <select required value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })} className="encanto-lux-input appearance-none rounded-none" id="tipo">
                  <option className="bg-[#121414]" disabled value="">Natureza do Evento</option>
                  <option className="bg-[#121414]" value="casamento">Casamento</option>
                  <option className="bg-[#121414]" value="corporativo">Corporativo</option>
                  <option className="bg-[#121414]" value="formatura">Formatura</option>
                  <option className="bg-[#121414]" value="outro">Outro (Especifique)</option>
                </select>
              </div>
              <div className="col-span-1 encanto-input-group">
                <input value={form.data} onChange={(e) => setForm({ ...form, data: e.target.value })} className="encanto-lux-input" id="data" placeholder="Data Estimada (Opcional)" type="text" />
                <label className="encanto-lux-label" htmlFor="data">Data Estimada (Opcional)</label>
              </div>
              <div className="col-span-1 md:col-span-2 encanto-input-group mt-4 md:mt-12">
                <textarea
                  value={form.mensagem}
                  onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                  className="encanto-lux-input resize-none"
                  id="mensagem"
                  placeholder="Detalhes da sua visão"
                  rows={1}
                  onInput={(e) => { e.target.style.height = ''; e.target.style.height = e.target.scrollHeight + 'px'; }}
                ></textarea>
                <label className="encanto-lux-label" htmlFor="mensagem">Detalhes da sua visão</label>
              </div>
            </div>
            <div className="mt-16 text-center">
              <button type="submit" className="text-xs tracking-[0.2em] uppercase border border-[#d4af37] text-black bg-[#d4af37] px-12 py-4 hover:bg-transparent hover:text-[#d4af37] transition-all duration-500">
                Solicitar Contato
              </button>
            </div>
          </motion.form>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-[#121414] w-full relative border-t border-[#444748]/30">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 px-6 md:px-20 py-32 max-w-[1440px] mx-auto items-end relative">
          <div className="col-span-12 md:col-span-5 mb-12 md:mb-0">
            <h5 className="text-2xl text-[#e9c349] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Casa de Festas Encanto</h5>
            <p className="text-sm text-[#c4c7c7] max-w-xs mb-8 font-light">
              Avenida Atlântica, 560<br />Rio das Ostras, RJ
            </p>
            <a className="text-sm text-[#e2e2e2] hover:text-[#e9c349] transition-colors duration-300 block mb-2" href="mailto:contato@casadefestasencanto.com.br">contato@casadefestasencanto.com.br</a>
            <a className="text-sm text-[#e2e2e2] hover:text-[#e9c349] transition-colors duration-300 block" href="tel:+5522999999999">(22) 99999-9999</a>
          </div>
          <div className="col-span-12 md:col-span-7 flex flex-col md:items-end">
            <div className="flex flex-col space-y-4 mb-16 md:text-right">
              <span className="text-sm text-[#c4c7c7] font-light">I. Política de Privacidade</span>
              <span className="text-sm text-[#c4c7c7] font-light">II. Termos de Serviço</span>
              <span className="text-sm text-[#c4c7c7] font-light">III. Imprensa</span>
              <span className="text-sm text-[#c4c7c7] font-light">IV. Carreiras</span>
            </div>
            <p className="text-sm text-[#8e9192]">© MMXXIV CASA DE FESTAS ENCANTO. TODOS OS DIREITOS RESERVADOS.</p>
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none hidden md:block">
            <span className="text-[10vw] text-[#e2e2e2] opacity-[0.02] whitespace-nowrap" style={{ fontFamily: "'Playfair Display', serif" }}>ENCANTO</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CasaDeFestasPage;
