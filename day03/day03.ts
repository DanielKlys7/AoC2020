import { pipe } from "ramda";

import { input } from "./day03.input";

const formatData = (input: string) => input.split(/\r?\n/);

const removeEveryNthElement = (nth: number) => (input: string[]) =>
  input.filter((_item, index) => index % nth === 0);

const countTrees = (sizeOfJump: number) => (formattedData: string[]) =>
  formattedData.reduce((total, acc, index) => {
    const accX = acc.repeat(Math.ceil((index * sizeOfJump) / (acc.length - 1)));

    return accX[index * sizeOfJump] === "#" ? total + 1 : total;
  }, 0);

const finalFunction = pipe(formatData, countTrees(1));
const finalFunctionForSkippedRow = pipe(
  formatData,
  removeEveryNthElement(2),
  countTrees(1)
);
