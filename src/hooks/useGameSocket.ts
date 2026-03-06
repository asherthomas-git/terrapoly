import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Dynamically target the backend using the browser's current IP address, so mobile testing on the LAN works!
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || `http://${window.location.hostname}:3001`;
const socket: Socket = io(BACKEND_URL);

export interface GameState {
    room: {
        id: string;
        roomCode: string;
        status: "WAITING" | "ACTIVE" | "FINISHED";
        currentRound: number;
        currentTurnIdx: number;
        sdgClimate: number;
        sdgEducation: number;
        sdgHealth: number;
        sdgEnergy: number;
        sdgJustice: number;
    };
    players: {
        id: string;
        roomId: string;
        socketId: string | null;
        name: string;
        impactPoints: number;
        position: number;
        isActive: boolean;
        isBot: boolean;
        botPersonality: string | null;
    }[];
    properties: {
        id: string;
        roomId: string;
        squareIndex: number;
        ownerId: string;
        investmentLevel: string;
        bonusReturns: number;
    }[];
}

export const useGameSocket = () => {
    const [gameState, setGameState] = useState<GameState | null>(null);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected to game server");
        });

        socket.on("state_update", (state: GameState) => {
            console.log("Master State Synced:", state);
            setGameState(state);
        });

        // Event Listeners for Game Mechanics
        socket.on("error", (err) => {
            toast.error(err.message || "An error occurred", { theme: "colored" });
        });

        socket.on("player_moved", ({ playerId, position, roll }) => {
            toast.info(`🎲 Someone rolled a ${roll}!`);
        });

        socket.on("crisis_triggered", ({ category, bystanderId }) => {
            // Find victim if we have state access (though tricky in a hook closure without deps, we can just generic toast)
            toast.error(`⚠️ CRISIS in ${category}! A player lost 40 points for hoarding!`, { theme: "colored" });
        });

        socket.on("game_over", ({ reason, winnerId }) => {
            if (reason === 'collapse') {
                toast.error("💀 GAME OVER! The SDGs collapsed!", { autoClose: false });
            } else {
                toast.success("🏆 VICTORY! You survived 15 rounds!", { autoClose: false });
            }
        });

        return () => {
            socket.off("connect");
            socket.off("state_update");
            socket.off("player_moved");
            socket.off("crisis_triggered");
            socket.off("game_over");
        };
    }, []);

    return { socket, gameState };
};
