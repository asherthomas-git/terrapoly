import { useState } from "react"
import { generateBoardLayout } from "../../game/board/boardLayout"
import { BOARD_SIZE } from "../../game/board/constants"
import { tiles } from "../../game/data/tiles"
import Tile from "./Tile"
import Dice from "../dice/Dice"
import PlayerToken from "../player/PlayerToken"
import { getDirection } from "../player/getDirection"

export default function Board() {
  const layout = generateBoardLayout()

  // 🎮 Player position (tile index)
  const [playerIndex, setPlayerIndex] = useState(0)

  // 🎲 Dice roll handler
  const handleRoll = (steps: number) => {
    console.log("🎲 rolled:", steps)
    setPlayerIndex(prev => (prev + steps) % layout.length)
  }

  const currentTile = layout[playerIndex]
  const direction = getDirection(currentTile)

  return (
    <div
      style={{
        position: "relative",
        width: BOARD_SIZE,
        height: BOARD_SIZE,
        margin: "40px auto"
      }}
    >
      {/* 🧩 Tiles */}
      {layout.map((tileLayout) => {
        const tileData = tiles[tileLayout.index]

        return (
          <Tile
            key={tileLayout.index}
            tile={tileLayout}
            data={tileData}
          />
        )
      })}

      {/* 🔴 Player */}
      <PlayerToken
        tile={currentTile}
        direction={direction}
      />

      {/* 🎲 Center Dice */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "40%",
          transform: "translate(-50%, -50%)",
          zIndex: 100
        }}
      >
        <Dice onRoll={handleRoll} />
      </div>
    </div>
  )
}