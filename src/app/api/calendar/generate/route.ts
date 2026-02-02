import { NextResponse } from 'next/server';
import { createEvent, EventAttributes } from 'ics';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const { guestName, guestEmail } = await request.json();

        // Event configuration
        const event: EventAttributes = {
            start: [2026, 11, 28, 17, 0], // November 28, 2026, 5:00 PM
            duration: { hours: 6 },
            title: 'Casamento Gustavo & Jéssica',
            description: `Você está convidado para celebrar o casamento de Gustavo e Jéssica!\n\nConfira todos os detalhes em: https://love-flows.vercel.app\n\nNos vemos lá! 💍🥂`,
            location: 'Villa Medicea di Lilliano, Toscana, Itália',
            url: 'https://love-flows.vercel.app',
            status: 'CONFIRMED',
            busyStatus: 'BUSY',
            organizer: { name: 'Gustavo & Jéssica', email: 'contato@gustavoejessica.com' },
            attendees: [
                {
                    name: guestName || 'Convidado',
                    email: guestEmail,
                    rsvp: true,
                    partstat: 'ACCEPTED',
                    role: 'REQ-PARTICIPANT'
                }
            ],
            alarms: [
                {
                    action: 'display',
                    description: 'Lembrete: Casamento Gustavo & Jéssica amanhã!',
                    trigger: { hours: 24, before: true }
                },
                {
                    action: 'display',
                    description: 'Casamento Gustavo & Jéssica em 2 horas!',
                    trigger: { hours: 2, before: true }
                }
            ]
        };

        // Generate ICS file
        const { error, value } = createEvent(event);

        if (error) {
            console.error('ICS generation error:', error);
            return NextResponse.json(
                { success: false, error: 'Failed to generate calendar event' },
                { status: 500 }
            );
        }

        // Return ICS file
        return new NextResponse(value, {
            status: 200,
            headers: {
                'Content-Type': 'text/calendar; charset=utf-8',
                'Content-Disposition': 'attachment; filename="casamento-gustavo-jessica.ics"',
            },
        });
    } catch (error) {
        console.error('Calendar API error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
