import type { GameState } from "../../hooks/useGameSocket";
import SDGBar from "./SDGBar";

type RightSidebarProps = {
    gameState: GameState;
};

export default function RightSidebar({ gameState }: RightSidebarProps) {
    return (
        <div className="w-[320px] h-full flex flex-col gap-4 py-4 pr-4">
            {/* GLOBAL SCORE */}
            <div className="bg-[#fcf8f2] flex-[1.2] border-4 border-black shadow-[4px_4px_0px_#000] p-4 flex flex-col">
                <h2 className="text-xl font-bold text-center text-black mb-2 uppercase tracking-wide">Global Score</h2>
                <div className="text-sm font-bold text-center mb-4 text-gray-700">Round: {gameState.room.currentRound}/15</div>
                <div className="flex-1">
                    <SDGBar room={gameState.room} />
                </div>
            </div>

            {/* CURRENT SCORE */}
            <div className="bg-[#fcf8f2] flex-1 border-4 border-black shadow-[4px_4px_0px_#000] p-4 flex flex-col overflow-y-auto">
                <h2 className="text-xl font-bold text-center text-black mb-4 uppercase tracking-wide">Current Score</h2>

                <div className="flex flex-col gap-3">
                    {gameState.players.map((player) => (
                        <div
                            key={player.id}
                            className={`flex justify-between items-center p-3 border-2 border-black rounded ${player.id === gameState.players[gameState.room.currentTurnIdx]?.id ? 'bg-[#fde047]' : 'bg-white'}`}
                        >
                            <span className="font-bold truncate" title={player.name}>
                                {player.name} {player.isBot ? "🤖" : ""}
                            </span>
                            <span className="font-bold whitespace-nowrap">{player.impactPoints} pts</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
