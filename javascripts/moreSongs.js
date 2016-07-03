"use strict";

// let musicProgram = require("./musicHistoryModule");
let songPrint = require("./songPrint");


function addMoreSongsButton() {
    return new Promise((resolve, reject) => {$.ajax("json/json2.json")
      .done(function(jsonData) {
        resolve(jsonData);
      })
      .fail(function() {
        console.log("jqhxr request failed to load");
      });
      });
}


//adds additional JSON file from addMoreSongs
function addNewMusic(responseText, songData) {
  let newSongData = responseText;
  // console.log("TESTING", musicProgram.testVar);
  newSongData.forEach(function(object){
    songData.unshift(object);
    songPrint(songData);
  });
  }

module.exports = {addMoreSongsButton, addNewMusic};