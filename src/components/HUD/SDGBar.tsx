import type { GameState } from "../../hooks/useGameSocket";

type Props = {
    room: GameState["room"];
};

export default function SDGBar({ room }: Props) {
    const bars = [
        { label: "Climate", value: room.sdgClimate, color: "#4ade80" },
        { label: "Education", value: room.sdgEducation, color: "#fde047" },
        { label: "Health", value: room.sdgHealth, color: "#93c5fd" },
        { label: "Energy", value: room.sdgEnergy, color: "#fb923c" },
        { label: "Justice", value: room.sdgJustice, color: "#c084fc" },
    ];

    return (
        <div className="flex justify-between items-end gap-2 mt-4 h-32">
            {bars.map((b) => (
                <div key={b.label} className="flex flex-col items-center h-full w-full justify-end">
                    <div className="text-[10px] font-bold mb-1">{b.value}</div>
                    <div className="w-6 bg-[#eee] border-2 border-black rounded overflow-hidden h-full flex items-end">
                        <div
                            className="w-full border-t-2 border-black transition-[height] duration-300"
                            style={{ height: `${b.value}%`, background: b.color }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
