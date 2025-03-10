import React, { useState } from 'react';
import { Resend } from 'resend';
import '../styles/form.css';

export function Form() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message }),
            });

            const result = await response.json();

            if (!response.ok) {
                setLoading(false);
                setError(true);
            } else {
                setLoading(false);
                setSuccess(true);
            }
        } catch (error) {
            setError(true);
        }
    }

    return (
        <form id="contact-form" onSubmit={handleSubmit}>

            <h2>Contáctame</h2>
            <input
                required
                placeholder='Nombre'
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                required
                placeholder='Email'
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
                required
                placeholder='Mensaje'
                value={message}
                minLength="5"
                onChange={(e) => setMessage(e.target.value)}

            ></textarea>
            <button disabled={loading} type='submit'>Enviar</button>

            {(error || success) && (
                <div className='result-container'>
                    {(!error && !loading && success) ? (
                        <>
                            <p>¡Gracias por tu mensaje! Te contactaré pronto.</p>
                        </>
                    ) : (
                        error && <div>Ocurrió un error, intenta de nuevo recargando la página.</div>
                    )}
                </div>
            )}
        </form>
    );
}