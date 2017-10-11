import * as puzzles from './puzzle'

const boardEl = document.getElementById("puzzle")

function drawBoard(puzzle) {
    puzzle.values.forEach((row) => {
        const rowEl = document.createElement("div")
        rowEl.className = "row clear"
        row.forEach((spot) => {
            const div = document.createElement('div')
            div.classList.add("triangle")
            if (spot) {
                if (spot.up) {
                    div.classList.add("up")
                } else {
                    div.classList.add("down")
                }
                div.innerHTML = "<span>" + spot.value + "</span>"
            }
            rowEl.appendChild(div)
        })
        boardEl.appendChild(rowEl)
    })
}

drawBoard(puzzles.puzzle1)
