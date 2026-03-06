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
}

export default function Board({ socket, gameState }: BoardProps) {
  const layout = generateBoardLayout()

  const myPlayerId = localStorage.getItem("terrapoly_id");
  const currentPlayerInState = gameState.players[gameState.room.currentTurnIdx];
  const amICurrentPlayer = currentPlayerInState?.id === myPlayerId;
  const currentTileIndex = currentPlayerInState?.position || 0;
  const currentTileData = tiles[currentTileIndex];

  // We are relying on the backend state to know if we've acted. 
  // For UI, we might need a local state just to hide actions after you do one, 
  // or we can determine what buttons show based on the backend state.
  // Actually, once they Invest, Pay, or Pass, the backend might NOT auto end turn 
  // (unless it's built that way). 
  // Let's add local state to manage phase, since the API doesn't expose a "hasRolled" bool directly yet.

  // Wait, if we use local state for hasRolled, we need to reset it when turn changes.
  // Since turn changing is driven by currentTurnIdx, we can track that or just simplify.
  // We'll keep it simple: Show Roll if they haven't rolled. But wait, how do we know they rolled?
  // Let's just always show End Turn if amICurrentPlayer, and show Roll if they are on a tile they didn't just land on? 
  // Actually, standard monopoly: you roll, then you act. 

  const handleRoll = () => {
    socket.emit("roll_dice", { roomCode: gameState.room.roomCode, playerId: myPlayerId });
  }

  const handleInvest = () => {
    socket.emit("invest", { roomCode: gameState.room.roomCode, playerId: myPlayerId, squareIndex: currentTileIndex });
  }

  const handlePayRent = () => {
    socket.emit("pay_donation", { roomCode: gameState.room.roomCode, playerId: myPlayerId, squareIndex: currentTileIndex });
  }

  const handlePass = () => {
    socket.emit("pass_action", { roomCode: gameState.room.roomCode, playerId: myPlayerId, squareIndex: currentTileIndex });
  }

  const handleEndTurn = () => {
    socket.emit("end_turn", { roomCode: gameState.room.roomCode });
  }

  // Determine if tile is owned
  const propertyOwner = gameState.properties.find(p => p.squareIndex === currentTileIndex)?.ownerId;
  const isOwned = !!propertyOwner;
  const isOwnedByMe = propertyOwner === myPlayerId;
  const isProperty = currentTileData?.type === "property";

  const actionButtonBaseClass = "px-4 py-2 text-sm font-bold font-nunito cursor-pointer text-black rounded border-[3px] border-black shadow-[4px_4px_0px_#000] transition-transform duration-100 hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_#000]";

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
        <Dice onRoll={handleRoll} disabled={!amICurrentPlayer} />
      </div>

      {/* 🎮 Action Buttons */}
      {amICurrentPlayer && (
        <div className="absolute left-1/2 top-[55%] -translate-x-1/2 flex gap-4 z-[120] bg-white p-4 border-4 border-black shadow-[8px_8px_0px_#000] rounded-lg">
          {isProperty && !isOwned && (
            <>
              <button className={`${actionButtonBaseClass} bg-[#4ade80]`} onClick={handleInvest}>
                Invest (50 pts)
              </button>
              <button className={`${actionButtonBaseClass} bg-[#ff90e8]`} onClick={handlePass}>
                Pass Target
              </button>
            </>
          )}

          {isProperty && isOwned && !isOwnedByMe && (
            <button className={`${actionButtonBaseClass} bg-[#fb923c]`} onClick={handlePayRent}>
              Pay Donation (15 pts)
            </button>
          )}

          <button className={`${actionButtonBaseClass} bg-[#93c5fd]`} onClick={handleEndTurn}>
            End Turn
          </button>
        </div>
      )}
    </div>
  )
}
