import path from "path";
import { readFilePath, splitFileDataByNewLine } from "../../utils";

const date = __dirname.split("dist")[1].replace(/\\/g, "/");
const rootFilePath = `../../static/${date}/`;

const filePath: string = path.join(__dirname, `${rootFilePath}input.txt`);

interface NodeStructure {
  name: string;
  size: number;
  children: NodeStructure[] | null;
  parent: NodeStructure | null;
}

interface DirSizeObj {
  name: string;
  size: number;
}

const createNode = (
  name: string,
  size: number,
  children: NodeStructure[] | null,
  parent: NodeStructure | null
): NodeStructure => ({
  name,
  size,
  children,
  parent,
});

const processInstructions = (lines: string[]): NodeStructure => {
  const rootNode = createNode("/", 0, [], null);
  let currentDir = rootNode;
  lines.forEach((line) => {
    if (!line) return;
    const lineSplit = line.split(" ");
    if (line[0] === "$") {
      const [_, __, arg] = lineSplit;
      switch (arg) {
        case "/":
          currentDir = rootNode;
          break;
        case "..":
          currentDir = currentDir.parent || rootNode;
          break;
        default:
          if (!currentDir.children) return;
          const subDir = currentDir.children.find(
            (child) => child.children && child.name === arg
          );
          if (subDir) currentDir = subDir;
      }
    } else if (line.startsWith("dir")) {
      const [_, arg] = lineSplit;
      if (!currentDir.children) return;
      currentDir.children.push(createNode(arg, 0, [], currentDir));
    } else {
      const [size, name] = lineSplit;
      if (!currentDir.children) return;
      currentDir.children.push(
        createNode(name, parseInt(size), null, currentDir)
      );
    }
  });

  return rootNode;
};

const processNodes = (
  node: NodeStructure,
  accumulator: number = 0,
  dirSizeMap: DirSizeObj[] = []
): {
  size: number;
  total: number;
  dirSizeMap: DirSizeObj[];
} => {
  if (!node.children) {
    return {
      size: node.size,
      total: accumulator,
      dirSizeMap,
    };
  }

  let size = 0;
  node.children.forEach((child) => {
    const result = processNodes(child, accumulator, dirSizeMap);
    size += result.size;
    accumulator = result.total;
    dirSizeMap = result.dirSizeMap;
  });
  dirSizeMap.push({ name: node.name, size });
  if (size <= 100000) {
    accumulator += size;
  }
  return { size, total: accumulator, dirSizeMap };
};

(async () => {
  const fileData = await readFilePath(filePath);
  const fileDataByLine = splitFileDataByNewLine(fileData);

  // part 1
  const dirStructure = processInstructions(fileDataByLine);
  const { size, total, dirSizeMap } = processNodes(dirStructure);

  console.log("total size to free up", total);

  // part2
  const totalDiskSpace = 70000000;
  const minDiskSpace = 30000000;
  const unUsedSpace = totalDiskSpace - size;
  const neededSpace = minDiskSpace - unUsedSpace;

  let removableDir: DirSizeObj | null = null;
  dirSizeMap.forEach((dir) => {
    if (!removableDir) {
      if (dir.size >= neededSpace) removableDir = dir;
      return;
    }
    if (dir.size >= neededSpace && dir.size < removableDir.size) {
      removableDir = dir;
    }
  });
  console.log("smallest removable dir", removableDir);
})();
