import { useState, useEffect } from "react";
import { Globe, Sparkles, Rocket, X } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import type { GameState } from "../../hooks/useGameSocket";
import { Socket } from "socket.io-client";

type LobbyProps = {
    socket: Socket;
    gameState: GameState | null;
};

export default function Lobby({ socket, gameState }: LobbyProps) {
    const [roomCode, setRoomCode] = useState("");
    const [playerName, setPlayerName] = useState("");
    const [botPersonality, setBotPersonality] = useState<"Greedy" | "Eco-Warrior" | "Balanced">("Balanced");

    useEffect(() => {
        // Ensure the player has a local ID
        if (!localStorage.getItem("terrapoly_id")) {
            localStorage.setItem("terrapoly_id", uuidv4());
        }
    }, []);

    const handleCreate = () => {
        if (!playerName) return alert("Please enter a player name first!");
        const playerId = localStorage.getItem("terrapoly_id") as string;

        socket.emit("create_room", { creatorId: playerId }, (response: any) => {
            if (response.error) {
                alert(response.error);
                return;
            }
            setRoomCode(response.roomCode); // Update visual input box
            sessionStorage.setItem("terrapoly_roomInfo", JSON.stringify({ roomCode: response.roomCode, playerName }));
            socket.emit("join_room", { roomCode: response.roomCode, playerName, playerId });
        });
    };

    const handleJoin = () => {
        if (!roomCode || !playerName) return alert("Please enter both Name and Room Code!");
        const playerId = localStorage.getItem("terrapoly_id") as string;
        sessionStorage.setItem("terrapoly_roomInfo", JSON.stringify({ roomCode: roomCode.toUpperCase(), playerName }));
        socket.emit("join_room", { roomCode: roomCode.toUpperCase(), playerName, playerId });
    };

    const handleAddBot = () => {
        if (!gameState?.room?.roomCode) return;
        socket.emit("add_bot", { roomCode: gameState.room.roomCode, botPersonality });
    };

    const handleStartGame = () => {
        if (!gameState?.room?.roomCode) return;
        socket.emit("start_game", { roomCode: gameState.room.roomCode });
    };

    const handleKickPlayer = (targetPlayerId: string) => {
        if (!gameState?.room?.roomCode) return;
        socket.emit("kick_player", { roomCode: gameState.room.roomCode, targetPlayerId });
    };

    const myPlayerId = localStorage.getItem("terrapoly_id");
    const isOwner = gameState?.ownerId === myPlayerId;
    const inRoom = !!gameState?.room?.roomCode;

    return (
        <div className="flex flex-col items-center justify-center h-full font-nunito text-black">
            <h1 className="text-white text-4xl sm:text-5xl mb-5 mr-3 flex items-center justify-center gap-2 sm:gap-3">Terrapoly<Globe className="w-8 h-8 sm:w-12 sm:h-12" />2030</h1>

            {!inRoom ? (
                <div className="bg-[#fdfbf7] border-4 border-black shadow-[8px_8px_0px_#000] p-6 sm:p-8 rounded-lg w-11/12 max-w-[400px] flex flex-col gap-4">
                    <h2 className="text-2xl font-bold text-center">Play Game</h2>

                    <input
                        className="p-3 text-base border-[3px] border-black rounded font-inherit outline-none focus:ring-2 focus:ring-black/20"
                        placeholder="Your Player Name"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                    />

                    <button
                        className="p-3 text-base border-[3px] border-black rounded outline-none bg-[#4ade80] font-bold cursor-pointer shadow-[4px_4px_0px_#000] transition-transform duration-100 hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_#000]"
                        onClick={handleCreate}
                    >
                        <Sparkles className="inline-block mr-2" size={20} /> Create New Room
                    </button>

                    <div className="flex items-center my-2">
                        <div className="flex-grow border-t-2 border-dashed border-gray-400"></div>
                        <span className="px-3 text-gray-500 font-bold uppercase text-sm">Room Code</span>
                        <div className="flex-grow border-t-2 border-dashed border-gray-400"></div>
                    </div>

                    <div className="flex gap-2">
                        <input
                            className="flex-1 p-3 text-base border-[3px] border-black rounded font-inherit outline-none focus:ring-2 focus:ring-black/20 uppercase"
                            placeholder="ABCD..."
                            value={roomCode}
                            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                        />
                        <button
                            className="px-6 p-3 text-base border-[3px] border-black rounded outline-none bg-[#fde047] font-bold cursor-pointer shadow-[4px_4px_0px_#000] transition-transform duration-100 hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_#000]"
                            onClick={handleJoin}
                        >
                            Join
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-[#fdfbf7] border-4 border-black shadow-[8px_8px_0px_#000] p-6 sm:p-8 rounded-lg w-11/12 max-w-[400px] flex flex-col gap-4">
                    <h2 className="text-2xl font-bold">Room: {gameState?.room.roomCode}</h2>

                    <div className="mb-5">
                        <h3 className="text-lg font-bold mb-2">Players ({gameState?.players.length}/4)</h3>
                        <ul className="list-none p-0 m-0">
                            {gameState?.players.map((p) => (
                                <li key={p.id} className="p-2 border-b-2 border-black font-bold flex items-center justify-between">
                                    <span>
                                        {p.name} {p.isBot ? `(Bot: ${p.botPersonality})` : "(Player)"}
                                        {p.id === gameState?.ownerId && (
                                            <span className="ml-2 text-xs bg-black text-white px-2 py-0.5 rounded-full">HOST</span>
                                        )}
                                    </span>
                                    {isOwner && p.id !== myPlayerId && (
                                        <button
                                            className="w-7 h-7 flex items-center justify-center bg-red-500 text-white border-2 border-black rounded shadow-[2px_2px_0px_#000] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#000] transition-all"
                                            onClick={() => handleKickPlayer(p.id)}
                                            title="Kick player"
                                        >
                                            <X size={14} strokeWidth={3} />
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex gap-2 mb-5">
                        <select
                            className="p-3 text-base border-[3px] border-black rounded font-inherit outline-none focus:ring-2 focus:ring-black/20"
                            value={botPersonality}
                            onChange={(e) => setBotPersonality(e.target.value as any)}
                        >
                            <option value="Balanced">Balanced Bot</option>
                            <option value="Greedy">Greedy Bot</option>
                            <option value="Eco-Warrior">Eco-Warrior Bot</option>
                        </select>
                        <button
                            className="flex-1 p-3 text-base border-[3px] border-black rounded outline-none bg-[#fde047] font-bold cursor-pointer shadow-[4px_4px_0px_#000] transition-transform duration-100 hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_#000]"
                            onClick={handleAddBot}
                        >
                            Add Bot
                        </button>
                    </div>

                    {isOwner ? (
                        <button
                            className="p-3 text-[20px] border-[3px] border-black rounded outline-none bg-[#ff90e8] font-bold cursor-pointer shadow-[4px_4px_0px_#000] transition-transform duration-100 hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_#000]"
                            onClick={handleStartGame}
                        >
                            Start Game <Rocket className="inline-block ml-2" size={24} />
                        </button>
                    ) : (
                        <div className="p-3 text-center text-base border-[3px] border-black/20 rounded bg-gray-100 text-gray-500 font-bold">
                            Waiting for host to start...
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
