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
  const size = 28

  const centerX = tile.x + tile.width / 2
  const centerY = tile.y + tile.height / 2

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

  return (
    <div
      className="absolute rounded-full flex items-center justify-center z-[200]"
      style={{
        left: centerX,
        top: centerY,
        transform: `translate(-50%, -50%) rotate(${angleMap[direction]}deg)`,
        width: size,
        height: size,
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
