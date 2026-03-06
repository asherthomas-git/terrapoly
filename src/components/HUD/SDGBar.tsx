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
        <div className="flex flex-col gap-3 mt-6">
            {bars.map((b) => (
                <div key={b.label}>
                    <div className="flex justify-between font-bold mb-1">
                        <span>{b.label}</span>
                        <span>{b.value}/100</span>
                    </div>
                    <div className="w-full h-6 bg-[#eee] border-[3px] border-black rounded overflow-hidden">
                        <div
                            className="h-full border-r-[3px] border-black transition-[width] duration-300"
                            style={{ width: `${b.value}%`, background: b.color }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
