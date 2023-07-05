import path from "path";
import { readFilePath, splitFileDataByNewLine } from "../../utils";

const date = __dirname.split("dist")[1].replace(/\\/g, "/");
const rootFilePath = `../../static/${date}/`;

const filePath: string = path.join(
  __dirname,
  `${rootFilePath}sample-input.txt`
);

(async () => {
  const fileData = await readFilePath(filePath);
  const fileDataByLine = splitFileDataByNewLine(fileData);
  console.log(fileDataByLine);
  let path = "";
  const pathObj: { [key: string]: {} } = {};
  fileDataByLine.forEach((cl, count) => {
    console.log("CURRENT PATH", path);
    if (cl.startsWith("$")) {
      const clArr = cl.split(" ");
      console.log("cmd found", clArr);
      if (clArr[1] === "cd") {
        if (clArr[2] === "..") {
          console.log("move up dir", path);
          if (path) {
            const pathSplitArr = path.split("/");
            path = pathSplitArr.slice(0, pathSplitArr.length - 1).join("/");
          }
        } else if (clArr[2] === "/") {
          console.log("reset path dir", path);
          path = "";
          console.log("reset path dir new path", path);
        } else {
          console.log("move down dir", path);
          if (path) {
            path += `/${clArr[2]}`;
          } else {
            path = clArr[2];
            if (!pathObj[clArr[2]]) pathObj[clArr[2]] = {};
          }
          console.log("move down dir new path", path);
        }
      }
    } else {
      console.log("data found", cl);
    }
    console.log(pathObj);
  });
})();
