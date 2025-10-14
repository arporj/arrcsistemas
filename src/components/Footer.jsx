import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8 border-t border-white/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <img
              src="https://horizons-cdn.hostinger.com/5781d7fb-b7cc-4bb3-80b5-c52f16421b3b/045c5f7576e02237edd915ee1af176f2.png"
              alt="ARRC Sistemas"
              className="h-8 w-auto"
            />
          </div>

          <p className="text-gray-400 text-center flex items-center gap-2">
            Feito com <Heart className="text-red-500 fill-red-500" size={16} /> pela ARRC Sistemas
          </p>

          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} ARRC Sistemas. Todos os direitos reservados.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;