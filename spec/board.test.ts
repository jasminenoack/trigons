import { puzzle1 } from "../src/puzzle";
import { Board } from "../src/board";

describe('board', () => {
    let board
    beforeEach(() => {
        board = new Board(puzzle1)
    })

    it('creates a board', () => {
        expect(board.spots.length).toEqual(puzzle1.height)
        expect(board.spots[0].length).toEqual(puzzle1.width)
        const values = puzzle1.values
        for (let rowIndex = 0; rowIndex < values.length; rowIndex++) {
            const row = values[rowIndex]
            for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
                let value = row[columnIndex]
                const spot = board.spots[rowIndex][columnIndex]
                expect(spot.value).toEqual(value);
                if (
                    (rowIndex % 2 === 0 && columnIndex % 2 === 0) ||
                    (rowIndex % 2 === 1 && columnIndex % 2 === 1)
                ) {
                    expect(spot.up).toBeTruthy()
                } else {
                    expect(spot.up).toBeFalsy()
                }
            }
        }
        expect(board.width).toEqual(puzzle1.width)
        expect(board.height).toEqual(puzzle1.height)
        expect(board.numOptions).toEqual({
            0: { notPlaced: [[0, 0, 0]], placed: [] },
            1: { notPlaced: [[0, 0, 1]], placed: [] },
            2: { notPlaced: [[0, 0, 2], [0, 1, 1]], placed: [] },
            3: { notPlaced: [[0, 0, 3], [0, 1, 2], [1, 1, 1]], placed: [] },
            4: { notPlaced: [[0, 0, 4], [0, 1, 3], [0, 2, 2], [1, 1, 2]], placed: [] },
            5: { notPlaced: [[0, 1, 4], [0, 2, 3], [1, 1, 3], [1, 2, 2]], placed: [] },
            6: { notPlaced: [[0, 2, 4], [0, 3, 3], [1, 1, 4], [1, 2, 3], [2, 2, 2]], placed: [] },
            7: { notPlaced: [[0, 3, 4], [1, 2, 4], [1, 3, 3], [2, 2, 3]], placed: [] },
            8: { notPlaced: [[0, 4, 4], [1, 3, 4], [2, 2, 4], [2, 3, 3]], placed: [] },
            9: { notPlaced: [[1, 4, 4], [2, 3, 4], [3, 3, 3]], placed: [] },
            10: { notPlaced: [[2, 4, 4], [3, 3, 4]], placed: [] },
            11: { notPlaced: [[3, 4, 4]], placed: [] },
            12: { notPlaced: [[4, 4, 4]], placed: [] }
        })
    })
})