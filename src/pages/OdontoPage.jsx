
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Menu, X } from 'lucide-react';
import './OdontoPage.css';

const servicos = [
  { n: '01', nome: 'Clareamento Dental', desc: 'Técnicas seguras para iluminar seu sorriso de forma natural e confortável.' },
  { n: '02', nome: 'Ortodontia', desc: 'Alinhamento invisível e aparelhos estéticos para harmonia facial.' },
  { n: '03', nome: 'Implantes', desc: 'Reabilitação oral de alta precisão devolvendo função e estética.' },
  { n: '04', nome: 'Limpeza e Prevenção', desc: 'Cuidado contínuo para manter sua saúde bucal impecável a longo prazo.' },
];

const depoimentos = [
  { nome: 'Marina S.', texto: 'O ambiente não parece uma clínica tradicional. É calmo, cheiroso e o atendimento é impecável. Nunca me senti tão relaxada em um dentista.', img: '/images/exemplos/odonto/depoimento-marina.jpg' },
  { nome: 'Carlos M.', texto: 'Profissionais que realmente escutam. O planejamento do meu tratamento foi transparente e o resultado do clareamento superou minhas expectativas.', img: '/images/exemplos/odonto/depoimento-carlos.jpg' },
  { nome: 'Juliana R.', texto: 'Sofisticação e cuidado em cada detalhe. Desde a recepção até a cadeira do dentista, é uma experiência de bem-estar focada na saúde.', img: '/images/exemplos/odonto/depoimento-juliana.jpg' },
];

