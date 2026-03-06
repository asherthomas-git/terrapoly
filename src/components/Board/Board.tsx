import { useState } from "react"
import { generateBoardLayout } from "../../game/board/boardLayout"
import { BOARD_SIZE } from "../../game/board/constants"
import { tiles } from "../../game/data/tiles"
import Tile from "./Tile"
import Dice from "../dice/Dice"
import PlayerToken from "../player/PlayerToken"
import { getDirection } from "../player/getDirection"
import { initialPlayers } from "../../game/player/players"

export default function Board() {
  const layout = generateBoardLayout()

  const [players, setPlayers] = useState(initialPlayers)
  const [currentTurn, setCurrentTurn] = useState(0)

  // 🟢 Turn phase
  const [hasRolled, setHasRolled] = useState(false)
  const [turnActionDone, setTurnActionDone] = useState(false)

  // 💰 Investment Costs
  const SEED_COST = 100
  const FULL_COST = 100
  const FLAGSHIP_COST = 200

  // 🎲 Dice Roll
  const handleRoll = (steps: number) => {
    if (hasRolled) return

    console.log("🎲 rolled:", steps)

    setPlayers(prev =>
      prev.map((p, i) =>
        i === currentTurn
          ? { ...p, position: (p.position + steps) % layout.length }
          : p
      )
    )

    setHasRolled(true)
  }

  // 🎯 Current state
  const currentPlayer = players[currentTurn]
  const currentTileIndex = currentPlayer.position
  const currentTileData = tiles[currentTileIndex]

  const ownedEntry = currentPlayer.ownedTiles.find(
    t => t.tileId === currentTileIndex
  )

  const isProperty = currentTileData?.type === "property"

  // 🧠 Determine upgrade level & cost
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

  // 🏗 Invest / Upgrade
  const handleInvest = () => {
    console.log("🏗 Investing in:", currentTileData.name)

    setPlayers(prev =>
      prev.map((p, i) => {
        if (i !== currentTurn) return p

        const owned = p.ownedTiles.find(t => t.tileId === currentTileIndex)

        // 🟢 First time purchase (Seed)
        if (!owned) {
          return {
            ...p,
            ownedTiles: [
              ...p.ownedTiles,
              { tileId: currentTileIndex, level: 1 }
            ],
            impactPoints: p.impactPoints - SEED_COST
          }
        }

        // ⬆ Upgrade to Full
        if (owned.level === 1) {
          return {
            ...p,
            ownedTiles: p.ownedTiles.map(t =>
              t.tileId === currentTileIndex
                ? { ...t, level: 2 }
                : t
            ),
            impactPoints: p.impactPoints - FULL_COST
          }
        }

        // ⭐ Upgrade to Flagship
        if (owned.level === 2) {
          return {
            ...p,
            ownedTiles: p.ownedTiles.map(t =>
              t.tileId === currentTileIndex
                ? { ...t, level: 3 }
                : t
            ),
            impactPoints: p.impactPoints - FLAGSHIP_COST
          }
        }

        return p
      })
    )

    // 🔒 Lock action for this turn
    setTurnActionDone(true)
  }

  // ⏭ End Turn
  const handleEndTurn = () => {
    console.log("⏭ End Turn")

    setCurrentTurn(prev => (prev + 1) % players.length)
    setHasRolled(false)
    setTurnActionDone(false)
  }

  // 🎨 Same style as Roll button
  const actionButtonStyle: React.CSSProperties = {
    width: "auto",
    padding: "8px 16px",
    fontSize: "16px",
    fontFamily: "Nunito",
    cursor: "pointer",
    color: "white",
    borderRadius: "4px",
    transition: "all 0.2s",
    background: "rgba(74, 146, 240, 0.49)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(35, 90, 178, 0.15)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.4)"
  }

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
      {layout.map(tileLayout => (
        <Tile
          key={tileLayout.index}
          tile={tileLayout}
          data={tiles[tileLayout.index]}
        />
      ))}

      {/* 👥 Players */}
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

      {/* 🎲 Dice */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "40%",
          transform: "translate(-50%, -50%)",
          zIndex: 100
        }}
      >
        <Dice onRoll={handleRoll} disabled={hasRolled} />
      </div>

      {/* 🎮 Action Buttons */}
      {hasRolled && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "55%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "16px",
            zIndex: 120
          }}
        >
          {/* 🌍 Invest / Upgrade */}
          <button
            onClick={handleInvest}
            disabled={!canInvest}
            style={{
              ...actionButtonStyle,
              opacity: canInvest ? 1 : 0.5,
              cursor: canInvest ? "pointer" : "not-allowed",
              fontSize: 12
            }}
          >
            🌍 Invest {investCost}
          </button>

          {/* ⏭ End Turn */}
          <button
            onClick={handleEndTurn}
            style={{
              ...actionButtonStyle,
              fontSize: 12,
              width: 120
            }}
          >
            ⏭ End Turn
          </button>
        </div>
      )}
    </div>
  )
}