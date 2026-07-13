
import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer id="contato" className="bg-[#0d0e0f] w-full border-t border-[#d1c79d]/10">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row justify-between items-center px-5 md:px-20 py-12 w-full gap-8"
      >
        <div className="flex items-center gap-2">
          <img src="/images/logosimples.png" alt="" className="h-6 w-6" />
          <span className="font-['Anybody'] font-extrabold text-[#e2e2e2] text-xl md:text-2xl">ARRC</span>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center text-center md:text-left">
          <a
            href="https://instagram.com/arrcsistemas"
            target="_blank"
            rel="noopener noreferrer"
            className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.15em] text-[#ccc6b8] hover:text-[#d1c79d] transition-colors duration-500"
          >
            Instagram
          </a>
          <a
            href="https://wa.me/5521967621494"
            target="_blank"
            rel="noopener noreferrer"
            className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.15em] text-[#ccc6b8] hover:text-[#d1c79d] transition-colors duration-500"
          >
            WhatsApp
          </a>
          <a
            href="mailto:contato@arrcsistemas.com.br"
            className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.15em] text-[#ccc6b8] hover:text-[#d1c79d] transition-colors duration-500"
          >
            contato@arrcsistemas.com.br
          </a>
        </div>

        <div className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.15em] text-[#ccc6b8]/60 text-center">
          © {new Date().getFullYear()} ARRC Sistemas. Engineering Excellence.
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
