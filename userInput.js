const prompt = require("prompt-sync")();

const promptFor = function (question, valid) {
  do {
    var response = prompt(question);
  } while (!response || !valid(response));
  return response;
};
const isNum = (input) => !isNaN(input);
const isValid = () => true;

const getHowManyPlayers = () => parseInt(promptFor("Choose an option - (1) Single player game - (2)Two player game : ", isNum));
const configurePlayer = (num) => promptFor(`Enter the name of player ${num}:`, isValid);

module.exports = {
  configurePlayer: configurePlayer,
  getHowManyPlayers: getHowManyPlayers,
};
