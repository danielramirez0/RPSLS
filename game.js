const { Player, AI } = require("./player");

class Game {
  constructor(p1, p2) {
    this.playerOne = new Player(p1);
    this.playerTwo = p2 === "AI" ? new AI(p2) : new Player(p2);

    this.rules = [
      "\nWelcome to Rock, Paper, Scissors, Lizard, Spock",
      "Rock, Paper, Scissors with a twist!",
      "First to win three rounds wins the game",
      "\nGesture Victory Conditions:",
      "Rock > Scissors & Lizard",
      "Paper > Spock & Rock",
      "Scissors > Paper & Lizard",
      "Lizard > Spock & Paper",
      "Spock > Scissors & Rock\n",
    ];

    this.gestures = ["Rock", "Paper", "Scissors", "Lizard", "Spock"];
  }

  runGame() {
    this.displayRules();

    while (this.playerOne.score < 3 && this.playerTwo.score < 3) {
      console.log(this.getGesture(this.playerOne));
      console.log(this.getGesture(this.playerTwo));

      this.playerOne.score++;
    }
  }

  displayRules() {
    for (const rule of this.rules) {
      console.log(rule);
    }
  }

  displayGestures() {
    console.log("Select an option:");
    for (const gesture of this.gestures) {
      console.log(`\t${gesture}`);
    }
  }
  getGesture(player, reprompt = false) {
    this.displayGestures();
    switch (player.name) {
      case "AI":
        return player.selectGesture(player.difficultyLvl, this.gestures);
      default:
        let playerGesture = player.selectGesture(reprompt);
        playerGesture = playerGesture[0].toUpperCase() + playerGesture.slice(1).toLowerCase();
        return this.gestures.includes(playerGesture) ? playerGesture : this.getGesture(player, true);
    }
  }
}

module.exports = Game;
