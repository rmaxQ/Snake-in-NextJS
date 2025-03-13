"use client";
import { useGame } from "./gameContext";

export default function Sidebar() {
    const game = useGame();
    return (
      <div className="h-full flex flex-col justify-between w-1/3 p-10 rounded-xl bg-[#496A81]">
        <div className="flex flex-col h-full text-6xl w-full text-center justify-start items-center gap-4">
          <div className="w-full text-6xl text-center font-bold p-2 bg-[#2B3A67] rounded-xl">
            Score
          </div>
          <div className="w-full text-6xl text-center font-bold p-2 bg-[#2B3A67] rounded-xl">
            {game.points}
          </div>
        </div>
        <div className="flex flex-col h-full text-6xl w-full text-center justify-start items-center gap-4">
          <div className="w-full text-6xl text-center font-bold p-2 bg-[#2B3A67] rounded-xl">
            Max Score
          </div>
          <div className="w-full text-6xl text-center font-bold p-2 bg-[#2B3A67] rounded-xl">
            {game.maxPoints}
          </div>
        </div>
      </div>
    );
  }