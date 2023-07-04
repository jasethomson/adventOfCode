import path from "path";
import { readFilePath, splitFileDataByNewLine } from "../../utils";

const date = __dirname.split("dist")[1].replace(/\\/g, "/");
const rootFilePath = `../../static/${date}/`;

const filePath: string = path.join(__dirname, `${rootFilePath}input.txt`);

const uniqueCharacterLength = 14;

const findPacketStart = (
  charactersArr: string[],
  currentIndex: number = 0,
  uniqueCharacters: string[] = []
): number => {
  if (uniqueCharacters.length === uniqueCharacterLength) return currentIndex;
  const characterIndex = uniqueCharacters.indexOf(charactersArr[currentIndex]);
  uniqueCharacters.push(charactersArr[currentIndex++]);
  if (characterIndex !== -1) {
    uniqueCharacters = uniqueCharacters.slice(characterIndex + 1);
  }
  return findPacketStart(charactersArr, currentIndex, uniqueCharacters);
};

(async () => {
  const fileData = await readFilePath(filePath);
  const fileDataByLine = splitFileDataByNewLine(fileData);
  const charactersArr = fileDataByLine[0].split("");
  const packetStart = findPacketStart(charactersArr);
  console.log("packetStart", packetStart); // part 1: 1262 - part 2: 3444
})();
