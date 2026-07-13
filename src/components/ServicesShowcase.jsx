
import React from 'react';
import { motion } from 'framer-motion';

const services = [
  { n: '01', title: 'Websites Profissionais', desc: 'Plataformas de alta conversão.' },
  { n: '02', title: 'Aplicativos SaaS', desc: 'Sistemas escaláveis sob demanda.' },
  { n: '03', title: 'Sistemas em Nuvem', desc: 'Gestão centralizada e segura.' },
];

const ServicesShowcase = () => {
  return (
    <section id="servicos" className="px-5 md:px-20 py-24 border-t border-[#d1c79d]/20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-5"
        >
          <h2 className="font-['Anybody'] font-extrabold text-4xl md:text-5xl text-[#e2e2e2] mb-10">
            Arquitetura<br />Digital
          </h2>
          <ul className="space-y-8">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="md:col-span-6 md:col-start-7 mt-16 md:mt-0 arrc-glass-panel border border-[#d1c79d]/20 p-8 flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-center mb-12">
              <h3 className="font-['JetBrains_Mono'] text-[10px] text-[#d1c79d] uppercase tracking-[0.15em]">Produto Destaque</h3>
              <img src="/images/recebimento-smart-logo.svg" alt="Recebimento $mart" className="h-8 w-8 rounded-md" />
            </div>
            <h4 className="font-['Anybody'] font-bold text-3xl text-[#e2e2e2] mb-4">
              Recebimento <span className="text-[#d1c79d]">$mart</span>
            </h4>
            <p className="font-['Hanken_Grotesk'] text-[#ccc6b8] mb-12">
              Controle financeiro pessoal, sem planilha. Entradas, saídas e saldo organizados num único painel — para você enxergar exatamente pra onde vai cada real.
            </p>
          </div>

          <div className="border-t border-[#d1c79d]/20 pt-8">
            <div className="rounded-lg overflow-hidden border border-[#4a473c]/40 shadow-2xl">
              <div className="bg-[#282a2b] h-9 flex items-center gap-2 px-4">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ccc6b8]/30"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#ccc6b8]/30"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#ccc6b8]/30"></span>
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#ccc6b8]/60 ml-3">recebimentosmart.com.br/dashboard</span>
              </div>
              <img src="/images/recebimento-smart-dashboard.png" alt="Dashboard do Recebimento $mart" className="w-full h-auto block" />
            </div>
            <p className="font-['JetBrains_Mono'] text-[10px] text-[#ccc6b8]/60 uppercase tracking-[0.15em] mt-4">
              Print real do sistema em produção
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesShowcase;
