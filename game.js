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
      let playerGesture1 = this.getGesture(this.playerOne);
      let playerGesture2 = this.getGesture(this.playerTwo);
      let roundResult = this.getRoundVictor(playerGesture1, playerGesture2);
      console.log(`This round result: ${roundResult}`);
      this.updateScore(roundResult);
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
  getRoundVictor(g1, g2) {
    switch (g1) {
      case "Rock":
        return g2 === g1 ? "a tie" : g2 === "Scissors" || g2 === "Lizard" ? "p1 wins" : "p1 loses";
      case "Paper":
        return g2 === g1 ? "a tie" : g2 === "Spock" || g2 === "Rock" ? "p1 wins" : "p1 loses";
      case "Scissors":
        return g2 === g1 ? "a tie" : g2 === "Paper" || g2 === "Lizard" ? "p1 wins" : "p1 loses";
      case "Lizard":
        return g2 === g1 ? "a tie" : g2 === "Spock" || g2 === "Paper" ? "p1 wins" : "p1 loses";
      case "Spock":
        return g2 === g1 ? "a tie" : g2 === "Scissors" || g2 === "Rock" ? "p1 wins" : "p1 loses";
    }
  }
  updateScore(result) {
    switch (result) {
      case "p1 wins":
        this.playerOne.score++;
        break;
      case "p1 loses":
        this.playerTwo.score++;
        break;
      default:
        break;
    }
  }
}

module.exports = Game;
