
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigateAndScroll = (id) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 150); // Aguarda um pouco para a página inicial carregar antes de rolar
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const menuItems = [
    { label: 'Início', id: 'hero' },
    { label: 'Serviços', id: 'services' },
    { label: 'Sobre', id: 'about' },
    { label: 'Contato', id: 'contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-effect shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavigateAndScroll('hero')}>
            <motion.img
              whileHover={{ scale: 1.05 }}
              src="https://arrcsistemas.com.br/images/logo.png"
              alt="ARRC Sistemas Logo"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigateAndScroll(item.id)}
                className="text-gray-300 hover:text-cyan-400 transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
            
            {/* Dropdown Menu */}
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="flex items-center text-gray-300 hover:text-cyan-400 transition-colors font-medium">
                  Exemplos <ChevronDown size={16} className="ml-1" />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content 
                className="bg-gray-800/80 backdrop-blur-md text-white p-2 rounded-lg shadow-lg mt-2 border border-gray-700 min-w-[220px]" 
                sideOffset={5}
              >
                <DropdownMenu.Item asChild>
                  <Link to="/exemplos/oficina" className="block px-3 py-2 text-sm hover:bg-cyan-500/20 rounded-md cursor-pointer outline-none">
                    Oficina Mecânica
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item asChild>
                  <Link to="/exemplos/padaria" className="block px-3 py-2 text-sm hover:bg-cyan-500/20 rounded-md cursor-pointer outline-none">
                    Padaria
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item asChild>
                  <Link to="/exemplos/casa-de-festas" className="block px-3 py-2 text-sm hover:bg-cyan-500/20 rounded-md cursor-pointer outline-none">
                    Casa de Festas
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item asChild>
                  <Link to="/exemplos/construcao" className="block px-3 py-2 text-sm hover:bg-cyan-500/20 rounded-md cursor-pointer outline-none">
                    Material de Construção
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item asChild>
                  <Link to="/exemplos/odonto" className="block px-3 py-2 text-sm hover:bg-cyan-500/20 rounded-md cursor-pointer outline-none">
                    Clínica de Odontologia
                  </Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 glass-effect rounded-lg p-4"
          >
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigateAndScroll(item.id)}
                className="block w-full text-left py-3 text-gray-300 hover:text-cyan-400 transition-colors"
              >
                {item.label}
              </button>
            ))}
            <div className="border-t border-gray-700 my-2"></div>
            <h3 className="text-gray-400 font-bold px-1 py-2">Exemplos</h3>
            <Link to="/exemplos/oficina" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-left py-3 text-gray-300 hover:text-cyan-400 transition-colors">
              Oficina Mecânica
            </Link>
            <Link to="/exemplos/padaria" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-left py-3 text-gray-300 hover:text-cyan-400 transition-colors">
              Padaria
            </Link>
            <Link to="/exemplos/casa-de-festas" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-left py-3 text-gray-300 hover:text-cyan-400 transition-colors">
              Casa de Festas
            </Link>
            <Link to="/exemplos/construcao" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-left py-3 text-gray-300 hover:text-cyan-400 transition-colors">
              Material de Construção
            </Link>
            <Link to="/exemplos/odonto" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-left py-3 text-gray-300 hover:text-cyan-400 transition-colors">
              Clínica de Odontologia
            </Link>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;
