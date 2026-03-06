import Board from "./components/Board/Board"
import { BOARD_SIZE } from "./game/board/constants"
import { useGameSocket } from "./hooks/useGameSocket"
import Lobby from "./components/Lobby/Lobby"
import SDGBar from "./components/HUD/SDGBar"
import Leaderboard from "./components/HUD/Leaderboard"
import { ToastContainer } from "react-toastify"

export default function App() {
  const { socket, gameState } = useGameSocket()

  if (!gameState || gameState.room.status === "WAITING") {
    return (
      <>
        <ToastContainer position="top-right" />
        <Lobby socket={socket} gameState={gameState} />
      </>
    )
  }

  return (
    <>
      <ToastContainer position="top-right" />
      <div className="flex justify-center items-center gap-6 p-5 h-full box-border">
        {/* LEFT PANEL: SDG Bars */}
        <div
          className="w-[360px] bg-[#fdfbf7] border-4 border-black shadow-[8px_8px_0px_#000] rounded-lg p-5 text-black font-nunito"
          style={{ height: BOARD_SIZE }}
        >
          <h2 className="text-2xl font-bold mb-4">🌍 SDGs</h2>
          <p className="font-bold mb-4">Current Round: {gameState.room.currentRound} / 15</p>
          <SDGBar room={gameState.room} />
        </div>

        {/* GAME BOARD */}
        <Board socket={socket} gameState={gameState} />

        {/* RIGHT PANEL: Leaderboard */}
        <div
          className="w-[360px] bg-[#fdfbf7] border-4 border-black shadow-[8px_8px_0px_#000] rounded-lg p-5 text-black font-nunito"
          style={{ height: BOARD_SIZE }}
        >
          <h2 className="text-2xl font-bold mb-4">🏆 Leaderboard</h2>
          <Leaderboard players={gameState.players} currentTurnIdx={gameState.room.currentTurnIdx} />
        </div>
      </div>
    </>
  )
}
