import path from "path";
import { readFilePath, splitFileDataByNewLine } from "../../utils";

const rootFilePath = "../../static/2022/2022-05/";
const filePath: string = path.join(__dirname, `${rootFilePath}input.txt`);

type CrateMap = { [key: string]: string[] };

const formatCratesMap = (cratesArr: string[]): CrateMap => {
  const columnsString = cratesArr.pop();
  const columns = columnsString?.trim().split("   ");
  const crateMap: CrateMap = {};
  columns?.forEach((col) => (crateMap[col] = []));
  cratesArr.forEach((row, count) => {
    const crateArr = row.split(" ");
    let blanksFound = 0;
    let columnIndex = 1;
    crateArr.forEach((column, count) => {
      if (blanksFound === 3) {
        columnIndex++;
        blanksFound = 0;
        return;
      }
      if (!column) {
        blanksFound++;
        return;
      }
      blanksFound = 0;
      crateMap[`${columnIndex++}`].push(column);
    });
  });
  return crateMap;
};

const updateCrates = (
  amountToMove: number,
  moveFromCrateKey: string,
  moveToCrateKey: string,
  crateMap: CrateMap
): CrateMap => {
  const cratesToMove = crateMap[moveFromCrateKey].splice(0, amountToMove);
  // part 1
  // cratesToMove.forEach((crate, count) =>
  //   crateMap[moveToCrateKey].unshift(crate)
  // );
  // part 2
  crateMap[moveToCrateKey] = [...cratesToMove, ...crateMap[moveToCrateKey]];
  return crateMap;
};

(async () => {
  const fileData = await readFilePath(filePath);
  const fileDataByLine = splitFileDataByNewLine(fileData);
  const breakAfterCratesMapIndex = fileDataByLine.indexOf("");
  const cratesArr = fileDataByLine.slice(0, breakAfterCratesMapIndex);
  const formattedCratesMap = formatCratesMap(cratesArr);
  const instructions = fileDataByLine.slice(breakAfterCratesMapIndex + 1);
  let updatedCrates: CrateMap = {};
  instructions.forEach((instruction, count) => {
    if (!instruction) return;
    const amountToMove = parseInt(instruction.split("move ")[1].split(" ")[0]);
    const moveFromCrate = instruction.split("from ")[1].split(" ")[0];
    const moveToCrate = instruction.split("to ")[1].split(" ")[0];
    updatedCrates = updateCrates(
      amountToMove,
      moveFromCrate,
      moveToCrate,
      formattedCratesMap
    );
  });
  let topCrates = "";
  for (const crate in updatedCrates) {
    if (updatedCrates[crate][0]?.[1]) topCrates += updatedCrates[crate][0][1];
  }
  console.log(topCrates); // part 1: HBTMTBSDC part 2: PQTJRSHWS
})();
