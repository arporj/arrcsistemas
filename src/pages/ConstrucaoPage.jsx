
import React, { useState } from 'react';

// --- Componente da Página --- //
const ConstrucaoPage = () => {
    const [submitted, setSubmitted] = useState(false);

    const produtos = [ "Cimento", "Areia e Pedra", "Tijolos e Blocos", "Aço para Construção", "Telhas", "Ferramentas" ];
    const marcas = [ "Votorantim", "Gerdau", "Tigre", "Quartzolit", "Suvinil", "Bosch" ];
    const ofertas = [
        { produto: "Lata de Tinta Acrílica (18L)", preco: "R$ 299,90", antigo: "R$ 349,90" },
        { produto: "Kit de Ferramentas (110 peças)", preco: "R$ 199,90", antigo: "R$ 249,90" },
    ];

    const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

    return (
        <div className="bg-white text-gray-800 font-sans">
            {/* --- Seção Hero --- */}
            <section id="inicio" className="relative h-[50vh] flex items-center justify-center bg-blue-900 text-white">
                <img src="https://picsum.photos/1200/800?image=999" alt="Material de Construção" className="absolute inset-0 w-full h-full object-cover opacity-30" />
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold">CONSTRULAR</h1>
                    <p className="mt-4 text-lg md:text-xl">Do alicerce ao acabamento, tudo para sua obra.</p>
                </div>
            </section>

            {/* --- Seção Produtos --- */}
            <section id="produtos" className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Nossos Produtos</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
                        {produtos.map(produto => (
                            <div key={produto} className="p-4">
                                <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-lg flex items-center justify-center font-bold text-blue-900">{produto.split(' ')[0]}</div>
                                <h3 className="font-semibold">{produto}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Seção Marcas --- */}
            <section id="marcas" className="py-12 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">As Melhores Marcas</h2>
                    <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
                        {marcas.map(marca => (
                            <p key={marca} className="text-xl font-semibold text-gray-500">{marca}</p>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Seção Ofertas --- */}
            <section id="ofertas" className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Ofertas da Semana</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {ofertas.map(oferta => (
                            <div key={oferta.produto} className="bg-white p-8 rounded-lg shadow-lg border-2 border-yellow-400">
                                <h3 className="text-2xl font-bold text-blue-900 mb-3">{oferta.produto}</h3>
                                <div className="flex items-baseline gap-3">
                                    <p className="text-3xl font-bold text-blue-900">{oferta.preco}</p>
                                    <p className="text-lg text-gray-400 line-through">{oferta.antigo}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Seção Contato --- */}
            <section id="contato" className="py-20 bg-blue-900 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Fale com um Vendedor</h2>
                    <p className="max-w-2xl mx-auto mb-8">Tire suas dúvidas ou faça um orçamento para sua obra.</p>
                    <div className="text-3xl font-bold text-yellow-400 mb-8">(22) 99999-9999</div>
                    <div className="text-blue-200">
                        <p>ConstruLar Materiais de Construção</p>
                        <p>Rua Principal, 45 - Rio das Ostras</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ConstrucaoPage;
