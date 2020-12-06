import { includes, pipe } from "ramda";

import { input } from "./day06.input";

const formatData = (input: string) =>
  input.split(/\n\n/).map((i) => i.split(/\n/));

const getEveryLetterOccuring = (every: boolean) => (
  lettersToLookFor: string
) => (input: string[]) => {
  const arrayOfOccuranceInEveryString = lettersToLookFor
    .split("")
    .map((singleLetter) =>
      every
        ? input.every(includes(singleLetter))
        : input.some(includes(singleLetter))
    );

  const arrayOfLettersOccuring = arrayOfOccuranceInEveryString.map((i, index) =>
    i ? lettersToLookFor[index] : undefined
  );

  return arrayOfLettersOccuring.filter((i) => i !== undefined);
};

const calculatePositiveAnswersForEveryGroup = (calcFunction: any) => (
  input: string[][]
) => input.map((i) => calcFunction(i).length);

const calculateEveryPositiveAnswers = (
  positiveAnswersForEveryGroup: number[]
) => positiveAnswersForEveryGroup.reduce((tot, acc) => tot + acc, 0);

const finalFunction = pipe(
  formatData,
  calculatePositiveAnswersForEveryGroup(
    getEveryLetterOccuring(true)("abcdefghijklmnopqrstuvwxyz")
  ),
  calculateEveryPositiveAnswers
);

console.log(finalFunction(input));
