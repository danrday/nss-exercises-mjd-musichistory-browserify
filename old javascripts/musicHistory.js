"use strict";

const loadJSON = require("./loadJSON");
const songPrinter = require("./songPrinter");
const songPrint = require("./songPrint");
const addArtist = require("./addArtist");




/* 
  Now, construct an object that contains a key/value pair for each
  of those modules that we pulled into this one
*/
let musicHistory = {
 songPrint, loadJSON, addArtist, songPrinter
};

/*
  Every module needs to specify what its output is. Think of this as the
  return statement in a function. What are we returning for use by other
  modules in the application?
 */

module.exports = musicHistory;