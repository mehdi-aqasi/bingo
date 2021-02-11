import { listOfSentences } from "./data";


export let listOfMatrixCells = [];
export let listOfSelectedCells = [];
export let ids = [];
export const bound = 5;

export const initializeBingoMatrix = () => {
  if (listOfMatrixCells.length === 25) return listOfMatrixCells;
  for (let i = 0; i < bound; i++) {
    for (let j = 0; j < bound; j++) {
      let cell = null;
      if (i === Math.floor(bound / 2) && i === j) {
        cell = createCell(
          generateId(j),
          i,
          j,
          "CONF CALL BINGO!! 😷💜  ",
          true
        );
      } else {
        cell = createCell(
          generateId(j),
          i,
          j,
          listOfSentences.splice(
            Math.floor(Math.random() * (listOfSentences.length - 1)),
            1
          ),
          false
        );
      }

      listOfMatrixCells.push(cell);
    }
  }

  return listOfMatrixCells;
};


const createCell = (id, rowIndex, columnIndex, data, isSelected) => {
  const cell = {
    id,
    rowIndex,
    columnIndex,
    data,
    isSelected,
  };
  return cell;
};

export const addCell = (cell) => {
  listOfSelectedCells.push(cell);
};


export const findCellByRowAndColumnIndex = (rowIndex, columnIndex) => {
  return (
    isMatrixFull() &&
    listOfMatrixCells.find(
      (cell) => cell.rowIndex === rowIndex && cell.columnIndex === columnIndex
    )
  );
};

export const findCellsByDiagonalLeft = () => {
  return (
    isMatrixFull() &&
    listOfMatrixCells.filter(
      (cell) => cell.rowIndex === cell.columnIndex && cell.isSelected === true
    )
  );
};

export const findCellsByDiagonalRight = () => {
  return (
    isMatrixFull() &&
    listOfMatrixCells.filter(
      (cell) =>
        cell.rowIndex + cell.columnIndex === 4 && cell.isSelected === true
    )
  );
};

export const findCellsByRowIndex = (rowIndex) => {
  return (
    isMatrixFull() &&
    listOfMatrixCells.filter(
      (cell) => cell.rowIndex === rowIndex && cell.isSelected === true
    )
  );
};

export const findCellsByColumnIndex = (columnIndex) => {
  return (
    isMatrixFull() &&
    listOfMatrixCells.filter(
      (cell) => cell.columnIndex === columnIndex && cell.isSelected === true
    )
  );
};

export const isMatrixFull = () => {
  return listOfMatrixCells && listOfMatrixCells.length ? true : false;
};

export const generateId = (columnIndex) => {
  let flagRepetitionId = true;
  let id = null;
  while (flagRepetitionId) {
    switch (columnIndex) {
      case 0:
        id = Math.floor(Math.random() * (16 - 1) + 1);
        break;
      case 1:
        id = Math.floor(Math.random() * (31 - 16) + 16);
        break;
      case 2:
        id = Math.floor(Math.random() * (46 - 31) + 31);
        break;
      case 3:
        id = Math.floor(Math.random() * (61 - 46) + 46);
        break;
      case 4:
        id = Math.floor(Math.random() * (76 - 61) + 61);
        break;

      default:
        break;
    }
    flagRepetitionId = ids.includes(id);
  }
  ids.push(id);
  return id;
};
