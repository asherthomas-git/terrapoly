export default function PropertyPanel() {
  return (
    <div style={panelTop}>
      <div style={imageBox} />
      <div style={panelTitle}>SOLAR FARM</div>
      <div style={panelPrice}>$100</div>

      <div style={buttonRow}>
        <button style={miniBtn}>BUY</button>
        <button style={miniBtn}>SKIP</button>
      </div>
    </div>
  )
}

const panelBase: React.CSSProperties = {
  background: "rgba(255,255,255,0.06)",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.08)",
  padding: "20px",
  color: "white",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center"
}

const panelTop: React.CSSProperties = {
  ...panelBase,
  flex: 2,
  margin: "16px",
  gap: "12px"
}

const imageBox: React.CSSProperties = {
  width: "140px",
  height: "80px",
  background: "rgba(255,255,255,0.15)",
  borderRadius: "8px"
}

const panelTitle: React.CSSProperties = {
  fontSize: "20px",
  letterSpacing: "1px",
  textAlign: "center"
}

const panelPrice: React.CSSProperties = {
  fontSize: "18px"
}

const buttonRow: React.CSSProperties = {
  display: "flex",
  gap: "12px"
}

const miniBtn: React.CSSProperties = {
  padding: "6px 16px",
  fontSize: "14px",
  background: "black",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
}