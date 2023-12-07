import path from "path";
import { readFilePath, splitFileDataByNewLine } from "../../utils";

const rootFilePath = "../../static/2023/day-02/";
const filePath: string = path.join(__dirname, `${rootFilePath}sample-input.txt`);

(async () => {
    const fileData = await readFilePath(filePath);
    const fileDataByLine = splitFileDataByNewLine(fileData);

    fileDataByLine.forEach((line, index) => { 
        console.log('line', line);
    });

})();
