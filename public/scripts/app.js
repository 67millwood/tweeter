/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

    //tweet submission using AJAX instead of default form
    var $new_tweet = $('.new-tweet form');
    $new_tweet.submit(function (event) {
    console.log('Submit clicked, performing ajax call...');
    event.preventDefault();
    $.ajax({
     url: "/tweets/",
     method: "POST",
     data: $new_tweet.serialize(),
     complete: loadTweets,
    });

    });

    //publishes tweets from data set and appends them to the main page (.container)
    function renderTweets(tweets) {
      for (num of tweets) {
        // console.log(num);
        var $tweet = createTweetElement(num);
        $('.container').append($tweet);
      }
    }

    //creates formatted tweets from data
    function createTweetElement(data) {
      let tweetmaker =
          `<section id="pubtweets">
            <article>
            <header id="tweet-head">
              <img src=${data.user.avatars.small}>
              <span id="tweet-head-text">${data.user.name}</span>
              <span id="tweet-head-user">${data.user.handle}</span>
            </header>
            <span id="tweet">
              ${data.content.text}
            </span>
            <footer id="tweet-foot">
              ${Math.round(((dateDiff() - data.created_at) / (1000*60*60*24)))} days ago
              <img class="icons" src="/images/flag.png">
              <img class="icons" src="/images/retweet.png">
              <img class="icons" src="/images/heart.jpg">
            </footer>

            </article>
          </section>`
      return tweetmaker;
    };

    function dateDiff() {
      var today = new Date();
      var todaynum = today.getTime();
      return todaynum;
    }

    function loadTweets() {
      $.getJSON("/tweets", function(data) {
        console.log("fresh tweets")
        renderTweets(data)
      });
    };


    loadTweets();



// var $tweet = createTweetElement(tweetData);
  // $('.container').append($tweet);
// renderTweets(data);

// end of doc ready (do not touch)
});


const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  }

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];


// test data

