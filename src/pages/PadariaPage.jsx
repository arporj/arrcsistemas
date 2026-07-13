
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, MapPin, Quote, Menu, X } from 'lucide-react';
import './PadariaPage.css';

const lanches = [
  { nome: 'Pão na Chapa', preco: 'R$ 5,00' },
  { nome: 'Misto Quente', preco: 'R$ 8,00' },
  { nome: 'Bauru', preco: 'R$ 12,00' },
  { nome: 'Açaí na Tigela', extra: '300ml', preco: 'R$ 15,00' },
];

const scrollToId = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const PadariaPage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="padaria-page min-h-screen flex flex-col antialiased" style={{ fontFamily: "'Source Serif 4', serif" }}>
      <Helmet>
        <title>Padaria do Seu Antônio | Exemplo ARRC Sistemas</title>
        <meta name="description" content="Exemplo de site premium para padaria artesanal, desenvolvido pela ARRC Sistemas." />
      </Helmet>

      <Link
        to="/"
        className="fixed bottom-5 left-5 z-50 flex items-center gap-2 bg-[#1C140E] text-[#FDFBF7] text-xs uppercase tracking-widest px-4 py-2 rounded-full shadow-lg hover:bg-[#C5A059] transition-colors"
      >
        <ArrowLeft size={14} /> ARRC Sistemas
      </Link>

      {/* Nav */}
      <header className="fixed top-0 left-0 w-full z-40 max-w-[1280px] mx-auto bg-[#FDFBF7]/95 backdrop-blur-sm padaria-hairline-b">
        <div className="flex justify-between items-center px-5 md:px-16 py-6">
          <div className="font-semibold tracking-tight text-[#1C140E] text-2xl md:text-[32px]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Padaria do Seu Antônio
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToId('legado')} className="text-xs uppercase tracking-[0.2em] font-bold text-[#4d4540] hover:text-[#1C140E] transition-colors" style={{ fontFamily: "'Space Mono', monospace" }}>Legado</button>
            <button onClick={() => scrollToId('artesanal')} className="text-xs uppercase tracking-[0.2em] font-bold text-[#4d4540] hover:text-[#1C140E] transition-colors" style={{ fontFamily: "'Space Mono', monospace" }}>Cardápio</button>
          </nav>
          <button onClick={() => scrollToId('encomendar')} className="hidden md:inline-flex px-6 py-3 text-xs uppercase tracking-[0.2em] font-bold padaria-btn-primary" style={{ fontFamily: "'Space Mono', monospace" }}>
            Encomendar
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-[#1C140E]" aria-label="Abrir menu">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden padaria-hairline-t px-5 py-6 flex flex-col gap-4 bg-[#FDFBF7]">
            <button onClick={() => { scrollToId('legado'); setMobileOpen(false); }} className="text-left text-xs uppercase tracking-[0.2em] font-bold text-[#4d4540]" style={{ fontFamily: "'Space Mono', monospace" }}>Legado</button>
            <button onClick={() => { scrollToId('artesanal'); setMobileOpen(false); }} className="text-left text-xs uppercase tracking-[0.2em] font-bold text-[#4d4540]" style={{ fontFamily: "'Space Mono', monospace" }}>Cardápio</button>
            <button onClick={() => { scrollToId('encomendar'); setMobileOpen(false); }} className="px-6 py-3 text-xs uppercase tracking-[0.2em] font-bold padaria-btn-primary w-fit" style={{ fontFamily: "'Space Mono', monospace" }}>Encomendar</button>
          </div>
        )}
      </header>

      <main className="flex-grow pt-[100px]">
        {/* Hero */}
        <section className="relative w-full min-h-[90vh] flex flex-col md:flex-row items-center justify-center px-5 md:px-16 py-20 max-w-[1280px] mx-auto gap-8">
          <div className="w-full md:w-1/2 flex flex-col items-start z-10 relative">
            <div className="padaria-seal rounded-full w-32 h-32 flex items-center justify-center mb-8 absolute -top-16 -left-8 md:-left-16 bg-[#FDFBF7] transform -rotate-12 z-20">
              <span className="text-[10px] uppercase tracking-widest text-center leading-tight" style={{ fontFamily: "'Space Mono', monospace" }}>Desde<br />1980</span>
            </div>
            <h1 className="text-[56px] md:text-[84px] leading-[0.95] md:leading-[92px] tracking-[-0.02em] font-bold text-[#1C140E] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Tradição<br />em cada<br />pedaço.
            </h1>
            <p className="text-lg md:text-xl leading-relaxed text-[#4d4540] max-w-md mb-10">
              Onde a herança familiar encontra a maestria artesanal. Cada pão conta a história de quatro décadas de dedicação em Rio das Ostras.
            </p>
            <button onClick={() => scrollToId('artesanal')} className="padaria-btn-ghost px-8 py-4 text-xs uppercase tracking-[0.2em] font-bold" style={{ fontFamily: "'Space Mono', monospace" }}>
              Explorar o Cardápio
            </button>
          </div>
          <div className="w-full md:w-1/2 h-[60vh] md:h-[80vh] relative">
            <img
              alt="Pão artesanal rústico de fermentação natural"
              className="w-full h-full object-cover object-center grayscale-[20%] contrast-125"
              src="/images/exemplos/padaria/hero-bread.jpg"
            />
            <div className="absolute bottom-4 right-4 bg-[#FDFBF7]/90 px-4 py-2 text-[10px] uppercase tracking-widest border border-[#1C140E]/20" style={{ fontFamily: "'Space Mono', monospace" }}>
              Fermentação Natural
            </div>
          </div>
        </section>

        {/* Legado */}
        <section id="legado" className="w-full px-5 md:px-16 py-20 max-w-[1280px] mx-auto padaria-hairline-t">
          <div className="flex flex-col md:flex-row items-stretch gap-8 md:gap-[120px]">
            <div className="w-full md:w-5/12 pt-10">
              <span className="text-xs uppercase tracking-[0.2em] text-[#7f756f] block mb-4" style={{ fontFamily: "'Space Mono', monospace" }}>Capítulo I</span>
              <h2 className="text-4xl md:text-5xl font-semibold text-[#1C140E] mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>Nossa<br />História</h2>
              <p className="text-base leading-relaxed text-[#4d4540] mb-6">
                Fundada em 1980, a Padaria do Seu Antônio começou como um pequeno forno a lenha no coração de Rio das Ostras. Hoje, mantemos as mesmas receitas e o mesmo cuidado artesanal que nos tornou uma instituição na cidade.
              </p>
              <p className="text-base leading-relaxed text-[#4d4540]">
                Acreditamos no "slow food", respeitando o tempo sagrado de cada massa. Nossa família serve a sua, com a excelência premiada que transcende gerações.
              </p>
            </div>
            <div className="w-full md:w-7/12 relative mt-10 md:mt-0">
              <div className="aspect-[4/5] md:aspect-[3/4] relative">
                <img
                  alt="Fotografia vintage da fachada original da padaria em 1980"
                  className="w-full h-full object-cover grayscale"
                  src="/images/exemplos/padaria/vintage-1980.jpg"
                />
                <div className="absolute -bottom-8 -left-8 md:-left-16 bg-[#FDFBF7] p-8 border border-[#1C140E]/10 max-w-xs shadow-2xl">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#1C140E] block mb-2" style={{ fontFamily: "'Space Mono', monospace" }}>Rio das Ostras, 1980</span>
                  <p className="italic text-[#4d4540]">"O segredo sempre foi o tempo e o respeito pela farinha."</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cardápio */}
        <section id="artesanal" className="w-full bg-[#f5f3ef] py-20 padaria-hairline-t">
          <div className="px-5 md:px-16 max-w-[1280px] mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-[0.2em] text-[#7f756f] block mb-4" style={{ fontFamily: "'Space Mono', monospace" }}>Capítulo II</span>
              <h2 className="text-4xl md:text-5xl font-semibold text-[#1C140E] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Obras da Casa</h2>
              <div className="w-16 h-px bg-[#1C140E] mx-auto opacity-30"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 max-w-4xl mx-auto">
              {lanches.map((l) => (
                <div key={l.nome} className="flex items-baseline justify-between group">
                  <h3 className="text-2xl text-[#1C140E] group-hover:text-[#C5A059] transition-colors duration-300" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {l.nome} {l.extra && <span className="text-xs ml-2 text-[#4d4540]">{l.extra}</span>}
                  </h3>
                  <div className="flex-grow border-b border-dotted border-[#1C140E]/30 mx-4 relative -top-1.5"></div>
                  <div className="text-xs tracking-widest text-[#1C140E]" style={{ fontFamily: "'Space Mono', monospace" }}>{l.preco}</div>
                </div>
              ))}
            </div>
            <div className="mt-20 max-w-2xl mx-auto text-center relative pt-8">
              <Quote className="absolute top-0 left-1/2 -translate-x-1/2 text-[#1C140E]/10" size={48} />
              <p className="text-2xl md:text-[28px] leading-snug italic text-[#1C140E] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                "O melhor pão na chapa de toda a Região dos Lagos. O gosto de infância que permanece intacto."
              </p>
              <span className="text-xs uppercase tracking-[0.2em] text-[#7f756f]" style={{ fontFamily: "'Space Mono', monospace" }}>- Cliente desde 1995</span>
            </div>
          </div>
        </section>

        {/* Encomendas */}
        <section id="encomendar" className="w-full bg-[#1C140E] text-[#FDFBF7] py-20">
          <div className="px-5 md:px-16 max-w-[1280px] mx-auto text-center flex flex-col items-center">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C5A059] block mb-6" style={{ fontFamily: "'Space Mono', monospace" }}>Capítulo Final</span>
            <h2 className="text-5xl md:text-[64px] leading-tight font-bold mb-10 max-w-3xl" style={{ fontFamily: "'Playfair Display', serif" }}>Leve o nosso legado para a sua mesa.</h2>
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center mb-12 w-full max-w-2xl">
              <div className="flex flex-col items-center gap-2 p-6 border border-[#FDFBF7]/20 w-full md:w-1/2">
                <Phone className="text-[#C5A059] mb-2" size={22} />
                <span className="text-xs uppercase tracking-[0.2em] opacity-70" style={{ fontFamily: "'Space Mono', monospace" }}>Ligue para nós</span>
                <span className="text-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>(22) 99999-9999</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-6 border border-[#FDFBF7]/20 w-full md:w-1/2">
                <MapPin className="text-[#C5A059] mb-2" size={22} />
                <span className="text-xs uppercase tracking-[0.2em] opacity-70" style={{ fontFamily: "'Space Mono', monospace" }}>Visite-nos</span>
                <span className="text-xl text-center" style={{ fontFamily: "'Playfair Display', serif" }}>Rua Bonfim, 899<br />Rio das Ostras</span>
              </div>
            </div>
            <a href="tel:+5522999999999" className="bg-[#C5A059] text-[#1C140E] px-10 py-5 text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#FDFBF7] transition-colors duration-300" style={{ fontFamily: "'Space Mono', monospace" }}>
              Fazer Encomenda Agora
            </a>
          </div>
        </section>
      </main>

      <footer className="w-full bg-[#f5f3ef] border-t border-[#1C140E]/10">
        <div className="w-full px-5 md:px-16 py-16 flex flex-col md:flex-row justify-between items-start gap-8 max-w-[1280px] mx-auto">
          <div className="flex flex-col gap-4 max-w-xs">
            <div className="text-2xl font-semibold text-[#1C140E]" style={{ fontFamily: "'Playfair Display', serif" }}>Padaria do Seu Antônio</div>
            <p className="text-sm text-[#4d4540]">© 1980 Padaria do Seu Antônio. Excelência Premiada em Panificação.</p>
          </div>
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="flex flex-col gap-4">
              <span className="text-xs uppercase tracking-[0.2em] text-[#1C140E]" style={{ fontFamily: "'Space Mono', monospace" }}>Contato</span>
              <span className="text-sm text-[#4d4540]">Rio das Ostras, RJ</span>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-xs uppercase tracking-[0.2em] text-[#1C140E]" style={{ fontFamily: "'Space Mono', monospace" }}>Social</span>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-sm text-[#4d4540] hover:text-[#C5A059] transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PadariaPage;
