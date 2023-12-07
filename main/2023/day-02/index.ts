import path from "path";
import { readFilePath, splitFileDataByNewLine } from "../../utils";

const rootFilePath = "../../static/2023/day-02/";
const filePath: string = path.join(__dirname, `${rootFilePath}input.txt`);

const getGameId = (str: string): string => {
    const gameIdRegex = /Game ([0-9]+)/;
    const gameIdMatch = gameIdRegex.exec(str);
    if (!gameIdMatch?.[1]) throw new Error('Failed to find game id.');
    return gameIdMatch[1];
}

const getCubesFound = (str: string): { [key: string]: number}[] => {
    const cubesFoundPerRound: { [key: string]: number}[] = [];
    const gameRounds = str.split(': ')[1].split(';');
    gameRounds.forEach((gameRound, index) => {
        const cubesFound: { [key: string]: number} = {};
        gameRound.split(', ').forEach((colorStr, cIndex) => {
            const [ cubes, color ] = colorStr.trim().split(' ');
            cubesFound[color] = parseInt(cubes);
        });
        cubesFoundPerRound.push(cubesFound);
    });
    return cubesFoundPerRound;
}

const translateLineToGameResult = (line: string): { [key: string]:  { [key: string]: number}[]} => {
    const gameId = getGameId(line);
    const cubesFound = getCubesFound(line);
    return { [gameId]: cubesFound };
}

const calcSumsPart1 = (gameResults:  { [key: string]:  { [key: string]: number}[]}): number => {
    const cubeSupply: { [key: string]: number} = {
        red: 12,
        green: 13,
        blue: 14
    }
    let idsSum = 0;
    Object.keys(gameResults).forEach((game, index) => {
        let isGamePossible = true;
        gameResults[game].forEach((round, rIndex) => {
            Object.keys(cubeSupply).forEach((color, cIndex) => {
                if (round[color] > cubeSupply[color]) isGamePossible = false;
            });
        });
        if (isGamePossible) idsSum += parseInt(game);
    });
    return idsSum;
}

const calcSumsPart2 = (gameResults:  { [key: string]:  { [key: string]: number}[]}): number => {
    let idsSum = 0;
    Object.keys(gameResults).forEach((game, index) => {
        const cubeSupply: { [key: string]: number} = {
            red: 0,
            green: 0,
            blue: 0
        }
        gameResults[game].forEach((round, rIndex) => {
            Object.keys(cubeSupply).forEach((color, cIndex) => {
                if (round[color] > cubeSupply[color]) cubeSupply[color] = round[color];
            });
        });
        let colorsProduct = 1;
        Object.keys(cubeSupply).forEach((color, cIndex) => { 
            colorsProduct *= cubeSupply[color]; 
        });
        idsSum += colorsProduct;
    });
    return idsSum;
}

(async () => {
    const fileData = await readFilePath(filePath);
    const fileDataByLine = splitFileDataByNewLine(fileData);
    let gameResults: { [key: string]: { [key: string]: number}[]} = {};
    fileDataByLine.forEach((line, index) => {
        const gameResult = translateLineToGameResult(line);
        gameResults = {
            ...gameResults,
            ...gameResult
        };
    });
    const sumPart1 = calcSumsPart1(gameResults);
    const sumPart2 = calcSumsPart2(gameResults);
    console.log('Sum part 1:', sumPart1);
    console.log('Sum part 2:', sumPart2);
})();
