const colors = require("colors");
colors.setTheme({
  title: "white",
  text: "grey",
  prompt: "yellow",
  result: "red",
});
const { Player, AI } = require("./player");

class Game {
  constructor(p1, p2) {
    this.playerOne = new Player(p1);
    this.playerTwo = p2 === "AI" ? new AI(p2) : new Player(p2);

    this.banner = "\nWelcome to Rock, Paper, Scissors, Lizard, Spock\n\tRock, Paper, Scissors with a twist!";
    this.rules = [
      "First to win three rounds wins the game",
      "Rock beats Scissors & Lizard",
      "Paper beats Spock & Rock",
      "Scissors beats Paper & Lizard",
      "Lizard beats Spock & Paper",
      "Spock beats Scissors & Rock",
    ];

    this.gestures = ["Rock", "Paper", "Scissors", "Lizard", "Spock"];
  }

  runGame() {
    console.log(`${this.banner}`.title.bold);
    this.displayRules();

    while (this.playerOne.score < 3 && this.playerTwo.score < 3) {
      let playerGesture1 = this.getGesture(this.playerOne);
      let playerGesture2 = this.getGesture(this.playerTwo);
      let roundResult = this.getRoundVictor(playerGesture1, playerGesture2);
      console.log(roundResult === "It's a tie!" ? `\n${roundResult}\n` : `\nThis round victor is ${roundResult}\n`);
      this.updateScore(roundResult);
    }
    this.displayWinner();
  }

  displayWinner() {
    console.log(this.playerOne.score > this.playerTwo.score ? `${this.playerOne.name} wins!` : `${this.playerTwo.name} wins!`);
  }
  displayRules() {
    console.log("\n");
    for (const rule of this.rules) {
      console.log(`\t${rule}`.title.italic);
    }
    console.log("\n");
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
        return g2 === g1 ? "It's a tie!" : g2 === "Scissors" || g2 === "Lizard" ? "Player 1" : "Player 2";
      case "Paper":
        return g2 === g1 ? "It's a tie!" : g2 === "Spock" || g2 === "Rock" ? "Player 1" : "Player 2";
      case "Scissors":
        return g2 === g1 ? "It's a tie!" : g2 === "Paper" || g2 === "Lizard" ? "Player 1" : "Player 2";
      case "Lizard":
        return g2 === g1 ? "It's a tie!" : g2 === "Spock" || g2 === "Paper" ? "Player 1" : "Player 2";
      case "Spock":
        return g2 === g1 ? "It's a tie!" : g2 === "Scissors" || g2 === "Rock" ? "Player 1" : "Player 2";
    }
  }
  updateScore(result) {
    switch (result) {
      case "Player 1":
        this.playerOne.score++;
        break;
      case "Player 2":
        this.playerTwo.score++;
        break;
      default:
        break;
    }
  }
}

module.exports = Game;
