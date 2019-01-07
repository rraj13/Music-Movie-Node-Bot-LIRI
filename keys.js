console.log("this is loaded");

var SPOTIFY_ID = "2803f01b66c1468cb89707e97b97a911";
var SPOTIFY_SECRET = "d2630eeb53904f4fae6b7dc571abd5d6";

exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  };
