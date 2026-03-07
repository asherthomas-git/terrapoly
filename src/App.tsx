import { useState, useMemo } from "react"
import Board from "./components/Board/Board"
import { BOARD_SIZE } from "./game/board/constants"
import { tiles } from "./game/data/tiles"
import { initialPlayers } from "./game/player/players"

import PropertyPanel from "./components/panels/PropertyPanel"
import LogPanel from "./components/panels/LogPanel"
import GlobalScorePanel from "./components/panels/GlobalScorePanel"
import CurrentScorePanel from "./components/panels/CurrentScorePanel"

export default function App() {
  const [players, setPlayers] = useState(initialPlayers)
  const [currentTurn, setCurrentTurn] = useState(0)

  // 🔌 actions from Board
  const [investAction, setInvestAction] = useState<() => void>(() => {})
  const [canInvest, setCanInvest] = useState(false)
  const [endTurnAction, setEndTurnAction] = useState<() => void>(() => {})

  const currentPlayer = players[currentTurn]
  const currentTile = tiles[currentPlayer.position]

  // 🧠 Ownership lookup
  const ownedEntry = currentPlayer.ownedTiles.find(
    t => t.tileId === currentPlayer.position
  )

  // 💰 Earnings per level (BASE ONLY — donation bonus handled in Board)
  const getBaseEarning = (level: number) => {
    if (level === 1) return 10
    if (level === 2) return 25
    if (level === 3) return 60
    return 0
  }

  const getCost = () => 100

  // 🏗 Owned properties detailed view (includes donation bonus)
  const ownedTilesDetailed = currentPlayer.ownedTiles.map(t => {
    const tileInfo = tiles[t.tileId]
    return {
      name: tileInfo.name,
      level: t.level,
      earn: getBaseEarning(t.level) + (t.bonusReturn ?? 0)
    }
  })

  // 📈 Total return rate
  const returnRate = ownedTilesDetailed.reduce((sum, t) => sum + t.earn, 0)

  const isProperty = currentTile.type === "property"

  // 🌍 GLOBAL CATEGORY DONATION TOTALS
  const categoryScores = useMemo(() => {
    const map: Record<string, number> = {}

    players.forEach(p => {
      p.ownedTiles.forEach(t => {
        const tile = tiles[t.tileId]
        const cat = tile.category ?? "other"
        map[cat] = (map[cat] ?? 0) + (t.bonusReturn ?? 0)
      })
    })

    return Object.entries(map).map(([category, totalDonations]) => ({
      category,
      totalDonations
    }))
  }, [players])

  return (
    <div style={pageLayout}>
      {/* LEFT PANEL */}
      <div style={sidePanelStyle}>
        <PropertyPanel
          name={currentTile.name}
          desc={currentTile.desc}
          cost={isProperty ? getCost() : undefined}
          earn={isProperty ? getBaseEarning(ownedEntry?.level ?? 1) : undefined}
          sdg={currentTile.sdgno}
          region={currentTile.region}
          category={currentTile.category}
          categoryColor={currentTile.catsec}
          icon={
            currentTile.icon && (
              <img
                src={currentTile.icon}
                alt=""
                style={{ width: 80, height: 80, objectFit: "contain" }}
              />
            )
          }
          level={ownedEntry?.level}
          onBuy={investAction}
          onSkip={endTurnAction}
          buyDisabled={!canInvest}
        />

        <LogPanel />
      </div>

      {/* GAME BOARD */}
      <Board
        players={players}
        setPlayers={setPlayers}
        currentTurn={currentTurn}
        setCurrentTurn={setCurrentTurn}
        onInvestReady={(fn, allowed) => {
          setInvestAction(() => fn)
          setCanInvest(allowed)
        }}
        onEndTurnReady={(fn) => setEndTurnAction(() => fn)}
      />

      {/* RIGHT PANEL */}
      <div style={sidePanelStyle}>
        <GlobalScorePanel categoryScores={categoryScores} />

        <CurrentScorePanel
          impactPoints={currentPlayer.impactPoints}
          returnRate={returnRate}
          ownedTiles={ownedTilesDetailed}
        />
      </div>
    </div>
  )
}

/* ================= LAYOUT ================= */

const pageLayout: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  gap: "24px",
  padding: "20px"
}

const sidePanelStyle: React.CSSProperties = {
  width: "354px",
  height: BOARD_SIZE,
  display: "flex",
  flexDirection: "column",
  boxSizing: "border-box",
  padding: 24,
  justifyContent: "space-around",
  alignItems: "center",
  background: "rgba(29, 50, 80, 0.8)",
  backdropFilter: "blur(24px)",
  border: "1px solid rgba(35,90,178,0.15)",
  borderRadius: "12px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.35)"
}