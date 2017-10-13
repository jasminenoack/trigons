import * as puzzles from './puzzle'
import * as $ from "jquery"

const boardEl = document.getElementById("puzzle")

function drawBoard(puzzle) {
    let up = puzzle.firstDirection === "up";
    puzzle.values.forEach((row) => {
        const rowEl = document.createElement("div")
        rowEl.className = "row clear"
        for (let i = 0; i < row.length; i++) {
            const value = row[i]
            const div = document.createElement('div')
            div.classList.add("triangle")
            if (value !== undefined) {
                if (up) {
                    div.classList.add("up")
                } else {
                    div.classList.add("down")
                }
                for (let i = 0; i < 3; i++) {
                    const side = document.createElement('div')
                    side.classList.add('side')
                    div.appendChild(side)
                }
                const text = document.createElement('span')
                text.innerText = value
                div.appendChild(text)
            }
            rowEl.appendChild(div)
            up = up ? false : true;
        }
        boardEl.appendChild(rowEl)
    })
}

drawBoard(puzzles.puzzle1)

$("#puzzle").on("click", ".triangle", (e) => {
    console.log(e)
    console.log(e.currentTarget)
})
