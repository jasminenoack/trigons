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

function fillPickEl(el, board) {
    const blank = document.createElement("div");
    blank.className = "num";
    el.appendChild(blank);
    for (let i = 0; i <= board.maxNum; i++) {
        const option = document.createElement("div");
        option.className = "num";
        option.innerText = i + "";
        el.appendChild(option);
    }
}

function resetPick() {
    pickEl.innerHTML = "";
    pickEl.style.top = "auto";
    pickEl.style.bottom = "auto";
    pickEl.style.right = "auto";
    pickEl.style.left = "auto";
}

const currentBoard = createBoard(puzzles.puzzle1);

$("#puzzle").on("click", ".side", (e) => {
    const el = $(e.currentTarget);
    resetPick();

    if (el.hasClass("active")) {
        $(".active").removeClass("active");
    } else {
        $(".active").removeClass("active");
        $(el).addClass("active");
        fillPickEl(pickEl, currentBoard);

        const width = el.width();
        const height = el.height();
        const { top, left } = el.offset();
        const elHorMiddle = left + width / 2;
        const elVertMiddle = top + height / 2;

        const boardPosition = $(boardEl).offset();
        const boardWidth = $(boardEl).width();
        const boardHeight = $(boardEl).height();
        const boardHorMiddle = boardPosition.left + boardWidth / 2;
        const boardVertMiddle = boardPosition.left + boardHeight / 2;

        if (elVertMiddle >= boardVertMiddle) {
            pickEl.style.bottom = window.innerHeight - (elVertMiddle - height * 1.5) + "px";
        } else {
            pickEl.style.top = elVertMiddle + height * 1.5 + "px";
        }

        if (elHorMiddle >= boardHorMiddle) {
            pickEl.style.right = window.innerWidth - (elHorMiddle - width * 1.5) + "px";
        } else {
            pickEl.style.left = elHorMiddle + width * 1.5 + "px";
        }
    }
});

$(pickEl).on("click", ".num", (e) => {
    const value = e.currentTarget.innerText;
    $(".active").text(value);
    $(".active").removeClass("active");
    resetPick();
});
