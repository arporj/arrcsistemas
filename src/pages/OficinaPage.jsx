
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Send, Settings, CarFront, RadioTower, Zap, Fuel, Target, Menu, X } from 'lucide-react';
import './OficinaPage.css';

const servicos = [
  { n: '01', icon: Settings, title: 'Revisão Completa', desc: 'INSPEÇÃO DIAGNÓSTICA. ESCANEAMENTO DIGITAL DE 40 PONTOS. AFERIÇÃO DE TORQUE DE ACORDO COM MANUAL DO FABRICANTE.', accent: true },
  { n: '02', icon: CarFront, title: 'Sistema de Freios', desc: 'TROCA DE PASTILHAS HIGH-TEMP. SANGRIA DE FLUIDO ABS/EBD. RETÍFICA DE DISCOS E AVALIAÇÃO DE PINÇAS.' },
  { n: '03', icon: RadioTower, title: 'Suspensão & Direção', desc: 'ALINHAMENTO 3D. BALANCEAMENTO DINÂMICO. INSPEÇÃO DE AMORTECEDORES, BUCHAS E TERMINAIS DE DIREÇÃO.' },
  { n: '04', icon: Zap, title: 'Parte Elétrica', desc: 'DIAGNÓSTICO ELETRÔNICO AVANÇADO. REPARO DE CHICOTES. AVALIAÇÃO DE BATERIA, ALTERNADOR E MÓDULOS DE CONTROLE (ECU).' },
];

const diferenciais = [
  { title: '99.9% Precisão de Torque', desc: 'Ferramental aferido digitalmente para garantir que cada parafuso receba exatamente a tensão especificada pela fábrica.', active: true },
  { title: 'Diagnóstico Baseado em Dados', desc: "Não usamos 'achismo'. Conectamos seu veículo a scanners de nível concessionária para leitura precisa de códigos de falha e telemetria." },
  { title: 'Transparência Total', desc: 'Acesso direto ao mecânico responsável. Relatórios técnicos detalhados com evidências fotográficas de componentes desgastados.' },
];

