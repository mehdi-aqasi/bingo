import { useState, useContext } from "react";
import { getIdsOfBingo } from "./logic/bingoLogic";
import AppContext from "./appContext";

export const BingoCell = (props) => {
  const myContext = useContext(AppContext);
  const { cell, activateCell } = props;

  let [cellClassName, setCellClassName] = useState(
    cell.rowIndex === cell.columnIndex && cell.rowIndex === Math.floor(5 / 2)
      ? "BingoCellBase BingoCellSelected"
      : "BingoCellBase"
  );

  let handleClick = (id) => {
    setCellClassName("BingoCellBase BingoCellSelected");
    myContext(activateCell(id));
  };

  let getRenderClassName = (cell) => {
    let listOfGreen = getIdsOfBingo();
    if (!cell.isSelected) return "BingoCellBase BingoCellIsBingo";
    else if (cell.isSelected && listOfGreen.includes(cell.id))
      return "BingoCellBase BingoCellIsBingo BingoCellIsBingoColor";
    else if (cell.isSelected)
      return "BingoCellBase BingoCellSelected BingoCellIsBingo";
  };
  //   console.log(props.isBingo);
  return (
    <>
      {props.isBingo ? (
        <span className={getRenderClassName(cell)} >{cell.data}</span>
      ) : (
        <span onClick={() => handleClick(cell.id)} className={cellClassName}>
          {cell.data}
        </span>
      )}
    </>
  );
};
