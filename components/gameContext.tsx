"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

const GameContext = createContext<{ points: number; time:number; maxPoints:number, state:boolean; changeState:()=>void; addPoints: (pts:number) => void } | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [points, setPoints] = useState(0);
  const [state, setState] = useState(false);
  const [maxPoints, setMaxPoints] = useState(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  function addPoints(pts:number) {
    setPoints((prev) => (prev+=pts));
  }

  function changeState(){
    setState(!state);
    setPoints(0);
    setTime(0);
    if(maxPoints<points){
        setMaxPoints(points);
    }
  }

  return (
    <GameContext.Provider value={{ points, time, maxPoints, state, changeState, addPoints }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
