const Player = require("./player");

class Game {
  constructor(p1, p2) {
    this.playerOne = new Player(p1);
    this.playerTwo = new Player(p2);

    this.gesture = [];
  }

  runGame() {
    console.log(this.playerOne);
    console.log(this.playerTwo);
  }
}

module.exports = Game;
