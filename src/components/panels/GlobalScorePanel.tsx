export default function GlobalScorePanel() {
  return (
    <div style={panelHalf}>
      <div style={panelTitle}>GLOBAL SCORE</div>
    </div>
  )
}

const panelBase: React.CSSProperties = {
  background: "rgba(255,255,255,0.06)",
//   borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.08)",
  padding: "20px",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}

const panelHalf: React.CSSProperties = {
  ...panelBase,
  height: "30%",
  width: "80%"
}

const panelTitle: React.CSSProperties = {
  fontSize: "20px",
  letterSpacing: "1px"
}