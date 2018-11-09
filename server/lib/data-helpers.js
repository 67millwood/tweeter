"use strict";


// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves new user tweets to mongoDB named tweeter in the collection 'tweeter'
    saveTweet: function(newTweet, callback) {

        db.collection("tweeter").insertOne( newTweet );
        callback(null, true);
    },
    // Pulls ALL tweets from the mongoDB collection 'tweeter' and creates an array
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



