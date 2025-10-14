import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Instagram, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      label: 'WhatsApp',
      value: '+55 21 96762-1494',
      link: 'https://wa.me/5521967621494',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Instagram,
      label: 'Instagram',
      value: '@arrcsistemas',
      link: 'https://instagram.com/arrcsistemas',
      gradient: 'from-pink-500 to-purple-500',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'contato@arrcsistemas.com.br',
      link: 'mailto:contato@arrcsistemas.com.br',
      gradient: 'from-blue-500 to-cyan-500',
    },
  ];

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Entre em <span className="gradient-text">Contato</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Vamos conversar sobre como podemos transformar suas ideias em realidade
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass-effect rounded-2xl p-6 hover:shadow-xl hover:shadow-cyan-500/20 transition-all group"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${info.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform mx-auto`}>
                  <info.icon className="text-white" size={28} />
                </div>
                <h3 className="text-lg font-bold mb-2 text-center">{info.label}</h3>
                <p className="text-gray-400 text-center">{info.value}</p>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-effect rounded-2xl p-8 text-center"
          >
            <MapPin className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Localização</h3>
            <p className="text-gray-300 mb-6">Brasil</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => window.open('https://wa.me/5521967621494', '_blank')}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-green-500/50"
              >
                <Phone className="mr-2" size={20} />
                Fale no WhatsApp
              </Button>
              
              <Button
                onClick={() => window.open('https://instagram.com/arrcsistemas', '_blank')}
                variant="outline"
                className="border-2 border-pink-500 text-pink-500 hover:bg-pink-500/10 px-8 py-6 text-lg rounded-full"
              >
                <Instagram className="mr-2" size={20} />
                Siga no Instagram
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;