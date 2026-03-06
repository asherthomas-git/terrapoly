import { generateBoardLayout } from "../../game/board/boardLayout"
import { BOARD_SIZE } from "../../game/board/constants"
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
  hasRolled: boolean;
  setHasRolled: (b: boolean) => void;
}

export default function Board({ socket, gameState, hasRolled, setHasRolled }: BoardProps) {
  const layout = generateBoardLayout()

  const myPlayerId = localStorage.getItem("terrapoly_id");
  const currentPlayerInState = gameState.players[gameState.room.currentTurnIdx];
  const amICurrentPlayer = currentPlayerInState?.id === myPlayerId;

  const handleRoll = () => {
    if (hasRolled) return;
    setHasRolled(true);
    socket.emit("roll_dice", { roomCode: gameState.room.roomCode, playerId: myPlayerId });
  }

  return (
    <div
      className="relative mx-auto"
      style={{
        width: BOARD_SIZE,
        height: BOARD_SIZE,
      }}
    >
      {/* 🧩 Tiles */}
      {layout.map(tileLayout => (
        <Tile
          key={tileLayout.index}
          tile={tileLayout}
          data={tiles[tileLayout.index]}
        />
      ))}

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

      {/* 🎲 Dice inside center board */}
      <div className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 z-[100]">
        <Dice onRoll={handleRoll} disabled={!amICurrentPlayer || hasRolled} />
      </div>
    </div>
  )
}
