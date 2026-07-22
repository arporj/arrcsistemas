
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const services = [
  { n: '01', title: 'Websites Profissionais', desc: 'Plataformas de alta conversão.' },
  { n: '02', title: 'Aplicativos SaaS', desc: 'Sistemas escaláveis sob demanda.' },
  { n: '03', title: 'Sistemas em Nuvem', desc: 'Gestão centralizada e segura.' },
];

const destaques = [
  {
    id: 'recebimento-smart',
    title: 'Recebimento',
    highlight: '$mart',
    desc: 'Controle financeiro pessoal, sem planilha. Entradas, saídas e saldo organizados num único painel — para você enxergar exatamente pra onde vai cada real.',
    url: 'https://www.recebimentosmart.com.br',
    urlLabel: 'recebimentosmart.com.br/dashboard',
    logo: '/images/recebimento-smart-logo.svg',
    screenshot: '/images/recebimento-smart-dashboard.png',
    screenshotAlt: 'Dashboard do Recebimento $mart',
  },
  {
    id: 'showradar',
    title: 'Show',
    highlight: 'Radar',
    desc: 'Nunca mais perca o fio da sua série. O tracker de séries e filmes definitivo para o público brasileiro — acompanhe seu progresso episódio por episódio, descubra onde assistir e receba alertas personalizados.',
    url: 'https://www.showradar.com.br',
    urlLabel: 'showradar.com.br',
    logo: '/images/showradar-logo.png',
    screenshots: [
      { src: '/images/showradar-home.png', alt: 'Tela inicial do ShowRadar', label: 'Início' },
      { src: '/images/showradar-buscar.png', alt: 'Busca de séries e filmes no ShowRadar', label: 'Buscar' },
      { src: '/images/showradar-minhagrade.png', alt: 'Minha Grade no ShowRadar', label: 'Minha Grade' },
    ],
  },
];

const ServicesShowcase = () => {
  return (
    <section id="servicos" className="px-5 md:px-20 py-24 border-t border-[#d1c79d]/20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-12"
        >
          <h2 className="font-['Anybody'] font-extrabold text-4xl md:text-5xl text-[#e2e2e2] mb-10">
            Arquitetura<br />Digital
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-8">
            {services.map((s) => (
              <li key={s.n} className="border-b border-[#d1c79d]/20 pb-4 flex items-start gap-4 group">
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#d1c79d] mt-1">{s.n}</span>
                <div>
                  <h4 className="font-['Anybody'] font-bold text-xl text-[#e2e2e2] group-hover:text-[#d1c79d] transition-colors">{s.title}</h4>
                  <p className="font-['Hanken_Grotesk'] text-sm text-[#ccc6b8] mt-2">{s.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <h3 className="font-['JetBrains_Mono'] text-[10px] text-[#d1c79d] uppercase tracking-[0.15em] mb-6">
        Produtos em Destaque
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {destaques.map((d, i) => (
          <motion.a
            key={d.id}
            href={d.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="destaque-card group block arrc-glass-panel border border-[#d1c79d]/20 p-8 flex flex-col justify-between cursor-pointer transition-colors duration-500 hover:border-[#d1c79d]/60"
          >
            <div>
              <div className="flex justify-between items-center mb-12">
                <img src={d.logo} alt={`${d.title} ${d.highlight}`} className="h-9 w-9 rounded-md object-contain" />
                <ArrowUpRight className="text-[#ccc6b8] group-hover:text-[#d1c79d] transition-colors" size={20} />
              </div>
              <h4 className="font-['Anybody'] font-bold text-3xl text-[#e2e2e2] mb-4">
                {d.title} <span className="text-[#d1c79d]">{d.highlight}</span>
              </h4>
              <p className="font-['Hanken_Grotesk'] text-[#ccc6b8] mb-12">{d.desc}</p>
            </div>

            <div className="border-t border-[#d1c79d]/20 pt-8">
              {d.screenshot ? (
                <div className="destaque-frame rounded-lg overflow-hidden border border-[#4a473c]/40 shadow-2xl transition-colors duration-500">
                  <div className="bg-[#282a2b] h-9 flex items-center gap-2 px-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ccc6b8]/30"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ccc6b8]/30"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ccc6b8]/30"></span>
                    <span className="font-['JetBrains_Mono'] text-[10px] text-[#ccc6b8]/60 ml-3">{d.urlLabel}</span>
                  </div>
                  <img src={d.screenshot} alt={d.screenshotAlt} className="w-full h-64 object-cover object-top block" />
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3">
                  {d.screenshots.map((s) => (
                    <div
                      key={s.src}
                      className="destaque-frame rounded-lg overflow-hidden border border-[#4a473c]/40 shadow-2xl transition-colors duration-500"
                    >
                      <img src={s.src} alt={s.alt} className="w-full h-auto block" />
                    </div>
                  ))}
                </div>
              )}
              <p className="font-['JetBrains_Mono'] text-[10px] text-[#ccc6b8]/60 uppercase tracking-[0.15em] mt-4">
                Print real do sistema em produção — clique para acessar
              </p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default ServicesShowcase;
