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
let spotify = require('spotify');

// let spotify = new Spotify(keys.spotify);
//twitter API
const getTweets = client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for(var key in tweets) {
        console.log(tweets[key].text);
      }
  }
});

//spotify API
// spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
//     if ( err ) {
//         console.log('Error occurred: ' + err);
//         return;
//     }
 
//     // Do something with 'data' 
// });