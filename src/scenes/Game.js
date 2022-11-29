import Phaser from "phaser";

export default class Game extends Phaser.Scene {
    preload() {

    }

    init() {
        // Create empty array 
        // create grid
        this.grid = []

        const rows = []
        for (let i = 0; i < 25; i++) {
            
            const row = []
            for (let j = 0; j < 10; j++) {
                row.push(false)
            }
            rows.push(row)
        }
        this.grid = rows

        
        // const g = Array(25).fill(Array(10).fill(false))
        // Fill all
        this.grid[0][0] = true
        this.grid[5][9] = true
        this.grid[5][8] = true
        this.grid[6][8] = true
        this.grid[6][7] = true
        console.log(this.grid[0].length)
    }


    create() {
        // loop through each grid

        const cellWidth = 24
        const cellHeight = 24
        this.grid.forEach((row, i) => {
            row.forEach((cell, j) => {
                console.log(cell)
                //console.log(cell)
                if (cell) {
                    this.add.rectangle((j * cellWidth) + cellWidth/2, (i * cellHeight) + cellHeight/2, cellWidth, cellHeight, 0xff0000)
                }
            })
        })

    }

    update() {

    }
}