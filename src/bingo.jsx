import {useState} from "react"
import { initializeBingoMatrix } from "./logic/bingoStructure";
import {activateCell} from "./logic/bingoLogic"
import { BingoCell } from "./bingoCell.jsx";

export const Bingo = (props) => {
  let [bingoMatrix, setBingoMatrix] = useState(initializeBingoMatrix);
  
  let header = "BINGO";
  return (
    <>
      {header.split("").map((letter) => (
        <span className="BingoParentHeader" key={letter}>
          {letter}
        </span>
      ))}

      {bingoMatrix &&
        bingoMatrix.map((cell) => {
          return (
            <BingoCell
              cell={cell}
              key={cell.id}
              activateCell={activateCell}
              isBingo={props.isBingo}
            />
          );
        })}
    </>
  );
};
