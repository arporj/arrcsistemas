
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Truck, ShieldCheck, Calculator, Phone, Mail, Wrench, Layers, Menu, X } from 'lucide-react';
import './ConstrucaoPage.css';

const produtos = [
  {
    specId: 'SPEC_ID: T-PRO-20V',
    icon: Wrench,
    img: '/images/exemplos/constrular/produto-furadeira.jpg',
    nome: 'Furadeira Titan Pro 20V',
    specs: [
      { label: 'TORQUE MÁXIMO', value: '120 Nm' },
      { label: 'ROTAÇÃO', value: '2100 RPM' },
    ],
    precoLabel: 'PREÇO UNIT. (B2B)',
    preco: 'R$ 1.240,00',
  },
  {
    specId: 'SPEC_ID: SLT-ULTRA-90',
    icon: Layers,
    img: '/images/exemplos/constrular/produto-porcelanato.jpg',
    nome: 'Porcelanato Slate Ultra',
    specs: [
      { label: 'DIMENSÕES', value: '90x90 cm' },
      { label: 'RESISTÊNCIA', value: 'PEI 5 / Alto Tráfego' },
    ],
    precoLabel: 'PREÇO M² (B2B)',
    preco: 'R$ 185,90',
  },
];

const diferenciais = [
  { icon: Truck, title: 'Logística Implacável', desc: 'Entregas programadas com precisão de minutos. Frotas dedicadas para obras de grande porte, minimizando tempo de inatividade.', tag: 'SLA: < 24H METROPOLITAN' },
  { icon: ShieldCheck, title: 'Marcas de Elite', desc: 'Homologação rigorosa de fornecedores. Trabalhamos exclusivamente com fabricantes que atendem ou excedem as normas ISO globais.', tag: 'CERT: ISO 9001:2015' },
  { icon: Calculator, title: 'Engenharia de Custos', desc: 'Estruturas de preço agressivas para o mercado B2B. Negociações em volume que garantem viabilidade financeira para projetos complexos.', tag: 'MODEL: B2B DIRECT' },
];

