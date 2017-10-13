import * as $ from "jquery";
import { Board } from "./board";
import * as puzzles from "./puzzle";

const boardEl = document.getElementById("puzzle");

function drawBoard(board, wrapper) {
    const spots = board.spots;

    spots.forEach((row) => {
        const rowEl = document.createElement("div");
        rowEl.className = "row clear";
        row.forEach((spot) => {
            const value = spot.value;
            const div = document.createElement("div");
            div.classList.add("triangle");
            if (value !== undefined) {
                if (spot.up) {
                    div.classList.add("up");
                } else {
                    div.classList.add("down");
                }
                for (let i = 0; i < 3; i++) {
                    const side = document.createElement("div");
                    side.classList.add("side");
                    div.appendChild(side);
                }
                const text = document.createElement("span");
                text.innerText = value;
                div.appendChild(text);
            }
            rowEl.appendChild(div);
        });
        wrapper.appendChild(rowEl);
    });
}

function createBoard(puzzle) {
    const board = new Board(puzzle);
    const wrapper = document.createElement("div");
    drawBoard(board, wrapper);
    boardEl.innerHTML = wrapper.outerHTML;
}

createBoard(puzzles.puzzle1);

$("#puzzle").on("click", ".triangle", (e) => {
    console.log(e);
    console.log(e.currentTarget);
});
