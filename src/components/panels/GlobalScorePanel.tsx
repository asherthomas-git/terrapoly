type CategoryScore = {
  category: string
  totalDonations: number
}

type Props = {
  categoryScores: CategoryScore[]
}

export default function GlobalScorePanel({ categoryScores }: Props) {
  const worldTotal = categoryScores.reduce(
    (sum, c) => sum + c.totalDonations,
    0
  )

  return (
    <div style={panelHalf}>
      <div style={panelTitle}>GLOBAL SCORE</div>

      <div style={list}>
        {categoryScores.map(c => (
          <div key={c.category} style={row}>
            <span>{c.category}</span>
            <span style={points}>{c.totalDonations}</span>
          </div>
        ))}

        {/* <div style={divider} /> */}

        <div style={{...totalRow, backgroundColor: "purple", padding: "4px 4px", borderRadius: "12px", textAlign: "center"}}>
          <span >WORLD SCORE</span>
          <span style={worldPoints}>{worldTotal}</span>
        </div>
      </div>
    </div>
  )
}

/* ================= STYLES ================= */

const panelBase: React.CSSProperties = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.08)",
  padding: "20px",
  color: "white",
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
}

const panelHalf: React.CSSProperties = {
  ...panelBase,
  height: "30%",
  width: "80%"
}

const panelTitle: React.CSSProperties = {
  fontSize: "20px",
  letterSpacing: "1px",
  marginBottom: "16px"
}

const list: React.CSSProperties = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "10px"
}

const row: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "14px",
  opacity: 0.9
}

const points: React.CSSProperties = {
  fontWeight: 700
}

const divider: React.CSSProperties = {
  height: "1px",
  background: "rgba(255,255,255,0.15)",
  margin: "6px 0"
}

const totalRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "16px",
  fontWeight: 800
}

const worldPoints: React.CSSProperties = {
  color: "#34d399"
}