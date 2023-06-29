import path from "path";
import { readFilePath, splitFileDataByNewLine } from "../../utils";

const rootFilePath = "../../static/2022/2022-02/";
const filePath: string = path.join(__dirname, `${rootFilePath}input.txt`);

type ResultOptions = "X" | "Y" | "Z";
type EnemyOptions = "A" | "B" | "C";

const calculateScore = (
  scoreA: EnemyOptions,
  scoreB: ResultOptions
): number => {
  const points = {
    WIN: 6,
    TIE: 3,
    LOSS: 0,
  };
  let result = null;
  if (scoreA === "A" && scoreB === "X") {
    result = 3 + points.LOSS;
  } else if (scoreA === "A" && scoreB === "Y") {
    result = 1 + points.TIE;
  } else if (scoreA === "A" && scoreB === "Z") {
    result = 2 + points.WIN;
  } else if (scoreA === "B" && scoreB === "X") {
    result = 1 + points.LOSS;
  } else if (scoreA === "B" && scoreB === "Y") {
    result = 2 + points.TIE;
  } else if (scoreA === "B" && scoreB === "Z") {
    result = 3 + points.WIN;
  } else if (scoreA === "C" && scoreB === "X") {
    result = 2 + points.LOSS;
  } else if (scoreA === "C" && scoreB === "Y") {
    result = 3 + points.TIE;
  } else if (scoreA === "C" && scoreB === "Z") {
    result = 1 + points.WIN;
  } else {
    return 0;
  }

  return result;
};

(async () => {
  const fileData = await readFilePath(filePath);
  const fileDataByLine = splitFileDataByNewLine(fileData);

  let totalPoints = 0;
  fileDataByLine.forEach((round) => {
    const scores = round.split(/ /);
    if (!scores) return;
    if (scores[0] !== "A" && scores[0] !== "B" && scores[0] !== "C") return;
    if (scores[1] !== "X" && scores[1] !== "Y" && scores[1] !== "Z") return;
    totalPoints += calculateScore(scores[0], scores[1]);
  });
  console.log(totalPoints); // part 1 - 13221
})();
