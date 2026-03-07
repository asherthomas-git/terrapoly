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
    "radial-gradient(circle at 35% 35%, #ffffff 0%, #ababab 100%)", // Player 1 — Red
    "radial-gradient(circle at 35% 35%, #C6D63A 0%, #c1cd54 100%)", // Player 2 — Blue
    "radial-gradient(circle at 35% 35%, #D96AA6 0%, #d1639e 100%)", // Player 3 — Green
    "radial-gradient(circle at 35% 35%, #E71C1C 0%, #b33434 100%)", // Player 4 — Yellow
  ]

  const tokenColor = playerColors[playerIndex % playerColors.length]

  return (
    <div
      style={{
        position: "absolute",
        left: centerX,
        top: centerY,
        transform: `translate(-50%, -50%) rotate(${angleMap[direction]}deg)`,
        width: size,
        height: size,
        borderRadius: "50%",
        background: tokenColor,
        boxShadow: "0 6px 12px rgba(0,0,0,0.35), inset -2px -4px 8px rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 200,
        transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)"
      }}
    >
      {/* Left Eye */}
      <div style={{
        position: "absolute",
        top: "18%",
        left: "20%",
        width: "28%",
        height: "28%",
        background: "white",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{ width: "50%", height: "50%", background: "#000", borderRadius: "50%" }} />
      </div>

      {/* Right Eye */}
      <div style={{
        position: "absolute",
        top: "18%",
        right: "20%",
        width: "28%",
        height: "28%",
        background: "white",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{ width: "50%", height: "50%", background: "#000", borderRadius: "50%" }} />
      </div>
    </div>
  )
}