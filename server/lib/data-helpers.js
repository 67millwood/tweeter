"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {

        db.collection("tweeter").insertOne( newTweet );
        callback(null, true);
    },

      getTweets: function getTweets(callback) {
        db.collection("tweeter").find().toArray((err, tweets) => {
          if (err) {
            return callback(err);
          }
          callback(null, tweets);
        });
        }

  }
}



