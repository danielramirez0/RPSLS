const prompt = require("prompt-sync")();
const Game = require("./game");

const promptFor = function (question, valid) {
  do {
    var response = prompt(question);
  } while (!response || !valid(response));
  return response;
};
const isNum = (input) => !isNaN(input);
const isValid = () => true;
let numberOfPlayers = parseInt(promptFor("Choose an option - (1) Single player game - (2)Two player game : ", isNum));
const players =
  numberOfPlayers === 1 ? [promptFor("Enter name for player one: ", isValid), "AI"] : [promptFor("Enter name for player one: ", isValid), promptFor("Enter name for player two: ", isValid)];

console.log(players);
// prompt("Enter the name of player separated by a space").split;

let game = new Game(players[0], players[1]);
game.runGame();
