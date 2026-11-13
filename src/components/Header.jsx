
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { exemplos } from '@/conteudo/exemplos';
import { useEscolhaVersao } from '@/components/EscolhaVersao';


const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { abrir } = useEscolhaVersao();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToId = (id) => {
    setIsMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 w-full z-40 border-b border-[#d1c79d]/20 transition-colors duration-300 ${
        isScrolled ? 'bg-[#121414]/90 backdrop-blur-xl' : 'bg-[#121414]/80 backdrop-blur-xl'
      }`}
    >
      <div className="flex justify-between items-center px-5 md:px-20 py-6 w-full max-w-full mx-auto">
        <button
          onClick={() => scrollToId('hero')}
          className="flex items-center gap-2.5 cursor-pointer active:scale-95 transition-transform hover:opacity-80 duration-300"
        >
          <img src="/images/logosimples.png" alt="" className="h-7 w-7 md:h-8 md:w-8" />
          <span className="font-['Anybody'] text-2xl md:text-3xl font-extrabold tracking-tighter text-[#e2e2e2] uppercase">
            ARRC Sistemas
          </span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToId('hero')}
            className="font-['JetBrains_Mono'] text-[10px] tracking-[0.15em] uppercase text-[#d1c79d] font-bold border-b border-[#d1c79d] pb-1 hover:opacity-80 transition-opacity"
          >
            Início
          </button>
          <button
            onClick={() => scrollToId('servicos')}
            className="font-['JetBrains_Mono'] text-[10px] tracking-[0.15em] uppercase text-[#ccc6b8] hover:text-[#d1c79d] transition-colors"
          >
            Serviços
          </button>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="flex items-center gap-1 font-['JetBrains_Mono'] text-[10px] tracking-[0.15em] uppercase text-[#ccc6b8] hover:text-[#d1c79d] transition-colors outline-none">
                Exemplos <ChevronDown size={12} />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
              className="bg-[#1a1c1c] border border-[#d1c79d]/20 shadow-2xl mt-3 min-w-[240px] py-2"
              sideOffset={5}
            >
              {exemplos.map((ex) => (
                <DropdownMenu.Item
                  key={ex.slug}
                  onSelect={() => abrir(ex.slug)}
                  className="flex items-center justify-between gap-4 px-4 py-3 font-['Hanken_Grotesk'] text-sm text-[#e2e2e2] hover:bg-[#d1c79d]/10 hover:text-[#d1c79d] focus:bg-[#d1c79d]/10 focus:text-[#d1c79d] transition-colors cursor-pointer outline-none"
                >
                  {ex.nome}
                  <ArrowUpRight size={14} />
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>

          <button
            onClick={() => scrollToId('contato')}
            className="font-['JetBrains_Mono'] text-[10px] tracking-[0.15em] uppercase text-[#ccc6b8] hover:text-[#d1c79d] transition-colors"
          >
            Contato
          </button>
        </div>

        <button
          onClick={() => window.open('https://wa.me/5521967621494', '_blank')}
          className="hidden md:block bg-[#d1c79d] text-[#373013] font-['JetBrains_Mono'] text-[10px] tracking-[0.15em] uppercase px-6 py-3 font-semibold hover:opacity-80 transition-all active:scale-95"
        >
          Fale Conosco
        </button>

        <button
          className="md:hidden text-[#d1c79d]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Abrir menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-[#121414] border-t border-[#d1c79d]/20 px-5 py-6"
        >
          <button onClick={() => scrollToId('hero')} className="block w-full text-left py-3 font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#d1c79d]">Início</button>
          <button onClick={() => scrollToId('servicos')} className="block w-full text-left py-3 font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#ccc6b8]">Serviços</button>
          <button onClick={() => scrollToId('contato')} className="block w-full text-left py-3 font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#ccc6b8]">Contato</button>
          <div className="border-t border-[#d1c79d]/10 my-3"></div>
          <p className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-widest text-[#ccc6b8]/60 py-2">Exemplos</p>
          {exemplos.map((ex) => (
            <button
              key={ex.slug}
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                abrir(ex.slug);
              }}
              className="block w-full text-left py-3 font-['Hanken_Grotesk'] text-sm text-[#e2e2e2]"
            >
              {ex.nome}
            </button>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Header;
