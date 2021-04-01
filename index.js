"use strict";
const { getHowManyPlayers, configurePlayer, getDifficultyLevel } = require("./userInput");
const { Game, GameHardMode } = require("./game");
let game;
const players = getHowManyPlayers() === 1 ? [configurePlayer(1), "AI"] : [configurePlayer(1), configurePlayer(2)];
const difficultyMod = players[1] === "AI" ? getDifficultyLevel() : false;
console.clear();
if (difficultyMod === false) {
  game = new Game(players[0], players[1]);
} else {
  game = new GameHardMode(players[0], players[1], difficultyMod);
}
game.runGame();
