import { Spot } from "./spot";

export class Board {
    height: number
    width: number
    spots: Spot[][]
    numOptions: { [value: number]: { [key: string]: number[] } }

    constructor(puzzle: any) {
        const values = puzzle.values
        this.height = puzzle.height;
        this.width = puzzle.width;
        this.spots = []
        let up = puzzle.firstDirection === "up"
        values.forEach((row) => {
            const rowSpots = []
            for (let i = 0; i < row.length; i++) {
                const value = row[i];
                rowSpots.push(new Spot(up, value))
                up = !up;
            }
            this.spots.push(rowSpots)
        })
        const maxNum = puzzle.maxNum
        this.numOptions = this.createNumOptions(maxNum)
    }

    createNumOptions(maxNumber: number) {
        const result = {}

        for (let i = 0; i <= maxNumber; i++) {
            for (let j = i; j <= maxNumber; j++) {
                for (let k = j; k <= maxNumber; k++) {
                    const total = i + j + k
                    if (!result[total]) {
                        result[total] = {
                            placed: [],
                            notPlaced: []
                        }
                    }
                    result[total].notPlaced.push([i, j, k])
                }
            }
        }
        return result
    }
}