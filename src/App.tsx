import Board from "./components/Board/Board"
import { BOARD_SIZE } from "./game/board/constants"

export default function App() {
  return (
    <div style={pageLayout}>
      {/* LEFT PANEL */}
      <div style={sidePanelStyle}>
        {/* Left panel content here */}
      </div>

      {/* GAME BOARD */}
      <Board />

      {/* RIGHT PANEL */}
      <div style={sidePanelStyle}>
        {/* Right panel content here */}
      </div>
    </div>
  )
}

const pageLayout: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  
  alignItems: "center",
  gap: "24px",        // space between panels and board
  padding: "20px"
}

const sidePanelStyle: React.CSSProperties = {
  width: "360px",
  height: BOARD_SIZE,

  /* optional styling */
  background: "rgba(29, 50, 80, 0.8)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(35,90,178,0.15)",
  borderRadius: "12px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.35)"
}