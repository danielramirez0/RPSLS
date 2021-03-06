const colors = require("colors");
const prompt = require("prompt-sync")();
const promptAlt = require("readline-sync");
colors.setTheme({
  promptStyle: ["yellow", "bold", "underline"],
});

const promptFor = function (question, valid) {
  do {
    var response = prompt(question);
  } while (!response || !valid(response));
  return response;
};

const promptHidden = function (q, valid) {
  do {
    var response = promptAlt.question(q, {
      hideEchoBack: true,
    });
  } while (!response || !valid(response));
  return response;
};

const isValid = () => true;
const isNumOneOrTwo = (input) => (input >= 1 && input <= 2 ? true : false);
const isNumOneToThree = (input) => (input >= 1 && input <= 3 ? true : false);
const isNumOneToFive = (input) => (input >= 1 && input <= 5 ? true : false);

const getHowManyPlayers = () => parseInt(promptFor("(1) Single player game or (2)Two player game: ".promptStyle, isNumOneOrTwo));
const configurePlayer = (p) => promptFor(`Enter the name of player ${p}: `.promptStyle, isValid);
const typedGesture = () => parseInt(promptHidden("Select a gesture #: ".promptStyle, isNumOneToFive));
const getDifficultyLevel = () => parseInt(promptFor("(1) Easy mode, (2) Hard mode, or (3) Impossible mode: ".promptStyle, isNumOneToThree));

module.exports = {
  typedGesture: typedGesture,
  configurePlayer: configurePlayer,
  getHowManyPlayers: getHowManyPlayers,
  getDifficultyLevel: getDifficultyLevel,
};
