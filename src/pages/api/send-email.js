export const prerender = false;

import { Resend } from 'resend';

const API_KEY = import.meta.env.RESEND_API_KEY;

const resend = new Resend(API_KEY);

export async function GET() {
    return new Response(JSON.stringify({ message: "GET funcionando" }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function POST({ request }) {
    try {
        const { name, email, message } = await request.json();
        const { data, error } = await resend.emails.send({
            from: `${name} desde danpatinofotogradia.com <onboarding@resend.dev>`,
            to: ['danpatinofotografia@gmail.com'],
            subject: 'Mensaje del formulario de contacto de danpatinofotogradia.com',
            html: `<p>Nombre: ${name}</p><p>Email: ${email}</p><p>Mensaje: ${message}</p>`,
        });
        if (error) {
            return new Response(JSON.stringify({ error }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        return new Response(JSON.stringify({ data }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}