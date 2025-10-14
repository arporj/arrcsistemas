import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Target, Users, Rocket } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Target,
      title: 'Foco em Resultados',
      description: 'Cada projeto é desenvolvido pensando no sucesso do seu negócio',
    },
    {
      icon: Users,
      title: 'Equipe Especializada',
      description: 'Profissionais experientes e apaixonados por tecnologia',
    },
    {
      icon: Rocket,
      title: 'Inovação Constante',
      description: 'Sempre atualizados com as últimas tendências do mercado',
    },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Sobre a <span className="gradient-text">ARRC Sistemas</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Somos uma empresa especializada em desenvolvimento de websites e aplicativos SaaS, 
              comprometida em entregar soluções tecnológicas de alta qualidade que impulsionam o 
              crescimento dos nossos clientes.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-cyan-400 mt-1 flex-shrink-0" size={24} />
                <p className="text-gray-300">
                  Desenvolvimento ágil e eficiente com as melhores práticas do mercado
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-cyan-400 mt-1 flex-shrink-0" size={24} />
                <p className="text-gray-300">
                  Suporte contínuo e manutenção para garantir o sucesso do seu projeto
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-cyan-400 mt-1 flex-shrink-0" size={24} />
                <p className="text-gray-300">
                  Soluções escaláveis que crescem junto com seu negócio
                </p>
              </div>
            </div>

            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-2xl font-bold mb-4 gradient-text">Recebimento Smart</h3>
              <p className="text-gray-300 mb-4">
                Nosso produto SaaS que revoluciona a gestão de recebimentos para empresas de todos os tamanhos.
              </p>
              <a
                href="http://www.recebimentosmart.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-2"
              >
                Saiba mais →
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-effect rounded-2xl p-6 hover:shadow-xl hover:shadow-purple-500/20 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;