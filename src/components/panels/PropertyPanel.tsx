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

  level?: number          // ⭐ ownership level
  buyDisabled?: boolean   // ⭐ turn lock / insufficient points

  onBuy?: () => void
  onSkip?: () => void
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
  icon,
  level,
  buyDisabled,
  onBuy,
  onSkip
}: Props) {
  const isProperty = !!sdg

  // 🧠 BUTTON LOGIC
  const notOwned = isProperty && !level
  const canUpgrade = isProperty && level && level < 3
  const maxLevel = isProperty && level === 3

  const showLeftButton =
    (notOwned || canUpgrade) && !buyDisabled

  const leftText =
    notOwned ? "BUY" :
    canUpgrade ? "UPGRADE" :
    ""

  const rightText = showLeftButton ? "SKIP" : "NEXT"

  // 🧱 Empty State
  if (!name) {
    return (
      <div style={{ ...panel, width: "80%" }}>
        <div style={title}>No Tile Selected</div>
      </div>
    )
  }

  return (
    <div
      style={{
        ...panel,
        background: categoryColor,
        border: "1px solid black",
        width: "80%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      {/* TOP CONTENT */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "80%",
          justifyContent: "space-around",
          alignItems: "center"
        }}
      >
        {category && <div style={categoryPill}>{category}</div>}
        {icon && <div style={iconBox}>{icon}</div>}
        <div style={title}>{name}</div>
        {desc && <div style={descStyle}>{desc}</div>}

        <div style={tagRow}>
          {sdg && <div style={tag}>{sdg}</div>}
          {region && <div style={tag}>{region}</div>}
        </div>

        {isProperty && (
          <>
            <div style={costStyle}>COST: {cost} pts</div>
            <div style={earnStyle}>EARN: {earn} pts / round</div>
          </>
        )}
      </div>

      {/* ACTION BUTTONS */}
      <div style={actions}>
        {showLeftButton && (
          <button
            style={{
              ...buyBtn,
              opacity: buyDisabled ? 0.5 : 1,
              cursor: buyDisabled ? "not-allowed" : "pointer"
            }}
            onClick={onBuy}
            disabled={buyDisabled}
          >
            {leftText}
          </button>
        )}

        <button style={skipBtn} onClick={onSkip}>
          {rightText}
        </button>
      </div>
    </div>
  )
}

/* ================= STYLES ================= */

const panel: React.CSSProperties = {
  height: "70%",
  padding: "24px",
  color: "black",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  gap: "14px",
  fontFamily: "ITCKabel"
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
  width: "100%",
  marginTop: 12
}

const buyBtn: React.CSSProperties = {
  minWidth: "35%",
  width: "auto",
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "8px 8px",
  fontSize: 22,
  fontWeight: 800
}

const skipBtn: React.CSSProperties = {
  width: "35%",
  background: "#9ca3af",
  color: "white",
  border: "none",
  padding: "8px 0",
  fontSize: 22,
  fontWeight: 800
}