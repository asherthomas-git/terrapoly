type Props = {
  name?: string
  desc?: string
  cost?: number
  earn?: number
  sdg?: string
  region?: string
  category?: string
  categoryColor?: string
  icon?: React.ReactNode
}
export default function PropertyPanel({
  name,
  desc,
  cost,
  earn,
  sdg,
  region,
  category,
  categoryColor,
  icon
}: Props) {
  return (
    <div style={{ ...panel, background: categoryColor, border: "1px solid black", width: "80%" }}>
      
      {/* CATEGORY */}
      <div style={categoryPill}>{category}</div>

      {/* ICON SLOT */}
      <div style={iconBox}>
        {icon}
      </div>

      {/* TITLE */}
      <div style={title}>{name}</div>

      {/* DESCRIPTION */}
      <div style={descStyle}>{desc}</div>

      {/* TAGS */}
      <div style={tagRow}>
        <div style={tag}>{sdg}</div>
        <div style={tag}>{region}</div>
      </div>

      {/* COST */}
      <div style={costStyle}>COST: {cost} pts</div>
      <div style={earnStyle}>EARN: {earn} pts / round</div>

      {/* ACTIONS */}
      <div style={actions}>
        <button style={buyBtn}>BUY</button>
        <button style={skipBtn}>SKIP</button>
      </div>
    </div>
  )
}

const panel: React.CSSProperties = {
  height: "50%",
  padding: "24px",
  color: "black",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  gap: "14px",
  fontFamily: "ITCKabel",
}

const categoryPill: React.CSSProperties = {
  background: "#1f2937",
  color: "white",
  padding: "6px 18px",
  borderRadius: "999px",
  fontWeight: 700,
  fontSize: 14,
  letterSpacing: 1
}

const iconBox: React.CSSProperties = {
  width: 120,
  height: 120,
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}

const title: React.CSSProperties = {
  fontSize: 28,
  fontWeight: 800,
  letterSpacing: 2
}

const descStyle: React.CSSProperties = {
  fontSize: 14,
  maxWidth: 260,
  lineHeight: 1.4
}

const tagRow: React.CSSProperties = {
  display: "flex",
  gap: 10
}

const tag: React.CSSProperties = {
  background: "#e5e7eb",
  padding: "6px 14px",
  borderRadius: "999px",
  fontSize: 12,
  fontWeight: 600
}

const costStyle: React.CSSProperties = {
  fontSize: 26,
  fontWeight: 800,
  marginTop: 10
}

const earnStyle: React.CSSProperties = {
  fontSize: 14,
  marginTop: -6
}

const actions: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-around",
//   gap: 12,
  width: "100%",
  marginTop: 12
}

const buyBtn: React.CSSProperties = {
//   flex: 1,
  width: "35%",
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "8px 0",
  fontSize: 22,
  fontWeight: 800,
  cursor: "pointer"
}

const skipBtn: React.CSSProperties = {
//   flex: 1,
  width: "35%",
  background: "#9ca3af",
  color: "white",
  border: "none",
  padding: "8px 0",
  fontSize: 22,
  fontWeight: 800,
  cursor: "pointer",
  
}