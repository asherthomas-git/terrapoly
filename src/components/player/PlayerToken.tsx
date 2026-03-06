import type { LayoutTile } from "../../game/board/boardLayout"

type Direction = "up" | "down" | "left" | "right"

type Props = {
  tile: LayoutTile
  direction: Direction
}

export default function PlayerToken({ tile, direction }: Props) {
  const size = 28

  const centerX = tile.x + tile.width / 2
  const centerY = tile.y + tile.height / 2

  const angleMap: Record<Direction, number> = {
    right: 0,
    up: -90,
    left: 180,
    down: 90
  }

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
            // Radial gradient gives it a 3D "sphere" feel
            background: "radial-gradient(circle at 35% 35%, #ff5e5e 0%, #e62e2e 100%)",
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
            width: "25%",
            height: "25%",
            background: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            {/* Pupil */}
            <div style={{ width: "50%", height: "50%", background: "#1a1a1a", borderRadius: "50%" }} />
        </div>

        {/* Right Eye */}
        <div style={{
            position: "absolute",
            top: "18%",
            right: "20%",
            width: "25%",
            height: "25%",
            background: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            {/* Pupil */}
            <div style={{ width: "50%", height: "50%", background: "#1a1a1a", borderRadius: "50%" }} />
        </div>
    </div>
  )
}