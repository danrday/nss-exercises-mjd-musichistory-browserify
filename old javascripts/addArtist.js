"use strict";

let songPrint = require("./songPrint");
let songPrinter = require("./songPrinter");
let songData = require("./loadJSON");


//DOM ELEMENTS
//main nav
var $elAddMusic = $("#elAddMusic");
//main output div
var $elListSongs = $("#listSongs");
//add new artist page
var $addArtistButton= $("#addArtistButton");
//add artist input div
var $addArtist = $("#addArtist");
//left side select options
var $elArtistSelect = $("#artistSelect");

//EVENT LISTENERS
//shows the add artist section
$elAddMusic.click(classTrigger);
//closes add artist section after user submits
$addArtistButton.click(classTrigger);
//submits user data for add artist
$addArtistButton.click(addNewArtist);



//if user presses enter after entering info, it runs the addNewArtist function
document.getElementById("newAlbum").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        $addArtistButton.click();
    }
});


//function to add new artist to songData
function addNewArtist() {
  var $artist = $("#newArtist");
  var $song = $("#newSong");
  var $album = $("#newAlbum");

  var newObj = { "Song": $song.val(), "Artist": $artist.val(), "Album": $album.val()};

//PROBLEM AREA

  console.log(songData);
  // songData.unshift(newObj);
  // songPrint(songData);

  

}

//triggers css visibility classes to make new page for "add artist"
function classTrigger() {
  $addArtist.toggleClass("visibility");
  $elArtistSelect.toggleClass("visibility");
  $elListSongs.toggleClass("visibility");
}

module.exports = {addNewArtist, classTrigger};