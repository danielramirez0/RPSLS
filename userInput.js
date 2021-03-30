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
const configurePlayer = (p) => promptFor(`Enter the name of player ${p}: `, isValid);

const typedGesture = () => promptFor(`Type your chosen your gesture: `, isValid);

module.exports = {
  typedGesture: typedGesture,
  configurePlayer: configurePlayer,
  getHowManyPlayers: getHowManyPlayers,
};
