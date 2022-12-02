import Phaser from "phaser";
import Block from "../classes/Block";
import { BLUE, ORANGE } from "../consts/Colors";
Block

export default class ScorePanel extends Phaser.Scene {
    preload() {

    }

    init() {
        this.allRectangles = []
        console.log('Started Next Panel Scene')

        this.add.text(420, 120, 'Next', { fontSize: '20px' }).setOrigin(0.5);
        this.add.text(60, 300, 'Hold', { fontSize: '20px' }).setOrigin(0.5);

        // this.scoreText = this.add.text(480, 6, 'mmmmm', { fontSize: '26px' }).setOrigin(0.5);;
        // storeConstText.setFontSize(560)


    }

    update() {
        const nextShapes = this.registry.bag.concat(this.registry.nextBag).splice(0, 5)

        this.allRectangles.forEach(rect => {
            rect.destroy()
        })
        this.allRectangles = []

        // Draw the next shapes
        const cellSize = 8
        nextShapes.forEach((shapeLetter, index) => {
            const xOrigin = 420
            const yOrigin = 120 + 50 * (index + 1)
            const shape = Block.shapeCoords[shapeLetter]
            shape.forEach((s) => {

                this.allRectangles.push(this.add.rectangle(xOrigin + (s.x * cellSize), yOrigin + (s.y * cellSize), cellSize, cellSize, ORANGE))
                // console.log(s)
                // this.currentBlocks.push(new Block(shapeLetter, spawnPosition.y + s.y, spawnPosition.x + s.x, s.origin))
            })
        })

        // Draw the hold shape
        const xOrigin = 60
        const yOrigin = 340
        const holdShapeLetter = this.registry.holdShape
        if (holdShapeLetter != null) {
            const shape = Block.shapeCoords[holdShapeLetter]
            shape.forEach((s) => {

                this.allRectangles.push(this.add.rectangle(xOrigin + (s.x * cellSize), yOrigin + (s.y * cellSize), cellSize, cellSize, ORANGE))
                // console.log(s)
                // this.currentBlocks.push(new Block(shapeLetter, spawnPosition.y + s.y, spawnPosition.x + s.x, s.origin))
            })
        }





    }
}