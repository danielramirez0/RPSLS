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
  selectGesture(difficultyLvl, gestureArr) {
    switch (difficultyLvl) {
      case 1:
        return this.randomSelector(gestureArr);
      case 2:
        [a, ...gestureArr] = this.shuffle(gestureArr);
        return this.randomSelector(gestureArr);
      case 3:
        [a, b, c, ...gestureArr] = this.shuffle(gestureArr);
        return this.randomSelector(gestureArr);
    }
  }
  randomSelector = (arr) => arr[Math.trunc(Math.random() * arr.length)];
  // Function is used to increase the difficulty level
  shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
}

module.exports = {
  Player: Player,
  AI: AI,
};
