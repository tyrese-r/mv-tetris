# Tetris clone
This is a clone of tetris I made using phaser.js
Play [here](https://tyrese-r.github.io/mv-tetris)
# TODO List
## MVP
- [x] Spawn tetrominoes
    - [x] Spawn all shapes
    - [x] Spawn at top
    - [x] Implement random bag system
    - [x] Spawn random tetrominoes
- [x] Snap tetrominoes to grid
- [x] Move tetrominoes down cell by cell
- [x] Move tetrominoes horizontally
- [x] Add collision to tetrominoes
- [x] Rotate tetrominoes
    - [x] Basic rotation
    - [x] Rotate with collision (ignore wall kicks)
    - [x] Rotate I shape
    - [x] Rotate all other shapes
- [x] Detect when a row is complete
    - [x] Delete row
    - [x] Move rows above down
- [ ] End game when tetromino hits ceiling
- [x] Draw tetrominoes on grid
- [x] Create grid data structure
- [x] Draw grid

- [x] Move new tetrominoes if they can all move down together if not then stop them at that position

## Extensions
- [ ] Increase grid size and make blocks spawn outside viewable area
- [ ] Upload to hosting server (github pages)
- [ ] Add scoring system
- [ ] Speed the game up over time
- [ ] Show next tetromino
- [ ] Hold tetromino
- [ ] Add menu


## Other extensions
- [ ] Implement easy rotate (where player can rotate if on the ground)
- [ ] Improve css of page
- [ ] Add music
- [ ] Internet leaderboard


## Bugs identified
- [ ] Fix I shape collider when rotating