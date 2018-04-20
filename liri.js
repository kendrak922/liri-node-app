const result = require("dotenv").config();
if (result.error) {
  throw result.error
}
const fs = require("fs");
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
const getTweets = client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for(let key in tweets) {
        // console.log(tweets[key].text);
      }
  }
});

//spotify API
// const getTrack = spotify.request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
// .then(function(data) {
//     for(let key in data) {
//         console.log(data.artist[key].name)
//       }
// })
// .catch(function(err) {
//   console.error('Error occurred: ' + err); 
// });



const music = spotify.search({ type: 'track', query: search, limit: 1 }, function(err, data) {
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
    });
    
