import type { LayoutTile } from "../../game/board/boardLayout";
import type { TileData } from "../../game/data/tiles";

type Props = {
  tile: LayoutTile;
  data: TileData;
};

export default function Tile({ tile, data }: Props) {
  let rotation = "rotate(0deg)";

  if (tile.side === "left") rotation = "rotate(90deg)";
  if (tile.side === "right") rotation = "rotate(-90deg)";

  // position the flag toward the inner edge of the board
  const flagPosition: Record<string, React.CSSProperties> = {
    bottom: { top: -10, left: "50%", transform: "translateX(-50%)" },
    top: { bottom: -10, left: "50%", transform: "translateX(-50%)" },
    left: { right: -10, top: "50%", transform: "translateY(-50%)" },
    right: { left: -10, top: "50%", transform: "translateY(-50%)" },
  };

  // position price tag toward outer edge of board
  const pricePosition: Record<string, React.CSSProperties> = {
    bottom: { bottom: 6, left: "50%", transform: "translateX(-50%)" },
    top: { top: 6, left: "50%", transform: "translateX(-50%)" },
    left: { left: 6, top: "50%", transform: "translateY(-50%) rotate(90deg)" },
    right: { right: 6, top: "50%", transform: "translateY(-50%) rotate(-90deg)" },
  };

  const namePosition: Record<string, React.CSSProperties> = {
    bottom: { justifyContent: "flex-start", paddingTop: 32 },
    top: { justifyContent: "flex-end", paddingBottom: 32 },
    left: { justifyContent: "flex-start", paddingTop: 6 },
    right: { justifyContent: "flex-start", paddingTop: 6 }
  };

  const isProperty = data.type === "property";

  const isSpecial =
    data.type === "chance" ||
    data.type === "treasure" ||
    data.type === "airport" ||
    data.type === "utility" ||
    data.type === "tax";

  const isCorner =
    data.type === "start" ||
    data.type === "jail" ||
    data.type === "goToJail" ||
    data.type === "parking";

  return (
    <div
      style={{
        position: "absolute",
        left: tile.x,
        top: tile.y,
        width: tile.width,
        height: tile.height,
        borderRadius: "12px",

        background: "rgba(48, 86, 136, 0.64)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",

        border: "1px solid rgba(35, 90, 178, 0.15)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",

        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        color: "white",
        overflow: "visible",
      }}
    >
      {/* PROPERTY FLAG ICON */}
      {isProperty && data.icon && (
        <img
          src={data.icon}
          alt=""
          style={{
            position: "absolute",
            width: 24,
            height: 24,
            borderRadius: "50%",
            objectFit: "cover",
            border: "1px solid rgba(255, 255, 255, 0.6)",
            background: "white",
            zIndex: 5,
            ...flagPosition[tile.side],
          }}
        />
      )}

      {/* PRICE TAG */}
      {isProperty && data.price && (
        <div
          style={{
            color: "#00ffaa",
            position: "absolute",
            fontSize: 10,
            fontFamily: "Nunito",
            opacity: 0.85,
            background: "rgba(255,255,255,0.15)",
            padding: "2px 6px",
            borderRadius: 6,
            ...pricePosition[tile.side],
          }}
        >
          ${data.price}
        </div>
      )}

      {/* SPECIAL TILE ICON */}
      {isSpecial && data.icon && (
        <img
          src={data.icon}
          alt=""
          style={{
            width: 28,
            height: 28,
            objectFit: "contain",
          }}
        />
      )}

      {/* CORNER TILE ICON */}
      {isCorner && data.icon && (
        <img
          src={data.icon}
          alt=""
          style={{
            width: 42,
            height: 42,
            objectFit: "contain",
          }}
        />
      )}

      <div
        style={{
          transform: rotation,
          textAlign: "center",
          fontSize: 12,
          fontFamily: "Nunito",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          width:
            tile.side === "left" || tile.side === "right"
              ? tile.height
              : "100%",
          height: "100%",
          padding: "0 4px",
          wordBreak: "normal",
          overflowWrap: "break-word",
          ...namePosition[tile.side],
        }}
      >
        <div>{data.name}</div>
      </div>
    </div>
  );
}