const scrollToId = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const OficinaPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ nome: '', whatsapp: '', veiculo: '', tipo: 'REVISÃO PROGRAMADA', descricao: '' });
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="oficina-page min-h-screen antialiased overflow-x-hidden selection:bg-[#D45500] selection:text-white">
      <Helmet>
        <title>Auto Center Bom Torque | Exemplo ARRC Sistemas</title>
        <meta name="description" content="Exemplo de site premium para oficina automotiva, desenvolvido pela ARRC Sistemas." />
      </Helmet>

      <Link
        to="/"
        className="fixed bottom-5 left-5 z-50 flex items-center gap-2 bg-[#D45500] text-white text-xs uppercase tracking-widest px-4 py-2 rounded-full shadow-lg hover:bg-[#ff6a00] transition-colors"
      >
        <ArrowLeft size={14} /> ARRC Sistemas
      </Link>

      <nav className="bg-[#101414] fixed top-0 w-full z-50 border-b border-[#c5c7c8]/20 px-6 md:px-12 py-4">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-[#ffb695] uppercase tracking-tighter" style={{ fontFamily: "'Archivo Narrow', sans-serif" }}>BOM TORQUE</div>
          <div className="hidden md:flex gap-8 items-center text-xs uppercase tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            <button onClick={() => scrollToId('servicos')} className="text-[#e1e3e3] hover:opacity-80 transition-opacity">Serviços</button>
            <button onClick={() => scrollToId('sobre')} className="text-[#e1e3e3] hover:opacity-80 transition-opacity">Sobre</button>
            <button onClick={() => scrollToId('orcamento')} className="text-[#e1e3e3] hover:opacity-80 transition-opacity">Contato</button>
          </div>
          <button onClick={() => scrollToId('orcamento')} className="hidden md:block bg-[#D45500] text-black text-xs uppercase tracking-widest px-6 py-2 hover:opacity-80 transition-all" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            Get Quote
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-[#ffb695]" aria-label="Abrir menu">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t border-[#c5c7c8]/20 mt-4 pt-4 flex flex-col gap-5 text-xs uppercase tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            <button onClick={() => { scrollToId('servicos'); setMobileOpen(false); }} className="text-left text-[#e1e3e3]">Serviços</button>
            <button onClick={() => { scrollToId('sobre'); setMobileOpen(false); }} className="text-left text-[#e1e3e3]">Sobre</button>
            <button onClick={() => { scrollToId('orcamento'); setMobileOpen(false); }} className="bg-[#D45500] text-black px-6 py-2 w-fit">Get Quote</button>
          </div>
        )}
      </nav>

      {/* Hero */}
      <header className="oficina-clip-diagonal relative h-[80vh] min-h-[600px] flex items-center justify-start px-6 md:px-12 mt-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="bg-cover bg-center w-full h-full opacity-40" style={{ mixBlendMode: 'luminosity', backgroundImage: "url('/images/exemplos/oficina/hero-engine.jpg')" }}></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#121414] via-[#121414]/80 to-transparent"></div>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 w-full max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-12 h-[1px] bg-[#D45500]"></div>
            <span className="text-xs text-[#D45500] uppercase tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Engineered for Excellence</span>
          </div>
          <h1 className="text-5xl md:text-8xl uppercase mb-6 leading-[0.95] text-[#e1e3e3]" style={{ fontFamily: "'Archivo Narrow', sans-serif", fontWeight: 800 }}>
            Precisão em cada torque.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D45500] to-[#ff8c42]">Performance em cada km.</span>
          </h1>
          <p className="text-base md:text-lg text-[#e0c0b2] max-w-xl mb-10 border-l border-[#c5c7c8]/20 pl-4 py-2">
            Nosso laboratório mecânico combina tecnologia de ponta com expertise em motorsport para extrair a máxima eficiência, durabilidade e potência do seu veículo. Manutenção não é custo, é investimento em performance.
          </p>
          <div className="flex flex-wrap gap-6 items-center">
            <button onClick={() => scrollToId('orcamento')} className="oficina-notch-corner bg-[#D45500] text-black text-xs uppercase tracking-widest px-8 py-4 hover:bg-[#ff6a00] transition-colors duration-300 flex items-center gap-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Solicitar Orçamento <ArrowRight size={16} />
            </button>
            <div className="flex flex-col gap-1 border-l border-[#c5c7c8]/20 pl-4">
              <span className="text-3xl leading-none text-[#e1e3e3]" style={{ fontFamily: "'Archivo Narrow', sans-serif", fontWeight: 700 }}>24/7</span>
              <span className="text-xs text-[#e0c0b2] uppercase tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Suporte Técnico</span>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Services */}
      <section id="servicos" className="oficina-clip-diagonal-reverse py-20 md:py-28 px-6 md:px-12 relative z-10 bg-[#101414] -mt-[10vh]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-[#c5c7c8]/20 pb-4">
            <div>
              <h2 className="text-3xl md:text-5xl text-[#e1e3e3] uppercase" style={{ fontFamily: "'Archivo Narrow', sans-serif", fontWeight: 700 }}>Protocolos de Manutenção</h2>
              <p className="text-[#e0c0b2] mt-2 max-w-md">Serviços executados com precisão milimétrica e aferição computadorizada.</p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-[#e0c0b2] mt-4 md:mt-0 text-xs uppercase tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              <Target size={18} /> Calibragem: 100%
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {servicos.map((s) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`oficina-notch-corner bg-[#1d2020] hover:bg-[#272b2b] transition-colors p-8 border border-[#c5c7c8]/10 group relative overflow-hidden ${s.accent ? 'border-t-2 border-t-[#D45500]' : ''}`}
              >
                <div className="absolute top-4 right-4 text-4xl text-[#e1e3e3]/10 group-hover:text-[#D45500]/20 transition-colors" style={{ fontFamily: "'Archivo Narrow', sans-serif", fontWeight: 700 }}>{s.n}</div>
                <div className="mb-8">
                  <s.icon size={32} className="text-[#D45500] mb-4" strokeWidth={1.5} />
                  <h3 className="text-xl uppercase mb-2 text-[#e1e3e3]" style={{ fontFamily: "'Archivo Narrow', sans-serif", fontWeight: 700 }}>{s.title}</h3>
                  <div className="w-12 h-[1px] bg-[#c5c7c8]/20 group-hover:w-full group-hover:bg-[#D45500] transition-all duration-500"></div>
                </div>
                <p className="text-xs text-[#e0c0b2] leading-relaxed uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{s.desc}</p>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="oficina-notch-corner bg-[#1d2020] hover:bg-[#272b2b] transition-colors p-8 border border-[#c5c7c8]/10 group relative overflow-hidden lg:col-span-2"
            >
              <div className="absolute top-4 right-4 text-4xl text-[#e1e3e3]/10 group-hover:text-[#D45500]/20 transition-colors" style={{ fontFamily: "'Archivo Narrow', sans-serif", fontWeight: 700 }}>05</div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 h-full">
                <div>
                  <Fuel size={32} className="text-[#D45500] mb-4" strokeWidth={1.5} />
                  <h3 className="text-xl uppercase mb-2 text-[#e1e3e3]" style={{ fontFamily: "'Archivo Narrow', sans-serif", fontWeight: 700 }}>Troca de Óleo Premium</h3>
                  <div className="w-12 h-[1px] bg-[#c5c7c8]/20 group-hover:w-full group-hover:bg-[#D45500] transition-all duration-500 mb-4"></div>
                  <p className="text-xs text-[#e0c0b2] leading-relaxed uppercase max-w-sm" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Lubrificantes sintéticos de alta performance. Filtros OEM. Flushing de motor. Análise de viscosidade e contaminação.</p>
                </div>
                <div className="relative w-full md:w-1/2 h-48 border border-[#c5c7c8]/20 oficina-notch-corner overflow-hidden">
                  <div className="bg-cover bg-center w-full h-full opacity-60" style={{ mixBlendMode: 'luminosity', backgroundImage: "url('/images/exemplos/oficina/oleo-pour.jpg')" }}></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="sobre" className="py-20 md:py-28 relative z-0 bg-[#121414]">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="oficina-clip-diagonal relative h-[400px] lg:h-auto pr-6 md:pr-12">
            <div className="bg-cover bg-center w-full h-full opacity-50" style={{ mixBlendMode: 'luminosity', backgroundImage: "url('/images/exemplos/oficina/mecanico-torque.jpg')" }}></div>
            <div className="absolute bottom-10 left-6 md:left-12 bg-[#101414]/90 border border-[#c5c7c8]/20 p-6 backdrop-blur-sm oficina-notch-corner border-l-2 border-l-[#D45500]">
              <span className="text-xs text-[#D45500] block mb-2 uppercase tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Telemetria Interna</span>
              <div className="text-3xl text-[#e1e3e3] leading-none mb-1" style={{ fontFamily: "'Archivo Narrow', sans-serif", fontWeight: 700 }}>+15</div>
              <span className="text-xs text-[#e0c0b2] uppercase tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Anos em Pista</span>
            </div>
          </motion.div>
          <div className="pl-6 pr-6 md:pl-12 md:pr-24 py-16 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-6">
              <Target size={20} className="text-[#D45500]" />
              <span className="text-xs text-[#D45500] uppercase tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>A Diferença Bom Torque</span>
            </div>
            <h2 className="text-3xl md:text-5xl text-[#e1e3e3] uppercase mb-8" style={{ fontFamily: "'Archivo Narrow', sans-serif", fontWeight: 700 }}>Não é só manutenção.<br />É engenharia aplicada.</h2>
            <div className="space-y-8 mt-4 border-l border-[#c5c7c8]/20 pl-6 ml-2">
              {diferenciais.map((d) => (
                <div key={d.title} className="relative">
                  <div className={`absolute -left-[31px] top-1 w-3 h-3 bg-[#121414] rounded-full border ${d.active ? 'border-[#D45500]' : 'border-[#c5c7c8]/40'}`}></div>
                  <h4 className="text-lg uppercase mb-1 text-[#e1e3e3]" style={{ fontFamily: "'Archivo Narrow', sans-serif", fontWeight: 700 }}>{d.title}</h4>
                  <p className="text-sm text-[#e0c0b2]">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote form */}
      <section id="orcamento" className="py-20 md:py-28 px-6 md:px-12 bg-[#323536] relative">
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-2">
            <h2 className="text-4xl md:text-6xl text-[#e1e3e3] uppercase leading-[0.9] mb-6" style={{ fontFamily: "'Archivo Narrow', sans-serif", fontWeight: 800 }}>
              Solicitar<br /><span className="text-transparent bg-clip-text bg-gradient-to-b from-[#D45500] to-[#ff8c42]">Orçamento</span>
            </h2>
            <p className="text-[#e0c0b2] border-l border-[#D45500] pl-4 py-2">Agende seu serviço. Nossa equipe técnica entrará em contato em menos de 15 minutos com um pré-diagnóstico logístico.</p>
          </div>
          <div className="lg:col-span-3 bg-[#121414] p-8 md:p-10 border border-[#c5c7c8]/20 oficina-notch-corner shadow-2xl">
            {submitted ? (
              <div className="text-center py-8">
                <h3 className="text-2xl text-[#e1e3e3] uppercase mb-4" style={{ fontFamily: "'Archivo Narrow', sans-serif", fontWeight: 700 }}>Dados Transmitidos.</h3>
                <p className="text-[#e0c0b2]">Nossa equipe técnica entrará em contato em breve para confirmar seu diagnóstico logístico.</p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-8 border-b border-[#c5c7c8]/20 pb-4">
                  <span className="text-xs text-[#e1e3e3] uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Input_Data_Stream</span>
                  <span className="text-xs text-[#D45500] flex items-center gap-1 uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    <span className="w-2 h-2 bg-[#D45500] rounded-full animate-pulse"></span> Secure_Connection
                  </span>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs text-[#e0c0b2] mb-2 uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Nome do Piloto / Cliente</label>
                      <input required value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} className="w-full bg-[#101414] border-0 border-b border-[#c5c7c8]/40 text-[#e1e3e3] focus:ring-0 focus:border-[#D45500] transition-colors py-3 px-0" type="text" />
                    </div>
                    <div>
                      <label className="block text-xs text-[#e0c0b2] mb-2 uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Contato (WhatsApp)</label>
                      <input required value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} className="w-full bg-[#101414] border-0 border-b border-[#c5c7c8]/40 text-[#e1e3e3] focus:ring-0 focus:border-[#D45500] transition-colors py-3 px-0" type="tel" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs text-[#e0c0b2] mb-2 uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Veículo (Marca/Modelo/Ano)</label>
                      <input value={form.veiculo} onChange={(e) => setForm({ ...form, veiculo: e.target.value })} className="w-full bg-[#101414] border-0 border-b border-[#c5c7c8]/40 text-[#e1e3e3] focus:ring-0 focus:border-[#D45500] transition-colors py-3 px-0" type="text" />
                    </div>
                    <div>
                      <label className="block text-xs text-[#e0c0b2] mb-2 uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Tipo de Serviço</label>
                      <select value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })} className="w-full bg-[#101414] border-0 border-b border-[#c5c7c8]/40 text-[#e1e3e3] focus:ring-0 focus:border-[#D45500] transition-colors py-3 px-0 appearance-none">
                        <option>REVISÃO PROGRAMADA</option>
                        <option>DIAGNÓSTICO DE FALHA</option>
                        <option>UPGRADE DE PERFORMANCE</option>
                        <option>MANUTENÇÃO CORRETIVA</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-[#e0c0b2] mb-2 uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Descrição do Sintoma ou Solicitação</label>
                    <textarea value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} className="w-full bg-[#101414] border-0 border-b border-[#c5c7c8]/40 text-[#e1e3e3] focus:ring-0 focus:border-[#D45500] transition-colors py-3 px-0 resize-none" rows={3}></textarea>
                  </div>
                  <div className="pt-4 flex justify-end">
                    <button type="submit" className="bg-[#D45500] text-black text-xs uppercase tracking-widest px-10 py-4 hover:bg-[#ff6a00] transition-colors duration-300 oficina-notch-corner flex items-center gap-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      Transmitir Dados <Send size={16} />
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-[#0b0f0f] w-full border-t border-[#c5c7c8]/10 px-6 md:px-12 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-6xl md:text-8xl text-[#e1e3e3]/5 uppercase mb-8 whitespace-nowrap overflow-hidden" style={{ fontFamily: "'Archivo Narrow', sans-serif", fontWeight: 800 }}>
            BOM TORQUE
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-6 text-xs text-[#e0c0b2] uppercase tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            <div>
              <p>© 2024 Auto Center Bom Torque. Precision Engineered.</p>
              <p className="mt-2">Rua das Garagens, 1020 - Rio das Ostras, RJ · (22) 99999-9999</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <span>Garantia</span>
              <span>Frota</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OficinaPage;
