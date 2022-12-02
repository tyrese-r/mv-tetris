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

        /** @type {Block[]} */
        this.currentBlocks = []

        const rows = []
        for (let i = 0; i < 24; i++) {

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

        // this.currentBlocks.push(new Block('S', 5, 9))
        // this.currentBlocks.push(new Block('S', 5, 8))
        // this.currentBlocks.push(new Block('S', 6, 8))
        // this.currentBlocks.push(new Block('S', 6, 7))
        this.gridHeight = this.grid.length
        this.gridWidth = this.grid[0].length
        this.cellSize = 24

        console.log(this.input.activePointer)
        this.pointerX = 0
        this.pointerY = 0

        this.stepTimer = 0

        this.allRectangles = []
    }


    create() {
        window.scene = this
        // Create new camera
        // const camera1 = this.cameras.add(0, 0, 50, 50).setZoom(0.5);
        // this.cameras.main = camera1
        // this.scene.cameras.main

        // scene.cameras.main.height = 100

        scene.cameras.main.setBackgroundColor(0x2e2e2e)
        scene.cameras.main.height = 100
        scene.cameras.main.width = 240

        this.cameras.main.scrollY = 97

        this.cameras.main.y = 0
        this.cameras.main.x = 120

        this.cameras.main.height =500


        // console.log(typeof (ma))
        // console.log()
        this.input.on('pointermove', (pointer) => {
            this.updatePointer(pointer)
        });
        // loop through each grid


        this.isBlockAtCeiling = false
        this.cursors = this.input.keyboard.createCursorKeys()

        const spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        const leftArrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        const rightArrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        const downArrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        const upArrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        const pKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        spaceBar.on('down', () => {
            this.spawnNewBlocks()
        })
        leftArrow.on('down', () => {
            this.moveHorizontally('west')
        })
        rightArrow.on('down', () => {
            this.moveHorizontally('east')

        })


        upArrow.on('down', () => {
            this.rotateBlocks()
        })


        pKey.on('down', () => {
            this.paused = !this.paused
        })

        this.spawnNewBlocks()

    }

    update() {
        if(this.isBlockAtCeiling) {
            this.stepTimer = 0
        }
        if (this.paused) {
            this.stepTimer = 0
        }
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
                    const color = this.currentBlocks.some(block => block.x == j && block.y == i) ? 0xf57600 : 0x8babf1
                    this.allRectangles.push(this.add.rectangle((j * cellWidth) + cellWidth / 2, (i * cellHeight) + cellHeight / 2, cellWidth, cellHeight, color))
                } else {
                    // this.add.rectangle((j * cellWidth) + cellWidth/2, (i * cellHeight) + cellHeight/2, cellWidth, cellHeight, 0x000000)
                }
            })
        })
        // console.log(this.pointer.position)
        if (this.stepTimer >= 25) {
            this.gameStep()

        } else {
            this.stepTimer += this.time.timeScale
        }

        if (this.stepTimer >= 5) {
            if (this.cursors.down.isDown) {
                this.gameStep()
            }
        }


        // console.log(this.cursors.space.onDown())
    }
    gameStep() {
        this.stepTimer = 0
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

        if (this.checkIfAllBlocksCanMove(this.currentBlocks, 'south')) {
            //move all blocks down
            this.currentBlocks = this.moveDown(this.currentBlocks)

        } else {
            
            // Check if game over
            this.isBlockAtCeiling = this.currentBlocks.some(block => block.y <= 4)
            if(this.isBlockAtCeiling) {
                alert('Game over!')
            }
            this.currentBlocks = []
            this.lineCompletion()
            this.spawnNewBlocks()
        }


        // Line completetion detection

    }


    // Check if block can move down
    checkCollisionSouth(y, x) {

        // If at bottom return false
        if (y == this.gridHeight - 1) {
            return false
        }

        // Check if cell below is free
        if (this.grid[y + 1][x] == true) {
            // Check if cell is current block
            const inCurrentBlocks = this.currentBlocks.some(block => block.x == x && block.y == y + 1)

            if (inCurrentBlocks) {
                return true
            } else {
                return false
            }
        }

        return true


    }

    checkCollisionEast(y, x) {

        // If at bottom return false
        if (x == this.gridWidth - 1) {
            return false
        }

        // Check if cell below is free
        if (this.grid[y][x + 1] == true) {
            // Check if cell is current block
            const inCurrentBlocks = this.currentBlocks.some(block => block.x == x + 1 && block.y == y)

            if (inCurrentBlocks) {
                return true
            } else {
                return false
            }
        }

        return true


    }
    checkCollisionWest(y, x) {

        // If at bottom return false
        if (x == 0) {
            return false
        }

        // Check if cell below is free
        if (this.grid[y][x - 1] == true) {
            // Check if cell is current block
            const inCurrentBlocks = this.currentBlocks.some(block => block.x == x - 1 && block.y == y)

            if (inCurrentBlocks) {
                return true
            } else {
                return false
            }
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
    checkIfAllBlocksCanMove(blocks, direction) {
        const results = blocks.map(block => {
            // console.log(block)
            if (direction == 'south') {
                return this.checkCollisionSouth(block.y, block.x)
            } else if (direction == 'east') {
                return this.checkCollisionEast(block.y, block.x)
            } else if (direction == 'west') {
                return this.checkCollisionWest(block.y, block.x)

            }

        })
        // console.log(blocks)
        // console.log(results)

        return (results.every(result => result == true))
    }

    updatePointer(pointer) {
        this.pointerX = pointer.x
        this.pointerY = pointer.y
        if (this.pointerCellX == Phaser.Math.FloorTo(this.pointerX / 24, 0) && this.pointerCellY == Phaser.Math.FloorTo(this.pointerY / 24, 0)) {
            return
        }
        this.pointerCellX = Phaser.Math.FloorTo(this.pointerX / 24, 0)
        this.pointerCellY = Phaser.Math.FloorTo(this.pointerY / 24, 0)
        console.log(` x: ${this.pointerCellX}, y: ${this.pointerCellY}`)
        console.log(this.grid[this.pointerCellY][this.pointerCellX])
        console.table(this.currentBlocks)


    }

    spawnNewBlocks() {
        if (this.currentBlocks.length > 0) {
            return
        }
        const spawnPosition = { x: 5, y: 1 }
        let bag = [...Object.keys(Block.shapeCoords)]
        const shapeIndex = Phaser.Math.Between(0, bag.length - 1)
        const shapeLetter = bag.splice(shapeIndex, 1)
        /** @type {{x: number, y: number, origin: boolean}[]} */
        const shape = Block.shapeCoords[shapeLetter]
        console.table({ shapeLetter })

        shape.forEach((s, index) => {
            this.currentBlocks.push(new Block(shapeLetter, spawnPosition.y + s.y, spawnPosition.x + s.x, s.origin))
        })


        // this.currentBlocks.push(new Block('L', 1, 5, true))
        // this.currentBlocks.push(new Block('L', 2, 5))
        // this.currentBlocks.push(new Block('L', 2, 6))

    }

    // This can happen every frame
    moveHorizontally(direction) {
        let offset = direction == 'east' ? 1 : -1
        console.log(offset)
        if (this.checkIfAllBlocksCanMove(this.currentBlocks, direction)) {
            //move all blocks down
            //this.currentBlocks = this.moveHorizontally(this.currentBlocks)
            this.currentBlocks.forEach(block => {
                this.grid[block.y][block.x] = false
            })
            this.currentBlocks.map(block => {

                block.x += offset
                this.grid[block.y][block.x] = true
                return block
            })

        }


        // return blocks
    }

    lineCompletion() {
        // Detect line completion
        this.grid.forEach((row, index) => {
            if (row.every(cell => cell == true)) {
                this.grid.splice(index, 1)
                this.grid.unshift([false, false, false, false, false, false, false, false, false, false])
            }
        })
    }

    rotateBlocks() {
        // If shape == I do a different rotation method
        if (this.currentBlocks.length == 0) {
            return
        }
        // Look for origin block and set position
        const originBlock = this.currentBlocks.find(block => block.isOrigin)
        const shape = this.currentBlocks[0].shape
        if (shape == 'I') {
            // Do different rotation method
            // Check if all ys match then set all x to match
            this.currentBlocks.forEach(block => {
                this.grid[block.y][block.x] = false
            })
            const originBlockX = originBlock.x + 0
            const originBlockY = originBlock.y + 0
            if (this.currentBlocks.every(block => block.y == originBlock.y)) {
                // Is currently horizontal

                // Change to vertical

                this.currentBlocks[0].x = originBlockX
                this.currentBlocks[1].x = originBlockX
                this.currentBlocks[2].x = originBlockX
                this.currentBlocks[3].x = originBlockX

                this.currentBlocks[0].y = originBlockY - 2
                this.currentBlocks[1].y = originBlockY - 1
                this.currentBlocks[2].y = originBlockY
                this.currentBlocks[3].y = originBlockY + 1
            } else {
                // Is currently vertical

                // Change to horizontal
                this.currentBlocks[0].x = originBlockX - 2
                this.currentBlocks[1].x = originBlockX - 1
                this.currentBlocks[2].x = originBlockX
                this.currentBlocks[3].x = originBlockX + 1

                this.currentBlocks[0].y = originBlockY
                this.currentBlocks[1].y = originBlockY
                this.currentBlocks[2].y = originBlockY
                this.currentBlocks[3].y = originBlockY
            }

            this.currentBlocks.forEach(block => {
                this.grid[block.y][block.x] = true
            })
            return
        }

        // console.table(originBlock)
        const originPosition = { x: originBlock.x, y: originBlock.y }

        const miniGrid = [
            [0, 0, 0],
            [0, 1, 0],
            [0, 0, 0],
        ]
        // console.log(originPosition)
        const currentBlocksCopy = [...this.currentBlocks]
        // const debugArray = []
        currentBlocksCopy.map(block => {
            if (block.isOrigin) return
            // Find x offset
            const xOffset = block.x - originPosition.x
            const yOffset = block.y - originPosition.y


            // Add to minigrid
            miniGrid[1 + yOffset][1 + xOffset] = 1



            // For debugging
            // debugArray.push({ xOffset, yOffset })
            // console.log(block)
        })

        // console.log(`${miniGrid[0].join('')}\n${miniGrid[1].join('')}\n${miniGrid[2].join('')}`)


        // Convert minigrid to string
        const shapeString = (`${miniGrid[0].join('')}${miniGrid[1].join('')}${miniGrid[2].join('')}`)
        // console.log(shapeString)

        // console.table(debugArray)
        // Get adjacent cells
        // Create mini grid of other blocks like (or skip stright to string):
        // [ 0, 0, 0 ]
        // [ 1, 1, 0 ]
        // [ 0, 1, 1 ]


        // Look for string in Block.rotationMap
        const blockRotationMap = Block.rotationMap[shape]
        // Get next string in array
        const nextRotationStringIndex = (blockRotationMap.indexOf(shapeString) + 1) % blockRotationMap.length;
        const nextRotationString = blockRotationMap[nextRotationStringIndex]


        // console.log(nextRotationString)
        // Replace on grid

        // const newMiniGrid = [
        //     [0, 0, 0],
        //     [0, 1, 0],
        //     [0, 0, 0]
        // ]

        let newMiniGrid = [nextRotationString.slice(0, 3).split(''), nextRotationString.slice(3, 6).split(''), nextRotationString.slice(6, 9).split('')]

        newMiniGrid = newMiniGrid.map(miniRow => {
            return miniRow.map(miniCell => {
                if (miniCell == 1) {
                    return true
                } else {
                    return false
                }
            })
        })

        // Update all Block objects
        // console.log(`${newMiniGrid[0].join('')}\n${newMiniGrid[1].join('')}\n${newMiniGrid[2].join('')}`)
        // newMiniGrid.forEach((row, i) => {
        //     row.forEach((cell, j) => {
        //         const gridPositionX = j - 1 + originBlock.x
        //         const gridPositionY = i - 1 + originBlock.y


        //         this.grid[gridPositionY][gridPositionX] = false
        //     })
        // })

        // Check rotation
        for (let i = 0; i < 3; i++) {
            const newMiniGridRow = newMiniGrid[i];
            for (let j = 0; j < 3; j++) {
                const gridPosX = originPosition.x + j - 1
                const gridPosY = originPosition.y + i - 1
                if (gridPosX < 0 || gridPosX >= this.gridWidth) {
                    return
                }
                if (newMiniGrid[i][j] == true && this.grid[gridPosY][gridPosX] == true) {
                    // console.log('Overlapping')
                    // Find another block at that position
                    const overlappingBlock = this.currentBlocks.find(block => {
                        if (block.x == gridPosX && block.y == gridPosY) {
                            return true
                        }
                    })

                    // console.log(overlappingBlock)

                    if (overlappingBlock == null) {
                        console.log('Did not rotate because of collision')
                        return
                    }
                }



            }

        }

        console.log(this.currentBlocks)
        this.currentBlocks.forEach(block => {
            this.grid[block.y][block.x] = false
        })


        let counter = 0
        // FInd all blocks exept origin
        // this.grid[originPosition.y - 1][originPosition.x - 1] = newMiniGrid[0][0]
        // this.grid[originPosition.y - 1][originPosition.x + 0] = newMiniGrid[0][1]
        // this.grid[originPosition.y - 1][originPosition.x + 1] = newMiniGrid[0][2]
        // if(newMiniGrid[0][1] == true) {
        //     this.currentBlocks.x = originPosition.y - 1
        //     this.currentBlocks.y = originPosition.x - 1
        // }

        // Update blocks with new rotation
        for (let i = 0; i < 3; i++) {
            const newMiniGridRow = newMiniGrid[i];
            for (let j = 0; j < 3; j++) {
                const gridPosX = originPosition.x + j - 1
                const gridPosY = originPosition.y + i - 1
                this.grid[gridPosY][gridPosX] = newMiniGrid[i][j]

                if (this.grid[gridPosY][gridPosX] == true) {
                    if (j == 1 && i == 1) {
                        this.currentBlocks[counter].isOrigin = true
                    } else {
                        this.currentBlocks[counter].isOrigin = false
                    }
                    this.currentBlocks[counter].x = gridPosX
                    this.currentBlocks[counter].y = gridPosY

                    counter += 1
                } else {

                }

            }

        }

        // this.grid[originPosition.y][originPosition.x - 1] = newMiniGrid[1][0]
        // this.grid[originPosition.y][originPosition.x + 0] = newMiniGrid[1][1]
        // this.grid[originPosition.y][originPosition.x + 1] = newMiniGrid[1][2]

        // this.grid[originPosition.y + 1][originPosition.x - 1] = newMiniGrid[2][0]
        // this.grid[originPosition.y + 1][originPosition.x + 0] = newMiniGrid[2][1]
        // this.grid[originPosition.y + 1][originPosition.x + 1] = newMiniGrid[2][2]

        // console.log(this.grid)



        // Check if going to collide (ignore wall kicks)

        // Replace 
    }
}