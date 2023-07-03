import path from "path";
import { readFilePath, splitFileDataByNewLine } from "../../utils";

const rootFilePath = "../../static/2022/2022-04/";
const filePath: string = path.join(
  __dirname,
  `${rootFilePath}sample-input.txt`
);

const checkPair = (pair1: string, pair2: string): boolean => {
  const [pair1Min, pair1Max] = pair1.split("-");
  const [pair2Min, pair2Max] = pair2.split("-");
  return findOverlapPairs(
    parseInt(pair1Min),
    parseInt(pair1Max),
    parseInt(pair2Min),
    parseInt(pair2Max)
  );
};

const findOverlapPairs = (
  pair1Min: number,
  pair1Max: number,
  pair2Min: number,
  pair2Max: number
): boolean => {
  return (
    (pair2Min >= pair1Min && pair2Min <= pair1Max) ||
    (pair1Min >= pair2Min && pair1Min <= pair2Max)
  );
};

const findPairsWithinPairs = (
  pair1Min: number,
  pair1Max: number,
  pair2Min: number,
  pair2Max: number
): boolean => {
  return (
    (pair2Min >= pair1Min && pair2Max <= pair1Max) ||
    (pair1Min >= pair2Min && pair1Max <= pair2Max)
  );
};

(async () => {
  const fileData = await readFilePath(filePath);
  const fileDataByLine = splitFileDataByNewLine(fileData);
  let matchingPairs = 0;
  fileDataByLine.forEach((pair, count) => {
    if (!pair) return;
    const [pair1, pair2] = pair.split(",");
    if (checkPair(pair1, pair2)) matchingPairs++;
  });
  console.log(matchingPairs); // part 1 550 - part 2 931
})();
