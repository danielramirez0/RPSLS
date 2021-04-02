const { typedGesture } = require("./userInput");

class Player {
  constructor(name) {
    this.score = 0;
    this.name = name;
  }

  selectGesture(reprompt) {
    if (reprompt === true) {
      console.log("\nPlease enter a valid option from the available gestures\n");
    }
    return typedGesture();
  }
}

class AI extends Player {
  constructor(name, difficultyLvl = 1, score) {
    super(name, score);
    this.difficultyLvl = difficultyLvl;
    this.knowledge = {
      currentRound: 1,
      strengths: {
        Rock: ["Scissors", "Lizard"],
        Paper: ["Spock", "Rock"],
        Scissors: ["Paper", "Lizard"],
        Lizard: ["Spock", "Paper"],
        Spock: ["Scissors", "Rock"],
      },
      weaknesses: {
        Rock: ["Paper", "Spock"],
        Paper: ["Scissors", "Lizard"],
        Scissors: ["Rock", "Spock"],
        Lizard: ["Rock", "Scissors"],
        Spock: ["Paper", "Lizard"],
      },
      previousRound: {
        playerOneGesture: "",
        playerTwoGesture: "",
        victor: 0,
      },
    };
  }

  selectGesture(difficultyLvl, gestureArr) {
    if (difficultyLvl === 1 || this.knowledge.currentRound === 1) {
      this.knowledge.currentRound++;
      return this.randomSelector(gestureArr);
    } else if (difficultyLvl === 2) {
      return this.knowledge.previousRound.victor === 0
        ? this.randomSelector(gestureArr)
        : this.knowledge.previousRound.victor === 1
        ? this.makePredictiveSelection(1)
        : this.makePredictiveSelection(2);
    } else {
      return this.makePredictiveSelection(3);
    }
  }

  randomSelector = (arr) => arr[Math.trunc(Math.random() * arr.length)];

  makePredictiveSelection(basis) {
    let newGesture;
    if (basis === 1) {
      let targetGesture = this.knowledge.previousRound.playerOneGesture;
      newGesture = this.randomSelector(this.knowledge.weaknesses[targetGesture]);
    } else if (basis === 2) {
      let targetGesture = this.knowledge.previousRound.playerTwoGesture;
      newGesture = this.randomSelector(this.knowledge.strengths[targetGesture]);
    } else {
      let targetGesture = this.knowledge.previousRound.playerOneGesture;
      newGesture = this.randomSelector(this.knowledge.weaknesses[targetGesture]);
    }
    return newGesture;
  }
}

module.exports = {
  Player: Player,
  AI: AI,
};
