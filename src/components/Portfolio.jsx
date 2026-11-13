
import React from 'react';
import { motion } from 'framer-motion';
import { exemplos } from '@/conteudo/exemplos';
import { useEscolhaVersao } from '@/components/EscolhaVersao';
import { ArrowUpRight } from 'lucide-react';

// Posição de cada exemplo na vitrine. Nome, foto e versões vêm de src/conteudo/exemplos.js.
const layout = {
  padaria: { n: '01', accent: '#E07A5F', span: 'md:col-span-7', height: 'h-[400px]', offset: '' },
  'casa-de-festas': { n: '02', accent: '#7d9b84', span: 'md:col-span-5', height: 'h-[500px]', offset: 'md:mt-24' },
  construcao: { n: '03', accent: '#ffc24b', span: 'md:col-span-4', height: 'h-[350px]', offset: '' },
  odonto: { n: '04', accent: '#0b6e78', span: 'md:col-span-4', height: 'h-[350px]', offset: 'md:mt-12' },
  oficina: { n: '05', accent: '#ff6a2b', span: 'md:col-span-4', height: 'h-[350px]', offset: 'md:-mt-12' },
};

const cases = exemplos.map((e) => ({ ...e, ...layout[e.slug] }));

const Portfolio = () => {
  const { abrir } = useEscolhaVersao();
  return (
    <section id="exemplos" className="scroll-mt-20 md:scroll-mt-24 px-5 md:px-20 py-24 border-t border-[#d1c79d]/20">
      <div className="grid grid-cols-12 gap-6 mb-16">
        <div className="col-span-12 md:col-span-4">
          <h3 className="font-['JetBrains_Mono'] text-[10px] text-[#d1c79d] uppercase tracking-[0.15em] mb-4">
            Sites de Demonstração
          </h3>
          <h2 className="font-['Anybody'] font-extrabold text-4xl md:text-[48px] md:leading-[56px] text-[#e2e2e2]">
            Não é só bonito.<br /><span className="text-[#d1c79d]">Funciona.</span>
          </h2>
        </div>
        <div className="col-span-12 md:col-span-6 md:col-start-7 flex items-end">
          <p className="font-['Hanken_Grotesk'] text-lg text-[#ccc6b8]">
            Sites fictícios, criados para mostrar como fica um website profissional em diferentes tipos de negócio. Cada exemplo tem três versões: Essencial, Profissional e Premium.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 space-y-12 md:space-y-0">
        {cases.map((c, i) => (
          <motion.div
            key={c.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className={`${c.span} ${c.offset} group portfolio-card`}
            style={{ '--accent': c.accent }}
          >
            <div className="relative cursor-pointer">
              <div className="portfolio-frame relative overflow-hidden mb-6 border border-[#d1c79d]/10 transition-colors duration-500">
                <span className="absolute top-3 right-3 z-20 bg-[#121414]/80 backdrop-blur-sm border border-[#d1c79d]/40 text-[#d1c79d] font-['JetBrains_Mono'] text-[9px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-sm">
                  3 versões
                </span>
                <div className={`${c.height} relative`}>
                  <div
                    className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-color"
                    style={{ backgroundColor: `${c.accent}1a` }}
                  ></div>
                  <img
                    alt={c.nome}
                    src={c.foto}
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center border-t border-[#d1c79d]/20 pt-4">
                <div>
                  <p className="font-['JetBrains_Mono'] text-[10px] text-[#d1c79d] mb-2 tracking-[0.15em] uppercase">{c.n} — {c.segmento}</p>
                  <h3 className="font-['Anybody'] font-bold text-2xl text-[#e2e2e2]">
                    {/* O botão cobre o cartão inteiro (after:inset-0), mantendo o título como título. */}
                    <button
                      type="button"
                      onClick={() => abrir(c.slug)}
                      aria-haspopup="dialog"
                      className="text-left after:absolute after:inset-0 after:z-30 after:content-[''] focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-[#d1c79d]"
                    >
                      {c.nome}
                    </button>
                  </h3>
                </div>
                <ArrowUpRight className="portfolio-arrow text-[#ccc6b8] transition-colors" size={22} aria-hidden="true" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
