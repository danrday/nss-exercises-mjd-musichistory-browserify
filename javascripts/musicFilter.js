"use strict";

let musicProgram = require("./musicHistoryModule");
let $selectArtist = $("#selectArtist");
let $selectAlbum = $("#selectAlbum");
let addDeleteButtons = require("./domFunctions").addDeleteButtons;


$selectAlbum.click(selectAlbum);

function selectAlbum() {
  console.log($selectArtist.val());
  if ($selectArtist.val() === null) {
    console.log("no artist is selected...");
  }
}

$selectArtist.change(selectArtist);

let filterResultsByArtist = [];

function selectArtist() {
  filterResultsByArtist = [];
  let selectedArtist = $selectArtist.val();
  for (var x in musicProgram.songData) {
    console.log("array data", musicProgram.songData[x].Artist);
    console.log("selected artist", selectedArtist);
    if (selectedArtist === musicProgram.songData[x].Artist) {
      console.log("HI");
      filterResultsByArtist.push(musicProgram.songData[x]);
      console.log("filter results by artist", filterResultsByArtist);
    }
  }
  musicProgram.songPrint(filterResultsByArtist);
  filterDeleteButtons();
}

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


// function populateArtistList() {
//   let eachArtist = ["blank"];

//   for (var x in eachArtist) {
     
//     for (var y in musicProgram.songData) {
//       let artist = musicProgram.songData[y].Artist;
//       for (var z in eachArtist) {
//       if (eachArtist[x] === artist ) {
//         console.log("hello");
//       } else {
//         eachArtist.push(artist);
//         console.log(eachArtist);
//       }

//     }
//   }
//   }
// }










module.exports = populateArtistList;