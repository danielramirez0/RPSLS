"use strict";
const { getHowManyPlayers, configurePlayer } = require("./userInput");
const Game = require("./game");

const players = getHowManyPlayers() === 1 ? [configurePlayer(1), "AI"] : [configurePlayer(1), configurePlayer(2)];

let game = new Game(players[0], players[1]);
game.runGame();
