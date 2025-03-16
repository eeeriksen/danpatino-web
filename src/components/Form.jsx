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

            const { data, error } = await response.json();

            if (error) {
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

    if (error) {
        return (
            <div className='form-result'>
                <p className='error'>Ocurrió un error, intenta de nuevo recargando la página.</p>
            </div>
        )
    }

    if (success) {
        return (
            <div className='form-result'>
                <p className='success'>¡Gracias por tu mensaje! Te contactaré pronto.</p>
            </div>
        )
    }

    return (
        <>
            {!success && !error && <form onSubmit={handleSubmit}>
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
            </form>}
        </>
    );
}