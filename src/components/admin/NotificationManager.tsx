"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function NotificationManager() {
    const [permission, setPermission] = useState<NotificationPermission>("default");

    useEffect(() => {
        if ("Notification" in window) {
            setPermission(Notification.permission);
            if (Notification.permission === "default") {
                Notification.requestPermission().then(setPermission);
            }
        }

        // Setup Realtime Listeners
        const rsvpChannel = supabase
            .channel('admin-notifications')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'rsvps' },
                (payload) => {
                    sendNotification("Novo RSVP!", `${payload.new.full_name} confirmou presença.`);
                }
            )
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'messages' },
                (payload) => {
                    sendNotification("Nova Mensagem no Mural!", `${payload.new.name} enviou uma mensagem.`);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(rsvpChannel);
        };
    }, []);

    const sendNotification = (title: string, body: string) => {
        if (Notification.permission === "granted") {
            new Notification(title, {
                body,
                icon: "/favicon.ico", // Ensure this exists or use a better icon URL
            });
        }
    };

    return null; // This component doesn't render anything
}
