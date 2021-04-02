const colors = require("colors");
colors.setTheme({
  title: ["white", "bold"],
  text: ["cyan", "italic"],
  p1Highlight: ["red", "bold"],
  p2Highlight: ["blue", "bold"],
  draw: ["bgRed", "white"],
  winner: ["rainbow", "bold"],
});
const { Player, AI } = require("./player");

class Game {
  constructor(p1, p2, difficulty) {
    this.playerOne = new Player(p1);
    this.playerTwo = p2 === "AI" ? new AI(p2, difficulty) : new Player(p2);
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
    let p1 = `${this.playerOne.name}`.p1Highlight;
    let p2 = `${this.playerTwo.name}`.p2Highlight;
    console.log(`${p1} chose: ${choiceOne}`);
    console.log(`${p2} chose: ${choiceTwo}`);
    let roundWinner = result === this.playerOne.name ? p1 : p2;
    console.log(result === "It's a tie!" ? `\n${result}\n`.draw : "\nThe round goes to ".text + `${roundWinner}\n`);
  }

  displayWinner() {
    let winner = this.playerOne.score > this.playerTwo.score ? `${this.playerOne.name} wins!` : `${this.playerTwo.name} wins!`;
    console.log(`${winner}`.winner);
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
        return g2 === g1 ? "It's a tie!" : g2 === "Scissors" || g2 === "Lizard" ? this.playerOne.name : this.playerTwo.name;
      case "Paper":
        return g2 === g1 ? "It's a tie!" : g2 === "Spock" || g2 === "Rock" ? this.playerOne.name : this.playerTwo.name;
      case "Scissors":
        return g2 === g1 ? "It's a tie!" : g2 === "Paper" || g2 === "Lizard" ? this.playerOne.name : this.playerTwo.name;
      case "Lizard":
        return g2 === g1 ? "It's a tie!" : g2 === "Spock" || g2 === "Paper" ? this.playerOne.name : this.playerTwo.name;
      case "Spock":
        return g2 === g1 ? "It's a tie!" : g2 === "Scissors" || g2 === "Rock" ? this.playerOne.name : this.playerTwo.name;
    }
  }

  updateScore(result) {
    result === "It's a tie!" ? null : result === this.playerOne.name ? this.playerOne.score++ : this.playerTwo.score++;
  }

  mapNumberToGesture = (array, index) => array[index - 1];
}

class GameHardMode extends Game {
  constructor(p1, p2, banner, rules, gestures) {
    super(p1, p2, banner, rules, gestures);
  }

  runGame() {
    console.log(this.banner);
    console.log("THIS IS HARD MODE! GOOD LUCK!".bgBlack.red.bold);
    this.displayRules();

    while (this.playerOne.score < 3 && this.playerTwo.score < 3) {
      let playerGesture1 = this.getGesture(this.playerOne);
      console.clear();
      let playerGesture2 = this.getGesture(this.playerTwo);
      console.clear();
      let roundResult = this.getRoundVictor(playerGesture1, playerGesture2);
      this.displayRoundResults(playerGesture1, playerGesture2, roundResult);
      this.teachAI(playerGesture1, playerGesture2, roundResult);
      this.updateScore(roundResult);
    }

    this.displayWinner();
  }

  teachAI(player1Decision, player2Decision, lastResults) {
    this.playerTwo.knowledge.previousRound.playerOneGesture = player1Decision;
    this.playerTwo.knowledge.previousRound.playerTwoGesture = player2Decision;
    this.playerTwo.knowledge.previousRound.victor = lastResults === "It's a tie!" ? 0 : lastResults === this.playerOne.name ? 1 : 2;
  }
}

class GameImpossibleMode extends Game {
  constructor(p1, p2, banner, rules, gestures) {
    super(p1, p2, banner, rules, gestures);
    this.rules = ["First to...", "Ok, you know what?", "I'm not going to waste time", "You won't win anyway..."];
  }

  runGame() {
    console.log(this.banner);
    console.log("THIS IS IMPOSSIBLE MODE! YOU...WILL...LOSE".america.bold.underline);
    this.displayRules();

    while (this.playerOne.score < 3 && this.playerTwo.score < 3) {
      let playerGesture1 = this.getGesture(this.playerOne);
      console.clear();
      this.teachAI(playerGesture1);
      let playerGesture2 = this.getGesture(this.playerTwo);
      console.clear();
      let roundResult = this.getRoundVictor(playerGesture1, playerGesture2);
      this.displayRoundResults(playerGesture1, playerGesture2, roundResult);
      this.updateScore(roundResult);
    }

    this.displayWinner();
  }

  teachAI(player1Decision) {
    this.playerTwo.knowledge.previousRound.playerOneGesture = player1Decision;
  }
}

module.exports = {
  Game: Game,
  GameHardMode: GameHardMode,
  GameImpossibleMode: GameImpossibleMode,
};
