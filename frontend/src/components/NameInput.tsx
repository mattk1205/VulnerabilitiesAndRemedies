import { useState } from 'react';
import {Link} from "react-router-dom";
import React from "react";

type Player = {
    id: number;
    name: string;
};

function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message;
    return String(error);
}

export default function NameInput() {
    const [name, setName] = useState('');

    const [player, setPlayer] = useState<Player | null>(null);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setStatus('loading');

        if (!name.trim()) {
            alert('Please enter a name.');
            return;
        }

        const newPlayer: Player = {
            id: Date.now(),
            name: name.trim(),
        };

        setPlayer(newPlayer);

        console.log('Player object created:', newPlayer);
        try {
            const response = await fetch('http://localhost:8080/api/player/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, player }),
            });

            if (!response.ok) {
                new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Success:', data);
            setStatus('success');

        } catch (e: unknown) {
            console.error('An error occurred:', e);
            setError(getErrorMessage(e));
            setStatus('error');
        }
    };

    if (player) {
        return (
            <div className="text-center">
                <h2 className="m-15 text-8xl font-bold">Welcome, {player.name}!</h2>
                <Link to={"/game/levels"}><button className="!text-5xl" onClick={ () => alert("Entering Game")}>PLAY GAME</button></Link>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full max-w-xs">
            <h2 className="text-2xl font-bold">Create Player</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter a username"
                className="w-full rounded-md border-2 border-slate-600 bg-slate-700 p-3 text-white"
                disabled={status === 'loading'}
                required
            />
            <button type="submit" className="btn w-full" disabled={status === 'loading'}>
                {status === 'loading' ? 'Saving...' : 'Save'}
            </button>

            {/* --- User Feedback --- */}
            {status === 'success' && <p className="text-green-500">Username saved successfully!</p>}
            {status === 'error' && <p className="text-red-500">Error: {error}</p>}
        </form>
    );
}