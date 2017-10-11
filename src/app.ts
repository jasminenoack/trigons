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
                for (let i = 0; i < 3; i++) {
                    const side = document.createElement('div')
                    side.classList.add('side')
                    div.appendChild(side)
                }
                const text = document.createElement('span')
                text.innerText = spot.value
                div.appendChild(text)
            }
            rowEl.appendChild(div)
        })
        boardEl.appendChild(rowEl)
    })
}

drawBoard(puzzles.puzzle1)
