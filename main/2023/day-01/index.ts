import path from "path";
import { readFilePath, splitFileDataByNewLine } from "../../utils";

const rootFilePath = "../../static/2023/day-01/";
const filePath: string = path.join(__dirname, `${rootFilePath}input.txt`);

const findNumberInString = (str: string): string => {
    const numMatches = str.match(/([0-9])+/g);
    if (!numMatches) throw new Error('findNumberInString() found no matches.');
    if (numMatches.length === 1) return numMatches[0] + numMatches[0];
    return numMatches[0] + numMatches.pop();
};

(async () => {
  const fileData = await readFilePath(filePath);
  const fileDataByLine = splitFileDataByNewLine(fileData);
  let sum = 0;
  fileDataByLine.forEach(str => {
    const strNum = findNumberInString(str);
    console.log(strNum)
    sum += parseInt(strNum);
  });
  console.log('Sum', sum);
})();
