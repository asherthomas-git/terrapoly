import type { GameState } from "../../hooks/useGameSocket";

type Props = {
    players: GameState["players"];
    currentTurnIdx: number;
};

export default function Leaderboard({ players, currentTurnIdx }: Props) {
    return (
        <div className="flex flex-col gap-4 mt-6">
            {players.map((p, i) => (
                <div
                    key={p.id}
                    className={`p-4 border-4 border-black rounded-lg transition-all duration-200 ${i === currentTurnIdx
                            ? 'bg-[#fde047] shadow-[8px_8px_0px_#000] -translate-x-1 -translate-y-1'
                            : 'bg-white shadow-[4px_4px_0px_#000]'
                        }`}
                >
                    <div className="flex justify-between font-bold text-lg">
                        <span>{p.name} {p.isBot && `🤖`}</span>
                        <span>💰 {p.impactPoints}</span>
                    </div>
                    {i === currentTurnIdx && <div className="mt-2 text-sm font-black">👉 Current Turn</div>}
                </div>
            ))}
        </div>
    );
}
