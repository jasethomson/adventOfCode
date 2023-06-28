import path from "path";
import {
  readFilePath,
  splitFileDataByCarriageReturnAndNewLine,
} from "../../utils";

const rootFilePath = "../../static/2022/2022-01/";
const filePath: string = path.join(
  __dirname,
  `${rootFilePath}sample-input.txt`
);

(async () => {
  const fileData = await readFilePath(filePath);
  const fileDataByLine = splitFileDataByCarriageReturnAndNewLine(fileData);
  let position = 1;
  const elves = [{ position, calories: 0 }];
  let topCalorieElf: null | { position: number; calories: number } = null;
  fileDataByLine.forEach((line, count) => {
    const currentElf = elves[elves.length - 1];
    if (!topCalorieElf) topCalorieElf = currentElf;
    if (!line && fileDataByLine[count + 1]) {
      elves.push({ position: ++position, calories: 0 });
    } else if (line) {
      currentElf.calories += parseInt(line);
    }
    if (!line && topCalorieElf?.calories < currentElf.calories) {
      topCalorieElf = currentElf;
    }
  });
  console.log(topCalorieElf); // Part 1 - 71780 calories position 35
})();
