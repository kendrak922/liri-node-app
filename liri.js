const result = require("dotenv").config();
if (result.error) {
  throw result.error
}
const fs = require("fs");
const request = require('request');
const keys = require("./keys.js");
// const read = require("./random.txt");
let Twitter = require('twitter');
let client = new Twitter(keys.twitter);
let params = {
    screen_name: 'KendraKyndbergg'
} && {
    count: 20
};
let Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var search = process.argv[3];


switch (command) {
  case "my-tweets":
  getTweets();
    break;
  
  case "spotify-this-song":
    music(search);
    break;
  
  case "movie-this":
    movie();
    break;
  
  case "do-what-it-says":
    doWhat();
    break;
  }

  
//twitter API
function getTweets() {
client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
        for (let key in tweets) {
          console.log(tweets[key].text);
        }
      
}})};

// //spotify API
function music(search){
  spotify.search({ type: 'track', query: search, limit: 1 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    } else {
      for(let key in data) { 
        console.log("\n-------------\n");
          console.log(
            `Artist:${data.tracks.items[0].artists[0].name}
            \nSong Title: ${data.tracks.items[0].name}
            \nPreview Link: ${data.tracks.items[0].album.href}
            \nAlbum: ${data.tracks.items[0].album.name}`)
            console.log("\n-------------\n");
              }
      }    
    })};
// //end of spotify API
// //OMDB Request
function movie(){
queryURL = `http://www.omdbapi.com/?t=${search}&y=&plot=short&tomatoes=true&apikey=trilogy`
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
   
  } else if(error){
    console.log("\n-------------\n");
    console.log("Title: Mr. Nobody");
    console.log("\nReleased in: 2009");
    console.log("\nIMDB Rating: 7.9");
    console.log("\nRotten Tomatoes Rating: 66%");
    console.log("\nCountry: Belgium, Germany, Canada, France, USA, UK");
    console.log("\nLanguage: English, Mohawk");
    console.log("\nPlot: A boy stands on a station platform as a train is about to leave. Should he go with his mother or stay with his father? Infinite possibilities arise from this decision. As long as he doesn't choose, anything is possible.");
    console.log("\nStarring Jared Leto, Sarah Polley, Diane Kruger, Linh Dan Pham");
    console.log("\n-------------");
  }
})};
//do what it says request
function doWhat(){
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    } else{
      let randomText = data.split(",");
     let command = randomText[0]
     let search = randomText[1];
     switch(command) {
      case 'my-tweets':
        getTweets(); 
        break;
        
      case 'spotify-this-song':
        music(search);
        break;

      case 'movie-this':
        movie(search);
        break;
     }
    };  
  })};

