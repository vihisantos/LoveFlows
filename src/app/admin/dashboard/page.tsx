"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";
import NotificationManager from "@/components/admin/NotificationManager";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users,
    MessageSquare,
    Trash2,
    CheckCircle2,
    XCircle,
    TrendingUp,
    Search
} from "lucide-react";

interface RSVP {
    id: number;
    name: string;
    attending: boolean;
    guests: number;
    companion_names?: string;
    email?: string;
    created_at: string;
}

interface Message {
    id: number;
    name: string;
    message: string;
    created_at: string;
}

export default function AdminDashboard() {
    const [loading, setLoading] = useState(true);
    const [rsvps, setRsvps] = useState<RSVP[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [activeTab, setActiveTab] = useState<"rsvp" | "guestbook">("rsvp");
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const router = useRouter();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('loveflow-admin');
        if (!isLoggedIn) {
            router.push("/admin/login");
        } else {
            loadData();
        }
    }, [router]);

    const loadData = () => {
        const rsvpData = JSON.parse(localStorage.getItem('loveflow-rsvps') || '[]');
        const messageData = JSON.parse(localStorage.getItem('loveflow-guestbook') || '[]');
        setRsvps(rsvpData);
        setMessages(messageData);
        setLoading(false);
    };

    const deleteMessage = (id: number) => {
        if (!confirm("Tem certeza que deseja excluir esta mensagem?")) return;
        const updated = messages.filter(m => m.id !== id);
        setMessages(updated);
        localStorage.setItem('loveflow-guestbook', JSON.stringify(updated));
    };

    const confirmedCount = rsvps.filter(r => r.attending === true).length;
    const guestTotal = rsvps.filter(r => r.attending === true).reduce((acc, curr) => acc + (curr.guests || 1), 0);

    const filteredRsvps = rsvps.filter(r => {
        const matchesFilter = filter === "all" || (filter === "yes" ? r.attending === true : r.attending === false);
        const matchesSearch = (r.name || "").toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    if (loading) return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                <TrendingUp size={48} className="text-[var(--pk-gold)]" />
            </motion.div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[var(--pk-stone)] text-[var(--pk-charcoal)]">
            <AdminNav />
            <NotificationManager />

            <main className="container mx-auto px-4 pt-32 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <StatCard title="Total RSVPs" value={rsvps.length} icon={<Users className="text-blue-500" />} />
                    <StatCard title="Confirmados" value={confirmedCount} icon={<CheckCircle2 className="text-green-500" />} />
                    <StatCard title="Total de Pessoas" value={guestTotal} icon={<TrendingUp className="text-[var(--pk-gold)]" />} />
                </div>

                <div className="flex gap-4 mb-8 bg-white p-2 rounded-2xl border border-[var(--pk-stone)] w-fit mx-auto">
                    <button
                        onClick={() => setActiveTab("rsvp")}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold tracking-widest text-xs transition-all ${activeTab === 'rsvp' ? 'bg-[var(--pk-charcoal)] text-white shadow-lg' : 'text-[var(--pk-text-muted)] hover:bg-[var(--pk-stone)]/50'}`}
                    >
                        <Users size={16} /> CONVIDADOS
                    </button>
                    <button
                        onClick={() => setActiveTab("guestbook")}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold tracking-widest text-xs transition-all ${activeTab === 'guestbook' ? 'bg-[var(--pk-charcoal)] text-white shadow-lg' : 'text-[var(--pk-text-muted)] hover:bg-[var(--pk-stone)]/50'}`}
                    >
                        <MessageSquare size={16} /> RECADOS
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === "rsvp" ? (
                        <motion.div key="rsvp" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                            <div className="bg-white rounded-3xl border border-[var(--pk-stone)] shadow-sm overflow-hidden">
                                <div className="p-6 border-b border-[var(--pk-stone)] flex flex-col md:flex-row justify-between items-center gap-4">
                                    <div className="flex items-center gap-4 w-full md:w-auto">
                                        <div className="relative flex-1 md:w-64">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--pk-stone)]" size={18} />
                                            <input
                                                type="text"
                                                placeholder="Buscar por nome..."
                                                className="w-full pl-10 pr-4 py-2 bg-[var(--pk-stone)]/30 rounded-lg outline-none focus:ring-1 ring-[var(--pk-gold)]"
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                            />
                                        </div>
                                        <select
                                            value={filter}
                                            onChange={(e) => setFilter(e.target.value)}
                                            className="px-4 py-2 bg-[var(--pk-stone)]/30 rounded-lg outline-none text-sm font-bold"
                                        >
                                            <option value="all">Todos</option>
                                            <option value="yes">Confirmados</option>
                                            <option value="no">Recusados</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-[var(--pk-stone)]/10 text-[var(--pk-gold)] uppercase text-[10px] tracking-[0.2em] font-bold">
                                                <th className="px-6 py-4">Convidado</th>
                                                <th className="px-6 py-4">Status</th>
                                                <th className="px-6 py-4">Acompanhantes</th>
                                                <th className="px-6 py-4">Email</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[var(--pk-stone)]/50">
                                            {filteredRsvps.map((rsvp, idx) => (
                                                <tr key={idx} className="hover:bg-[var(--pk-stone)]/20 transition-colors text-sm">
                                                    <td className="px-6 py-4 font-bold">{rsvp.name}</td>
                                                    <td className="px-6 py-4">
                                                        {rsvp.attending ? (
                                                            <span className="inline-flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-full text-[10px] font-bold">
                                                                <CheckCircle2 size={12} /> CONFIRMADO
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1 text-red-600 bg-red-50 px-3 py-1 rounded-full text-[10px] font-bold">
                                                                <XCircle size={12} /> RECUSADO
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {rsvp.guests > 1 ? (
                                                            <div>
                                                                <div className="font-bold">{rsvp.guests - 1} acompanhante(s)</div>
                                                                <div className="text-[10px] text-[var(--pk-text-muted)] italic mt-1">{rsvp.companion_names}</div>
                                                            </div>
                                                        ) : (
                                                            <span className="text-[var(--pk-text-muted)] italic text-[10px]">Apenas titular</span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 text-xs text-[var(--pk-text-muted)]">{rsvp.email}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div key="guestbook" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {messages.map((msg) => (
                                    <div key={msg.id} className="bg-white p-6 rounded-3xl border border-[var(--pk-stone)] shadow-sm relative group">
                                        <button
                                            onClick={() => deleteMessage(msg.id)}
                                            className="absolute top-4 right-4 text-red-300 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 bg-[var(--pk-stone)] rounded-full flex items-center justify-center font-bold text-[var(--pk-gold)]">
                                                {(msg.name || "C")[0].toUpperCase()}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm tracking-tight">{msg.name}</h4>
                                                <p className="text-[10px] text-[var(--pk-text-muted)] uppercase tracking-widest">
                                                    {new Date(msg.created_at).toLocaleDateString('pt-BR')}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-sm italic leading-relaxed text-[var(--pk-text-muted)]">&quot;{msg.message}&quot;</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}

function StatCard({ title, value, icon }: { title: string, value: number, icon: React.ReactNode }) {
    return (
        <div className="bg-white p-6 rounded-3xl border border-[var(--pk-stone)] shadow-sm flex items-center justify-between">
            <div>
                <p className="text-[10px] font-bold text-[var(--pk-gold)] uppercase tracking-[0.2em] mb-1">{title}</p>
                <h3 className="text-3xl font-[family-name:var(--font-playfair)] text-[var(--pk-charcoal)]">{value}</h3>
            </div>
            <div className="p-4 bg-[var(--pk-stone)]/30 rounded-2xl">
                {icon}
            </div>
        </div>
    );
}
