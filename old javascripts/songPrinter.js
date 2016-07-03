
"use strict";

//require loadJSON for songData
let songData = require("./loadJSON.js");
let songPrint = require("./songPrint.js");


let $elDeleteMusic = $(".deleteButton");

//

let deleteItem = function () {
  var elToDelete = event.target.closest("div");
  var idToDelete = elToDelete.id.split("--")[1];
  songData.splice(idToDelete, 1);
  songPrint(songData);
};

//

 // addEventListeners();
  $(".deleteButton").click(deleteItem);

 console.log("$elDeleteMusic", $(".deleteButton").length);



module.exports = {deleteItem, $elDeleteMusic};
