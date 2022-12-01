import Phaser from "phaser";
import Block from "../classes/Block";

/**
 *  Keeping it simple
 */
export default class Game extends Phaser.Scene {
    preload() {

    }

    init() {
        // Create empty array 
        // create grid
        this.grid = []

        this.currentBlocks = []

        const rows = []
        for (let i = 0; i < 20; i++) {
            
            const row = []
            for (let j = 0; j < 10; j++) {
                row.push(false)
            }
            rows.push(row)
        }
        this.grid = rows

        
        // const g = Array(25).fill(Array(10).fill(false))
        // Fill all
        // this.grid[5][9] = true
        // this.grid[5][8] = true
        // this.grid[6][8] = true
        // this.grid[6][7] = true

        this.currentBlocks.push(new Block('S', 5, 9))
        this.currentBlocks.push(new Block('S', 5, 8))
        this.currentBlocks.push(new Block('S', 6, 8))
        this.currentBlocks.push(new Block('S', 6, 7))
        this.gridHeight = this.grid.length
        this.gridWidth = this.grid[0].length

        console.log(this.input.activePointer)
        this.pointerX = 0
        this.pointerY = 0

        this.stepTimer = 0

        this.allRectangles = []
    }


    create() {
        this.input.on('pointermove', (pointer) => {
            this.updatePointer(pointer)
        });
        // loop through each grid

        

        console.log(this.gridHeight)
        console.log(this.checkCollisionGround(5, 7))
        // this.gameStep()

        this.cursors = this.input.keyboard.createCursorKeys()

        const spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        spaceBar.on('down', () => {
            this.spawnNewBlocks()
        })

    }

    update() {
        const cellWidth = 24
        const cellHeight = 24
        this.allRectangles.forEach(rect => {
            rect.destroy()
        })
        this.allRectangles = []
        this.grid.forEach((row, i) => {
            row.forEach((cell, j) => {
                //console.log(cell)
                if (cell) {
                    this.allRectangles.push(this.add.rectangle((j * cellWidth) + cellWidth/2, (i * cellHeight) + cellHeight/2, cellWidth, cellHeight, 0xff0000))
                }else{
                    // this.add.rectangle((j * cellWidth) + cellWidth/2, (i * cellHeight) + cellHeight/2, cellWidth, cellHeight, 0x000000)
                }
            })
        })
        // console.log(this.pointer.position)
        if(this.stepTimer >= 25) {
            this.gameStep()
            this.stepTimer = 0
        }else{
            this.stepTimer += this.time.timeScale
        }

        // console.log(this.cursors.space.onDown())
    }
    gameStep() {
        // Check collision for each cell and move down

        const cellWidth = 24
        const cellHeight = 24
        
        // for (let i = this.gridHeight - 1; i >= 0; i--) {
        //     const row = this.grid[i];

        //     for (let j = this.gridWidth -1 ; j >= 0; j--) {
        //         const cell = this.grid[i][j]
        //         if(cell == true) {
        //             if(this.checkCollision(i, j)) {
        //                 console.log('foo')
        //                 this.moveDown(i,j)
        //             }
        //         }
                
                
        //     }
        
            
        // }

        if(this.checkIfAllBlocksCanMoveDown(this.currentBlocks)){
            //move all blocks down
           this.currentBlocks = this.moveDown(this.currentBlocks)

        }else{
            this.currentBlocks = []
        }
    }


    // Check if block can move down
    checkCollisionGround(y, x) {
        
        // If at bottom return false
        if (y == this.gridHeight-1) {
            return false
        }

        // Check if cell below is free
        if(this.grid[y+1][x] == true) {
            // Check if cell is current block
            const inCurrentBlocks = this.currentBlocks.some(block => block.x == x && block.y == y+1)

            if(inCurrentBlocks) {
                return true
            }else {
                return false
            }

            return false
        }

        return true
        
        
    }

    // Move down
    // Accepts array of {x, y}
    /**
     * 
     * @param {{x, y}[]} blocks 
     */
    moveDown(blocks) {
        // this.currentBlocks = []
        blocks.forEach(block => {
            this.grid[block.y][block.x] = false
        })
        blocks.map(block => {
            
            block.y += 1
            this.grid[block.y][block.x] = true
            return block
        })

        return blocks
        console.log(this.currentBlocks)

        // console.log(this.currentBlocks)
        
        
        // this.grid[y][x] = false

        // console.log(this.grid[y][x])


    }

    /**
     * 
     * @param {{x, y}[]} blocks 
     */
    checkIfAllBlocksCanMoveDown(blocks){
        const results = blocks.map(block => {
            // console.log(block)
            return this.checkCollisionGround(block.y, block.x)
        })
        // console.log(blocks)
        // console.log(results)

        return (results.every(result => result == true))
    }

    updatePointer(pointer) {
        this.pointerX = pointer.x
        this.pointerY = pointer.y
        this.pointerCellX = Phaser.Math.FloorTo(this.pointerX/24, 0)
        this.pointerCellY = Phaser.Math.FloorTo(this.pointerY/24, 0)
        console.log(` x: ${this.pointerCellX}, y: ${this.pointerCellY}`)
        console.log(this.grid[this.pointerCellY][this.pointerCellX])

    }

    spawnNewBlocks() {
        if(this.currentBlocks.length == 0) {
            this.currentBlocks.push(new Block('S', 5, 8))
            this.currentBlocks.push(new Block('S', 5, 7))
            this.currentBlocks.push(new Block('S', 6, 7))
            this.currentBlocks.push(new Block('S', 6, 6))
        }
        
    }
}