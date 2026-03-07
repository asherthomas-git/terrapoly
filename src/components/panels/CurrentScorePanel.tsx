type OwnedTileView = {
  name: string
  level: number
  earn: number
}

type Props = {
  impactPoints: number
  returnRate: number
  ownedTiles: OwnedTileView[]
}

export default function CurrentScorePanel({
  impactPoints,
  returnRate,
  ownedTiles
}: Props) {
  return (
    <div style={panelHalf}>
      <div style={contentWrap}>
        <div style={panelTitle}>CURRENT SCORE</div>

        {/* Impact Points */}
        <div style={scoreBox}>
          <div style={label}>Impact Points</div>
          <div style={scoreValue}>{impactPoints}</div>
        </div>

        {/* Return Rate */}
        <div style={returnWrap}>
          <div style={returnLabel}>Return Rate</div>
          <div style={returnValue}>+{returnRate} pts / round</div>
        </div>

        {/* Owned Properties */}
        <div style={sectionTitle}>Owned Projects</div>

        <div style={propertyList}>
          {ownedTiles.length === 0 && (
            <div style={empty}>No investments yet</div>
          )}

          {ownedTiles.map((t, i) => (
            <div key={i} style={propertyItem}>
              <div style={propertyName}>{t.name}</div>
              <div style={propertyMeta}>
                Level {t.level} • +{t.earn}/round
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const panelBase: React.CSSProperties = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.08)",
  padding: "20px",
  color: "white",
  display: "flex",
  alignItems: "stretch",
  justifyContent: "stretch"
}

const panelHalf: React.CSSProperties = {
  ...panelBase,
  height: "50%",
  width: "80%"
}

const contentWrap: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 16,
  width: "100%"
}

const panelTitle: React.CSSProperties = {
  fontSize: "20px",
  letterSpacing: "1px"
}

const scoreBox: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 14px",
  background: "rgba(255,255,255,0.05)",
  borderRadius: 8
}

const label: React.CSSProperties = { opacity: 0.8 }
const scoreValue: React.CSSProperties = {
  fontSize: 22,
  fontWeight: 700
}

const returnWrap: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 14px",
  background: "rgba(0,255,170,0.08)",
  borderRadius: 8
}

const returnLabel: React.CSSProperties = { opacity: 0.8 }
const returnValue: React.CSSProperties = {
  fontWeight: 700,
  color: "#00ffaa"
}

const sectionTitle: React.CSSProperties = {
  marginTop: 10,
  fontWeight: 600,
  opacity: 0.85
}

const propertyList: React.CSSProperties = {
  overflowY: "auto",
  maxHeight: 180,
  display: "flex",
  flexDirection: "column",
  gap: 10,
  paddingRight: 6
}

const propertyItem: React.CSSProperties = {
  padding: "10px",
  background: "rgba(255,255,255,0.05)",
  borderRadius: 8
}

const propertyName: React.CSSProperties = {
  fontWeight: 600
}

const propertyMeta: React.CSSProperties = {
  fontSize: 12,
  opacity: 0.7
}

const empty: React.CSSProperties = {
  opacity: 0.5,
//   fontStyle: "italic"
}