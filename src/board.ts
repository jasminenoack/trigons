import { Side } from "./side";
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
        const up = puzzle.firstDirection === "up";
        this.createSpots(values, up);
        this.addHints(this.spots, puzzle.hints);
        const maxNum = puzzle.maxNum;
        this.maxNum = maxNum;
        this.numOptions = this.createNumOptions(maxNum);
    }

    public createSpots(values, up) {
        values.forEach((row, rowNumber) => {
            const rowSpots = [];
            for (let i = 0; i < this.width; i++) {
                const value = row[i];
                const spot = new Spot(up, value);
                rowSpots.push(spot);

                // add the right side
                spot.right = new Side();
                if (i === 0) {
                    spot.left = new Side();
                } else {
                    spot.left = rowSpots[i - 1].right;
                }

                if (up || rowNumber === 0) {
                    spot.flat = new Side();
                } else {
                    spot.flat = this.spots[rowNumber - 1][i].flat;
                }

                up = !up;
            }
            this.spots.push(rowSpots);
        });
    }

    public addHints(spots, hints) {
        hints.forEach((hint) => {
            spots[hint.row][hint.column][hint.location].value = hint.value;
        });
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
