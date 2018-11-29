require("dotenv").config();
var fs = require("fs");
var Spotify = require('node-spotify-api')
var keys = require('./keys.js')
var axios = require("axios");
var moment = require('moment')

//Bands in Town
if (process.argv[2] == 'concert-this'){
var band = process.argv.slice(3).join(" ");
axios.get("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp").then(
  function(response) {
    console.log("Venue: "+response.data[0].venue.name);
    console.log("Location: "+response.data[0].venue.city+", "+response.data[0].venue.country);
    console.log("Date: "+moment(response.data[0].datetime).format("MM/DD/YYYY"));
  },
  function(error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    console.log(error.config);
  }
);
};

//Spotify
var spotify = new Spotify(keys.spotify);
if (process.argv[2] == 'spotify-this-song'){
    var song = process.argv.slice(3).join(" ");
    if (song == ""){
        song = "The Sign Ace of Base"
    }
    spotify.search({ type: 'track', query: song, limit: 1}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
      console.log("Song name: "+data.tracks.items[0].name);
      console.log("Artist(s): "+data.tracks.items[0].artists[0].name);
      console.log("Album: "+data.tracks.items[0].album.name);
      console.log("Preview Link: "+data.tracks.items[0].preview_url);  
      });
};

//OMDB
if (process.argv[2] == 'movie-this'){
    var movie = process.argv.slice(3).join(" ");
    if(movie == ""){
        movie = "Mr. Nobody"
    }
    axios.get("http://www.omdbapi.com/?apikey=trilogy&t="+movie).then(
        function(response) {
        console.log("Movie title: "+response.data.Title);
        console.log("Released: "+response.data.Released);
        console.log("IMDB Rating: "+response.data.imdbRating);
        console.log("Rotten Tomatoes Rating: "+response.data.Ratings[1].Value);
        console.log("Country Produced: "+response.data.Country);
        console.log("Language: "+response.data.Language); 
        console.log("Plot Summary: "+response.data.Plot);
        console.log("Actors: "+response.data.Actors);
  },
  function(error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    console.log(error.config);
  }
);
};

//FS
if (process.argv[2] == 'do-what-it-says'){
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
          return console.log(err);
        }
        else{
            if(data.includes("spotify-this-song")){
                var song = data.slice(19, -1);
                spotify.search({ type: 'track', query: song, limit: 1}, function(err, data) {
                    if (err) {
                      return console.log('Error occurred: ' + err);
                    }
                  console.log("Song name: "+data.tracks.items[0].name);
                  console.log("Artist(s): "+data.tracks.items[0].artists[0].name);
                  console.log("Album: "+data.tracks.items[0].album.name);
                  console.log("Preview Link: "+data.tracks.items[0].preview_url);  
                  });  
            }
            else if(data.includes("concert-this")){
                var band = data.slice(14, -1);
                axios.get("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp").then(
                function(response) {
                console.log("Venue: "+response.data[0].venue.name);
                console.log("Location: "+response.data[0].venue.city+", "+response.data[0].venue.country);
                console.log("Date: "+moment(response.data[0].datetime).format("MM/DD/YYYY"));
                },
                function(error) {
                if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                } else if (error.request) {
                console.log(error.request);
                } else {
                console.log("Error", error.message);
                }
                console.log(error.config);
                }
                );
            }
            else if(data.includes("movie-this")){
                var movie = data.slice(12, -1);
                axios.get("http://www.omdbapi.com/?apikey=trilogy&t="+movie).then(
                function(response) {
                console.log("Movie title: "+response.data.Title);
                console.log("Released: "+response.data.Released);
                console.log("IMDB Rating: "+response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: "+response.data.Ratings[1].Value);
                console.log("Country Produced: "+response.data.Country);
                console.log("Language: "+response.data.Language); 
                console.log("Plot Summary: "+response.data.Plot);
                console.log("Actors: "+response.data.Actors);
                },
                function(error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log("Error", error.message);
                }
                console.log(error.config);
                }
                );
            }
            else{
                console.log("Command not recognized - See ReadMe for list of accepted commands.")
            }
        }
      });
    }

