const colors = require("colors");
colors.setTheme({
  title: ["white", "bold"],
  text: ["cyan", "italic"],
  p1Highlight: ["red", "bold"],
  p2Highlight: ["blue", "bold"],
  draw: ["bgReg", "white"],
});
const { Player, AI } = require("./player");

class Game {
  constructor(p1, p2) {
    this.playerOne = new Player(p1);
    this.playerTwo = p2 === "AI" ? new AI(p2) : new Player(p2);
    this.banner = "\nWelcome to Rock, Paper, Scissors, Lizard, Spock\n\tIt's ".title + `${this.playerOne.name}`.p1Highlight + " vs " + `${this.playerTwo.name}`.p2Highlight;
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
    console.log(this.banner);
    this.displayRules();

    while (this.playerOne.score < 3 && this.playerTwo.score < 3) {
      let playerGesture1 = this.getGesture(this.playerOne);
      console.clear();
      let playerGesture2 = this.getGesture(this.playerTwo);
      console.clear();
      let roundResult = this.getRoundVictor(playerGesture1, playerGesture2);
      this.displayRoundResults(playerGesture1, playerGesture2, roundResult);
      this.updateScore(roundResult);
    }
    this.displayWinner();
  }

  displayRoundResults(choiceOne, choiceTwo, result) {
    console.log(`${this.playerOne.name}`.p1Highlight + ` chose: ${choiceOne}`);
    console.log(`${this.playerTwo.name}`.p2Highlight + ` chose: ${choiceTwo}`);
    console.log(result === "It's a tie!" ? `\n${result}\n`.draw : "\nThe round goes to ".text + `${result}\n`);
  }

  displayWinner() {
    let winner = this.playerOne.score > this.playerTwo.score ? `${this.playerOne.name} wins!` : `${this.playerTwo.name} wins!`;
    console.log(`${winner}`.rainbow);
  }

  displayRules() {
    console.log("\n");
    for (const rule of this.rules) {
      console.log(`\t${rule}`.text);
    }
    console.log("\n");
  }

  displayGestures(playerName) {
    console.log(`${playerName}, select an option:`.text + "\n");
    for (let i = 0; i < this.gestures.length; i++) {
      const gesture = this.gestures[i];
      console.log(`\t(${i + 1}) : ${gesture}`.text);
    }
    console.log("\n");
  }

  getGesture(player, reprompt = false) {
    this.displayGestures(player.name);
    switch (player.name) {
      case "AI":
        return player.selectGesture(player.difficultyLvl, this.gestures);
      default:
        let playerGesture = player.selectGesture(reprompt);
        playerGesture = this.mapNumberToGesture(this.gestures, playerGesture);
        return this.gestures.includes(playerGesture) ? playerGesture : this.getGesture(player, true);
    }
  }

  getRoundVictor(g1, g2) {
    switch (g1) {
      case "Rock":
        return g2 === g1 ? "It's a tie!" : g2 === "Scissors" || g2 === "Lizard" ? `${this.playerOne.name}`.p1Highlight : `${this.playerTwo.name}`.p2Highlight;
      case "Paper":
        return g2 === g1 ? "It's a tie!" : g2 === "Spock" || g2 === "Rock" ? `${this.playerOne.name}`.p1Highlight : `${this.playerTwo.name}`.p2Highlight;
      case "Scissors":
        return g2 === g1 ? "It's a tie!" : g2 === "Paper" || g2 === "Lizard" ? `${this.playerOne.name}`.p1Highlight : `${this.playerTwo.name}`.p2Highlight;
      case "Lizard":
        return g2 === g1 ? "It's a tie!" : g2 === "Spock" || g2 === "Paper" ? `${this.playerOne.name}`.p1Highlight : `${this.playerTwo.name}`.p2Highlight;
      case "Spock":
        return g2 === g1 ? "It's a tie!" : g2 === "Scissors" || g2 === "Rock" ? `${this.playerOne.name}`.p1Highlight : `${this.playerTwo.name}`.p2Highlight;
    }
  }

  updateScore(result) {
    result === "It's a tie!" ? null : result === `${this.playerOne.name}`.p1Highlight ? this.playerOne.score++ : this.playerTwo.score++;
  }

  mapNumberToGesture = (array, index) => array[index - 1];
}

class GameHardMode extends Game {
  constructor(p1, p2, banner, rules, gestures) {
    super(p1, p2, banner, rules, gestures);
    this.difficultyMod = {
      playerOneWonLast: false,
      playerOneLastChoice: "",
      AILastChoice: "",
    };
  }
}

module.exports = {
  Game: Game,
  GameHardMode: GameHardMode,
};
