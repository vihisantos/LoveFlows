import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Simple ping query to keep Supabase active
        const { data, error } = await supabase
            .from('messages')
            .select('id')
            .limit(1);

        if (error) {
            console.error('Cron job error:', error);
            return NextResponse.json({
                success: false,
                error: error.message,
                timestamp: new Date().toISOString()
            }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: 'Supabase keep-alive ping successful',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Cron job exception:', error);
        return NextResponse.json({
            success: false,
            error: 'Internal server error',
            timestamp: new Date().toISOString()
        }, { status: 500 });
    }
}