const scrollToId = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const OdontoPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ nome: '', whatsapp: '', servico: '', mensagem: '' });
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="odonto-page min-h-screen antialiased selection:bg-[#004d5b] selection:text-white">
      <Helmet>
        <title>Odonto Sorriso Rio | Exemplo ARRC Sistemas</title>
        <meta name="description" content="Exemplo de site premium para clínica odontológica, desenvolvido pela ARRC Sistemas." />
      </Helmet>

      <Link
        to="/"
        className="fixed bottom-5 left-5 z-50 flex items-center gap-2 bg-[#00353f] text-white text-xs uppercase tracking-widest px-4 py-2 rounded-full shadow-lg hover:bg-[#004d5b] transition-colors"
      >
        <ArrowLeft size={14} /> ARRC Sistemas
      </Link>

      <nav className="bg-[#f9f9f9]/90 backdrop-blur-md w-full sticky top-0 z-40 border-b border-[#bfc8cb]/40">
        <div className="flex justify-between items-center w-full px-5 md:px-20 max-w-[1440px] mx-auto h-20 md:h-24">
          <span className="text-xl md:text-2xl text-[#00353f] tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Odonto Sorriso Rio</span>
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToId('services')} className="text-[#40484b] hover:text-[#00353f] transition-colors text-sm">Serviços</button>
            <button onClick={() => scrollToId('testimonials')} className="text-[#40484b] hover:text-[#00353f] transition-colors text-sm">Depoimentos</button>
          </div>
          <button onClick={() => scrollToId('booking')} className="hidden md:inline-flex items-center justify-center bg-[#004d5b] text-white text-sm px-6 py-3 rounded hover:opacity-90 transition-opacity">
            Agendar Consulta
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-[#00353f]" aria-label="Abrir menu">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t border-[#bfc8cb]/40 px-5 py-6 flex flex-col gap-5">
            <button onClick={() => { scrollToId('services'); setMobileOpen(false); }} className="text-left text-[#40484b] text-sm">Serviços</button>
            <button onClick={() => { scrollToId('testimonials'); setMobileOpen(false); }} className="text-left text-[#40484b] text-sm">Depoimentos</button>
            <button onClick={() => { scrollToId('booking'); setMobileOpen(false); }} className="inline-flex items-center justify-center bg-[#004d5b] text-white text-sm px-6 py-3 rounded w-fit">Agendar Consulta</button>
          </div>
        )}
      </nav>

      <main>
        {/* Hero */}
        <section className="w-full max-w-[1440px] mx-auto px-5 md:px-20 py-20 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="md:col-start-2 md:col-span-5 flex flex-col items-start z-10 order-2 md:order-1 pt-12 md:pt-0">
              <h1 className="text-4xl md:text-6xl leading-tight text-[#00353f] mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                Sua saúde bucal em mãos de quem cuida com carinho
              </h1>
              <p className="text-lg text-[#40484b] mb-12 max-w-md">
                Combinamos excelência clínica com um atendimento humano e acolhedor. Transforme seu sorriso em um ambiente pensado para o seu conforto.
              </p>
              <button onClick={() => scrollToId('booking')} className="inline-flex items-center justify-center bg-[#004d5b] text-white text-sm px-8 py-4 rounded hover:opacity-90 transition-all duration-300">
                Agendar Minha Consulta
              </button>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.15 }} className="md:col-start-7 md:col-span-6 h-[400px] md:h-[700px] w-full relative order-1 md:order-2">
              <img alt="Paciente sorrindo" className="w-full h-full object-cover rounded-lg shadow-sm" src="/images/exemplos/odonto/hero-paciente.jpg" />
            </motion.div>
          </div>
        </section>

        {/* Credentials strip */}
        <section className="w-full bg-[#e9e1d8] py-8 border-y border-[#bfc8cb]/30">
          <div className="max-w-[1440px] mx-auto px-5 md:px-20 flex flex-wrap justify-center md:justify-between items-center gap-8">
            <span className="text-xs text-[#1e1b16] uppercase tracking-widest opacity-60">Atendimento Premium</span>
            <div className="hidden md:block w-1 h-1 rounded-full bg-[#bfc8cb]"></div>
            <span className="text-xs text-[#1e1b16] uppercase tracking-widest opacity-60">Tecnologia Avançada</span>
            <div className="hidden md:block w-1 h-1 rounded-full bg-[#bfc8cb]"></div>
            <span className="text-xs text-[#1e1b16] uppercase tracking-widest opacity-60">Ambiente Acolhedor</span>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="w-full max-w-[1440px] mx-auto px-5 md:px-20 py-24 md:py-40">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-start-3 md:col-span-3 mb-12 md:mb-0">
              <h2 className="text-4xl text-[#00353f] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Menu de Cuidados</h2>
              <p className="text-[#40484b]">Tratamentos personalizados com foco no seu bem-estar e resultados duradouros.</p>
            </div>
            <div className="md:col-start-7 md:col-span-5 flex flex-col">
              {servicos.map((s, i) => (
                <div key={s.n} className={`odonto-service-row group border-t ${i === servicos.length - 1 ? 'border-b' : ''} border-[#e9e1d8] py-8 flex flex-col md:flex-row md:items-baseline gap-4`}>
                  <span className="text-xs text-[#70787b] w-8">{s.n}</span>
                  <div className="flex-1 relative">
                    <h3 className="text-2xl text-[#1a1c1c] group-hover:text-[#00353f] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>{s.nome}</h3>
                    <p className="odonto-service-desc text-sm text-[#40484b] mt-2 max-w-xs md:absolute md:bg-white md:p-4 md:odonto-ambient-shadow md:z-10">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="w-full bg-[#f3f3f3] py-24 md:py-40">
          <div className="max-w-[1440px] mx-auto px-5 md:px-20">
            <h2 className="text-4xl text-[#00353f] text-center mb-16 md:mb-24" style={{ fontFamily: "'Playfair Display', serif" }}>Relatos Reais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {depoimentos.map((d) => (
                <motion.div key={d.nome} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col items-center text-center p-8 bg-white rounded-lg odonto-ambient-shadow">
                  <p className="text-4xl text-[#00353f] opacity-20 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>"</p>
                  <p className="text-sm text-[#40484b] mb-8 flex-grow">{d.texto}</p>
                  <div className="flex items-center gap-4 mt-auto">
                    <img alt={d.nome} className="w-12 h-12 rounded-full object-cover grayscale" src={d.img} />
                    <span className="text-xs text-[#1a1c1c] uppercase tracking-wider">{d.nome}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking */}
        <section id="booking" className="w-full py-24 md:py-40 relative">
          <div className="absolute inset-0 bg-[#e9e1d8]/30 -z-10 h-1/2 top-0"></div>
          <div className="max-w-[1440px] mx-auto px-5 md:px-20 flex justify-center">
            <div className="w-full max-w-2xl bg-white odonto-ambient-shadow rounded-xl p-8 md:p-16 relative">
              {submitted ? (
                <div className="text-center py-8">
                  <h2 className="text-3xl text-[#00353f] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Obrigado!</h2>
                  <p className="text-[#40484b]">Seu pedido de agendamento foi enviado. Nossa equipe entrará em contato para organizar sua visita.</p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-12">
                    <h2 className="text-4xl text-[#00353f] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Dê o Primeiro Passo</h2>
                    <p className="text-[#40484b]">Preencha os dados abaixo e nossa equipe entrará em contato para organizar sua visita.</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                      <label className="text-xs text-[#70787b] block mb-2" htmlFor="nome">NOME COMPLETO</label>
                      <input required value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} className="w-full bg-transparent border-0 border-b border-[#e9e1d8] focus:ring-0 focus:border-[#004d5b] px-0 py-2 text-[#1a1c1c] transition-colors" id="nome" placeholder="Seu nome" type="text" />
                    </div>
                    <div>
                      <label className="text-xs text-[#70787b] block mb-2" htmlFor="whatsapp">WHATSAPP</label>
                      <input required value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} className="w-full bg-transparent border-0 border-b border-[#e9e1d8] focus:ring-0 focus:border-[#004d5b] px-0 py-2 text-[#1a1c1c] transition-colors" id="whatsapp" placeholder="(22) 99999-9999" type="tel" />
                    </div>
                    <div>
                      <label className="text-xs text-[#70787b] block mb-2" htmlFor="servico">SERVIÇO DE INTERESSE</label>
                      <select value={form.servico} onChange={(e) => setForm({ ...form, servico: e.target.value })} className="w-full bg-transparent border-0 border-b border-[#e9e1d8] focus:ring-0 focus:border-[#004d5b] px-0 py-2 text-[#1a1c1c] transition-colors appearance-none" id="servico">
                        <option disabled value="">Selecione uma opção</option>
                        <option value="clareamento">Clareamento Dental</option>
                        <option value="ortodontia">Ortodontia</option>
                        <option value="implantes">Implantes</option>
                        <option value="limpeza">Limpeza e Prevenção</option>
                        <option value="outro">Outro / Não tenho certeza</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-[#70787b] block mb-2" htmlFor="mensagem">MENSAGEM (OPCIONAL)</label>
                      <textarea value={form.mensagem} onChange={(e) => setForm({ ...form, mensagem: e.target.value })} className="w-full bg-transparent border-0 border-b border-[#e9e1d8] focus:ring-0 focus:border-[#004d5b] px-0 py-2 text-[#1a1c1c] transition-colors resize-none" id="mensagem" placeholder="Como podemos ajudar?" rows={3}></textarea>
                    </div>
                    <button type="submit" className="w-full bg-[#004d5b] text-white py-4 rounded hover:opacity-90 transition-all duration-300 mt-8">
                      Solicitar Agendamento
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#e9e1d8] w-full py-16 md:py-24">
        <div className="flex flex-col md:flex-row justify-between items-start px-5 md:px-20 max-w-[1440px] mx-auto gap-8">
          <div>
            <span className="text-2xl text-[#00353f] block mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Odonto Sorriso Rio</span>
            <p className="text-sm text-[#68645d] max-w-xs mb-2">Rua das Palmeiras, 210 - Rio das Ostras, RJ</p>
            <p className="text-sm text-[#68645d] max-w-xs mb-4">(22) 99999-9999</p>
            <p className="text-sm text-[#68645d] max-w-xs">© 2024 Odonto Sorriso Rio. Excelência em Estética Dental.</p>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-sm text-[#4a4640] hover:opacity-80 transition-opacity">Contato</span>
            <span className="text-sm text-[#4a4640] hover:opacity-80 transition-opacity">Política de Privacidade</span>
            <span className="text-sm text-[#4a4640] hover:opacity-80 transition-opacity">Termos de Serviço</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OdontoPage;
