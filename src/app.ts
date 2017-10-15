import * as $ from "jquery";
import { Board } from "./board";
import * as puzzles from "./puzzle";

const boardEl = document.getElementById("puzzle");
const optionsEl = document.getElementById("options");
const pickEl = document.getElementById("pick");

function drawBoard(board, wrapper) {
    const spots = board.spots;

    spots.forEach((row) => {
        const rowEl = document.createElement("div");
        rowEl.className = "row clear";
        row.forEach((spot) => {
            const value = spot.value;
            const div = document.createElement("div");
            div.classList.add("triangle");
            div.classList.add("value-" + value);
            if (value !== undefined) {
                if (spot.up) {
                    div.classList.add("up");
                } else {
                    div.classList.add("down");
                }
                for (let i = 0; i < 3; i++) {
                    // order: left, right, flat
                    const side = document.createElement("div");
                    side.classList.add("side");

                    if (i === 0) {
                        // left
                        side.innerText = spot.left.value ? spot.left.value : "";
                    } else if (i === 1) {
                        // right
                        side.innerText = spot.right.value ? spot.right.value : "";
                    } else {
                        // flat
                        side.innerText = spot.flat.value ? spot.flat.value : "";
                    }

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

function createOptionSet(nums, type) {
    const numSet = document.createElement("div");
    numSet.className = "nums " + type;
    numSet.innerText = nums.join(" ");
    return numSet;
}

function drawOptions(board, wrapper) {
    const options = board.numOptions;
    Object.keys(options).forEach((num) => {
        const row = document.createElement("div");
        row.className = "row clear";
        const value = document.createElement("div");
        value.className = "value";
        value.innerText = num;
        row.appendChild(value);

        const placedSets = options[num].placed;
        const notPlacedSets = options[num].notPlaced;

        notPlacedSets.forEach((nums) => {
            row.appendChild(createOptionSet(nums, "notPlaced"));
        });

        placedSets.forEach((nums) => {
            row.appendChild(createOptionSet(nums, "placed"));
        });

        wrapper.appendChild(row);
    });
}

function createBoard(puzzle) {
    const board = new Board(puzzle);
    const boardWrapper = document.createElement("div");
    drawBoard(board, boardWrapper);
    boardEl.innerHTML = boardWrapper.outerHTML;

    const optionsWrapper = document.createElement("div");
    drawOptions(board, optionsWrapper);
    optionsEl.appendChild(optionsWrapper);

    return board;
}

const currentBoard = createBoard(puzzles.puzzle1);

$("#puzzle").on("click", ".side", (e) => {
    const el = $(e.currentTarget);
    const value = $(".num.active").text();

    $("#puzzle .currentFill").removeClass("currentFill");
    $(el).addClass("currentFill");
    el.text(value);
});

$(pickEl).on("click", ".num", (e) => {
    const target = $(e.currentTarget);
    const value = target.text();
    $(".num.active").removeClass("active");
    target.addClass("active");
});

$(optionsEl).on("click", ".nums", (e) => {
    const el = $(e.currentTarget);
    if (el.hasClass("placed")) {
        el.removeClass("placed");
        el.addClass("notPlaced");
    } else {
        el.removeClass("notPlaced");
        el.addClass("placed");
    }
});

$(optionsEl).on("click", ".value", (e) => {
    const el = $(e.currentTarget);
    const value = el.text();
    $(".match").removeClass("match");
    $(".value-" + value).addClass("match");
});
