import Board from "./components/Board/Board"
import { BOARD_SIZE } from "./game/board/constants"



import PropertyPanel from "./components/panels/PropertyPanel"
import LogPanel from "./components/panels/LogPanel"
import GlobalScorePanel from "./components/panels/GlobalScorePanel"
import CurrentScorePanel from "./components/panels/CurrentScorePanel"

export default function App() {
  return (
    <div style={pageLayout}>
      {/* LEFT PANEL */}
      <div style={sidePanelStyle}>
        <PropertyPanel />
        <LogPanel />
      </div>

      {/* GAME BOARD */}
      <Board />

      {/* RIGHT PANEL */}
      <div style={sidePanelStyle}>
        <GlobalScorePanel />
        <CurrentScorePanel />
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

  background: "rgba(29, 50, 80, 0.8)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(35,90,178,0.15)",
  borderRadius: "12px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.35)"
}