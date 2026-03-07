import type { GameState } from "../../hooks/useGameSocket";
import { tiles } from "../../game/data/tiles";
import SDGBar from "./SDGBar";
import { Bot } from "lucide-react";

type RightSidebarProps = {
    gameState: GameState;
};

export default function RightSidebar({ gameState }: RightSidebarProps) {
    // Base colors matching PlayerToken radial-gradients
    const baseColors = ["#ff5e5e", "#5ea1ff", "#5eff9b", "#ffd45e"];

    const myPlayerId = localStorage.getItem("terrapoly_id");
    const myPlayer = gameState.players.find(p => p.id === myPlayerId);
    const playersToShow = myPlayer ? [myPlayer] : gameState.players;

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
            <div className="flex-1 p-4 flex flex-col overflow-y-auto">
                <h2 className="text-xl font-bold text-center text-white mb-4 uppercase tracking-wide">My Score</h2>

                <div className="flex flex-col gap-4">
                    {playersToShow.map((player) => {
                        const idx = gameState.players.findIndex(p => p.id === player.id);
                        const playerBg = baseColors[idx % baseColors.length];
                        const playerTiles = gameState.properties
                            .filter(p => p.ownerId === player.id)
                            .map(p => {
                                const t = tiles[p.squareIndex];
                                const level = parseInt(p.investmentLevel) || 1;
                                const earn = 15; // Base return rate per owned property
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
                                    <span className="truncate flex items-center gap-2" title={player.name}>
                                        {player.name} {player.isBot && <Bot className="w-4 h-4" />}
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
                                                    Level {t.level} • +{t.earn}/round
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
        </div>
    );
}
