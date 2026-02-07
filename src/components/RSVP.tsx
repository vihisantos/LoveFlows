"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Loader2, Check, Stars, PartyPopper } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function RSVP() {
    const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [attendance, setAttendance] = useState<'yes' | 'no' | null>(null);
    const [guestDetails, setGuestDetails] = useState<{ name: string; email: string }>({ name: '', email: '' });

    const [companionNames, setCompanionNames] = useState<string[]>([]);
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState('loading');

        const name = nameRef.current?.value || '';
        const email = emailRef.current?.value || '';
        setGuestDetails({ name, email });

        const { error } = await supabase.from('rsvps').insert({
            name,
            email,
            attending: attendance === 'yes',
            guests: attendance === 'yes' ? companionNames.length + 1 : 0,
            companion_names: attendance === 'yes' ? companionNames.join(', ') : null
        });

        if (error) {
            console.error(error);
            setFormState('error');
        } else {
            setFormState('success');
        }
    };

    const handleCompanionChange = (index: number, value: string) => {
        const newNames = [...companionNames];
        newNames[index] = value;
        setCompanionNames(newNames);
    };

    const addCompanion = () => {
        if (companionNames.length < 4) { // Limit to 4 companions for safety
            setCompanionNames([...companionNames, ""]);
        }
    };

    const removeCompanion = (index: number) => {
        setCompanionNames(companionNames.filter((_, i) => i !== index));
    };

    return (
        <section id="rsvp" className="py-32 bg-white text-[#1E261D] relative overflow-hidden">
            {/* Smooth gradient transition from previous section */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />

            {/* Decorative divider at top */}
            <div className="absolute top-16 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-[var(--pk-gold)]/30 to-transparent" />

            {/* Soft decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--pk-gold)] opacity-[0.03] rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--pk-gold)] opacity-[0.03] rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

            <div className="container mx-auto px-4 max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white p-10 md:p-20 rounded-3xl border border-[var(--pk-stone)] shadow-[0_30px_100px_-20px_rgba(30,38,29,0.08)]"
                >
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block p-4 rounded-full bg-[var(--pk-stone)] text-[var(--pk-gold)] mb-6"
                        >
                            <Stars size={32} />
                        </motion.div>
                        <h2 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl mb-6 text-[#1E261D]">
                            Confirme sua Presença
                        </h2>
                        <p className="font-[family-name:var(--font-lato)] text-lg text-[var(--pk-text-muted)] max-w-lg mx-auto">
                            Será uma honra ter você conosco neste momento mágico. Por favor, confirme até **10 de Novembro**.
                        </p>
                    </div>

                    <AnimatePresence mode="wait">
                        {formState === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center py-16"
                            >
                                <div className="w-24 h-24 bg-[var(--pk-stone)] text-[var(--pk-gold)] rounded-full flex items-center justify-center mx-auto mb-8">
                                    <Check size={48} />
                                </div>
                                <h3 className="text-4xl font-[family-name:var(--font-playfair)] mb-4 text-[#1E261D]">Presença Confirmada!</h3>
                                <p className="text-[var(--pk-text-muted)] text-lg mb-8">Mal podemos esperar para celebrar com você! 🥂</p>

                                <button
                                    onClick={() => {
                                        try {
                                            const event = {
                                                title: 'Casamento Gustavo & Jéssica',
                                                description: `Você está convidado para celebrar o casamento de Gustavo e Jéssica!\n\nConfira todos os detalhes em: https://love-flows.vercel.app\n\nNos vemos lá! 💍🥂`,
                                                location: 'Villa Medicea di Lilliano, Toscana, Itália',
                                                url: 'https://love-flows.vercel.app',
                                                start: '20261128T170000',
                                                duration: '6H',
                                            };

                                            const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Love Flows//Wedding Calendar//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
SUMMARY:${event.title}
UID:${Date.now()}@loveflows.vercel.app
SEQUENCE:0
STATUS:CONFIRMED
TRANSP:OPAQUE
DTSTART:${event.start}
DTEND:20261128T230000
LOCATION:${event.location}
DESCRIPTION:${event.description.replace(/\n/g, '\\n')}
URL:${event.url}
ORGANIZER;CN=Gustavo & Jéssica:MAILTO:contato@gustavoejessica.com
ATTENDEE;RSVP=TRUE;CN=${guestDetails.name};PARTSTAT=ACCEPTED;ROLE=REQ-PARTICIPANT:MAILTO:${guestDetails.email}
BEGIN:VALARM
ACTION:DISPLAY
DESCRIPTION:Lembrete: Casamento Gustavo & Jéssica amanhã!
TRIGGER:-P1D
END:VALARM
END:VEVENT
END:VCALENDAR`;

                                            const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
                                            const url = window.URL.createObjectURL(blob);
                                            const a = document.createElement('a');
                                            a.href = url;
                                            a.download = 'casamento-gustavo-jessica.ics';
                                            document.body.appendChild(a);
                                            a.click();
                                            window.URL.revokeObjectURL(url);
                                            document.body.removeChild(a);
                                        } catch (error) {
                                            console.error('Calendar download error:', error);
                                        }
                                    }}
                                    className="inline-flex items-center gap-3 bg-[var(--pk-gold)] text-white px-8 py-4 rounded-xl hover:bg-[var(--pk-gold-dim)] transition-all duration-500 uppercase tracking-[0.3em] text-xs font-bold shadow-xl hover:shadow-[var(--pk-gold)]/30"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>Adicionar à Agenda</span>
                                </button>
                                <p className="text-xs text-[var(--pk-text-muted)] mt-4 italic">📱 Funciona melhor no celular, mas também funciona no computador</p>
                            </motion.div>
                        ) : (
                            <motion.form
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onSubmit={handleSubmit}
                                className="space-y-10"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="group">
                                        <label className="block text-[10px] font-bold mb-3 uppercase tracking-[0.2em] text-[var(--pk-gold)]">Nome Completo</label>
                                        <input
                                            ref={nameRef}
                                            type="text"
                                            className="w-full bg-transparent border-b border-[var(--pk-stone)] py-4 focus:border-[var(--pk-gold)] outline-none text-2xl font-[family-name:var(--font-playfair)] text-[#1E261D] placeholder-[var(--pk-stone)] transition-colors"
                                            placeholder="Seu nome"
                                            required
                                        />
                                    </div>
                                    <div className="group">
                                        <label className="block text-[10px] font-bold mb-3 uppercase tracking-[0.2em] text-[var(--pk-gold)]">Seu Email</label>
                                        <input
                                            ref={emailRef}
                                            type="email"
                                            className="w-full bg-transparent border-b border-[var(--pk-stone)] py-4 focus:border-[var(--pk-gold)] outline-none text-2xl font-[family-name:var(--font-playfair)] text-[#1E261D] placeholder-[var(--pk-stone)] transition-colors"
                                            placeholder="email@exemplo.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                    <button
                                        type="button"
                                        onClick={() => setAttendance('yes')}
                                        className={`flex-1 py-10 px-6 rounded-2xl border transition-all duration-500 flex flex-col items-center gap-4 ${attendance === 'yes' ? 'bg-[var(--pk-gold)] border-[var(--pk-gold)] text-white shadow-2xl shadow-[var(--pk-gold)]/20 scale-[1.02]' : 'border-[var(--pk-stone)] text-[var(--pk-text-muted)] hover:border-[var(--pk-gold)]/30 hover:bg-[var(--pk-stone)]/50'}`}
                                    >
                                        <PartyPopper size={28} className={attendance === 'yes' ? 'text-white' : 'text-[var(--pk-gold)]'} />
                                        <span className="font-bold tracking-[0.3em] text-[10px]">SIM, ESTAREI LÁ</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setAttendance('no')}
                                        className={`flex-1 py-10 px-6 rounded-2xl border transition-all duration-500 flex flex-col items-center gap-4 ${attendance === 'no' ? 'bg-[#2C3327] border-[#2C3327] text-white shadow-xl scale-[1.02]' : 'border-[var(--pk-stone)] text-[var(--pk-text-muted)] hover:border-black/20 hover:bg-[var(--pk-stone)]/50'}`}
                                    >
                                        <div className="w-7 h-7 flex items-center justify-center border-2 border-current rounded-full text-sm">✕</div>
                                        <span className="font-bold tracking-[0.3em] text-[10px]">INFELIZMENTE NÃO</span>
                                    </button>
                                </div>

                                <AnimatePresence>
                                    {attendance === 'yes' && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden space-y-6"
                                        >
                                            <div className="flex flex-col gap-4">
                                                <div className="flex justify-between items-center">
                                                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--pk-gold)]">Acompanhantes</label>
                                                    <button
                                                        type="button"
                                                        onClick={addCompanion}
                                                        className="text-[10px] font-bold text-[var(--pk-gold)] hover:underline flex items-center gap-1"
                                                    >
                                                        + ADICIONAR ACOMPANHANTE
                                                    </button>
                                                </div>

                                                {companionNames.map((name, index) => (
                                                    <motion.div
                                                        key={index}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        className="flex gap-4 items-end"
                                                    >
                                                        <div className="flex-1">
                                                            <input
                                                                type="text"
                                                                value={name}
                                                                onChange={(e) => handleCompanionChange(index, e.target.value)}
                                                                placeholder={`Nome do ${index + 1}º acompanhante`}
                                                                className="w-full bg-transparent border-b border-[var(--pk-stone)] py-2 focus:border-[var(--pk-gold)] outline-none text-lg font-[family-name:var(--font-playfair)] text-[#1E261D]"
                                                                required
                                                            />
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeCompanion(index)}
                                                            className="text-red-400 hover:text-red-600 p-2"
                                                        >
                                                            ✕
                                                        </button>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <button
                                    type="submit"
                                    disabled={formState === 'loading' || !attendance}
                                    className="w-full bg-[#1E261D] text-white py-6 rounded-2xl font-bold tracking-[0.5em] text-xs hover:bg-[var(--pk-gold)] hover:shadow-[0_20px_50px_-10px_rgba(107,112,92,0.4)] transition-all duration-700 disabled:opacity-20 disabled:grayscale flex justify-center items-center gap-4 mt-8"
                                >
                                    {formState === 'loading' ? <Loader2 className="animate-spin" /> : 'CONFIRMAR AGORA'}
                                </button>
                            </motion.form>
                        )}
                    </AnimatePresence>

                    {formState === 'error' && (
                        <p className="text-red-600 text-center mt-6 font-bold">Ocorreu um erro. Por favor, tente novamente.</p>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
