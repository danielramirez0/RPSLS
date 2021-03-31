const colors = require("colors");
const prompt = require("prompt-sync")();

const promptFor = function (question, valid) {
  do {
    var response = prompt(question);
  } while (!response || !valid(response));
  return response;
};
const isNum = (input) => !isNaN(input);
const isValid = () => true;

const getHowManyPlayers = () => parseInt(promptFor("(1) Single player game or (2)Two player game: ".yellow.bold.underline, isNum));
const configurePlayer = (p) => promptFor(`Enter the name of player ${p}: `.yellow.bold.underline, isValid);

const typedGesture = () => promptFor(`Type your chosen your gesture: `.yellow.bold, isValid);

module.exports = {
  typedGesture: typedGesture,
  configurePlayer: configurePlayer,
  getHowManyPlayers: getHowManyPlayers,
};
