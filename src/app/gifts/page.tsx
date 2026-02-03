"use client";

import { motion } from "framer-motion";
import { Gift, CreditCard, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import LoadingScreen from "@/components/LoadingScreen";

const GIFTS = [
    {
        name: "Cota para Lua de Mel",
        description: "Ajude-nos a viver momentos inesquecíveis na Itália",
        price: "Sugestão: R$ 200,00",
        icon: <CreditCard size={40} className="text-[#D4AF37]" />,
        link: "#"
    },
    {
        name: "Jantar Romântico",
        description: "Um jantar especial à luz de velas",
        price: "Sugestão: R$ 350,00",
        icon: <Gift size={40} className="text-[#D4AF37]" />,
        link: "#"
    },
    {
        name: "Lista de Presentes Amazon",
        description: "Itens para nossa nova casa",
        price: "Variados",
        icon: <ShoppingBag size={40} className="text-[#D4AF37]" />,
        link: "#"
    },
    {
        name: "Lista Tok&Stok",
        description: "Móveis e decoração",
        price: "Variados",
        icon: <ShoppingBag size={40} className="text-[#D4AF37]" />,
        link: "#"
    }
];

export default function GiftsPage() {
    return (
        <main className="min-h-screen bg-[var(--pk-cream)]">
            <LoadingScreen />

            {/* Header */}
            <header className="relative py-20 px-4 mb-12 bg-[#1E261D] text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1513205800036-742a08a2fe6d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1E261D]" />

                <div className="container mx-auto relative z-10 text-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-[var(--pk-gold)] hover:text-white transition-colors mb-8 uppercase tracking-[0.2em] text-xs font-bold"
                    >
                        <ArrowLeft size={16} /> Voltar ao Início
                    </Link>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl text-[var(--pk-gold)] mb-4"
                    >
                        Lista de Presentes
                    </motion.h1>
                    <p className="font-[family-name:var(--font-lato)] text-white/80 max-w-2xl mx-auto text-lg">
                        Sua presença é nosso maior presente. Mas se quiser nos presentear, ficaremos muito felizes com qualquer escolha abaixo.
                    </p>
                </div>
            </header>

            {/* Gifts Grid */}
            <div className="container mx-auto px-4 pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {GIFTS.map((gift, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white p-8 rounded-3xl border border-[var(--pk-stone)] shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2 cursor-pointer"
                        >
                            <div className="flex items-start gap-6">
                                <div className="p-4 bg-[var(--pk-cream)] rounded-2xl group-hover:bg-[var(--pk-gold)]/10 transition-colors">
                                    {gift.icon}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-[#1E261D] mb-2">
                                        {gift.name}
                                    </h3>
                                    <p className="text-[var(--pk-text-muted)] mb-4 leading-relaxed">
                                        {gift.description}
                                    </p>
                                    <div className="flex items-center justify-between mt-6">
                                        <span className="text-sm font-bold text-[var(--pk-gold-dim)] uppercase tracking-wider">
                                            {gift.price}
                                        </span>
                                        <span className="w-10 h-10 rounded-full bg-[#1E261D] text-white flex items-center justify-center group-hover:bg-[var(--pk-gold)] transition-colors">
                                            <ArrowLeft size={16} className="rotate-180" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* PIX Option */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="max-w-3xl mx-auto mt-20 bg-white p-10 rounded-3xl border-2 border-[var(--pk-gold)]/20 text-center shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--pk-gold)]/5 rounded-bl-full" />

                    <h3 className="font-[family-name:var(--font-playfair)] text-3xl text-[#1E261D] mb-6">
                        Prefere fazer um PIX?
                    </h3>
                    <p className="text-[var(--pk-text-muted)] mb-8">
                        Use a chave abaixo para contribuir com qualquer valor. Todo carinho é bem-vindo!
                    </p>

                    <div className="bg-[var(--pk-cream)] p-6 rounded-xl inline-block mb-4">
                        <code className="text-lg font-mono text-[#1E261D] select-all">
                            casamento@gustavoejessica.com
                        </code>
                    </div>
                    <p className="text-xs text-[var(--pk-text-muted)] uppercase tracking-widest mt-2">
                        Clique para copiar
                    </p>
                </motion.div>
            </div>
        </main>
    );
}
