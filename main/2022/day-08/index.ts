import path from "path";
import { readFilePath, splitFileDataByNewLine } from "../../utils";

const date = __dirname.split("dist")[1].replace(/\\/g, "/");
const rootFilePath = `../../static/${date}/`;

const filePath: string = path.join(__dirname, `${rootFilePath}input.txt`);

const checkVisibility = (
  tree: string,
  treeIndex: number,
  rowIndex: number,
  grid: string[][]
): number => {
  // console.log(grid);
  const isVisibleNorth = checkVertical(tree, treeIndex, grid, rowIndex - 1, -1);
  // console.log(tree, "is visible north", isVisibleNorth);
  if (isVisibleNorth) return 1;
  const isVisibleSouth = checkVertical(tree, treeIndex, grid, rowIndex + 1, 1);
  // console.log(tree, "is visible south", isVisibleSouth);
  if (isVisibleSouth) return 1;
  const isVisibleWest = checkHorizontal(
    tree,
    rowIndex,
    grid,
    treeIndex - 1,
    -1
  );
  // console.log(tree, "is visible west", isVisibleWest);
  if (isVisibleWest) return 1;
  const isVisibleEast = checkHorizontal(tree, rowIndex, grid, treeIndex + 1, 1);
  // console.log(tree, "is visible east", isVisibleEast);
  if (isVisibleEast) return 1;
  return 0;
};

const checkVertical = (
  tree: string,
  treeIndex: number,
  grid: string[][],
  rowIndexToCompare: number,
  direction: number
): boolean => {
  if (parseInt(tree) > parseInt(grid[rowIndexToCompare][treeIndex])) {
    if (grid[rowIndexToCompare + direction]) {
      return checkVertical(
        tree,
        treeIndex,
        grid,
        rowIndexToCompare + direction,
        direction
      );
    }
    return true;
  }
  return false;
};

const checkHorizontal = (
  tree: string,
  rowIndex: number,
  grid: string[][],
  treeIndexToCompare: number,
  direction: number
): boolean => {
  if (parseInt(tree) > parseInt(grid[rowIndex][treeIndexToCompare])) {
    if (grid[treeIndexToCompare + direction]) {
      return checkHorizontal(
        tree,
        rowIndex,
        grid,
        treeIndexToCompare + direction,
        direction
      );
    }
    return true;
  }
  return false;
};

(async () => {
  const fileData = await readFilePath(filePath);
  const fileDataByLine = splitFileDataByNewLine(fileData);

  const grid: string[][] = [];
  fileDataByLine.forEach((row) => {
    if (!row) return;
    grid.push(row.split(""));
  });
  let visibleTrees = 0;
  grid.forEach((row, rowIndex) => {
    if (rowIndex === 0 || rowIndex === grid.length - 1) {
      visibleTrees += row.length;
      return;
    }
    row.forEach((tree, treeIndex) => {
      if (treeIndex === 0 || treeIndex === row.length - 1) {
        visibleTrees += 1;
        return;
      }
      visibleTrees += checkVisibility(tree, treeIndex, rowIndex, grid);
    });
  });
  console.log("Trees that are visible", visibleTrees); // 1715 trees visible
})();
