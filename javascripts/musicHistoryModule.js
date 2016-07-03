"use strict";

const songPrint = require("./songPrint");
const executeThisCodeAfterFileIsLoaded = require("./executeThisCodeAfterFileIsLoaded");
const addMoreSongsButton = require("./moreSongs").addMoreSongsButton;
const addNewMusic = require("./moreSongs").addNewMusic;

let songData = "null";

let testVar = "asdfasfd";

/* 
  Now, construct an object that contains a key/value pair for each
  of those modules that we pulled into this one
*/

let musicHistoryModule = {
 songData, songPrint, executeThisCodeAfterFileIsLoaded, addMoreSongsButton, addNewMusic, testVar
};

/*
  Every module needs to specify what its output is. Think of this as the
  return statement in a function. What are we returning for use by other
  modules in the application?
 */

module.exports = musicHistoryModule;