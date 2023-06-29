import { readFileSync } from "fs";

export const readFilePath = async (filePath: string): Promise<Buffer> => {
  const fileData = readFileSync(filePath);
  if (!fileData) {
    throw new Error(`No file data found for ${filePath}`);
  }
  return fileData;
};

export const splitFileDataByNewLine = (fileData: Buffer): string[] => {
  const fileDataString = fileData.toString();
  return fileDataString.indexOf("\r") !== -1
    ? fileDataString.toString().split(/\r\n/)
    : fileDataString.split(/\n/);
};
