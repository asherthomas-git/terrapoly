import type { LayoutTile } from "../../game/board/boardLayout";
import type { TileData } from "../../game/data/tiles";

type Props = {
  tile: LayoutTile;
  data: TileData;
};

export default function Tile({ tile, data }: Props) {
  let rotationClass = "rotate-0";

  if (tile.side === "left") rotationClass = "rotate-90";
  if (tile.side === "right") rotationClass = "-rotate-90";

  // position the flag toward the inner edge of the board
  const flagPositionClass: Record<string, string> = {
    bottom: "-top-2.5 left-1/2 -translate-x-1/2",
    top: "-bottom-2.5 left-1/2 -translate-x-1/2",
    left: "-right-2.5 top-1/2 -translate-y-1/2",
    right: "-left-2.5 top-1/2 -translate-y-1/2",
  };

  // position price tag toward outer edge of board
  const pricePositionClass: Record<string, string> = {
    bottom: "bottom-1.5 left-1/2 -translate-x-1/2",
    top: "top-1.5 left-1/2 -translate-x-1/2",
    left: "-left-2 top-1/2 -translate-y-1/2 rotate-90",
    right: "-right-2 top-1/2 -translate-y-1/2 -rotate-90",
  };

  const namePositionClass: Record<string, string> = {
    bottom: "justify-start pt-8",
    top: "justify-end pb-8",
    left: "justify-start pt-1.5",
    right: "justify-start pt-1.5"
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

  const getTileColor = (cat?: string) => {
    switch (cat) {
      case "green": return "#4ade80";
      case "yellow": return "#fde047";
      case "blue": return "#60a5fa";
      case "orange": return "#fb923c";
      case "purple": return "#c084fc";
      case "event": return "#ff90e8";
      case "corner": return "#ffffff";
      default: return "#e5e7eb";
    }
  };

  return (
    <div
      className="absolute rounded-lg border-[3px] border-black shadow-[4px_4px_0px_#000] box-border flex items-center justify-center text-black font-bold overflow-visible"
      style={{
        left: tile.x,
        top: tile.y,
        width: tile.width,
        height: tile.height,
        background: getTileColor(data.cat),
      }}
    >
      {/* PROPERTY FLAG ICON */}
      {isProperty && data.icon && (
        <img
          src={data.icon}
          alt=""
          className={`absolute w-6 h-6 rounded-full object-cover border border-white/60 bg-white z-5 ${flagPositionClass[tile.side]}`}
        />
      )}

      {/* PRICE TAG */}
      {isProperty && data.sdgno && (
        <div
          className={`text-black absolute w-9 text-center text-[10px] font-nunito font-bold bg-white/80 border border-black px-1 py-0.5 rounded ${pricePositionClass[tile.side]}`}
        >
          {data.sdgno}
        </div>
      )}

      {/* SPECIAL TILE ICON */}
      {isSpecial && data.icon && (
        <img
          src={data.icon}
          alt=""
          className="w-7 h-7 object-contain"
        />
      )}

      {/* CORNER TILE ICON */}
      {isCorner && data.icon && (
        <img
          src={data.icon}
          alt=""
          className="w-[42px] h-[42px] object-contain"
        />
      )}

      <div
        className={`text-center text-xs font-nunito flex flex-col items-center gap-[3px] px-1 break-normal break-words h-full ${rotationClass} ${namePositionClass[tile.side]}`}
        style={{
          width: tile.side === "left" || tile.side === "right" ? tile.height : "100%",
        }}
      >
        <div>{data.name}</div>
      </div>
    </div>
  );
}