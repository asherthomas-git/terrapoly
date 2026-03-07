import { generateBoardLayout } from "../../game/board/boardLayout"
import { BOARD_SIZE } from "../../game/board/constants"
import { tiles } from "../../game/data/tiles"
import Tile from "./Tile"
import Dice from "../dice/Dice"
import PlayerToken from "../player/PlayerToken"
import { getDirection } from "../player/getDirection"
import { useState } from "react"

type Props = {
  players: any[]
  setPlayers: React.Dispatch<React.SetStateAction<any[]>>
  currentTurn: number
  setCurrentTurn: React.Dispatch<React.SetStateAction<number>>
}

export default function Board({
  players,
  setPlayers,
  currentTurn,
  setCurrentTurn
}: Props) {
  const layout = generateBoardLayout()

  const [hasRolled, setHasRolled] = useState(false)
  const [turnActionDone, setTurnActionDone] = useState(false)

  const SEED_COST = 100
  const FULL_COST = 100
  const FLAGSHIP_COST = 200

  const handleRoll = (steps: number) => {
    if (hasRolled) return

    setPlayers(prev =>
      prev.map((p, i) =>
        i === currentTurn
          ? { ...p, position: (p.position + steps) % layout.length }
          : p
      )
    )

    setHasRolled(true)
  }

  const currentPlayer = players[currentTurn]
  const currentTileIndex = currentPlayer.position
  const currentTileData = tiles[currentTileIndex]

  const ownedEntry = currentPlayer.ownedTiles.find(
    (t: any) => t.tileId === currentTileIndex
  )

  const isProperty = currentTileData?.type === "property"

  let investCost = 0
  let canInvest = false

  if (!turnActionDone && isProperty) {
    if (!ownedEntry) {
      investCost = SEED_COST
      canInvest = currentPlayer.impactPoints >= investCost
    } else if (ownedEntry.level === 1) {
      investCost = FULL_COST
      canInvest = currentPlayer.impactPoints >= investCost
    } else if (ownedEntry.level === 2) {
      investCost = FLAGSHIP_COST
      canInvest = currentPlayer.impactPoints >= investCost
    }
  }

  const handleInvest = () => {
    setPlayers(prev =>
      prev.map((p, i) => {
        if (i !== currentTurn) return p

        const owned = p.ownedTiles.find((t: any) => t.tileId === currentTileIndex)

        if (!owned) {
          return {
            ...p,
            ownedTiles: [...p.ownedTiles, { tileId: currentTileIndex, level: 1 }],
            impactPoints: p.impactPoints - SEED_COST
          }
        }

        if (owned.level === 1) {
          return {
            ...p,
            ownedTiles: p.ownedTiles.map((t: any) =>
              t.tileId === currentTileIndex ? { ...t, level: 2 } : t
            ),
            impactPoints: p.impactPoints - FULL_COST
          }
        }

        if (owned.level === 2) {
          return {
            ...p,
            ownedTiles: p.ownedTiles.map((t: any) =>
              t.tileId === currentTileIndex ? { ...t, level: 3 } : t
            ),
            impactPoints: p.impactPoints - FLAGSHIP_COST
          }
        }

        return p
      })
    )

    setTurnActionDone(true)
  }

  const handleEndTurn = () => {
    setCurrentTurn(prev => (prev + 1) % players.length)
    setHasRolled(false)
    setTurnActionDone(false)
  }

  // 🎨 Same style as Roll Dice button
  const rollButtonStyle: React.CSSProperties = {
    width: "120px",
    padding: "8px 16px",
    fontSize: "16px",
    fontWeight: "normal",
    cursor: "pointer",
    fontFamily: "Nunito",
    color: "white",
    borderRadius: "4px",
    transition: "all 0.2s",
    background: "rgb(124, 58, 218)",
    // backdropFilter: "blur(12px)",
    // WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(35, 90, 178, 0.15)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.4)"
  }

  return (
    <div style={{ position: "relative", width: BOARD_SIZE, height: BOARD_SIZE }}>
      {layout.map(tileLayout => {
        const owner = players.find(p =>
          p.ownedTiles.some((t: any) => t.tileId === tileLayout.index)
        )

        const ownedEntry = owner?.ownedTiles.find(
          (t: any) => t.tileId === tileLayout.index
        )

        return (
          <Tile
            key={tileLayout.index}
            tile={tileLayout}
            data={tiles[tileLayout.index]}
            ownerId={owner?.id}
            level={ownedEntry?.level}
          />
        )
      })}

      {players.map((player, i) => {
        const tile = layout[player.position]
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

      <div style={{
        position: "absolute",
        left: "50%",
        top: "40%",
        transform: "translate(-50%, -50%)"
      }}>
        <Dice onRoll={handleRoll} disabled={hasRolled} />
      </div>

      {hasRolled && (
        <div style={{
          position: "absolute",
          left: "50%",
          top: "55%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "16px"
        }}>
          <button
            onClick={handleInvest}
            disabled={!canInvest}
            style={{
              ...rollButtonStyle,
              opacity: canInvest ? 1 : 0.5,
              cursor: canInvest ? "pointer" : "not-allowed"
            }}
          >
            <i
              className="fa-solid fa-hand-holding-dollar"
              style={{ color: "rgb(255, 255, 255)", marginRight: "4px" }}
            /> Invest 
          </button>

          <button
            onClick={handleEndTurn}
            style={rollButtonStyle}
          >
            ⏭ End Turn
          </button>
        </div>
      )}
    </div>
  )
}