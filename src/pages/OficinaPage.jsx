import React, { useState } from 'react';

// --- Ícones --- //
const WrenchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-orange-500 mb-4"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16 text-gray-500"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;

// --- Componente da Página --- //
const OficinaPage = () => {
    const [submitted, setSubmitted] = useState(false);

    const services = ["Diagnóstico Eletrônico", "Troca de Óleo e Filtros", "Sistema de Freios ABS", "Suspensão e Amortecedores", "Alinhamento 3D e Balanceamento", "Ar Condicionado"];
    const team = ["Roberto Santos", "Márcia Lima", "Fernando Alves"];
    const galleryImages = [1, 2, 3, 4, 5, 6];

    const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

    return (
        <div className="bg-slate-800 text-gray-300 font-sans">
            {/* --- Seção Hero --- */}
            <section id="inicio" className="relative h-[60vh] flex items-center justify-center text-white">
                <img src="https://picsum.photos/1200/800?grayscale&blur=2" alt="Oficina Mecânica" className="absolute inset-0 w-full h-full object-cover opacity-30" />
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-bold">AUTO CENTER <span className="text-orange-500">BOM TORQUE</span></h1>
                    <p className="mt-4 text-lg md:text-xl">Tecnologia e confiança para o seu veículo.</p>
                </div>
            </section>

            {/* --- Seção Serviços --- */}
            <section id="servicos" className="py-20 bg-slate-900">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Nossos Serviços</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map(service => (
                            <div key={service} className="bg-slate-800 p-8 rounded-lg text-center border border-slate-700 hover:border-orange-500 transition-colors">
                                <WrenchIcon />
                                <h3 className="text-xl font-semibold text-white">{service}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Seção Equipe --- */}
            <section id="equipe" className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Nossa Equipe</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                        {team.map(member => (
                            <div key={member}>
                                <div className="w-40 h-40 mx-auto mb-4 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden">
                                    <img src={`https://picsum.photos/200/200?random=${Math.random()}`} className="w-full h-full object-cover" />
                                </div>
                                <h3 className="text-xl font-semibold text-white">{member}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Seção Galeria --- */}
            <section id="galeria" className="py-20 bg-slate-900">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Galeria</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {galleryImages.map(img => (
                            <div key={img} className="overflow-hidden rounded-lg h-64">
                                <img src={`https://picsum.photos/600/400?random=${img}`} alt={`Foto da oficina ${img}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Seção Contato --- */}
            <section id="contato" className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Entre em Contato</h2>
                    <div className="max-w-2xl mx-auto">
                        {submitted ? (
                            <div className="bg-green-500/20 text-white p-6 rounded-lg text-center">
                                <h3 className="text-2xl font-bold">Obrigado!</h3>
                                <p>Sua mensagem foi enviada com sucesso.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <input type="text" placeholder="Seu Nome" className="w-full bg-slate-700 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" required />
                                <input type="email" placeholder="Seu E-mail" className="w-full bg-slate-700 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" required />
                                <textarea placeholder="Sua Mensagem" rows="5" className="w-full bg-slate-700 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" required></textarea>
                                <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 px-6 rounded-md hover:bg-orange-600 transition-colors">Enviar Mensagem</button>
                            </form>
                        )}
                        <div className="text-center mt-12">
                            <p>Auto Center Bom Torque</p>
                            <p>Rua das Garagens, 1020 - Rio das Ostras</p>
                            <p>(22) 99999-9999</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default OficinaPage;