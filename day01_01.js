import { input } from "./day01_01_input.js";
import R from "ramda";

const config = {
  desired: 2020,
};

const createArrayOutOfStringLiteral = (stringLiteral) =>
  stringLiteral.split("\n");

const createNumbersFromStringsInArray = (arrayOfStrings) =>
  arrayOfStrings.map((singleNumberAsString) => Number(singleNumberAsString));

// const findNumbersThatGivesDesiredOutput = (arrayOfNumbers) => {
//   const { desired } = config;

//   for (let i = 0; i < arrayOfNumbers.length; i++) {
//     arrayOfNumbers.reduce((total, acc) => {
//       if (total + acc === desired) {
//         console.log(total * acc);
//       }

//       return total;
//     }, arrayOfNumbers[i]);
//   }
// };

const findNumbersThatGivesDesiredOutput = (arrayOfNumbers) => {
  const { desired } = config;

  for (let i = 0; i < arrayOfNumbers.length; i++) {
    for (let j = 0; j < arrayOfNumbers.length; j++) {
      arrayOfNumbers.reduce((total, acc) => {
        if (total + acc + arrayOfNumbers[i] === desired) {
          console.log(total * acc * arrayOfNumbers[i]);
        }

        return total;
      }, arrayOfNumbers[j]);
    }
  }
};

const solutionFunc = R.pipe(
  createArrayOutOfStringLiteral,
  createNumbersFromStringsInArray,
  findNumbersThatGivesDesiredOutput
);

solutionFunc(input);
