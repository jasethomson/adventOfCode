import path from "path";
import {
  readFilePath,
  splitFileDataByNewLine,
  splitFileDataByCarriageReturnAndNewLine,
} from "../../utils";

const rootFilePath = "../../static/2022/2022-01/";
const mode: "sample" | "" = "sample";
const filePath: string =
  mode === "sample"
    ? path.join(__dirname, `${rootFilePath}sample-input.txt`)
    : path.join(__dirname, `${rootFilePath}input.txt`);

(async () => {
  const fileData = await readFilePath(filePath);
  const fileDataByLine =
    filePath.indexOf("sample") !== -1
      ? splitFileDataByNewLine(fileData)
      : splitFileDataByCarriageReturnAndNewLine(fileData);
  console.log(fileDataByLine.length);
})();
