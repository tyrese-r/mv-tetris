import Phaser from "phaser"
import Game from "../scenes/Game"



export default class Block {
    static blockID = 0
    constructor(shape, y, x, isOrigin = false) {
        this.shape = shape
        this.x = x
        this.y = y
        this.isOrigin = origin

        return {
            shape: this.shape,
            x: this.x,
            y: this.y,
            isOrigin: isOrigin,
        }
    }

    static rotationMap = {
        O: ['000011011', '000110110', '110110000', '011011000'],
        L: ['000111100', '110010010', '001111000', '010010011'],
        J: ['100111000', '011010010', '000111001', '010010110'],
        T: ['100110100', '111010000', '001011001', '000010111'],
        S: ['100110010', '011110000', '010011001', '000011110'],
        Z: ['010110100', '110011000', '001011010', '000110011']
    }

    static shapeCoords = {
        O: [
            { x: 0, y: 1, origin: false },
            { x: -1, y: 1, origin: false },
            { x: 0, y: 0, origin: true },
            { x: -1, y: 0, origin: false }
        ],
        L: [
            { x: 0, y: 1, origin: false },
            { x: 0, y: 0, origin: true },
            { x: 0, y: -1, origin: false },
            { x: -1, y: -1, origin: false }
        ],
        J: [
            { x: 0, y: 1, origin: false },
            { x: 0, y: 0, origin: true },
            { x: 1, y: -1, origin: false },
            { x: 0, y: -1, origin: false }
        ],
        T: [
            { x: 0, y: 0, origin: true },
            { x: 1, y: -1, origin: false },
            { x: 0, y: -1, origin: false },
            { x: -1, y: -1, origin: false }
        ],
        S: [
            { x: 0, y: 1, origin: false },
            { x: -1, y: 1, origin: false },
            { x: 1, y: 0, origin: false },
            { x: 0, y: 0, origin: true }
        ],
        Z: [
            { x: 1, y: 1, origin: false },
            { x: 0, y: 1, origin: false },
            { x: 0, y: 0, origin: true },
            { x: -1, y: 0, origin: false }
        ],
        I: [
            { x: -2, y: 0, origin: false },
            { x: -1, y: 0, origin: false },
            { x: 0, y: 0, origin: true },
            { x: 1, y: 0, origin: false }
        ]
    }

}