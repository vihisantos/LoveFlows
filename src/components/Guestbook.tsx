"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, PenTool } from "lucide-react";

interface GuestMessage {
    id: number;
    name: string;
    message: string;
    created_at: string;
}

export default function Guestbook() {
    const [messages, setMessages] = useState<GuestMessage[]>([]);
    const [name, setName] = useState("");
    const [newMsg, setNewMsg] = useState("");
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem('loveflow-guestbook');
        if (stored) {
            setMessages(JSON.parse(stored));
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMsg.trim()) return;

        const newMessage: GuestMessage = {
            id: Date.now(),
            name: name || "Convidado",
            message: newMsg,
            created_at: new Date().toISOString()
        };

        const updated = [newMessage, ...messages];
        setMessages(updated);
        localStorage.setItem('loveflow-guestbook', JSON.stringify(updated));
        setNewMsg("");
        setName("");
    };

    return (
        <section className="py-32 bg-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.01] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 text-[var(--pk-gold)] mb-4 uppercase tracking-[0.3em] text-sm font-bold"
                    >
                        <PenTool size={16} />
                        <span>Memórias Eternas</span>
                    </motion.div>
                    <h2 className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl text-[var(--pk-charcoal)] mb-6">
                        Livro de Amor
                    </h2>
                    <p className="font-[family-name:var(--font-lato)] text-[var(--pk-text-muted)] max-w-xl mx-auto text-lg leading-relaxed">
                        Deixe um recado para nós. Vamos ler cada um deles com muito carinho depois do grande dia.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
                    <div className="lg:col-span-5">
                        <div className="sticky top-10">
                            <div className="bg-white p-8 md:p-12 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.1)] rounded-3xl border border-[var(--pk-stone)] relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-2 h-full bg-[var(--pk-gold)] transition-transform duration-500 scale-y-0 group-hover:scale-y-100" />

                                <h3 className="font-[family-name:var(--font-playfair)] text-3xl mb-8 text-[var(--pk-charcoal)]">Escreva para nós</h3>
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="relative">
                                        <input
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full pt-4 pb-2 bg-transparent border-b-2 border-[var(--pk-stone)] focus:border-[var(--pk-gold)] outline-none text-xl font-[family-name:var(--font-playfair)] text-[var(--pk-charcoal)] placeholder-transparent peer transition-colors"
                                            placeholder="Seu Nome"
                                            id="nameInput"
                                        />
                                        <label htmlFor="nameInput" className="absolute left-0 top-4 text-[var(--pk-text-muted)] text-sm transition-all peer-focus:-top-2 peer-focus:text-[var(--pk-gold)] peer-focus:text-xs peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs uppercase tracking-widest pointer-events-none">
                                            Seu Nome
                                        </label>
                                    </div>

                                    <div className="relative">
                                        <textarea
                                            value={newMsg}
                                            onChange={(e) => setNewMsg(e.target.value)}
                                            className="w-full pt-4 pb-2 bg-transparent border-b-2 border-[var(--pk-stone)] focus:border-[var(--pk-gold)] outline-none text-lg font-[family-name:var(--font-lato)] text-[var(--pk-text-muted)] placeholder-transparent peer transition-colors min-h-[120px] resize-none"
                                            placeholder="Sua Mensagem"
                                            id="msgInput"
                                            required
                                        />
                                        <label htmlFor="msgInput" className="absolute left-0 top-4 text-[var(--pk-text-muted)] text-sm transition-all peer-focus:-top-2 peer-focus:text-[var(--pk-gold)] peer-focus:text-xs peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs uppercase tracking-widest pointer-events-none">
                                            Sua Mensagem
                                        </label>
                                    </div>

                                    <button className="w-full bg-[var(--pk-charcoal)] text-white py-5 rounded-xl hover:bg-[var(--pk-gold)] transition-all duration-500 uppercase tracking-[0.3em] text-xs font-bold flex items-center justify-center gap-3 group/btn shadow-xl hover:shadow-[var(--pk-gold)]/30">
                                        <span>Enviar com Carinho</span>
                                        <Heart size={18} className="group-hover/btn:fill-current group-hover/btn:scale-125 transition-transform" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7">
                        <div className="columns-1 md:columns-2 gap-6 space-y-6">
                            <AnimatePresence>
                                {messages.map((item, idx) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                        onHoverStart={() => setHoveredIdx(idx)}
                                        onHoverEnd={() => setHoveredIdx(null)}
                                        className="break-inside-avoid p-8 rounded-none shadow-sm hover:shadow-xl transition-shadow border border-black/5 bg-white relative"
                                    >
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/40 rotate-[1deg] backdrop-blur-[1px] shadow-sm z-10 border-l border-r border-white/60" />

                                        <div className="mb-4">
                                            <div className="flex gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg key={i} className="w-3 h-3 text-[var(--pk-gold)] fill-current opacity-60" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                        </div>
                                        <p className={`font-[family-name:var(--font-playfair)] text-xl leading-relaxed text-[var(--pk-charcoal)] mb-6 italic transition-colors ${hoveredIdx !== null && hoveredIdx !== idx ? 'opacity-40' : 'opacity-100'}`}>
                                            &quot;{item.message}&quot;
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-[1px] bg-[var(--pk-gold)]" />
                                            <span className="text-xs font-bold text-[var(--pk-gold-dim)] uppercase tracking-widest">{item.name}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
