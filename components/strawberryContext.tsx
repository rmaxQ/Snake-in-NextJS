"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useGame } from "./gameContext";
import { useSnake } from "./snakeContext";

const StrawberryContext = createContext<{ strawList: Array<string>} | undefined>(undefined);

export function StrawberryProvider({ children }: { children: ReactNode }) {
    const game = useGame();
    const snake = useSnake();
    const arr = [initialSpawn()];
  const [strawList, setStrawList] = useState(arr);
  

  function collide(){
    const index = strawList.indexOf(snake.pathList[0]);
    if(index!=-1){
        game.addPoints(20);
        snake.grow();
        strawList.splice(index, 1);
    }
  }

  function initialSpawn():string{
    let col;
    let row;
    do{
        col = Math.floor(Math.random() * 70);
        row = Math.floor(Math.random() * 50);
    }while(snake.pathList.indexOf(`${col}-${row}`)!=-1)

    return `${col}-${row}`;
  }

  function spawn():string{
    let col;
    let row;
    do{
        col = Math.floor(Math.random() * 70);
        row = Math.floor(Math.random() * 50);
    }while(strawList.indexOf(`${col}-${row}`)!=-1 && snake.pathList.indexOf(`${col}-${row}`)!=-1)

    return `${col}-${row}`;
  }

  useEffect(() => {
    setStrawList([initialSpawn()]);
  }, [game.state]);

  useEffect(() => {
    
    if(game.state==true){
        collide();
        if(game.time%30==1){
            strawList.push(spawn());
        }
    }
  }, [game.time]);

  
  return (
    <StrawberryContext.Provider value={{strawList}}>
      {children}
    </StrawberryContext.Provider>
  );
}

export function useStrawberry() {
  const context = useContext(StrawberryContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}