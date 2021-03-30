class Player {
  constructor(name) {
    this.score = 0;
    this.name = name;
  }

  selectGesture(options) {
    return getGesture(options);
  }
}

module.exports = Player;
