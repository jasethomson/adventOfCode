import path from "path";
import { readFilePath, splitFileDataByNewLine } from "../../utils";

const rootFilePath = "../../static/2022/2022-04/";
const filePath: string = path.join(__dirname, `${rootFilePath}input.txt`);

const checkPair = (pair1: string, pair2: string): boolean => {
  const [pair1Min, pair1Max] = pair1.split("-");
  const [pair2Min, pair2Max] = pair2.split("-");
  return (
    (parseInt(pair2Min) >= parseInt(pair1Min) &&
      parseInt(pair2Max) <= parseInt(pair1Max)) ||
    (parseInt(pair1Min) >= parseInt(pair2Min) &&
      parseInt(pair1Max) <= parseInt(pair2Max))
  );
};

(async () => {
  const fileData = await readFilePath(filePath);
  const fileDataByLine = splitFileDataByNewLine(fileData);
  let pairsWithinPairsCount = 0;
  fileDataByLine.forEach((pair, count) => {
    if (!pair) return;
    const [pair1, pair2] = pair.split(",");
    if (checkPair(pair1, pair2)) pairsWithinPairsCount++;
  });
  console.log(pairsWithinPairsCount); // part 1 550
})();
