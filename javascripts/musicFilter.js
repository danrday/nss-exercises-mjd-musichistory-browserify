"use strict";

let musicProgram = require("./musicHistoryModule");
let $selectArtist = $("#selectArtist");
let $selectAlbum = $("#selectAlbum");

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
}

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