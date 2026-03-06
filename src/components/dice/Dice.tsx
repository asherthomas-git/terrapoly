import { useState } from "react";

type Props = {
  onRoll: (total: number) => void;
  disabled?: boolean; // ✅ NEW
};

export default function Dice({ onRoll, disabled }: Props) {
  const [dice1, setDice1] = useState(1);
  const [dice2, setDice2] = useState(1);
  const [rolling, setRolling] = useState(false);

  const rollDice = () => {
    if (rolling || disabled) return; // ✅ UPDATED

    console.log("🎲 Roll button clicked");
    setRolling(true);

    let rolls = 0;

    const interval = setInterval(() => {
      setDice1(Math.floor(Math.random() * 6) + 1);
      setDice2(Math.floor(Math.random() * 6) + 1);
      rolls++;

      if (rolls > 15) {
        clearInterval(interval);

        const final1 = Math.floor(Math.random() * 6) + 1;
        const final2 = Math.floor(Math.random() * 6) + 1;
        const total = final1 + final2;

        setDice1(final1);
        setDice2(final2);
        setRolling(false);

        console.log(`🎲 Final Dice: ${final1} + ${final2} = ${total}`);

        onRoll(total);
      }
    }, 100);
  };

  const getRotation = (value: number) => {
    const rotations: Record<number, string> = {
      1: "rotateX(0deg) rotateY(0deg)",
      2: "rotateX(-90deg) rotateY(0deg)",
      3: "rotateX(0deg) rotateY(-90deg)",
      4: "rotateX(0deg) rotateY(90deg)",
      5: "rotateX(90deg) rotateY(0deg)",
      6: "rotateX(180deg) rotateY(0deg)",
    };
    return rotations[value] || rotations[1];
  };

  const Face = ({ value, transform }: { value: number; transform: string }) => {
    const dotMap: Record<number, number[]> = {
      1: [4],
      2: [0, 8],
      3: [0, 4, 8],
      4: [0, 2, 6, 8],
      5: [0, 2, 4, 6, 8],
      6: [0, 2, 3, 5, 6, 8],
    };

    return (
      <div style={{ ...faceStyle, transform }}>
        <div style={gridStyle}>
          {[...Array(9)].map((_, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              {dotMap[value].includes(i) && <div style={dotStyle} />}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const Cube = ({ value }: { value: number }) => (
    <div style={sceneStyle}>
      <div style={{ ...cubeStyle, transform: getRotation(value) }}>
        <Face value={1} transform="rotateY(0deg) translateZ(30px)" />
        <Face value={6} transform="rotateX(180deg) translateZ(30px)" />
        <Face value={3} transform="rotateY(90deg) translateZ(30px)" />
        <Face value={4} transform="rotateY(-90deg) translateZ(30px)" />
        <Face value={2} transform="rotateX(90deg) translateZ(30px)" />
        <Face value={5} transform="rotateX(-90deg) translateZ(30px)" />
      </div>
    </div>
  );

  return (
    <div style={{ textAlign: "center", padding: "60px 20px" }}>
      <div style={{ display: "flex", gap: 60, justifyContent: "center" }}>
        <Cube value={dice1} />
        <Cube value={dice2} />
      </div>

      <button
        onClick={rollDice}
        disabled={rolling || disabled} // ✅ UPDATED
        style={{
          ...buttonStyle,
          width: "140px",
          opacity: rolling || disabled ? 0.6 : 1, // ✅ UPDATED
          cursor: rolling || disabled ? "not-allowed" : "pointer"
        }}
      >
        <i className="fa-solid fa-dice" style={{ color: "white" }} />
        {rolling ? " Rolling..." : " Roll Dice"}
      </button>
    </div>
  );
}

// --- Styles ---
// 1. The Scene (The outermost wrapper)
const sceneStyle: React.CSSProperties = {
  width: "60px",
  height: "60px",
  perspective: "600px",
  margin: "0 auto",
};

// 2. The Cube (The rotating logic holder)
const cubeStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  position: "relative",
  transformStyle: "preserve-3d",
  transition: "transform 0.15s ease-out",
  // REMOVE: overflow: hidden (This causes the glitch)
  // REMOVE: background, border, or box-shadow here
};

// 3. The Face (Where all the visuals live)
const faceStyle: React.CSSProperties = {
  position: "absolute",
  width: "60px",
  height: "60px",
  background: "#fdfdfd",
  // Apply the radius ONLY here
  borderRadius: "12px", 
  // Use a shadow instead of a border to avoid "aliasing" lines
  boxShadow: "inset 0 0 0 1px #ddd, inset 0 0 15px rgba(0,0,0,0.1)",
  backfaceVisibility: "hidden", // Crucial for performance and clean edges
  padding: "8px",
  boxSizing: "border-box",
};

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridTemplateRows: "repeat(3, 1fr)",
  width: "100%",
  height: "100%",
};

const dotStyle: React.CSSProperties = {
  width: "8px",
  height: "8px",
  background: "#333",
  borderRadius: "50%",
  boxShadow: "inset 0 1px 1px rgba(0,0,0,0.5)",
};

const buttonStyle: React.CSSProperties = {
  width: "120px",
  marginTop: "30px",
  padding: "8px 24px",
  fontSize: "16px",
  fontWeight: "normal",
  cursor: "pointer",
  backgroundColor: "#6b6299",
  fontFamily: "Nunito",

  color: "white",
//   border: "none",
  borderRadius: "4px",
  transition: "all 0.2s",
  background: "rgba(74, 146, 240, 0.49)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",

  border: "1px solid rgba(35, 90, 178, 0.15)",
  boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
};