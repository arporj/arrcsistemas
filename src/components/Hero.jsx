
import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const scrollToId = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="px-5 md:px-20 py-24 md:py-40 relative">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-10 md:col-start-2">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-['JetBrains_Mono'] text-[10px] text-[#d1c79d] mb-8 tracking-[0.2em] uppercase"
          >
            Engenharia Digital de Alta Performance
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-['Anybody'] font-extrabold text-[clamp(2.75rem,9vw,7.5rem)] leading-[0.9] md:leading-[0.92] tracking-[-0.04em] text-[#e2e2e2] mb-12 max-w-[15ch] uppercase"
          >
            Sistemas<br />Que<br />Funcionam.
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-6 border-t border-[#d1c79d]/20 pt-8"
            >
              <p className="font-['Hanken_Grotesk'] text-lg text-[#ccc6b8] max-w-md">
                Sites sob medida para padarias, clínicas, oficinas, construtoras e casas de festas. Não construímos apenas interfaces; arquitetamos soluções robustas focadas em conversão e performance.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="md:col-span-4 md:col-start-9 flex flex-col gap-4 mt-8 md:mt-0"
            >
              <button
                onClick={() => window.open('https://wa.me/5521967621494', '_blank')}
                className="w-full bg-[#d1c79d] text-[#373013] font-['JetBrains_Mono'] text-[10px] tracking-[0.15em] uppercase px-8 py-4 font-semibold hover:opacity-90 transition-all text-center"
              >
                Iniciar Projeto
              </button>
              <button
                onClick={() => scrollToId('exemplos')}
                className="w-full border border-[#d1c79d]/20 text-[#e2e2e2] font-['JetBrains_Mono'] text-[10px] tracking-[0.15em] uppercase px-8 py-4 arrc-hover-bronze transition-all text-center"
              >
                Ver Portfólio
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
