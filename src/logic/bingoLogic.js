import {
  listOfMatrixCells,
  listOfSelectedCells,
  bound,
  addCell,
  isMatrixFull,
  findCellsByDiagonalLeft,
  findCellsByDiagonalRight,
  findCellsByRowIndex,
  findCellsByColumnIndex,
} from "./bingoStructure";

let howBingo = ""; // DiagonalLeft,DiagonalRight,Row,Column,

const isCellInDiagonal = (rowIndex, columnIndex) => {
  return rowIndex === columnIndex || rowIndex + columnIndex === bound - 1;
};

const permitCheck = (rowIndex, columnIndex) => {
  return rowIndex === 2 && columnIndex === 2
    ? false
    : listOfSelectedCells.length < bound - 1
    ? false
    : true;
};

const checkDiagonalLeftIsCompleted = () => {
  let result = isMatrixFull() && findCellsByDiagonalLeft().length === 5;
  howBingo = result ? "DiagonalLeft" : "";
  return result;
};

const checkDiagonalRightIsCompleted = () => {
  let result = isMatrixFull() && findCellsByDiagonalRight().length === 5;
  howBingo = result ? "DiagonalRight" : "";
  return result;
};

const checkRowIsCompleted = (rowIndex) => {
  let result = findCellsByRowIndex(rowIndex).length === 5;
  howBingo = result ? "Row" : "";
  return result;
};

const checkColumnIsCompleted = (columnIndex) => {
  let result = findCellsByColumnIndex(columnIndex).length === 5;
  howBingo = result ? "Column" : "";
  return result;
};

const checkIsBingo = (cell) => {
  if (permitCheck(cell.rowIndex, cell.columnIndex)) {
    if (
      (isCellInDiagonal(cell.rowIndex, cell.columnIndex) &&
        (checkDiagonalLeftIsCompleted() || checkDiagonalRightIsCompleted())) ||
      checkRowIsCompleted(cell.rowIndex) ||
      checkColumnIsCompleted(cell.columnIndex)
    )
      return true;
    return false;
  }
  return false;
};

export const activateCell = (id) => {
  let cell = findCellById(id);
  cell.isSelected = true;
  addCell(cell);
  return checkIsBingo(cell);
};

const findCellById = (id) => {
  return isMatrixFull() && listOfMatrixCells.find((cell) => cell.id === id);
};


export const getIdsOfBingo = () => {
  switch (howBingo) {
    case "":
      return [];
    case "DiagonalRight":
      return findCellsByDiagonalRight().map((item) => item.id);
    case "DiagonalLeft":
      return findCellsByDiagonalLeft().map((cell) => cell.id);
    case "Row":
      return findCellsByRowIndex(
        listOfSelectedCells[listOfSelectedCells.length - 1].rowIndex
      ).map((cell) => cell.id);
    case "Column":
      return findCellsByColumnIndex(
        listOfSelectedCells[listOfSelectedCells.length - 1].columnIndex
      ).map((cell) => cell.id);
    default:
      return [];
  }
};
