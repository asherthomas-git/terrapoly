import { useState } from "react"
import Board from "./components/Board/Board"
import { BOARD_SIZE } from "./game/board/constants"
import { tiles } from "./game/data/tiles"
import { initialPlayers } from "./game/player/players"

import PropertyPanel from "./components/panels/PropertyPanel"
import LogPanel from "./components/panels/LogPanel"
import GlobalScorePanel from "./components/panels/GlobalScorePanel"
import CurrentScorePanel from "./components/panels/CurrentScorePanel"

export default function App() {
  // 🧠 GAME STATE LIFTED HERE
  const [players, setPlayers] = useState(initialPlayers)
  const [currentTurn, setCurrentTurn] = useState(0)

  const currentPlayer = players[currentTurn]

  // 💰 Earnings per level
  const getEarning = (level: number) => {
    if (level === 1) return 10
    if (level === 2) return 25
    if (level === 3) return 60
    return 0
  }

  // 🏗 Owned properties detailed view
  const ownedTilesDetailed = currentPlayer.ownedTiles.map(t => {
    const tileInfo = tiles[t.tileId]
    return {
      name: tileInfo.name,
      level: t.level,
      earn: getEarning(t.level)
    }
  })

  // 📈 Total return rate
  const returnRate = ownedTilesDetailed.reduce((sum, t) => sum + t.earn, 0)

  return (
    <div style={pageLayout}>
      {/* LEFT PANEL */}
      <div style={sidePanelStyle}>
        <PropertyPanel />
        <LogPanel />
      </div>

      {/* GAME BOARD */}
      <Board
        players={players}
        setPlayers={setPlayers}
        currentTurn={currentTurn}
        setCurrentTurn={setCurrentTurn}
      />

      {/* RIGHT PANEL */}
      <div style={sidePanelStyle}>
        <GlobalScorePanel />

        <CurrentScorePanel
          impactPoints={currentPlayer.impactPoints}
          returnRate={returnRate}
          ownedTiles={ownedTilesDetailed}
        />
      </div>
    </div>
  )
}

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
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(35,90,178,0.15)",
  borderRadius: "12px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.35)"
}