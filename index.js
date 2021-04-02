"use strict";
const { getHowManyPlayers, configurePlayer, getDifficultyLevel } = require("./userInput");
const { Game, GameHardMode, GameImpossibleMode } = require("./game");
let game;
const players = getHowManyPlayers() === 1 ? [configurePlayer(1), "AI"] : [configurePlayer(1), configurePlayer(2)];
const difficultyMod = players[1] === "AI" ? getDifficultyLevel() : 1;
console.clear();
if (difficultyMod === 1) {
  game = new Game(players[0], players[1]);
} else if (difficultyMod === 2) {
  game = new GameHardMode(players[0], players[1], difficultyMod);
} else {
  game = new GameImpossibleMode(players[0], players[1], difficultyMod);
}
game.runGame();
