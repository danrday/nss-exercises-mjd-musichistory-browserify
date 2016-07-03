"use strict";

let musicProgram = require("./musicHistoryModule");
let addDeleteButtons = require("./domFunctions").addDeleteButtons;
let printArtistList = require("./domFunctions").printArtistList;
let addNewSong = require("./addNewSong");
let populateArtistList = require("./musicFilter");

//initial ajax request for list of songs
function ajaxRequest() {
  return new Promise((resolve, reject) => {$.ajax("json/json.json")
      .done( function(jsonData) {
        console.log("json data loaded:", jsonData);
        console.log("test var", musicProgram.testVar);
        resolve(jsonData);
      })
      .fail(function() {
        console.log("jqhxr request failed to load");
      });
    });
}

//does the ajax request then prints to dom and saves json in songData
  ajaxRequest().then(
    function(json_data){
      musicProgram.executeThisCodeAfterFileIsLoaded(json_data);
      musicProgram.songData = json_data;
      addDeleteButtons();
      populateArtistList(printArtistList);
});



// //expose list of songs... why can't you call it from the DOM?

// let getListOfSongs= function () {
//   return musicProgram.songData;
// };