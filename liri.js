//requiring all necessary modules
require("dotenv").config();

var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");

//code is based on series of if-else statements for each command line input
if (process.argv[2] === "concert-this") {
    var data = process.argv;

    var artist = "";

    for (var i = 3; i < data.length; i++) {
        artist += data[i];
    }

    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(queryURL).then(
        function(response) {
            for (var i = 0; i < response.data.length; i++) {
                console.log(response.data[i].venue.name);
                console.log(response.data[i].venue.city + ", " + response.data[i].venue.country);
                console.log(moment(response.data[i].datetime).format("MM-DD-YYYY"));
                console.log("-----------");
            }

        }
    );  

} else if (process.argv[2] === "movie-this") {
    var data = process.argv;

    var movie = "";

    //checking for whether movie title was submitted or not
    if (data[3]) {

        if (data.length === 4) {
            movie = data[3];
        } else {
            movie = data[3];
            for (var i = 4; i < data.length; i++) {
                movie += "+" + data[i];
            }
        }

        var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

        axios.get(queryURL).then(
            function(response) {
                console.log("Title: " + response.data.Title);
                console.log("Year: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);          
            }
        );
    } else { //if movie title not submitted, Mr.Nobody movie info is displayed
        var queryURL = "https://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy";

        axios.get(queryURL).then(
            function(response) {
                console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
                console.log("It's on Netflix!");
                console.log("Here's some info about it!")
                console.log("Title: " + response.data.Title);
                console.log("Year: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);          
            }
        );
    }
} else if (process.argv[2] === "spotify-this-song") {
    var data = process.argv;

    //checking to see if song name was entered
    if (data[3]) {

        var track = "";

        for (var i = 3; i < data.length; i++) {
            track += data[i] + " ";
        }

        spotify.search({type: "track", query: track, limit: 1 }, function (err, data) {
            if (err) {
                return console.log("Error occured: " + err);
            }


            var artist = data.tracks.items[0].artists;
            var album = data.tracks.items[0].album.name;
            var link = data.tracks.items[0].preview_url;

            console.log(track);
            
            console.log("-----------");
            if (artist.length > 1) {
                console.log("Artists: ");
                for (var i = 0; i < artist.length; i++) {
                    console.log(artist[i].name);
                }
                console.log("-----------");
            } else {
                console.log("Artist:");
                console.log(artist[0].name);
                console.log("-----------");
            }

            console.log("Album: " + album);
            console.log("-----------");
            console.log("Link: " + link);


        });
    } else { //if no song name is entered, displays data for The Sign by the Ace of Base
        var track = "";

        for (var i = 3; i < data.length; i++) {
            track += data[i] + " ";
        }

        spotify.search({type: "track", query: "The Sign", limit: 10 }, function (err, data) {
            if (err) {
                return console.log("Error occured: " + err);
            }

            console.log("The Sign");

            console.log("-----------");

            var artist = data.tracks.items[9].artists[0].name;
            
            var album = data.tracks.items[9].album.name;
            
            var link = data.tracks.items[9].preview_url;
            
            console.log("Artist: " + artist);
            console.log("-----------");
            console.log("Album: " + album);
            console.log("-----------");
            console.log("Link: " + link);


        });


    }
} else if (process.argv[2] === "do-what-it-says") {
    //reads data on random.txt file and parses accordingly
    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
          return console.log(error);
        }
        var dataArr = data.split(",");

        var track = dataArr[1];
        
        spotify.search({type: "track", query: track, limit: 1 }, function (err, data) {
            if (err) {
                return console.log("Error occured: " + err);
            }

            var artist = data.tracks.items[0].artists;
            var album = data.tracks.items[0].album.name;
            var link = data.tracks.items[0].preview_url;

            console.log(track);
            
            console.log("-----------");
            if (artist.length > 1) {
                console.log("Artists: ");
                for (var i = 0; i < artist.length; i++) {
                    console.log(artist[i].name);
                }
                console.log("-----------");
            } else {
                console.log("Artist:");
                console.log(artist[0].name);
                console.log("-----------");
            }

            console.log("Album: " + album);
            console.log("Link: " + link);
        });

      
    });
      
}

