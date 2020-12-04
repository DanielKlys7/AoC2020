import { pipe } from "ramda";

import { input } from "./day04.input";

//format

interface Passport {
  [k: number]: string;
}

const formatData = (input: string) =>
  input
    .split(/\n\n/)
    .map((i) =>
      i.split(/\n/).flatMap((i) => i.split(" ").map((i) => i.split(":")))
    );

const makePassportObject = (arrayToFormat: string[][][]) =>
  arrayToFormat.map((i: string[][]) => Object.fromEntries(i));

//filter by required properties

const requiredProperties = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

const filterToRequiredProperties = (requiredProperties: string[]) => (
  arrayOfPassports: Passport[]
) =>
  arrayOfPassports.filter((singlePassport) =>
    requiredProperties.every((singleProperty) =>
      singlePassport.hasOwnProperty(singleProperty)
    )
  );

//validate

interface Validators {
  [k: string]: (i: string) => boolean;
}

const heightValidation = (i: string) => {
  const unit = i.substr(i.length - 2, 2);
  const value = Number(i.length === 4 ? i.substr(0, 2) : i.substr(0, 3));

  return unit === "cm"
    ? 150 <= value && value <= 193
    : "in"
    ? 59 <= value && value <= 76
    : false;
};

const eyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];

const propertiesValidation: Validators = {
  byr: (i: string) => 1920 <= Number(i) && Number(i) <= 2002,
  iyr: (i: string) => 2010 <= Number(i) && Number(i) <= 2020,
  eyr: (i: string) => 2020 <= Number(i) && Number(i) <= 2030,
  hcl: (i: string) => /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(i),
  hgt: heightValidation,
  ecl: (i: string) => eyeColors.includes(i),
  pid: (i: string) => /^\d{9}$/.test(i),
  cid: (i: string) => true,
};

const validateProperties = (validators: Validators) => (
  Passports: Passport[]
) =>
  Passports.filter((singlePassport: Passport) => {
    const arrayOfBooleans = Object.keys(singlePassport).map((singleKey: any) =>
      validators[singleKey](singlePassport[singleKey])
    );

    return !arrayOfBooleans.includes(false);
  });

//compose

const finalFunc = pipe(
  formatData,
  makePassportObject,
  filterToRequiredProperties(requiredProperties),
  validateProperties(propertiesValidation)
);
