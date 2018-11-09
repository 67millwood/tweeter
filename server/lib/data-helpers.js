"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      simulateDelay(() => {
        // db.tweets.push(newTweet);
        db.collection("tweeter").insertOne( newTweet );
        callback(null, true);
      });
    },

    // Get all tweets in `db`, sorted by newest first
    // getTweets: function(callback) {
    //   db.collection("tweeter").find().toArray(callback);
    //   simulateDelay(() => {
    //     const sortNewestFirst = (a, b) => a.created_at - b.created_at;
    //     callback(null, db.tweets);
    //   });
    // }
      getTweets: function getTweets(callback) {
        db.collection("tweeter").find().toArray((err, tweets) => {
          if (err) {
            return callback(err);
          }
          callback(null, tweets);
        });
        }

  // ==> Later it can be invoked. Remember even if you pass
  //     `getTweets` to another scope, it still has closure over
  //     `db`, so it will still work. Yay!
  }
}



