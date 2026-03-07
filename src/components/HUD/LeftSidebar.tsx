import { useEffect, useRef } from "react";
import type { GameState } from "../../hooks/useGameSocket";
import { tiles } from "../../game/data/tiles";

type LeftSidebarProps = {
    gameState: GameState;
    myPlayerId: string | null;
    countdown: number | null;
    hasRolled: boolean;
    hasActed: boolean;
    onInvest: () => void;
    onPayRent: () => void;
    onPass: () => void;
};

export default function LeftSidebar({
    gameState,
    myPlayerId,
    countdown,
    hasRolled,
    hasActed,
    onInvest,
    onPayRent,
    onPass
}: LeftSidebarProps) {
    const currentPlayer = gameState.players[gameState.room.currentTurnIdx];
    const amICurrentPlayer = currentPlayer?.id === myPlayerId;
    const currentTileIndex = currentPlayer?.position || 0;
    const tileData = tiles[currentTileIndex];

    const propertyOwner = gameState.properties.find(p => p.squareIndex === currentTileIndex)?.ownerId;
    const isOwned = !!propertyOwner;
    const isOwnedByMe = propertyOwner === myPlayerId;
    const isProperty = tileData?.type === "property";

    // Colors roughly based on SDG category if it's a property
    const getBgColor = () => {
        if (!isProperty) return "#e5e7eb"; // Gray for Non-properties
        switch (tileData.cat) {
            case "green": return "#4ade80";
            case "yellow": return "#fde047";
            case "blue": return "#93c5fd";
            case "orange": return "#fb923c";
            case "purple": return "#c084fc";
            default: return "#e5e7eb";
        }
    };

    const bgColor = getBgColor();

    const logEndRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [gameState.logs]);

    return (
        <div className="w-full h-full flex flex-col gap-4 font-nunito text-black">
            {/* TILE CARD */}
            <div
                className="flex-[1.5] border-4 border-black shadow-[4px_4px_0px_#000] p-4 flex flex-col relative overflow-hidden"
                style={{ backgroundColor: bgColor }}
            >
                {/* CATEGORY TAG */}
                <div className="bg-black text-white text-xs font-bold px-4 py-1 rounded-full self-center uppercase tracking-widest mb-4 z-10">
                    {tileData.cat || "SPECIAL"}
                </div>

                {/* ICON / VISUAL */}
                <div className="flex-1 flex items-center justify-center z-10">
                    <div className="text-6xl">{tileData.type === 'start' ? '🏁' : tileData.type === 'jail' ? '🚔' : tileData.type === 'tax' ? '💸' : '🏢'}</div>
                </div>

                {/* DETAILS */}
                <div className="text-center z-10 px-2">
                    <h2 className="text-xl font-bold uppercase leading-tight mb-2">{tileData.name}</h2>
                    <p className="text-xs mb-3 font-medium opacity-80 line-clamp-3">
                        {tileData.desc || "A standard tile on the board."}
                    </p>

                    {isProperty && (
                        <div className="flex justify-center gap-2 mb-4">
                            {tileData.sdgno && (
                                <span className="bg-white text-black rounded-full px-2 py-1 text-[10px] font-bold border-2 border-black flex items-center">
                                    {tileData.sdgno}
                                </span>
                            )}
                            {tileData.region && (
                                <span className="bg-white text-black rounded-full px-2 py-1 text-[10px] font-bold border-2 border-black flex items-center">
                                    {tileData.region}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* PRICING */}
                {isProperty && (
                    <div className="text-center mb-4 z-10">
                        <p className="text-lg font-black tracking-tight">COST: 50pts</p>
                        <p className="text-[10px] font-bold uppercase text-black/70">
                            EARN: 15 pts / round
                        </p>
                    </div>
                )}

                {/* OWNER TAG */}
                {isOwned && (
                    <div className="absolute top-4 left-[-30px] bg-red-500 text-white text-[10px] font-bold px-10 py-1 -rotate-45 border-y-2 border-black shadow-md z-20">
                        {isOwnedByMe ? "OWNED BY YOU" : "OWNED"}
                    </div>
                )}

                {/* ACTION BUTTONS */}
                <div className="mt-auto z-10">
                    {amICurrentPlayer && hasRolled && !hasActed && isProperty ? (
                        <div className="flex gap-2 h-12">
                            {!isOwned ? (
                                <>
                                    <button
                                        className="flex-1 bg-[#ef4444] text-white font-black text-lg border-4 border-black active:translate-y-1 active:border-b-0 transition-transform overflow-hidden shadow-[inset_0_-4px_0_rgba(0,0,0,0.2)]"
                                        onClick={onInvest}
                                    >
                                        BUY
                                    </button>
                                    <button
                                        className="flex-1 bg-[#d1d5db] text-black font-black text-lg border-4 border-black active:translate-y-1 active:border-b-0 transition-transform shadow-[inset_0_-4px_0_rgba(0,0,0,0.2)]"
                                        onClick={onPass}
                                    >
                                        SKIP
                                    </button>
                                </>
                            ) : !isOwnedByMe ? (
                                <button
                                    className="w-full bg-[#fb923c] text-white font-black text-lg border-4 border-black active:translate-y-1 active:border-b-0 transition-transform shadow-[inset_0_-4px_0_rgba(0,0,0,0.2)]"
                                    onClick={onPayRent}
                                >
                                    DONATE
                                </button>
                            ) : (
                                <div className="w-full bg-black/10 flex items-center justify-center font-bold text-sm border-2 border-black/20 text-black/60 rounded">
                                    YOUR PROPERTY
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="h-12 border-4 border-black/10 bg-black/5 flex items-center justify-center text-black/40 font-bold text-sm">
                            {countdown !== null ? `Auto-passing in ${countdown}s...` : "NO ACTIONS"}
                        </div>
                    )}
                </div>
            </div>

            {/* LOG */}
            <div className="bg-[#e5e7eb] flex-[1] border-4 border-black shadow-[4px_4px_0px_#000] flex flex-col overflow-hidden relative">
                <div className="bg-black text-white text-xs font-black px-3 py-1 uppercase tracking-widest border-b-2 border-black flex-none">
                    Game Log
                </div>
                <div className="flex-1 overflow-y-auto p-3 text-sm flex flex-col gap-1.5" style={{ scrollbarWidth: 'thin' }}>
                    {gameState.logs?.map((log, i) => (
                        <div key={i} className="bg-white/50 px-2 py-1.5 rounded border border-black/10 shadow-sm whitespace-pre-wrap leading-snug">
                            {log}
                        </div>
                    ))}
                    <div ref={logEndRef} />
                </div>
            </div>
        </div>
    );
}
