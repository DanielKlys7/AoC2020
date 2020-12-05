import { pipe } from "ramda";

import { input } from "./day05.input";

const formatInput = (input: string) => input.split(/\r?\n/);

const calculateSinglePlace = (maxInitial: number, letterOfLess: string) => (
  rowDirections: string
) => {
  const directions = rowDirections.split("");

  const rowsArray = directions.reduce(
    ([min, max], currentDirection, index, currentArray) => {
      const difference = (max - min + 1) / 2;

      return currentDirection === letterOfLess
        ? [min, max - difference]
        : [min + difference, max];
    },
    [1, maxInitial]
  );

  return rowsArray[0] - 1;
};

const calculateSingleRow = calculateSinglePlace(128, "F");
const calculateSingleSeat = calculateSinglePlace(8, "L");

const calculateSeatsId = (input: string[]) =>
  input.map((singleRow) => {
    const rowDirections = singleRow.substr(0, 7);
    const seatDirections = singleRow.substr(7, 3);

    const row = calculateSingleRow(rowDirections);
    const seat = calculateSingleSeat(seatDirections);

    return row * 8 + seat;
  });

const calculateHighestSeatId = (allSeatsIds: number[]) =>
  Math.max(...allSeatsIds);

const sortByNumber = (allSeatsIds: number[]) =>
  [...allSeatsIds].sort((a, b) => a - b);

const findMissingNumber = (allSeatsSorted: number[]) =>
  allSeatsSorted.reduce(
    (recentNumber, currentNumber, index, array) =>
      currentNumber - array[index - 1] === 2 ? currentNumber - 1 : recentNumber,
    0
  );

const finalFunc = pipe(formatInput, calculateSeatsId, calculateHighestSeatId);
const finalFunc2 = pipe(
  formatInput,
  calculateSeatsId,
  sortByNumber,
  findMissingNumber
);
