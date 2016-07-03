"use strict";

let musicProgram = require("./musicHistoryModule");
let $selectArtist = $("#selectArtist");
let $selectAlbum = $("#selectAlbum");
let addDeleteButtons = require("./domFunctions").addDeleteButtons;


$selectAlbum.change(selectAlbum);

function selectAlbum() {
  console.log($selectArtist.val());
  console.log($selectAlbum.val());
  let musicByAlbum = [];
  if ($selectArtist.val() === null) {
    console.log("no artist is selected...");
  }
  for (var x in musicProgram.songData) {
    // console.log("songData", musicProgram.songData[x])
    if ($selectAlbum.val() === musicProgram.songData[x].Album) {
      musicByAlbum.push(musicProgram.songData[x]);
    }
    musicProgram.songPrint(musicByAlbum);
    console.log("YO", musicByAlbum);
  }
}

$selectArtist.change(selectArtist);

let filterResultsByArtist = [];

function selectArtist() {
  filterResultsByArtist = [];
  let selArtist = $selectArtist.val();
  for (var x in musicProgram.songData) {
    console.log("array data", musicProgram.songData[x].Artist);
    console.log("selected artist", selArtist);
    if (selArtist === musicProgram.songData[x].Artist) {
      console.log("HI");
      filterResultsByArtist.push(musicProgram.songData[x]);
      console.log("filter results by artist", filterResultsByArtist);
    }
  }
  musicProgram.songPrint(filterResultsByArtist);
  filterDeleteButtons();
  filterAlbums(selArtist);
}

//finds albums by selected artist and adds them to drop down selection
function filterAlbums(selArtist) {
  let eachAlbum = ["Select an album:"];

  for (var x in musicProgram.songData) {
    let artist = musicProgram.songData[x].Artist;
    let album = musicProgram.songData[x].Album
    let arrayCounter = null;

    for (var i = 0; i < eachAlbum.length; i++) {
      arrayCounter ++;
      let matchBoolean = false;

      if (artist === selArtist && album === eachAlbum[i]) {
        matchBoolean = true;
      }

      else {
        if(artist === selArtist && arrayCounter === eachAlbum.length && matchBoolean === false) {
          eachAlbum.push(album);
        } 
      }
    }
  }
  console.log(eachAlbum);

  let $selectAlbum = $("#selectAlbum");
  let htmlToAdd = "";
  htmlToAdd += `<option disabled selected>Select an album.</option>`;

  for (let i = 1; i < eachAlbum.length; i++) {
    htmlToAdd += `<option>${eachAlbum[i]}</option>`;
  }

  $selectAlbum.html(htmlToAdd);

}

//


//waits for document to be ready and then adds delete buttons
let filterDeleteButtons = function() {
   $(document).ready(function() {
  let $elDeleteMusic = $(".deleteButton");
  $elDeleteMusic.click(deleteFilteredItem);
  });
};


//locates which div you clicked on to delete
let deleteFilteredItem = function () {
  var elToDelete = event.target.closest("div");
  var idToDelete = elToDelete.id.split("--")[1];
  musicProgram.songData.splice(idToDelete, 1);
  filterResultsByArtist.splice(idToDelete, 1)
  musicProgram.songPrint(filterResultsByArtist);

  filterDeleteButtons();
};
 

function populateArtistList(callback) {
  console.log("HELLO");
  let eachArtist = ["Select an artist:"];

  for (var x in musicProgram.songData) {
    let artist = musicProgram.songData[x].Artist;
    let arrayCounter = null;

    for (var i = 0; i < eachArtist.length; i++) {
      arrayCounter ++;
      let matchBoolean = false;

      if (artist === eachArtist[i]) {
        matchBoolean = true;
      }

      else {
        if(arrayCounter === eachArtist.length && matchBoolean === false) {
          eachArtist.push(artist);
        } 
      }
    }
  }
  console.log(eachArtist);
  callback(eachArtist);
}









module.exports = populateArtistList;