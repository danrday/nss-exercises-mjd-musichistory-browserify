"use strict";

let musicProgram = require("./musicHistoryModule");

let $moreButton = $("#moreButton");
$moreButton.click(addSongs);

//add more songs button at the bottom
function addSongs(music) {
  musicProgram.addMoreSongsButton()
  .then(function(json) {
  console.log("ADD MORE SONGS");
    musicProgram.addNewMusic(json, musicProgram.songData);
    $moreButton.prop('disabled', true);

   addDeleteButtons();

  });
}

//waits for document to be ready and then adds delete buttons
let addDeleteButtons = function() {
   $(document).ready(function() {
  let $elDeleteMusic = $(".deleteButton");
  $elDeleteMusic.click(deleteItem);
  });
};


//locates which div you clicked on to delete
let deleteItem = function () {
  var elToDelete = event.target.closest("div");
  var idToDelete = elToDelete.id.split("--")[1];
  musicProgram.songData.splice(idToDelete, 1);
  musicProgram.songPrint(musicProgram.songData);

  addDeleteButtons();
};
 

let printArtistList = function(artistList) {
  let $selectArtist = $("#selectArtist");
  let htmlToAdd = "";
  htmlToAdd += `<option disabled selected>Select an artist.</option>`;

  for (var i = 1; i < artistList.length; i++) {
    htmlToAdd += `<option>${artistList[i]}</option>`;
  }

  $selectArtist.html(htmlToAdd);
};


  module.exports = {addDeleteButtons, printArtistList};


