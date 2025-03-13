"use client";
import { useGame } from "@/components/gameContext";
import { useSnake } from "@/components/snakeContext";
import { useStrawberry } from "@/components/strawberryContext";
import { useEffect } from "react";

function tiles(snake:Array<string>, straw:Array<string>) {
  const totalCells = 70 * 50;
  
  return Array.from({ length: totalCells }).map((_, index) => (
    <div
      key={`${index % 70}-${Math.floor(index / 70)}`}
      className="cell"
      id={`${index % 70}-${Math.floor(index / 70)}`}
      style={{
        width: "15px",
        height: "15px",
        backgroundColor: snake.includes(`${index % 70}-${Math.floor(index / 70)}`) ? "lightgreen" : straw.includes(`${index % 70}-${Math.floor(index / 70)}`)? "red" : "black",
      }}
    ></div>
  ));
}

export default function Home() {
  const game = useGame();
  const snake = useSnake();
  const straw = useStrawberry();
  useEffect(() => {
  }, [snake.pathList]);
  return (
    <div className="bg-[#496A81] h-full w-full p-10 rounded-xl flex justify-center items-center">
      {game.state?
      <div
        className="bg-lightgray p-2 grid gap-[1px]"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(70, 15px)",
          gridTemplateRows: "repeat(50, 15px)",
        }}
      >
        {tiles(snake.pathList, straw.strawList)}
      </div>
      :
      <a className="hover:cursor-pointer bg-[#2B3A67] p-10 flex justify-center items-center rounded-xl text-6xl" onClick={game.changeState}>
        Rozpocznij grę
      </a>
      }
    </div>
  );
}

