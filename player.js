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
  constructor(name, score, difficultyLvl = 1) {
    super(name, score);
    this.difficultyLvl = difficultyLvl;
  }
  selectGesture(userChoice, difficultyLvl, gestureArr) {
    switch (difficultyLvl) {
      case 1:
        return this.randomSelector(gestureArr);
      case 2:
        [removed, ...gestureArr] = gestureArr;
        break;
      case 3:
        break;
    }
  }
  randomSelector = (arr) => arr[Math.trunc(Math.random() * arr.length)];
  shuffleArray = (arr) => poop;
}

module.exports = {
  Player: Player,
  AI: AI,
};
