import { readFileSync } from "fs";

export const readFilePath = async (filePath: string): Promise<Buffer> => {
  const fileData = readFileSync(filePath);
  if (!fileData) {
    throw new Error(`No file data found for ${filePath}`);
  }
  return fileData;
};

export const splitFileDataByCarriageReturnAndNewLine = (
  fileData: Buffer
): string[] => fileData.toString().split(/\r\n/);

export const splitFileDataByNewLine = (fileData: Buffer): string[] =>
  fileData.toString().split(/\n/);
