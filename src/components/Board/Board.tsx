import { useEffect, useState } from "react"
import { generateBoardLayout } from "../../game/board/boardLayout"
import { BOARD_SIZE } from "../../game/board/constants"
import { tiles } from "../../game/data/tiles"
import Tile from "./Tile"
import Dice from "../dice/Dice"
import PlayerToken from "../player/PlayerToken"
import { getDirection } from "../player/getDirection"

type Props = {
  players: any[]
  setPlayers: React.Dispatch<React.SetStateAction<any[]>>
  currentTurn: number
  setCurrentTurn: React.Dispatch<React.SetStateAction<number>>
  onInvestReady: (fn: () => void, allowed: boolean) => void
  onEndTurnReady: (fn: () => void) => void
}

export default function Board({
  players,
  setPlayers,
  currentTurn,
  setCurrentTurn,
  onInvestReady,
  onEndTurnReady
}: Props) {
  const layout = generateBoardLayout()

  const [hasRolled, setHasRolled] = useState(false)
  const [turnActionDone, setTurnActionDone] = useState(false)
  const [movedThisTurn, setMovedThisTurn] = useState(false)

  const SEED_COST = 100
  const FULL_COST = 100
  const FLAGSHIP_COST = 200
  const DONATION = 5

  const currentPlayer = players[currentTurn]
  const currentTileIndex = currentPlayer.position
  const currentTileData = tiles[currentTileIndex]

  const ownedEntry = currentPlayer.ownedTiles.find(
    (t: any) => t.tileId === currentTileIndex
  )

  const isProperty = currentTileData?.type === "property"

  // =========================
  // 💰 Return rate helpers
  // =========================
  const getBaseEarning = (level: number) => {
    if (level === 1) return 10
    if (level === 2) return 25
    if (level === 3) return 60
    return 0
  }

  const getPlayerReturnRate = (player: any) => {
    return player.ownedTiles.reduce((sum: number, t: any) => {
      return sum + getBaseEarning(t.level) + (t.bonusReturn ?? 0)
    }, 0)
  }

  // =========================
  // 🎲 Dice Roll
  // =========================
  const handleRoll = (steps: number) => {
    if (hasRolled) return

    setPlayers(prev =>
      prev.map((p, i) => {
        if (i !== currentTurn) return p

        const oldPos = p.position
        const newPos = (p.position + steps) % layout.length

        // ✅ START PASS: returns only
        const passedStart = newPos < oldPos
        const lapBonus = passedStart ? getPlayerReturnRate(p) : 0

        return {
          ...p,
          position: newPos,
          impactPoints: p.impactPoints + lapBonus
        }
      })
    )

    setHasRolled(true)
    setMovedThisTurn(true)
  }

  // =========================
  // 🤝 Donation System
  // =========================
  useEffect(() => {
    if (!movedThisTurn) return
    if (!isProperty) return

    const ownerIndex = players.findIndex(p =>
      p.ownedTiles.some((t: any) => t.tileId === currentTileIndex)
    )

    if (ownerIndex === -1) return
    if (ownerIndex === currentTurn) return

    setPlayers(prev =>
      prev.map((p, i) => {
        if (i === currentTurn) {
          return { ...p, impactPoints: p.impactPoints - DONATION }
        }

        if (i === ownerIndex) {
          return {
            ...p,
            ownedTiles: p.ownedTiles.map((t: any) =>
              t.tileId === currentTileIndex
                ? { ...t, bonusReturn: (t.bonusReturn ?? 0) + DONATION }
                : t
            )
          }
        }

        return p
      })
    )
  }, [movedThisTurn, currentTileIndex])

  // =========================
  // 🧠 Invest Logic
  // =========================
  let investCost = 0
  let canInvest = false

  const someoneOwnsTile = players.some(p =>
    p.ownedTiles.some((t: any) => t.tileId === currentTileIndex)
  )

  if (!turnActionDone && isProperty && movedThisTurn) {
    if (!ownedEntry && !someoneOwnsTile) {
      investCost = SEED_COST
      canInvest = currentPlayer.impactPoints >= investCost
    } else if (ownedEntry?.level === 1) {
      investCost = FULL_COST
      canInvest = currentPlayer.impactPoints >= investCost
    } else if (ownedEntry?.level === 2) {
      investCost = FLAGSHIP_COST
      canInvest = currentPlayer.impactPoints >= investCost
    }
  }

  const handleInvest = () => {
    if (!canInvest) return

    setPlayers(prev =>
      prev.map((p, i) => {
        if (i !== currentTurn) return p

        const owned = p.ownedTiles.find((t: any) => t.tileId === currentTileIndex)

        if (!owned) {
          return {
            ...p,
            ownedTiles: [
              ...p.ownedTiles,
              { tileId: currentTileIndex, level: 1, bonusReturn: 0 }
            ],
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

  // =========================
  // ⏭ End Turn
  // =========================
  const handleEndTurn = () => {
    setCurrentTurn(prev => (prev + 1) % players.length)
    setHasRolled(false)
    setTurnActionDone(false)
    setMovedThisTurn(false)
  }

  // =========================
  // 🔌 Expose actions
  // =========================
  useEffect(() => {
    onInvestReady(handleInvest, canInvest)
  }, [canInvest, currentTurn, movedThisTurn])

  useEffect(() => {
    onEndTurnReady(handleEndTurn)
  }, [currentTurn])

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

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "40%",
          transform: "translate(-50%, -50%)"
        }}
      >
        <Dice onRoll={handleRoll} disabled={hasRolled} />
      </div>
    </div>
  )
}