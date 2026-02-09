"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function NotificationManager() {


    useEffect(() => {
        if (typeof window === "undefined" || !("Notification" in window)) return;

        if (Notification.permission === "default") {
            Notification.requestPermission();
        }

        const sendNotification = (title: string, body: string) => {
            if (Notification.permission === "granted") {
                new Notification(title, {
                    body,
                    icon: "/favicon.ico",
                });
            }
        };

        // Setup Realtime Listeners
        const channel = supabase
            .channel('admin-notifications')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'rsvps' },
                (payload: { new: { full_name: string } | object }) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const newRecord = (payload as any).new;
                    sendNotification("Novo RSVP!", `${newRecord.full_name} confirmou presença.`);
                }
            )
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'messages' },
                (payload: { new: { name: string } | object }) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const newRecord = (payload as any).new;
                    sendNotification("Nova Mensagem no Mural!", `${newRecord.name} enviou uma mensagem.`);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return null; // This component doesn't render anything
}
