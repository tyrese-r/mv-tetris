import Phaser from "phaser";

export default class ScorePanel extends Phaser.Scene {
    preload() {

    }

    init() {
        console.log('Started Score Panel Scene')

        this.add.text(60, 120, 'Score', { fontSize: '20px' }).setOrigin(0.5);
        this.scoreText = this.add.text(60, 160, 'mmmmm', { fontSize: '26px' }).setOrigin(0.5);;
        // storeConstText.setFontSize(560)
        console.log(this.registry.score)
    }

    update() {
        this.scoreText.text = this.registry.score
    }
}