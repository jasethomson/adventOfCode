import path from "path";
import {
  readFilePath,
  splitFileDataByCarriageReturnAndNewLine,
} from "../../utils";

interface Elf {
  position: number;
  calories: number;
}

const rootFilePath = "../../static/2022/2022-01/";
const filePath: string = path.join(__dirname, `${rootFilePath}input.txt`);

const getTopElves = (
  elfToCompare: Elf,
  topElves: Elf[],
  elfsToReturn: number
): Elf[] => {
  return [...topElves, elfToCompare]
    .sort((elf1: Elf, elf2: Elf) => elf2.calories - elf1.calories)
    .slice(0, elfsToReturn);
};

(async () => {
  const fileData = await readFilePath(filePath);
  const fileDataByLine = splitFileDataByCarriageReturnAndNewLine(fileData);
  let position = 1;
  const elves = [{ position, calories: 0 }];
  let topElves: Elf[] = [];

  fileDataByLine.forEach((line, count) => {
    const currentElf = elves[elves.length - 1];
    if (!line && fileDataByLine[count + 1]) {
      elves.push({ position: ++position, calories: 0 });
    } else if (line) {
      currentElf.calories += parseInt(line);
    }
    if (!line) topElves = getTopElves(currentElf, topElves, 3);
  });
  let total = 0;
  topElves.forEach((elf) => (total += elf.calories));
  console.log(topElves, total); // Part 1 - 71780 calories position 35 - Part 2 - 212489 calories
})();
