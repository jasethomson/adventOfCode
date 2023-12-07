import path from "path";
import { readFilePath, splitFileDataByNewLine } from "../../utils";

const rootFilePath = "../../static/2023/day-01/";
const filePath: string = path.join(__dirname, `${rootFilePath}input.txt`);

const regexMatchWithOverlaps = (str: string, regex: RegExp, val: string = ''): {[key: string]: string} => {
    const matches: {[key: string]: string} = {};
    let regexMatch = regex.exec(str);
    while (regexMatch) {
        regex.lastIndex -= regexMatch[0].length - 1;
        matches[regexMatch.index.toString()] = val || regexMatch[0];
        regexMatch = regex.exec(str);
    }
    return matches;
}

const matchSpelledOutNums = (str: string): {[key: string]: string} => {
    const validNumbers: {[key: string]: number} = {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9
    }
    let matches: {[key: string]: string} = {};
    Object.keys(validNumbers).forEach((num, index) => {
        const regex = new RegExp(num, 'g');
        matches = {
            ...matches,
            ...regexMatchWithOverlaps(str, regex, validNumbers[num].toString())
        };
    });
    return matches;
}

const matchNums = (str: string): {[key: string]: string} => {
    const regex = /[0-9]/g;
    return regexMatchWithOverlaps(str, regex);
}

const findNumberInStringPart1 = (str: string): string => {
    const numMatches = str.match(/([0-9])/g);
    if (!numMatches) throw new Error('findNumberInStringPart1() found no matches.');
    if (numMatches.length === 1) return numMatches[0] + numMatches[0];
    return numMatches[0] + numMatches.pop();
};


const findNumberInStringPart2 = (str: string): string => {
    let matches = matchSpelledOutNums(str);
    matches = {
        ...matches,
        ...matchNums(str)
    }
    const sortedIndices = Object.keys(matches).sort((a,b) => parseInt(a) - parseInt(b));

    if (!sortedIndices.length) throw new Error('findNumberInStringPart2() found no matches.');

    if (sortedIndices.length === 1) {
        return matches[sortedIndices[0]] + matches[sortedIndices[0]];
    } else {
        return matches[sortedIndices[0]] + matches[sortedIndices[sortedIndices.length - 1]];
    }
};

(async () => {
    const fileData = await readFilePath(filePath);
    const fileDataByLine = splitFileDataByNewLine(fileData);
    let sumPart1 = 0;
    let sumPart2 = 0;
    fileDataByLine.forEach((str, index) => { 
      const strNumPart1 = findNumberInStringPart1(str);
      sumPart1 += parseInt(strNumPart1);
      const strNumPart2 = findNumberInStringPart2(str);
      sumPart2 += parseInt(strNumPart2);
    });
    console.log('Part 1:', sumPart1);
    console.log('Part 2:', sumPart2);
})();
