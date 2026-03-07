import { generateBoardLayout } from "../../game/board/boardLayout"
import { tiles } from "../../game/data/tiles"
import Tile from "./Tile"
import Dice from "../dice/Dice"
import PlayerToken from "../player/PlayerToken"
import { getDirection } from "../player/getDirection"
import type { GameState } from "../../hooks/useGameSocket"
import { Socket } from "socket.io-client"

type BoardProps = {
  socket: Socket;
  gameState: GameState;
}

export default function Board({ socket, gameState }: BoardProps) {
  const layout = generateBoardLayout()

  const myPlayerId = localStorage.getItem("terrapoly_id");
  const currentPlayerInState = gameState.players[gameState.room.currentTurnIdx];
  const amICurrentPlayer = currentPlayerInState?.id === myPlayerId;
  const canRoll = amICurrentPlayer && gameState.turnPhase === 'WAITING_FOR_ROLL';

  const handleRoll = () => {
    if (!canRoll) return;
    socket.emit("roll_dice", { roomCode: gameState.room.roomCode, playerId: myPlayerId });
  }

  return (
    <div className="w-full h-full flex justify-center items-center pointer-events-auto" style={{ containerType: "inline-size" }}>
      <div
        className="relative grid bg-[#0e1621] outline outline-2 outline-[#0e1621] aspect-square"
        style={{
          gridTemplateColumns: "1.6fr repeat(9, 1fr) 1.6fr",
          gridTemplateRows: "1.6fr repeat(9, 1fr) 1.6fr",
          gap: "2px",
          width: "min(100%, 100%)",
          maxWidth: "100%",
          maxHeight: "100%",
        }}
      >
        {/* 🧩 Tiles */}
        {layout.map(tileLayout => {
          const data = tiles[tileLayout.index]
          const property = gameState.properties?.find(p => p.squareIndex === tileLayout.index)
          let ownerColor: string | undefined

          if (property && property.ownerId) {
            const ownerIndex = gameState.players.findIndex(p => p.id === property.ownerId)
            if (ownerIndex !== -1) {
              const baseColors = ["#ff5e5e", "#5ea1ff", "#5eff9b", "#ffd45e"]
              ownerColor = baseColors[ownerIndex % baseColors.length]
            }
          }

          return (
            <Tile
              key={tileLayout.index}
              tile={tileLayout}
              data={data}
              ownerColor={ownerColor}
            />
          )
        })}

        {/* 👥 Players */}
        {gameState.players.map((player, i) => {
          const tile = layout[player.position] || layout[0]
          const direction = getDirection(tile)

          return (
            <PlayerToken
              key={player.id}
              tile={tile}
              direction={direction}
              playerIndex={i}
            />
          )
        })}

        {/* Center Area background (to cover holes in the grid) */}
        <div
          className="bg-[#2B405A] pointer-events-none"
          style={{ gridColumn: "2 / 11", gridRow: "2 / 11" }}
        />

        {/* 🎲 Dice inside center board */}
        <div
          className="z-[100] flex justify-center items-center"
          style={{ gridColumn: "4 / 9", gridRow: "4 / 9" }}
        >
          <Dice onRoll={handleRoll} disabled={!canRoll} />
        </div>
      </div>
    </div>
  )
}
