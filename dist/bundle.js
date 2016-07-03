(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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


},{"./domFunctions":2,"./musicHistoryModule":7}],2:[function(require,module,exports){
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



},{"./musicHistoryModule":7}],3:[function(require,module,exports){
"use strict";

let songPrint = require("./songPrint");

function executeThisCodeAfterFileIsLoaded(responseText) {
  songPrint(responseText);
}

module.exports = executeThisCodeAfterFileIsLoaded;
},{"./songPrint":8}],4:[function(require,module,exports){
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
},{"./addNewSong":1,"./domFunctions":2,"./musicFilter":6,"./musicHistoryModule":7}],5:[function(require,module,exports){
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
},{"./songPrint":8}],6:[function(require,module,exports){
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
},{"./musicHistoryModule":7}],7:[function(require,module,exports){
"use strict";

const songPrint = require("./songPrint");
const executeThisCodeAfterFileIsLoaded = require("./executeThisCodeAfterFileIsLoaded");
const addMoreSongsButton = require("./moreSongs").addMoreSongsButton;
const addNewMusic = require("./moreSongs").addNewMusic;

let songData = "null";

let testVar = "asdfasfd";

/* 
  Now, construct an object that contains a key/value pair for each
  of those modules that we pulled into this one
*/

let musicHistoryModule = {
 songData, songPrint, executeThisCodeAfterFileIsLoaded, addMoreSongsButton, addNewMusic, testVar
};

/*
  Every module needs to specify what its output is. Think of this as the
  return statement in a function. What are we returning for use by other
  modules in the application?
 */

module.exports = musicHistoryModule;
},{"./executeThisCodeAfterFileIsLoaded":3,"./moreSongs":5,"./songPrint":8}],8:[function(require,module,exports){
"use strict";

//goes through each item in songData, and prints it to DOM
let songPrinter = function (songData) {
  let $listSongs = $('#listSongs') ;
  let newHTML = "";
  for (var x in songData) {
  newHTML += `<div id=song--${x}> <h3> ${songData[x].Song} </h3><p> ${songData[x].Artist} | ${songData[x].Album}</p><input type="button" class="deleteButton" value="DESTROY"></div>`;
  }
   $listSongs.html(newHTML);
};

module.exports = songPrinter;
},{}]},{},[4])


//# sourceMappingURL=bundle.js.map
