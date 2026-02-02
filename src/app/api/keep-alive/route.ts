import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET() {
    try {
        // Simple query to wake up the DB
        const { data, error } = await supabase.from('rsvps').select('count', { count: 'exact', head: true });

        if (error) throw error;

        return NextResponse.json({ status: 'Alive', timestamp: new Date().toISOString() });
    } catch (error) {
        return NextResponse.json({ status: 'Error', error }, { status: 500 });
    }
}
