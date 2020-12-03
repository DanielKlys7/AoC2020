import R from "ramda";
import { input } from "./day02.input.js";

const formatData = (inputString) =>
  input.split(/\r?\n/).map((singleRow) => {
    const [
      notFormattedRangeOfOccurance,
      notFormattedLetter,
      password,
    ] = singleRow.split(" ");

    const range = notFormattedRangeOfOccurance
      .split("-")
      .map((numberAsString) => Number(numberAsString));

    const letter = notFormattedLetter.substr(0, 1);

    return {
      range,
      letter,
      password,
    };
  });

const checkOccurance = (word, letter) => {
  const regExp = new RegExp(`[^${letter}]`, "g");

  return word.replace(regExp, "").length;
};

// Solution for first task:
// const isPasswordValid = ({ range: [min, max], letter, password }) => {
//   const timeOfOccurance = checkOccurance(password, letter);

//   return min <= timeOfOccurance && timeOfOccurance <= max;
// };

const isPasswordValid = ({ range: [min, max], letter, password }) => {
  const letters = `${password[min - 1]}${password[max - 1]}`;

  const occurance = checkOccurance(letters, letter);
  return occurance === 1;
};

const filterOutInvalidPasswords = (funcToFilter) => (formattedData) =>
  formattedData.filter((singleRow) => funcToFilter(singleRow));

const finalFunction = R.pipe(
  formatData,
  filterOutInvalidPasswords(isPasswordValid)
);

console.log(finalFunction(input).length);
