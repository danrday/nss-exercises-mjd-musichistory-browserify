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