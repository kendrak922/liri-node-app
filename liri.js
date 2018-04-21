const result = require("dotenv").config();
if (result.error) {
  throw result.error
}
const fs = require("fs");
const request = require('request');
const keys = require("./keys.js");
let Twitter = require('twitter');
let client = new Twitter(keys.twitter);
let params = {
    screen_name: 'KendraKyndbergg'
} && {
    count: 20
};
let Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);
var method = process.argv[2];
var search = process.argv[3];

//twitter API
// const getTweets = client.get('statuses/user_timeline', params, function(error, tweets, response) {
//   if (!error) {
//     for(let key in tweets) {
//         // console.log(tweets[key].text);
//       }
//   }
// });

//spotify API
// const music = spotify.search({ type: 'track', query: search, limit: 1 }, function(err, data) {
//     if (err) {
//       return console.log('Error occurred: ' + err);
//     } else {
//       for(let key in data) { 
//         // console.log("\n-------------\n");
//         //   console.log(
//         //     `Artist:${data.tracks.items[0].artists[0].name}
//         //     \nSong Title: ${data.tracks.items[0].name}
//         //     \nPreview Link: ${data.tracks.items[0].album.href}
//         //     \nAlbum: ${data.tracks.items[0].album.name}`)
//         //     console.log("\n-------------\n");
//         //       }
//       }    
//     });
//end of spotify API
//OMDB Request
queryURL = `http://www.omdbapi.com/?t=${method}&y=&plot=short&apikey=trilogy`
request(queryURL, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    console.log("\n-------------\n");
    console.log("Title: " + JSON.parse(body).Title);
    console.log("\nReleased in: " + JSON.parse(body).Year);
    console.log("\nIMDB Rating: " + JSON.parse(body).imdbRating);
    console.log("\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
    console.log("\nCountry: " + JSON.parse(body).Country);
    console.log("\nLanguage: " + JSON.parse(body).Language);
    console.log("\nPlot: " + JSON.parse(body).Plot);
    console.log("\nStarring " + JSON.parse(body).Actors);
    console.log("\n-------------");
   
  }
});

    
// * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.
