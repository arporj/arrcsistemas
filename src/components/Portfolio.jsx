
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const cases = [
  {
    label: '01 — Padaria Artesanal',
    title: 'Padaria do Seu Antônio',
    to: '/exemplos/padaria',
    img: '/images/exemplos/padaria/hero-bread.jpg',
    accent: '#E07A5F',
    span: 'md:col-span-7',
    height: 'h-[400px]',
    offset: '',
  },
  {
    label: '02 — Eventos',
    title: 'Casa de Festas Encanto',
    to: '/exemplos/casa-de-festas',
    img: '/images/exemplos/casa-de-festas/hero-hall.jpg',
    accent: '#D4AF37',
    span: 'md:col-span-5',
    height: 'h-[500px]',
    offset: 'md:mt-24',
  },
  {
    label: '03 — Materiais',
    title: 'Constrular',
    to: '/exemplos/construcao',
    img: '/images/exemplos/constrular/hero-steel.jpg',
    accent: '#FFBF00',
    span: 'md:col-span-4',
    height: 'h-[350px]',
    offset: '',
  },
  {
    label: '04 — Saúde',
    title: 'Odonto Sorriso Rio',
    to: '/exemplos/odonto',
    img: '/images/exemplos/odonto/hero-paciente.jpg',
    accent: '#005f73',
    span: 'md:col-span-4',
    height: 'h-[350px]',
    offset: 'md:mt-12',
  },
  {
    label: '05 — Automotivo',
    title: 'Auto Center Bom Torque',
    to: '/exemplos/oficina',
    img: '/images/exemplos/oficina/hero-engine.jpg',
    accent: '#ca6702',
    span: 'md:col-span-4',
    height: 'h-[350px]',
    offset: 'md:-mt-12',
  },
];

const Portfolio = () => {
  return (
    <section id="exemplos" className="px-5 md:px-20 py-24 border-t border-[#d1c79d]/20">
      <div className="grid grid-cols-12 gap-6 mb-16">
        <div className="col-span-12 md:col-span-4">
          <h2 className="font-['Anybody'] font-extrabold text-4xl md:text-[48px] md:leading-[56px] text-[#e2e2e2]">
            Não é só bonito.<br /><span className="text-[#d1c79d]">Funciona.</span>
          </h2>
        </div>
        <div className="col-span-12 md:col-span-6 md:col-start-7 flex items-end">
          <p className="font-['Hanken_Grotesk'] text-lg text-[#ccc6b8]">
            Casos reais de engenharia digital aplicada a diferentes setores do mercado.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 space-y-12 md:space-y-0">
        {cases.map((c, i) => (
          <motion.div
            key={c.to}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className={`${c.span} ${c.offset} group portfolio-card`}
            style={{ '--accent': c.accent }}
          >
            <Link to={c.to}>
              <div className="portfolio-frame relative overflow-hidden mb-6 border border-[#d1c79d]/10 transition-colors duration-500">
                <div className={`${c.height} relative`}>
                  <div
                    className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-color"
                    style={{ backgroundColor: `${c.accent}1a` }}
                  ></div>
                  <img
                    alt={c.title}
                    src={c.img}
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center border-t border-[#d1c79d]/20 pt-4">
                <div>
                  <p className="font-['JetBrains_Mono'] text-[10px] text-[#d1c79d] mb-2 tracking-[0.15em] uppercase">{c.label}</p>
                  <h3 className="font-['Anybody'] font-bold text-2xl text-[#e2e2e2]">{c.title}</h3>
                </div>
                <ArrowUpRight className="portfolio-arrow text-[#ccc6b8] transition-colors" size={22} />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
