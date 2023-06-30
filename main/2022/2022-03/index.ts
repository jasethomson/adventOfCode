import path from "path";
import { readFilePath, splitFileDataByNewLine } from "../../utils";

const rootFilePath = "../../static/2022/2022-03/";
const filePath: string = path.join(__dirname, `${rootFilePath}input.txt`);

const createCompartmentMap = (compartment: string[]): Map<string, string> => {
  return new Map(compartment.map((letter) => [letter, letter]));
};

const compareLetters = (
  compartment: string,
  map: Map<string, string>
): null | string => {
  if (!compartment.length) return null;
  if (map.get(compartment[0])) return compartment[0];
  return compareLetters(compartment.slice(1), map);
};

const sumLetter = (letter: string): number => {
  const asciiVal = letter.charCodeAt(0);
  return asciiVal < 91 ? asciiVal - 38 : asciiVal - 96;
};

(async () => {
  const fileData = await readFilePath(filePath);
  const fileDataByLine = splitFileDataByNewLine(fileData);
  let totalScore = 0;
  fileDataByLine.forEach((rucksack) => {
    if (!rucksack) return;
    const compartment1 = rucksack.slice(0, rucksack.length / 2);
    const compartment2 = rucksack.slice(rucksack.length / 2, rucksack.length);
    const compartment2Map = createCompartmentMap(compartment2.split(""));
    const result = compareLetters(compartment1, compartment2Map);
    if (!result) return;
    const score = sumLetter(result);
    totalScore += score;
  });
  console.log("Total score", totalScore);
})();
