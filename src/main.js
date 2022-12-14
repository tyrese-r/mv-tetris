import Phaser from "phaser";
// import TitleScreen from "./scenes/TitleScreen";
import Game from "./scenes/Game";

// import GameBackground from "./scenes/GameBackground";

import * as SceneKeys from './consts/SceneKeys'
import ScorePanel from "./scenes/ScorePanel";
import NextPanel from "./scenes/NextPanel";


// import WebFontFile from "./scenes/WebFontFile";

const config = {
  width: 24*20,
  height: 24*20,
  type: Phaser.AUTO,
}

const game = new Phaser.Game(config)



// game.scene.add(SceneKeys.TitleScreen, TitleScreen)
// game.scene.start('titlescreen')

game.scene.add(SceneKeys.Game, Game)
game.scene.add(SceneKeys.ScorePanel, ScorePanel)
game.scene.add(SceneKeys.NextPanel, NextPanel)
game.scene.start(SceneKeys.Game)

game.scene.start(SceneKeys.ScorePanel)
game.scene.start(SceneKeys.NextPanel)

// game.scene.add(SceneKeys.GameBackground, GameBackground)
// game.scene.start(SceneKeys.GameBackground)
