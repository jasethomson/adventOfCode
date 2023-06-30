import path from "path";
import { readFilePath, splitFileDataByNewLine } from "../../utils";

const rootFilePath = "../../static/2022/2022-03/";
const filePath: string = path.join(__dirname, `${rootFilePath}input.txt`);

const createCompartmentMap = (compartment: string[]): Map<string, string> => {
  return new Map(compartment.map((letter) => [letter, letter]));
};

const compareLetters = (
  rucksack: string,
  map1: Map<string, string>,
  map2: Map<string, string>
): null | string => {
  if (!rucksack.length) return null;
  if (map1.get(rucksack[0]) && map2.get(rucksack[0])) return rucksack[0];
  return compareLetters(rucksack.slice(1), map1, map2);
};

const sumLetter = (letter: string): number => {
  const asciiVal = letter.charCodeAt(0);
  return asciiVal < 91 ? asciiVal - 38 : asciiVal - 96;
};

(async () => {
  const fileData = await readFilePath(filePath);
  const fileDataByLine = splitFileDataByNewLine(fileData);
  let totalScore = 0;
  for (let i = 0; i < fileDataByLine.length; i += 3) {
    const rucksack1 = fileDataByLine[i];
    const rucksack2 = fileDataByLine[i + 1];
    const rucksack3 = fileDataByLine[i + 2];
    if (!rucksack1 || !rucksack2 || !rucksack3) return null;
    const compartment2Map = createCompartmentMap(rucksack2.split(""));
    const compartment3Map = createCompartmentMap(rucksack3.split(""));
    const result = compareLetters(rucksack1, compartment2Map, compartment3Map);
    if (!result) return;
    const score = sumLetter(result);
    totalScore += score;
    console.log(totalScore);
  }
  console.log("Total score ", totalScore);
})();
