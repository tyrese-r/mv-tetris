import Phaser from "phaser"
import Game from "../scenes/Game"



export default class Block {
    static blockID = 0
    constructor(shape, y, x) {
        this.shape = shape

        this.x = x
        this.y = y

        return {
            shape: this.shape,
            x: this.x,
            y: this.y
        }
    }
}