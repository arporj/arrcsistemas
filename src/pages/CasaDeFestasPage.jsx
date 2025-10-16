
import React, { useState } from 'react';

// --- Componente da Página --- //
const CasaDeFestasPage = () => {
    const [submitted, setSubmitted] = useState(false);

    const eventos = [
        { nome: "Casamentos", desc: "Celebre o seu dia especial em um cenário de conto de fadas.", img: "https://picsum.photos/800/600?image=1074" },
        { nome: "15 Anos", desc: "Uma festa de debutante inesquecível com o glamour que a data merece.", img: "https://picsum.photos/800/600?image=1075" },
        { nome: "Eventos Corporativos", desc: "Estrutura completa para conferências, workshops e confraternizações.", img: "https://picsum.photos/800/600?image=1076" },
    ];
    const depoimentos = [
        { quote: "O lugar é mágico! Nosso casamento foi mais perfeito do que sonhamos.", author: "- Juliana e Marcos" },
        { quote: "Serviço impecável e atenção a todos os detalhes. Recomendo de olhos fechados!", author: "- Beatriz, mãe da debutante Sofia" },
    ];

    const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

    return (
        <div className="bg-gray-900 text-white font-sans">
            {/* --- Seção Hero --- */}
            <section id="inicio" className="relative h-[60vh] flex items-center justify-center bg-black">
                <img src="https://picsum.photos/1200/800?image=1018" alt="Salão de Festas" className="absolute inset-0 w-full h-full object-cover opacity-40" />
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-bold" style={{ fontFamily: 'serif' }}>Casa de Festas <span className="text-amber-400">Encanto</span></h1>
                    <p className="mt-4 text-lg md:text-xl">Onde seus sonhos se tornam celebrações.</p>
                </div>
            </section>

            {/* --- Seção Eventos --- */}
            <section id="eventos" className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12" style={{ fontFamily: 'serif' }}>Nossos Eventos</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {eventos.map(evento => (
                            <div key={evento.nome} className="bg-gray-800 p-8 rounded-lg border border-gray-700">
                                <h3 className="text-2xl font-semibold text-amber-400 mb-3">{evento.nome}</h3>
                                <p className="text-gray-400">{evento.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Seção Galeria --- */}
            <section id="galeria" className="py-20 bg-gray-800">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12" style={{ fontFamily: 'serif' }}>Galeria de Momentos</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1,2,3,4,5,6,7,8].map(i => (
                            <div key={i} className="h-64 overflow-hidden rounded-lg">
                                <img src={`https://picsum.photos/400/400?image=${1040+i}`} alt={`Foto de evento ${i}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Seção Depoimentos --- */}
            <section id="depoimentos" className="py-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-center mb-12" style={{ fontFamily: 'serif' }}>Depoimentos</h2>
                    <div className="space-y-8">
                        {depoimentos.map(depo => (
                            <div key={depo.author} className="bg-gray-800 p-6 rounded-lg border-l-4 border-amber-400">
                                <p className="text-xl italic text-gray-300">"{depo.quote}"</p>
                                <p className="text-right mt-4 font-bold text-amber-400">{depo.author}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Seção Contato --- */}
            <section id="contato" className="py-20 bg-gray-800">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12" style={{ fontFamily: 'serif' }}>Solicite um Orçamento</h2>
                    <div className="max-w-2xl mx-auto">
                        {submitted ? (
                            <div className="bg-green-500/20 text-white p-6 rounded-lg text-center">
                                <h3 className="text-2xl font-bold">Obrigado!</h3>
                                <p>Sua solicitação foi enviada. Entraremos em contato em breve.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <input type="text" placeholder="Seu Nome" className="w-full bg-gray-700 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400" required />
                                <input type="email" placeholder="Seu E-mail" className="w-full bg-gray-700 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400" required />
                                <input type="text" placeholder="Tipo de Evento" className="w-full bg-gray-700 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400" required />
                                <textarea placeholder="Mensagem (data, n.º de convidados, etc.)" rows="5" className="w-full bg-gray-700 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400" required></textarea>
                                <button type="submit" className="w-full bg-amber-400 text-gray-900 font-bold py-3 px-6 rounded-md hover:bg-amber-500 transition-colors">Enviar</button>
                            </form>
                        )}
                        <div className="text-center mt-12 text-gray-400">
                            <p>Casa de Festas Encanto</p>
                            <p>Avenida Atlântica, 560 - Rio das Ostras</p>
                            <p>(22) 99999-9999</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CasaDeFestasPage;
