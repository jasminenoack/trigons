import { Spot } from "./spot";

export class Board {
    public height: number;
    public width: number;
    public maxNum: number;
    public spots: Spot[][];
    public numOptions: { [value: number]: { [key: string]: number[] } };

    constructor(puzzle: any) {
        const values = puzzle.values;
        this.height = puzzle.height;
        this.width = puzzle.width;
        this.spots = [];
        let up = puzzle.firstDirection === "up";
        values.forEach((row) => {
            const rowSpots = [];
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < row.length; i++) {
                const value = row[i];
                rowSpots.push(new Spot(up, value));
                up = !up;
            }
            this.spots.push(rowSpots);
        });
        const maxNum = puzzle.maxNum;
        this.maxNum = maxNum;
        this.numOptions = this.createNumOptions(maxNum);
    }

    public createNumOptions(maxNumber: number) {
        const result = {};

        for (let i = 0; i <= maxNumber; i++) {
            for (let j = i; j <= maxNumber; j++) {
                for (let k = j; k <= maxNumber; k++) {
                    const total = i + j + k;
                    if (!result[total]) {
                        result[total] = {
                            notPlaced: [],
                            placed: [],
                        };
                    }
                    result[total].notPlaced.push([i, j, k]);
                }
            }
        }
        return result;
    }
}
