import type { LayoutTile } from "../../game/board/boardLayout";
import type { TileData } from "../../game/data/tiles";

type Props = {
  tile: LayoutTile;
  data: TileData;
  ownerId?: number;
  level?: number;
};

export default function Tile({ tile, data, ownerId }: Props) {
  const isProperty = data.type === "property";
  const isCorner = ["start", "jail", "goToJail", "parking"].includes(data.type || "");
  const isEdgeTile = !isCorner;
  const isSideTile = tile.side === "left" || tile.side === "right";

  let textRotation = "0deg";
  if (tile.side === "left") textRotation = "-90deg";
  if (tile.side === "right") textRotation = "90deg";

  const containerDirection = isSideTile ? "row" : "column";
  const stripOrder = (tile.side === "top" || tile.side === "left") ? 0 : 1;
  const bodyOrder = stripOrder === 0 ? 1 : 0;
  const stripSize = 28;

  const playerColors = ["#ffffff", "#C6D63A", "#D96AA6", "#E71C1C"];
  const borderColor = "#0e1621"; // Define your border color here

  const stripColor =
    ownerId !== undefined
      ? playerColors[ownerId % playerColors.length]
      : (data.cat || "#0f2f1f");

  const getAlignment = () => {
    if (tile.side === "bottom") return { justifyContent: "flex-start" };
    if (tile.side === "top") return { justifyContent: "flex-end" };
    if (tile.side === "left") return { justifyContent: "flex-end" };
    if (tile.side === "right") return { justifyContent: "flex-start" };
    return { justifyContent: "center" };
  };

  return (
    <div
      style={{
        position: "absolute",
        left: tile.x,
        top: tile.y,
        width: tile.width,
        height: tile.height,
        display: "flex",
        flexDirection: containerDirection,
        boxSizing: "border-box",
        overflow: "hidden",
        background: "#1f3b5b",
        color: "white",
        // FIX: Replaced 'border' with 'boxShadow inset' to prevent doubling
        boxShadow: `inset 0 0 0 2px ${borderColor}`,
      }}
    >
      {/* SDG STRIP */}
      {isEdgeTile && isProperty && (
        <div
          style={{
            order: stripOrder,
            width: isSideTile ? stripSize : "100%",
            height: isSideTile ? "100%" : stripSize,
            background: stripColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            // FIX: Using inset shadow for the internal divider too
            boxShadow: `inset 0 0 0 1px ${borderColor}`,
          }}
        >
          {data.sdgno && (
            <div style={{
              transform: isSideTile ? (tile.side === "left" ? "rotate(-90deg)" : "rotate(90deg)") : "none",
              fontSize: 10,
              fontFamily: "ITCKabel",
              color: "black",
              fontWeight: 800,
              border: "1px solid white",
              padding: "1px 6px",
              borderRadius: "10px",
              whiteSpace: "nowrap",
              backgroundColor: "rgba(255,255,255,0.2)"
            }}>
              {data.sdgno}
            </div>
          )}
        </div>
      )}

      {/* MAIN BODY */}
      <div
        style={{
          order: bodyOrder,
          flex: 1,
          display: "flex",
          flexDirection: isSideTile ? "row" : "column",
          alignItems: "center",
          padding: isSideTile ? "0 8px" : "8px 0",
          background: data.catsec || "#1f3b5b",
          // FIX: Inset shadow ensures names don't overlap the tile edges
          boxShadow: `inset 0 0 0 1px ${borderColor}`,
          ...getAlignment(),
        }}
      >
        <div
          style={{
            transform: `rotate(${textRotation})`,
            fontSize: 11,
            fontWeight: 800,
            color: "black",
            fontFamily: "ITCKabel, sans-serif",
            textAlign: "center",
            lineHeight: 1.1,
            width: isSideTile ? tile.height - 10 : "100%",
          }}
        >
          {data.name}
        </div>
      </div>
    </div>
  );
}