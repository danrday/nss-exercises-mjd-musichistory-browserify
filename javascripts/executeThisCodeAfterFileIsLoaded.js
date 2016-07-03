"use strict";

let songPrint = require("./songPrint");

function executeThisCodeAfterFileIsLoaded(responseText) {
  songPrint(responseText);
}

module.exports = executeThisCodeAfterFileIsLoaded;