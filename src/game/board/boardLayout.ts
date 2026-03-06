import {
  SIDE_THICKNESS,
  SIDE_LENGTH,
  CORNER_SIZE,
  TOTAL_TILES,
  BOARD_SIZE
} from "./constants";

export type LayoutTile = {
  index: number;
  x: number;
  y: number;
  width: number;
  height: number;
  side: "top" | "bottom" | "left" | "right";
};

export function generateBoardLayout(): LayoutTile[] {

  const layout: LayoutTile[] = [];

  for (let i = 0; i < TOTAL_TILES; i++) {

    let x = 0;
    let y = 0;
    let width = 0;
    let height = 0;
    let side: "top" | "bottom" | "left" | "right" = "bottom";

    // ---------- CORNERS ----------

    if (i === 0) {
      layout.push({
        index: i,
        x: BOARD_SIZE - CORNER_SIZE,
        y: BOARD_SIZE - CORNER_SIZE,
        width: CORNER_SIZE,
        height: CORNER_SIZE,
        side: "bottom"
      });
      continue;
    }

    if (i === 10) {
      layout.push({
        index: i,
        x: 0,
        y: BOARD_SIZE - CORNER_SIZE,
        width: CORNER_SIZE,
        height: CORNER_SIZE,
        side: "bottom"
      });
      continue;
    }

    if (i === 20) {
      layout.push({
        index: i,
        x: 0,
        y: 0,
        width: CORNER_SIZE,
        height: CORNER_SIZE,
        side: "top"
      });
      continue;
    }

    if (i === 30) {
      layout.push({
        index: i,
        x: BOARD_SIZE - CORNER_SIZE,
        y: 0,
        width: CORNER_SIZE,
        height: CORNER_SIZE,
        side: "top"
      });
      continue;
    }

    // ---------- BOTTOM (1–9) ----------

    if (i > 0 && i < 10) {

      side = "bottom";

      width = SIDE_THICKNESS;
      height = SIDE_LENGTH;

      x =
        BOARD_SIZE -
        CORNER_SIZE -
        SIDE_THICKNESS * (i);

      y = BOARD_SIZE - SIDE_LENGTH;
    }

    // ---------- LEFT (11–19) ----------

    else if (i > 10 && i < 20) {

      side = "left";

      width = SIDE_LENGTH;
      height = SIDE_THICKNESS;

      x = 0;

      y =
        BOARD_SIZE -
        CORNER_SIZE -
        SIDE_THICKNESS * (i - 10);
    }

    // ---------- TOP (21–29) ----------

    else if (i > 20 && i < 30) {

      side = "top";

      width = SIDE_THICKNESS;
      height = SIDE_LENGTH;

      x =
        CORNER_SIZE +
        SIDE_THICKNESS * (i - 21);

      y = 0;
    }

    // ---------- RIGHT (31–39) ----------

    else {

      side = "right";

      width = SIDE_LENGTH;
      height = SIDE_THICKNESS;

      x = BOARD_SIZE - SIDE_LENGTH;

      y =
        CORNER_SIZE +
        SIDE_THICKNESS * (i - 31);
    }

    layout.push({
      index: i,
      x,
      y,
      width,
      height,
      side
    });
  }

  return layout;
}