const scrollToId = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const ConstrucaoPage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="constrular-page min-h-screen flex flex-col antialiased selection:bg-[#ffb964] selection:text-[#10131a]">
      <Helmet>
        <title>Constrular | Exemplo ARRC Sistemas</title>
        <meta name="description" content="Exemplo de site premium para loja de materiais de construção, desenvolvido pela ARRC Sistemas." />
      </Helmet>

      <Link
        to="/"
        className="fixed bottom-5 left-5 z-50 flex items-center gap-2 bg-[#ffb964] text-[#10131a] text-xs uppercase tracking-widest px-4 py-2 rounded-full shadow-lg hover:bg-[#ffddba] transition-colors"
      >
        <ArrowLeft size={14} /> ARRC Sistemas
      </Link>

      <header className={`bg-[#10131a] fixed top-0 w-full z-50 border-b border-[#44474e] ${mobileOpen ? '' : 'constrular-header'}`}>
        <div className="flex justify-between items-center h-16 px-5 md:px-16 w-full mx-auto max-w-7xl">
          <div className="text-2xl font-bold text-[#ffb964] tracking-tighter">CONSTRULAR</div>
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToId('products')} className="text-[#e1e2ec] text-xs uppercase tracking-widest hover:text-[#ffb964] transition-colors" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Products</button>
            <button onClick={() => scrollToId('differentiators')} className="text-[#e1e2ec] text-xs uppercase tracking-widest hover:text-[#ffb964] transition-colors" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Differentiators</button>
            <button onClick={() => scrollToId('contact')} className="text-[#e1e2ec] text-xs uppercase tracking-widest hover:text-[#ffb964] transition-colors" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Contact</button>
          </nav>
          <button onClick={() => scrollToId('contact')} className="hidden md:inline-flex constrular-btn-primary py-2 px-4 text-[10px]">B2B Portal</button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-[#ffb964]" aria-label="Abrir menu">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t border-[#44474e] px-5 py-6 flex flex-col gap-5">
            <button onClick={() => { scrollToId('products'); setMobileOpen(false); }} className="text-left text-[#e1e2ec] text-xs uppercase tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Products</button>
            <button onClick={() => { scrollToId('differentiators'); setMobileOpen(false); }} className="text-left text-[#e1e2ec] text-xs uppercase tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Differentiators</button>
            <button onClick={() => { scrollToId('contact'); setMobileOpen(false); }} className="constrular-btn-primary py-2 px-4 text-[10px] w-fit">B2B Portal</button>
          </div>
        )}
      </header>

      <main className="flex-grow pt-24 pb-32 flex flex-col gap-24 md:gap-32">
        {/* Hero */}
        <section className="px-5 md:px-16 w-full max-w-7xl mx-auto relative mt-12 md:mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="lg:col-span-7 z-10 flex flex-col gap-8">
              <div className="inline-flex items-center gap-2 border border-[#44474e] px-3 py-1 w-fit bg-[#0b0e15]">
                <span className="w-2 h-2 bg-[#ffb964] animate-pulse"></span>
                <span className="text-xs text-[#c6c6c6]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>SYS.STATUS: OPTIMAL</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tighter leading-none text-[#e1e2ec]">
                ESTRUTURA PARA <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffb964] to-[#c8811d]">O IMPOSSÍVEL</span>
              </h1>
              <p className="text-base md:text-lg text-[#c5c6ce] max-w-2xl">
                Engenharia de suprimentos para projetos de alta complexidade. Precisão germânica, logística implacável e materiais que desafiam os limites estruturais.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <button onClick={() => scrollToId('products')} className="constrular-btn-primary">
                  <span>Ver Catálogo</span>
                  <ArrowRight size={16} />
                </button>
                <button onClick={() => scrollToId('contact')} className="constrular-btn-secondary">
                  <span>Falar com Especialista</span>
                </button>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.15 }} className="lg:col-span-5 relative mt-12 lg:mt-0">
              <div className="relative w-full aspect-[4/5] constrular-technical-border bg-[#191b23] overflow-hidden">
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#ffb964] z-20"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#ffb964] z-20"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#ffb964] z-20"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#ffb964] z-20"></div>
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#ffb964] opacity-20 z-10"></div>
                <div className="absolute top-0 left-1/2 w-[1px] h-full bg-[#ffb964] opacity-20 z-10"></div>
                <img alt="Vigas de aço industrial" className="w-full h-full object-cover filter grayscale contrast-125 opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-700" src="/images/exemplos/constrular/hero-steel.jpg" />
                <div className="absolute bottom-4 right-4 bg-[#10131a] border border-[#ffb964] px-2 py-1 z-20">
                  <span className="text-[10px] text-[#ffb964]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>IMG_REF: BEAM_ST_890</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Products */}
        <section id="products" className="px-5 md:px-16 w-full max-w-7xl mx-auto">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-2 border-l-2 border-[#ffb964] pl-4">
              <h2 className="text-xs text-[#ffb964] uppercase tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Equipamentos &amp; Materiais</h2>
              <h3 className="text-2xl md:text-4xl font-bold text-[#e1e2ec]">CATÁLOGO TÉCNICO</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {produtos.map((p) => (
                <motion.div key={p.specId} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="constrular-card-panel group">
                  <div className="border-b border-[#44474e] p-2 bg-[#1d1f27] flex justify-between items-center">
                    <span className="text-[10px] text-[#c6c6c6]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{p.specId}</span>
                    <p.icon size={16} className="text-[#8f9098]" />
                  </div>
                  <div className="p-6 flex flex-col gap-6">
                    <div className="w-full h-64 constrular-technical-border overflow-hidden relative bg-[#0b0e15]">
                      <img alt={p.nome} className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-500" src={p.img} />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#10131a] to-transparent opacity-60"></div>
                    </div>
                    <div>
                      <h4 className="text-xl uppercase mb-2 text-[#e1e2ec] group-hover:text-[#ffb964] transition-colors">{p.nome}</h4>
                      <div className="grid grid-cols-2 gap-4 border-t border-[#44474e] pt-4 mt-4">
                        {p.specs.map((s) => (
                          <div key={s.label} className="flex flex-col">
                            <span className="text-[10px] text-[#c6c6c6]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{s.label}</span>
                            <span className="text-sm text-[#e1e2ec]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{s.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-end mt-4">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-[#c6c6c6]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{p.precoLabel}</span>
                        <span className="text-2xl font-bold text-[#ffb964]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{p.preco}</span>
                      </div>
                      <button className="constrular-btn-secondary py-2 px-4 text-[10px]">Adicionar</button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Differentiators */}
        <section id="differentiators" className="w-full bg-[#011230] border-y border-[#44474e] relative overflow-hidden py-24">
          <div className="px-5 md:px-16 w-full max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-xs text-[#ffb964] uppercase tracking-widest mb-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Diferenciais Operacionais</h2>
              <h3 className="text-2xl md:text-4xl font-bold text-[#e1e2ec] uppercase">Protocolo de Serviço</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {diferenciais.map((d) => (
                <motion.div key={d.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 border border-[#44474e] bg-[#0b0e15] flex flex-col gap-6 hover:border-[#ffb964] transition-colors duration-300">
                  <div className="w-16 h-16 border border-[#ffb964] flex items-center justify-center text-[#ffb964]">
                    <d.icon size={28} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-xl text-[#e1e2ec] mb-2">{d.title}</h4>
                    <p className="text-sm text-[#c5c6ce]">{d.desc}</p>
                  </div>
                  <div className="mt-auto pt-4 border-t border-[#44474e]">
                    <span className="text-[10px] text-[#c6c6c6]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{d.tag}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="px-5 md:px-16 w-full max-w-7xl mx-auto py-8">
          <div className="constrular-card-panel border-[#ffb964] p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center justify-between relative overflow-hidden">
            <div className="flex flex-col gap-6 max-w-xl z-10 relative">
              <div className="inline-flex items-center gap-2">
                <div className="w-8 h-[1px] bg-[#ffb964]"></div>
                <span className="text-xs text-[#ffb964] uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Central de Engenharia</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-bold text-[#e1e2ec] uppercase">Pronto para estruturar sua próxima obra?</h2>
              <p className="text-sm text-[#c5c6ce]">Nossa equipe de especialistas técnicos está a postos para analisar seu projeto e fornecer uma cotação detalhada em até 2 horas.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="border border-[#44474e] p-4 bg-[#0b0e15] flex items-center gap-4">
                  <Phone className="text-[#ffb964]" size={20} />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#c6c6c6]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>LINHA DIRETA B2B</span>
                    <span className="text-[#e1e2ec] font-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>0800 555 0199</span>
                  </div>
                </div>
                <div className="border border-[#44474e] p-4 bg-[#0b0e15] flex items-center gap-4">
                  <Mail className="text-[#ffb964]" size={20} />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#c6c6c6]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>ENVIO DE PROJETOS</span>
                    <span className="text-[#e1e2ec] font-bold text-xs truncate" style={{ fontFamily: "'JetBrains Mono', monospace" }}>projetos@constrular.ind.br</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="z-10 w-full md:w-auto">
              <a href="tel:08005550199" className="constrular-btn-primary w-full md:w-auto justify-center text-lg py-6 px-12">
                SOLICITAR COTAÇÃO
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0b0e15] w-full border-t border-[#44474e]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-5 md:px-16 py-12 w-full max-w-7xl mx-auto">
          <div className="flex flex-col gap-4">
            <div className="text-2xl font-black text-[#e1e2ec]">CONSTRULAR</div>
            <p className="text-[10px] text-[#c6c6c6] mt-2 max-w-xs uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              © 2024 CONSTRULAR INDUSTRIAL. TODOS OS DIREITOS RESERVADOS.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-xs text-[#ffb964] uppercase mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>System Status</h4>
            <div className="inline-flex items-center gap-2 border border-[#44474e] px-3 py-2 w-fit bg-[#1d1f27]">
              <span className="w-2 h-2 bg-[#ffb964]"></span>
              <span className="text-[10px] text-[#c6c6c6]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>PORTAL B2B ONLINE</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ConstrucaoPage;
