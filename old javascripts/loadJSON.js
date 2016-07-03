"use strict";

let songPrinter = require("./songPrinter");
let songPrint = require("./songPrint");



let songData = null;

let $moreButton = $("#moreButton");
$moreButton.click(addMoreSongs);

function executeThisCodeAfterFileIsLoaded(responseText) {
  songData = responseText;
  console.log("songData", songData);
  songPrint(songData);
}

let jsonLoadChain = function() {
  myRequest()
  .then(
    function(json_data){
      songData = json_data;
      console.log("TEST")
})
}


function myRequest() {
  return new Promise((resolve, reject) => {$.ajax("json/json.json")
      .done( function(jsonData) {
        executeThisCodeAfterFileIsLoaded;
        resolve jsonData;
      })
      .fail(function() {
        console.log("jqhxr request failed to load");
      });
    });
}
      // .always(function() {
      //   });

function addMoreSongs() {
    $.ajax("json/json2.json")
      .done(addNewMusic)
      .fail(function() {
        console.log("jqhxr request failed to load");
      });
      // .always(function() {
      //   });
}
//adds additional JSON file from addMoreSongs
function addNewMusic(responseText) {
  let newSongData = responseText;
  newSongData.forEach(function(object){
    songData.unshift(object);
    songPrint(songData);
  });
  }

module.exports = {executeThisCodeAfterFileIsLoaded, addMoreSongs, addNewMusic, songData};
