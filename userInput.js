const colors = require("colors");
const prompt = require("prompt-sync")();

const promptFor = function (question, valid) {
  do {
    var response = prompt(question);
  } while (!response || !valid(response));
  return response;
};
const isNumOneOrTwo = (input) => (input >= 1 && input <= 2 ? true : false);
const isValid = () => true;
const isNumOneThroughFive = (input) => (input >= 1 && input <= 5 ? true : false);

const getHowManyPlayers = () => parseInt(promptFor("(1) Single player game or (2)Two player game: ".yellow.bold.underline, isNumOneOrTwo));
const configurePlayer = (p) => promptFor(`Enter the name of player ${p}: `.yellow.bold.underline, isValid);
const typedGesture = () => parseInt(promptFor("Select a gesture #: ".yellow.bold, isNumOneThroughFive));
const getDifficultyLevel = () => parseInt(promptFor("(1) Easy mode or (2) Hard mode: ".yellow.bold.underline, isNumOneOrTwo));

module.exports = {
  typedGesture: typedGesture,
  configurePlayer: configurePlayer,
  getHowManyPlayers: getHowManyPlayers,
  getDifficultyLevel: getDifficultyLevel,
};
