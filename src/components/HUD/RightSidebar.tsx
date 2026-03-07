import type { GameState } from "../../hooks/useGameSocket";
import { tiles } from "../../game/data/tiles";
import SDGBar from "./SDGBar";
import { BASE_INCOME, LEVEL_LABELS } from "../../game/investRules";
import { Bot, Target, BookOpen, LogOut } from "lucide-react";
import { useState } from "react";
import SDGListModal from "./SDGListModal";
import QuickGuideModal from "./QuickGuideModal";

type RightSidebarProps = {
    gameState: GameState;
};

export default function RightSidebar({ gameState }: RightSidebarProps) {
    // Base colors matching PlayerToken radial-gradients
    const baseColors = ["#ff5e5e", "#5ea1ff", "#5eff9b", "#ffd45e"];

    const myPlayerId = localStorage.getItem("terrapoly_id");
    const myPlayer = gameState.players.find(p => p.id === myPlayerId);
    const playersToShow = myPlayer ? [myPlayer] : gameState.players;

    const [showSDGList, setShowSDGList] = useState(false);
    const [showGuide, setShowGuide] = useState(false);

    const handleLeaveGame = () => {
        if (window.confirm("Are you sure you want to leave the game?")) {
            sessionStorage.removeItem("terrapoly_roomInfo");
            window.location.reload(); // Quickest way to dump state and go to Lobby considering App routing checks this
        }
    };

    return (
        <div className="w-full h-full flex flex-col gap-4">
            {/* GLOBAL SCORE */}
            <div className="bg-[#fcf8f2] flex-none border-4 border-black shadow-[4px_4px_0px_#000] p-4 flex flex-col">
                <h2 className="text-xl font-bold text-center text-black mb-2 uppercase tracking-wide">World Score</h2>
                <div className="text-sm font-bold text-center mb-4 text-gray-700">Round: {gameState.room.currentRound}/15</div>
                <div>
                    <SDGBar room={gameState.room} />
                </div>
            </div>

            {/* CURRENT SCORE */}
            <div className="w-full flex-col overflow-hidden">
                <h2 className="mt-1 non-scrollable text-xl font-bold text-center text-white mb-4 uppercase tracking-wide">My Score</h2>

                <div className="flex flex-col gap-4">
                    {playersToShow.map((player) => {
                        const idx = gameState.players.findIndex(p => p.id === player.id);
                        const playerBg = baseColors[idx % baseColors.length];
                        const playerTiles = gameState.properties
                            .filter(p => p.ownerId === player.id)
                            .map(p => {
                                const t = tiles[p.squareIndex];
                                const level = p.investmentLevel || 'SEED';
                                const earn = BASE_INCOME + p.bonusReturns;
                                return { name: t.name, level, earn };
                            });

                        const returnRate = playerTiles.reduce((acc, t) => acc + t.earn, 0);
                        const isCurrentTurn = player.id === gameState.players[gameState.room.currentTurnIdx]?.id;

                        return (
                            <div
                                key={player.id}
                                className={`flex flex-col border-4 border-black rounded-lg shadow-[2px_2px_0px_#000] overflow-hidden transition-all ${isCurrentTurn ? 'ring-4 ring-black/30 scale-[1.02]' : ''}`}
                                style={{ backgroundColor: playerBg }}
                            >
                                {/* Player Header */}
                                <div className="flex justify-between items-center p-3 bg-white/20 border-b-2 border-black/20 text-black font-black">
                                    <span className="truncate flex items-center gap-2" title={player.id === myPlayerId ? 'You' : player.name}>
                                        {player.id === myPlayerId ? 'You' : player.name} {player.isBot && <Bot className="w-4 h-4" />}
                                    </span>
                                    <span className="whitespace-nowrap">{player.impactPoints} pts</span>
                                </div>

                                {/* Player Stats */}
                                <div className="p-3 flex flex-col gap-2 text-sm font-bold text-black/90">
                                    {/* Impact Points */}
                                    <div className="flex justify-between items-center bg-white/30 px-3 py-2 rounded border-2 border-black/10">
                                        <span className="opacity-80">Impact Points</span>
                                        <span className="text-base font-black">{player.impactPoints}</span>
                                    </div>

                                    {/* Return Rate */}
                                    <div className="flex justify-between items-center bg-white/40 px-3 py-2 rounded border-2 border-black/10">
                                        <span className="opacity-80">Return Rate</span>
                                        <span className="text-base font-black text-green-900">+{returnRate} pts / round</span>
                                    </div>

                                    {/* Owned Properties */}
                                    <div className="mt-2 font-black opacity-80 uppercase tracking-wide text-xs">Owned Projects</div>
                                    <div className="flex flex-col gap-2 max-h-[140px] overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>
                                        {playerTiles.length === 0 && (
                                            <div className="opacity-60 italic text-xs py-1">No investments yet</div>
                                        )}
                                        {playerTiles.map((t, i) => (
                                            <div key={i} className="bg-white/30 px-3 py-2 rounded border-2 border-black/10 flex flex-col">
                                                <span className="truncate">{t.name}</span>
                                                <span className="text-[10px] opacity-70 uppercase mt-0.5">
                                                    {LEVEL_LABELS[t.level] || t.level} • +{t.earn}/round
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ACTION BUTTONS SECTION */}
            <div className="mt-auto pt-4 flex-none grid grid-cols-2 gap-2">
                <button
                    onClick={() => setShowSDGList(true)}
                    className="col-span-2 bg-blue-600 hover:bg-blue-500 text-white border-[3px] border-black rounded-lg py-2 px-3 font-black text-sm uppercase tracking-wide flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                    <Target className="w-4 h-4" /> 17 UN SDGs
                </button>
                <button
                    onClick={() => setShowGuide(true)}
                    className="bg-yellow-400 hover:bg-yellow-300 text-black border-[3px] border-black rounded-lg py-2 px-2 font-black text-sm uppercase tracking-wide flex items-center justify-center gap-1 active:scale-95 transition-transform"
                >
                    <BookOpen className="w-4 h-4" /> Guide
                </button>
                <button
                    onClick={handleLeaveGame}
                    className="bg-gray-200 hover:bg-red-500 hover:text-white text-black border-[3px] border-black rounded-lg py-2 px-2 font-black text-sm uppercase tracking-wide flex items-center justify-center gap-1 active:scale-95 transition-colors transition-transform"
                >
                    <LogOut className="w-4 h-4" /> Leave
                </button>
            </div>

            {/* MODALS */}
            {showSDGList && <SDGListModal onClose={() => setShowSDGList(false)} />}
            {showGuide && <QuickGuideModal onClose={() => setShowGuide(false)} />}
        </div>
    );
}
