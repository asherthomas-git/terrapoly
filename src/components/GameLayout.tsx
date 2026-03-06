import { useState, useEffect, useRef } from "react";
import type { GameState } from "../hooks/useGameSocket";
import { Socket } from "socket.io-client";
import Board from "./Board/Board";
import LeftSidebar from "./HUD/LeftSidebar";
import RightSidebar from "./HUD/RightSidebar";
import { tiles } from "../game/data/tiles";

type GameLayoutProps = {
    socket: Socket;
    gameState: GameState;
};

export default function GameLayout({ socket, gameState }: GameLayoutProps) {
    const myPlayerId = localStorage.getItem("terrapoly_id");
    const currentPlayerInState = gameState.players[gameState.room.currentTurnIdx];
    const amICurrentPlayer = currentPlayerInState?.id === myPlayerId;
    const currentTileIndex = currentPlayerInState?.position || 0;
    const currentTileData = tiles[currentTileIndex];

    const [hasRolled, setHasRolled] = useState(false);
    const [hasLanded, setHasLanded] = useState(false);
    const [hasActed, setHasActed] = useState(false);
    const [countdown, setCountdown] = useState<number | null>(null);

    const prevTurnIdx = useRef(gameState.room.currentTurnIdx);
    const prevPos = useRef(currentTileIndex);
    const countdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Reset local turn state when currentTurnIdx changes
    useEffect(() => {
        if (gameState.room.currentTurnIdx !== prevTurnIdx.current) {
            prevTurnIdx.current = gameState.room.currentTurnIdx;
            setHasRolled(false);
            setHasLanded(false);
            setHasActed(false);
            setCountdown(null);
            if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
            prevPos.current = gameState.players[gameState.room.currentTurnIdx]?.position || 0;
        }
    }, [gameState.room.currentTurnIdx, gameState.players]);

    const propertyOwner = gameState.properties.find(p => p.squareIndex === currentTileIndex)?.ownerId;
    const isOwnedByMe = propertyOwner === myPlayerId;
    const isProperty = currentTileData?.type === "property";

    const startCountdown = () => {
        if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
        setCountdown(5);
        countdownTimerRef.current = setInterval(() => {
            setCountdown((prev) => {
                if (prev === null) return null;
                if (prev <= 1) {
                    clearInterval(countdownTimerRef.current as ReturnType<typeof setTimeout>);
                    socket.emit("end_turn", { roomCode: gameState.room.roomCode });
                    return null;
                }
                return prev - 1;
            });
        }, 1000);
    };

    // Watch for position change after rolling to auto-end turn if no actions available
    useEffect(() => {
        if (currentTileIndex !== prevPos.current) {
            prevPos.current = currentTileIndex;
            if (amICurrentPlayer && hasRolled && !hasActed) {
                setHasLanded(true);
                if (!isProperty || isOwnedByMe) {
                    startCountdown();
                }
            }
        }
    }, [currentTileIndex, amICurrentPlayer, hasRolled, hasActed, isProperty, isOwnedByMe]);

    const handleInvest = () => {
        if (hasActed) return;
        setHasActed(true);
        socket.emit("invest", { roomCode: gameState.room.roomCode, playerId: myPlayerId, squareIndex: currentTileIndex });
        startCountdown();
    };

    const handlePayRent = () => {
        if (hasActed) return;
        setHasActed(true);
        socket.emit("pay_donation", { roomCode: gameState.room.roomCode, playerId: myPlayerId, squareIndex: currentTileIndex });
        startCountdown();
    };

    const handlePass = () => {
        if (hasActed) return;
        setHasActed(true);
        socket.emit("pass_action", { roomCode: gameState.room.roomCode, playerId: myPlayerId, squareIndex: currentTileIndex });
        startCountdown();
    };

    return (
        <div className="w-full h-full flex flex-row justify-between items-center bg-[#154c37] bg-[url('/background.png')] bg-cover bg-center bg-no-repeat relative">
            {/* Added overlay to match the css background concept */}
            <div className="absolute inset-0 bg-black/40 z-0" />

            <div className="flex-none h-full z-10 p-4">
                <LeftSidebar
                    gameState={gameState}
                    myPlayerId={myPlayerId}
                    countdown={countdown}
                    hasRolled={hasRolled && hasLanded} // Pass hasLanded constraint so it doesn't show buttons while moving
                    hasActed={hasActed}
                    onInvest={handleInvest}
                    onPayRent={handlePayRent}
                    onPass={handlePass}
                />
            </div>

            <div className="flex-1 flex justify-center items-center h-full z-10 py-8">
                <Board
                    socket={socket}
                    gameState={gameState}
                    hasRolled={hasRolled}
                    setHasRolled={setHasRolled}
                />
            </div>

            <div className="flex-none h-full z-10 p-4">
                <RightSidebar gameState={gameState} />
            </div>
        </div>
    );
}
