const Player = require("./player");

class Game {
  constructor(p1, p2) {
    this.playerOne = new Player(p1);
    this.playerTwo = new Player(p2);

    this.rules = [
      "Welcome to Rock, Paper, Scissors, Lizard, Spock",
      "Standard RPS rule with a twist!",
      "First to win three rounds wins the game",
      "Gesture Victories:",
      "Rock > Scissors & Lizard",
      "Paper > Spock & Rock",
      "Scissors > Paper & Lizard",
      "Lizard > Spock & Paper",
      "Spock > Scissors & Rock",
    ];

    this.gesture = [];
  }

  runGame() {
    this.displayRules();
  }

  displayRules() {
    for (const rule of this.rules) {
      console.log(rule);
    }
  }
}

module.exports = Game;
