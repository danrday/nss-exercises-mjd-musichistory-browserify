"use strict";

let musicProgram = require("./musicHistoryModule");
let addDeleteButtons = require("./domFunctions");

//main nav button to add new music
var $elAddMusic = $("#elAddMusic");
//add new artist button
var $addArtistButton= $("#addArtistButton");
//add artist input div
var $addArtist = $("#addArtist");
//left side select options
var $elArtistSelect = $("#artistSelect");
//main output div
var $elListSongs = $("#listSongs");

$elAddMusic.click(classTrigger);
//closes add artist section after user submits
$addArtistButton.click(classTrigger);
//submits user data for add artist
$addArtistButton.click(addNewArtist);

//function to add new artist to songData
function addNewArtist() {
  var $artist = $("#newArtist");
  var $song = $("#newSong");
  var $album = $("#newAlbum");
  var newObj = { "Song": $song.val(), "Artist": $artist.val(), "Album": $album.val()};

  musicProgram.songData.unshift(newObj);
  musicProgram.songPrint(musicProgram.songData);
  addDeleteButtons();
}

//if user presses enter after entering info, it runs the addNewArtist function
document.getElementById("newAlbum").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        $addArtistButton.click();
    }
});

function classTrigger() {
  $addArtist.toggleClass("visibility");
  $elArtistSelect.toggleClass("visibility");
  $elListSongs.toggleClass("visibility");
}

