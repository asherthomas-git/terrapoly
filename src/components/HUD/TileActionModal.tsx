import type { TileData } from "../../game/data/tiles";

type TileActionModalProps = {
    tileData: TileData;
    isOwned: boolean;
    isOwnedByMe: boolean;
    isProperty: boolean;
    amICurrentPlayer: boolean;
    hasRolled: boolean;
    hasActed: boolean;
    countdown: number | null;
    onInvest: () => void;
    onPayRent: () => void;
    onPass: () => void;
};

export default function TileActionModal({
    tileData,
    isOwned,
    isOwnedByMe,
    isProperty,
    amICurrentPlayer,
    hasRolled,
    hasActed,
    countdown,
    onInvest,
    onPayRent,
    onPass,
}: TileActionModalProps) {
    const getBgColor = () => {
        if (!isProperty) return "#e5e7eb";
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

    const showActions = amICurrentPlayer && hasRolled && !hasActed && isProperty;

    if (!showActions && countdown === null) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-end justify-center pointer-events-auto">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                style={{ animation: "fadeIn 0.2s ease-out" }}
            />

            {/* Modal Card */}
            <div
                className="relative w-full max-w-[420px] mx-2 mb-2 rounded-t-2xl overflow-hidden border-4 border-black shadow-[4px_-4px_0px_#000] font-nunito text-black"
                style={{
                    backgroundColor: bgColor,
                    animation: "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
            >
                {/* Owner badge */}
                {isOwned && (
                    <div className="absolute top-3 left-[-30px] bg-red-500 text-white text-[10px] font-bold px-10 py-1 -rotate-45 border-y-2 border-black shadow-md z-20">
                        {isOwnedByMe ? "OWNED BY YOU" : "OWNED"}
                    </div>
                )}

                {/* Category Tag */}
                <div className="flex justify-center pt-4 pb-2">
                    <div className="bg-black text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest">
                        {tileData.cat || "SPECIAL"}
                    </div>
                </div>

                {/* Icon */}
                <div className="flex justify-center py-2">
                    <div className="text-5xl">
                        {tileData.type === "start" ? "🏁" : tileData.type === "jail" ? "🚔" : tileData.type === "tax" ? "💸" : "🏢"}
                    </div>
                </div>

                {/* Details */}
                <div className="text-center px-4 pb-2">
                    <h2 className="text-xl font-bold uppercase leading-tight mb-1">{tileData.name}</h2>
                    <p className="text-xs font-medium opacity-80 line-clamp-2 mb-2">
                        {tileData.desc || "A standard tile on the board."}
                    </p>

                    {isProperty && (
                        <div className="flex justify-center gap-2 mb-2">
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

                {/* Pricing */}
                {isProperty && (
                    <div className="text-center mb-2">
                        <p className="text-lg font-black tracking-tight">COST: 50pts</p>
                        <p className="text-[10px] font-bold uppercase text-black/70">EARN: 15 pts / round</p>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="px-4 pb-4 pt-1">
                    {showActions ? (
                        <div className="flex gap-2 h-14">
                            {!isOwned ? (
                                <>
                                    <button
                                        className="flex-1 bg-[#ef4444] text-white font-black text-lg border-4 border-black active:translate-y-1 active:border-b-0 transition-transform overflow-hidden shadow-[inset_0_-4px_0_rgba(0,0,0,0.2)] rounded-lg"
                                        onClick={onInvest}
                                    >
                                        BUY
                                    </button>
                                    <button
                                        className="flex-1 bg-[#d1d5db] text-black font-black text-lg border-4 border-black active:translate-y-1 active:border-b-0 transition-transform shadow-[inset_0_-4px_0_rgba(0,0,0,0.2)] rounded-lg"
                                        onClick={onPass}
                                    >
                                        SKIP
                                    </button>
                                </>
                            ) : !isOwnedByMe ? (
                                <button
                                    className="w-full bg-[#fb923c] text-white font-black text-lg border-4 border-black active:translate-y-1 active:border-b-0 transition-transform shadow-[inset_0_-4px_0_rgba(0,0,0,0.2)] rounded-lg"
                                    onClick={onPayRent}
                                >
                                    DONATE
                                </button>
                            ) : (
                                <div className="w-full bg-black/10 flex items-center justify-center font-bold text-sm border-2 border-black/20 text-black/60 rounded-lg">
                                    YOUR PROPERTY
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="h-14 border-4 border-black/10 bg-black/5 flex items-center justify-center text-black/40 font-bold text-sm rounded-lg">
                            {countdown !== null ? `Auto-passing in ${countdown}s...` : "NO ACTIONS"}
                        </div>
                    )}
                </div>
            </div>

            {/* Keyframe animations */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { transform: translateY(100%); }
                    to { transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
