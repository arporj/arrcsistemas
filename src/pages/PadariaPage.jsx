
import React, { useState } from 'react';

// --- Componente da Página --- //
const PadariaPage = () => {
    const [submitted, setSubmitted] = useState(false);

    const lanches = [
        { nome: "Pão na Chapa", desc: "Pão francês fresquinho com manteiga na chapa.", preco: "R$ 5,00" },
        { nome: "Misto Quente", desc: "Pão de forma, presunto e queijo derretido.", preco: "R$ 8,00" },
        { nome: "Bauru", desc: "Pão francês, rosbife, queijo e tomate.", preco: "R$ 12,00" },
        { nome: "Açaí na Tigela (300ml)", desc: "Açaí, banana, granola e mel.", preco: "R$ 15,00" },
    ];

    const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

    return (
        <div className="bg-white text-stone-800 font-serif">
            {/* --- Seção Hero --- */}
            <section id="inicio" className="relative h-[50vh] flex items-center justify-center bg-stone-800 text-white">
                <img src="https://picsum.photos/1200/800?image=20" alt="Padaria" className="absolute inset-0 w-full h-full object-cover opacity-40" />
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-bold">Padaria do Seu Antônio</h1>
                    <p className="mt-4 text-lg md:text-xl">Tradição e sabor que aquecem o coração.</p>
                </div>
            </section>

            {/* --- Seção Sobre Nós --- */}
            <section id="sobre" className="py-20">
                <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-stone-900 mb-6">Desde 1980</h2>
                        <p className="mb-4 leading-relaxed">A Padaria do Seu Antônio é mais que uma padaria, é um ponto de encontro. Há mais de 40 anos, servimos a comunidade de Rio das Ostras com pães sempre frescos, lanches saborosos e o carinho de uma empresa familiar. </p>
                        <p className="leading-relaxed">Nossa missão é simples: oferecer produtos de qualidade com um sorriso no rosto.</p>
                    </div>
                    <div className="h-80 rounded-lg overflow-hidden">
                        <img src="https://picsum.photos/600/800?image=1074" alt="Interior da padaria" className="w-full h-full object-cover"/>
                    </div>
                </div>
            </section>

            {/* --- Seção Lanches --- */}
            <section id="lanches" className="py-20 bg-stone-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-stone-900 mb-12">Nossos Lanches</h2>
                    <div className="max-w-3xl mx-auto">
                        {lanches.map(lanche => (
                            <div key={lanche.nome} className="mb-6 pb-6 border-b border-stone-200 last:border-b-0">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="text-xl font-semibold text-stone-900">{lanche.nome}</h3>
                                    <p className="text-lg font-bold text-stone-900">{lanche.preco}</p>
                                </div>
                                <p className="text-stone-600 mt-1">{lanche.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Seção Contato --- */}
            <section id="contato" className="py-20 bg-stone-800 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Faça sua Encomenda</h2>
                    <p className="max-w-2xl mx-auto mb-8">Aceitamos encomendas para festas e eventos. Ligue para nós!</p>
                    <div className="text-2xl font-bold mb-8">(22) 99999-9999</div>
                    <div className="text-stone-300">
                        <p>Padaria do Seu Antônio</p>
                        <p>Rua Bonfim, número 899 - Rio das Ostras</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PadariaPage;
