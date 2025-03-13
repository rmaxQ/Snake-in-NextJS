"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useGame } from "./gameContext";

const SnakeContext = createContext<{ pathList: Array<string>; move: ()=>void; grow: ()=>void} | undefined>(undefined);

export function SnakeProvider({ children }: { children: ReactNode }) {
    const game = useGame();
    const arr = ["35-25"];
  const [pathList, setPathList] = useState(arr);
  const directionArray = ["r","l","u","d"];
  const randomInt = Math.floor(Math.random() * 4);
  const [direction, setDirection] = useState(randomInt);
  const [pop, setPop] = useState("");

  function collide(){
    if(pathList.indexOf(pathList[0]) !== pathList.lastIndexOf(pathList[0])){
        game.changeState();
    }
  }
  useEffect(() => {
    if(game.state==true){
        move();
    }
  }, [game.time]);

  useEffect(() => {
    console.log("test");
    setPathList(["35-25"]);
  }, [game.state]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowUp") setDirection(2);
      if (event.key === "ArrowDown") setDirection(3);
      if (event.key === "ArrowLeft") setDirection(1);
      if (event.key === "ArrowRight") setDirection(0);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function grow(){
    if(pop){
        pathList.push(pop);
    }
  }

  function move(){
    const pop2 = pathList.pop();
    if(pop2){
        setPop(pop2);
    }
    let col_row = [];
    if(pathList[0]==undefined){
        col_row = pop2.split("-");
    }
    else{
        col_row = pathList[0].split("-");
    }
    if(directionArray[direction]=="r"){
        pathList.unshift(`${(70+Number(col_row[0])+1)%70}-${Number(col_row[1])}`);
    }
    if(directionArray[direction]=="l"){
        pathList.unshift(`${(70+Number(col_row[0])-1)%70}-${Number(col_row[1])}`);
    }
    if(directionArray[direction]=="u"){
        pathList.unshift(`${Number(col_row[0])}-${(50+Number(col_row[1])-1)%50}`);
    }
    if(directionArray[direction]=="d"){
        pathList.unshift(`${Number(col_row[0])}-${(50+Number(col_row[1])+1)%50}`);
    }
    collide();
  }
  
  return (
    <SnakeContext.Provider value={{pathList, move, grow}}>
      {children}
    </SnakeContext.Provider>
  );
}

export function useSnake() {
  const context = useContext(SnakeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}