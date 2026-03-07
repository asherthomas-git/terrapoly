import type { LayoutTile } from "../../game/board/boardLayout"

type Direction = "up" | "down" | "left" | "right"

type Props = {
  tile: LayoutTile
  direction: Direction
  playerIndex?: number
}

export default function PlayerToken({
  tile,
  direction,
  playerIndex = 0
}: Props) {
  const angleMap: Record<Direction, number> = {
    right: 0,
    up: -90,
    left: 180,
    down: 90
  }

  // 🎨 Different colors per player
  const playerColors = [
    "radial-gradient(circle at 35% 35%, #ff5e5e 0%, #e62e2e 100%)", // Player 1 — Red
    "radial-gradient(circle at 35% 35%, #5ea1ff 0%, #2e6fe6 100%)", // Player 2 — Blue
    "radial-gradient(circle at 35% 35%, #5eff9b 0%, #2ee67a 100%)", // Player 3 — Green
    "radial-gradient(circle at 35% 35%, #ffd45e 0%, #e6b82e 100%)", // Player 4 — Yellow
  ]

  const tokenColor = playerColors[playerIndex % playerColors.length]

  // Responsive offsets using cqi-relative values
  const offsetDir = playerIndex % 2 === 0 ? -1 : 1;
  const offsetYDir = playerIndex < 2 ? -1 : 1;

  return (
    <div
      className="rounded-full flex items-center justify-center z-[200]"
      style={{
        gridColumn: tile.gridColumn,
        gridRow: tile.gridRow,
        placeSelf: "center",
        transform: `translate(calc(${offsetDir} * clamp(4px, 1.2cqi, 10px)), calc(${offsetYDir} * clamp(4px, 1.2cqi, 10px))) rotate(${angleMap[direction]}deg)`,
        width: "clamp(14px, 4cqi, 30px)",
        height: "clamp(14px, 4cqi, 30px)",
        background: tokenColor,
        boxShadow: "0 6px 12px rgba(0,0,0,0.35), inset -2px -4px 8px rgba(0,0,0,0.2)",
        transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)"
      }}
    >
      {/* Left Eye */}
      <div className="absolute top-[18%] left-[20%] w-[28%] h-[28%] bg-white rounded-full flex items-center justify-center">
        <div className="w-1/2 h-1/2 bg-black rounded-full" />
      </div>

      {/* Right Eye */}
      <div className="absolute top-[18%] right-[20%] w-[28%] h-[28%] bg-white rounded-full flex items-center justify-center">
        <div className="w-1/2 h-1/2 bg-black rounded-full" />
      </div>
    </div>
  )
}
