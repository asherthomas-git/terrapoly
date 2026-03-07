import { X } from "lucide-react";
import type { TileData } from "../../game/data/tiles";
import { sdgFacts } from "../../game/data/sdgFacts";

type TileInfoModalProps = {
    tileData: TileData;
    onClose: () => void;
};

export default function TileInfoModal({ tileData, onClose }: TileInfoModalProps) {
    const isProperty = tileData.type === "property";

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
    const factData = tileData.sdgno ? sdgFacts[tileData.sdgno] : null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-auto p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
                style={{ animation: "fadeIn 0.2s ease-out" }}
            />

            {/* Modal Card */}
            <div
                className="relative w-full max-w-[420px] rounded-2xl overflow-hidden border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] font-nunito text-black z-10"
                style={{
                    backgroundColor: bgColor,
                    animation: "scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 bg-red-500 text-white w-8 h-8 rounded-full border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_rgba(0,0,0,1)] z-20 transition-all font-bold"
                >
                    <X size={16} strokeWidth={3} />
                </button>

                {/* Category Tag */}
                <div className="flex justify-center pt-5 pb-2">
                    <div className="bg-black text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest shadow-md">
                        {tileData.cat || "SPECIAL TILE"}
                    </div>
                </div>

                {/* Icon */}
                <div className="flex justify-center py-2">
                    <div className="text-6xl drop-shadow-md">
                        {tileData.type === "start" ? "🚀" : tileData.type === "jail" ? "🚔" : tileData.type === "tax" ? "💸" : "🏢"}
                    </div>
                </div>

                {/* Details */}
                <div className="text-center px-6 pb-6 pt-2 bg-white/40 backdrop-blur-md">
                    <h2 className="text-2xl font-black uppercase leading-tight mt-3 mb-2 tracking-tight drop-shadow-sm">
                        {tileData.name}
                    </h2>

                    <p className="font-bold text-sm bg-black/5 p-3 outline-dashed outline-2 outline-black/20 rounded-lg mb-4 leading-snug">
                        {tileData.desc || "A standard tile on the board."}
                    </p>

                    {tileData.sdgno && factData && (
                        <div className="bg-white border-4 border-black p-4 rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,0.1)] text-left flex flex-col gap-2 relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-[#fef08a] px-3 py-1 font-black text-[10px] border-b-2 border-l-2 border-black tracking-widest uppercase">
                                REAL WORLD FACT
                            </div>

                            <div className="flex items-center gap-2 mt-2">
                                <span className="bg-[#3b82f6] text-white rounded-md px-2 py-0.5 text-xs font-bold border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                                    {tileData.sdgno}
                                </span>
                                <h3 className="font-black text-sm uppercase leading-tight">{factData.title}</h3>
                            </div>

                            <p className="text-sm font-medium leading-relaxed text-black/90 mt-1">
                                {factData.fact}
                            </p>

                            {tileData.region && (
                                <div className="mt-1 pt-2 border-t border-black/10 text-xs font-bold flex items-center gap-1.5 text-black/70">
                                    <span>📍</span> Region Focus: {tileData.region}
                                </div>
                            )}
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
                @keyframes scaleIn {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
