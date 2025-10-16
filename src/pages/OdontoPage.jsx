
import React, { useState } from 'react';

// --- Componente da Página --- //
const OdontoPage = () => {
    const [submitted, setSubmitted] = useState(false);

    const servicos = [
        { nome: "Clareamento Dental", desc: "Recupere a cor natural do seu sorriso com nossas técnicas avançadas." },
        { nome: "Implantes Dentários", desc: "Soluções permanentes e seguras para a substituição de dentes." },
        { nome: "Ortodontia", desc: "Alinhamento do sorriso para todas as idades com aparelhos modernos." },
        { nome: "Limpeza e Profilaxia", desc: "A base para um sorriso saudável e prevenção de doenças." },
        { nome: "Restaurações", desc: "Reparos estéticos e funcionais para dentes danificados." },
        { nome: "Endodontia (Canal)", desc: "Tratamento para salvar dentes com a polpa danificada." },
    ];
    const equipe = [
        { nome: "Dr. Ricardo Mendes", crm: "CRO-RJ 12345", img: "1005" },
        { nome: "Dra. Carolina Alves", crm: "CRO-RJ 54321", img: "1027" },
    ];

    const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

    return (
        <div className="bg-slate-50 text-slate-700 font-sans">
            {/* --- Seção Hero --- */}
            <section id="inicio" className="relative h-[50vh] flex items-center justify-center bg-blue-600 text-white">
                <img src="https://picsum.photos/1200/800?image=431" alt="Consultório Odontológico" className="absolute inset-0 w-full h-full object-cover opacity-20" />
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-bold">Odonto Sorriso Rio</h1>
                    <p className="mt-4 text-lg md:text-xl">Cuidando da sua saúde, transformando sorrisos.</p>
                </div>
            </section>

            {/* --- Seção Serviços --- */}
            <section id="servicos" className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">Nossos Tratamentos</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {servicos.map(servico => (
                            <div key={servico.nome} className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                                <h3 className="text-xl font-semibold text-blue-800 mb-3">{servico.nome}</h3>
                                <p className="text-slate-600">{servico.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Seção Equipe --- */}
            <section id="equipe" className="py-20 bg-slate-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">Nossos Especialistas</h2>
                    <div className="flex flex-wrap justify-center gap-12 text-center">
                        {equipe.map(membro => (
                            <div key={membro.nome}>
                                <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                                    <img src={`https://picsum.photos/200/200?image=${membro.img}`} alt={membro.nome} className="w-full h-full object-cover" />
                                </div>
                                <h3 className="text-xl font-semibold text-blue-900">{membro.nome}</h3>
                                <p className="text-slate-500">{membro.crm}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Seção Contato --- */}
            <section id="contato" className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">Agende sua Avaliação</h2>
                    <div className="max-w-2xl mx-auto">
                        {submitted ? (
                            <div className="bg-green-100 text-green-800 p-6 rounded-lg text-center">
                                <h3 className="text-2xl font-bold">Obrigado!</h3>
                                <p>Seu pedido de agendamento foi enviado. Entraremos em contato em breve.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-lg">
                                <input type="text" placeholder="Seu Nome" className="w-full bg-slate-100 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                <input type="tel" placeholder="Seu Telefone" className="w-full bg-slate-100 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                <textarea placeholder="Qual tratamento você busca?" rows="4" className="w-full bg-slate-100 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                                <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 transition-colors">Quero Agendar</button>
                            </form>
                        )}
                        <div className="text-center mt-12 text-slate-600">
                            <p className="font-bold">Odonto Sorriso Rio</p>
                            <p>Rua das Palmeiras, 210 - Rio das Ostras</p>
                            <p>(22) 99999-9999</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default OdontoPage;
