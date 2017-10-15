import { Board } from "../src/board";
import { puzzle1 } from "../src/puzzle";

describe("board", () => {
    let board;
    beforeEach(() => {
        board = new Board(puzzle1);
    });

    it("creates a board", () => {
        const spots = board.spots;
        expect(spots.length).toEqual(puzzle1.height);
        expect(spots[0].length).toEqual(puzzle1.width);
        expect(board.maxNum).toEqual(puzzle1.maxNum);
        const values = puzzle1.values;
        for (let rowIndex = 0; rowIndex < values.length; rowIndex++) {
            const row = values[rowIndex];
            for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
                const value = row[columnIndex];
                const spot = spots[rowIndex][columnIndex];
                expect(spot.value).toEqual(value);
                if (
                    (rowIndex % 2 === 0 && columnIndex % 2 === 0) ||
                    (rowIndex % 2 === 1 && columnIndex % 2 === 1)
                ) {
                    expect(spot.up).toBeTruthy();
                } else {
                    expect(spot.up).toBeFalsy();
                }
            }
        }
        expect(board.width).toEqual(puzzle1.width);
        expect(board.height).toEqual(puzzle1.height);
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
            12: { notPlaced: [[4, 4, 4]], placed: [] },
        });

        expect(spots[2][1].right).toEqual(spots[2][2].left);
        expect(spots[2][1].flat).toEqual(spots[1][1].flat);

        expect(spots[1][6].right).toEqual(spots[1][7].left);
        expect(spots[1][7].flat).toEqual(spots[2][7].flat);

        expect(spots[1][3].right).toEqual(spots[1][4].left);
        expect(spots[1][3].left).toEqual(spots[1][2].right);
        expect(spots[1][3].flat).toEqual(spots[2][3].flat);

        expect(spots[1][4].right).toEqual(spots[1][5].left);
        expect(spots[1][4].left).toEqual(spots[1][3].right);
        expect(spots[1][4].flat).toEqual(spots[2][4].flat);
    });
});
