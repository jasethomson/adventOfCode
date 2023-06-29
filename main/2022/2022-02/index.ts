import { LookupAddress } from "dns";
import path from "path";
import {
  readFilePath,
  splitFileDataByCarriageReturnAndNewLine,
} from "../../utils";

const rootFilePath = "../../static/2022/2022-02/";
const filePath: string = path.join(__dirname, `${rootFilePath}input.txt`);

type PointsOptions = "X" | "Y" | "Z";
type EnemyOptions = "A" | "B" | "C";
interface Points {
  X: number;
  Y: number;
  Z: number;
  WIN: number;
  TIE: number;
  LOSS: number;
}

const calculateScore = (
  scoreA: EnemyOptions,
  scoreB: PointsOptions
): number => {
  const points = {
    X: 1,
    Y: 2,
    Z: 3,
    WIN: 6,
    TIE: 3,
    LOSS: 0,
  };
  let result = null;
  //enemy rock friendly paper = > friendly wins
  if (scoreA === "A" && scoreB === "Y") {
    result = points.WIN;
    //enemy rock friendly scissors = > enemy wins
  } else if (scoreA === "A" && scoreB === "Z") {
    result = points.LOSS;
    //enemy paper friendly rock = > enemy wins
  } else if (scoreA === "B" && scoreB === "X") {
    result = points.LOSS;
    //enemy paper friendly scissors = > friendly wins
  } else if (scoreA === "B" && scoreB === "Z") {
    result = points.WIN;
    //enemy scissors friendly rock = > friendly wins
  } else if (scoreA === "C" && scoreB === "X") {
    result = points.WIN;
    //enemy scissors friendly paper = > enemy wins
  } else if (scoreA === "C" && scoreB === "Y") {
    result = points.LOSS;
    //enemy rock friendly rock = > tie
  } else if (scoreA === "A" && scoreB === "X") {
    result = points.TIE;
    //enemy paper friendly paper = > tie
  } else if (scoreA === "B" && scoreB === "Y") {
    result = points.TIE;
    //enemy scissors friendly scissors = > tie
  } else if (scoreA === "C" && scoreB === "Z") {
    result = points.TIE;
  } else {
    return 0;
  }
  return result + points[scoreB];
};

(async () => {
  const fileData = await readFilePath(filePath);
  const fileDataByLine = splitFileDataByCarriageReturnAndNewLine(fileData);

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
