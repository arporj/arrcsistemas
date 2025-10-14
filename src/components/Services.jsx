import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Smartphone, Cloud, Zap } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Globe,
      title: 'Websites Profissionais',
      description: 'Sites modernos, responsivos e otimizados para conversão',
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      icon: Smartphone,
      title: 'Aplicativos SaaS',
      description: 'Soluções escaláveis e personalizadas para seu negócio',
      gradient: 'from-blue-500 to-purple-500',
    },
    {
      icon: Cloud,
      title: 'Sistemas em Nuvem',
      description: 'Infraestrutura robusta e segura para suas aplicações',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Zap,
      title: 'Performance Otimizada',
      description: 'Velocidade e eficiência em cada linha de código',
      gradient: 'from-pink-500 to-cyan-500',
    },
  ];

  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Nossos <span className="gradient-text">Serviços</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Soluções completas para transformar sua presença digital
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-effect rounded-2xl p-6 hover:shadow-xl hover:shadow-cyan-500/20 transition-all group"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <service.icon className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;