class Player {
  constructor(name) {
    this.score = 0;
    this.name = name;
  }

  selectGesture(option) {
    return getGesture(option);
  }
}

module.exports = Player;
