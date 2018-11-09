/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

    //loadTweets brings in all the tweets in the MongoDB
    //createTweet is called so the app is immediately ready to accept and POST new tweets

    loadTweets();
    createTweet();


    //createTweet allows the user to fill in a form to create a new tweet
    //form validation provides warning messages for blank tweets or tweets longer than140 characters
    //the validation numbers include the data from the serilaized text (5 characters for 'text=')
    function createTweet() {

        var $new_tweet = $('.new-tweet form');
        $new_tweet.submit(  function (event) {
         event.preventDefault();
         if ($new_tweet.serialize().length > 145) {
          $('#lengthwarn').text("We can't handle that big tweet")
          $('#lengthwarn').show();
         } else if ($new_tweet.serialize().length < 6) {
          $('#lengthwarn').text("Tweet can't be blank")
          $('#lengthwarn').show();
         } else {
          $('#lengthwarn').hide();
          //ajax immediately POSTs the new tweet to the /tweet/ path
          //new tweets are run through serialize so that they become strings
          //if a successful POST happens, the app points to the publishNewTweet function to publish the tweet
         $.ajax({
         url: "/tweets/",
         method: "POST",
         data: $new_tweet.serialize(),
         success: publishNewTweet
         });
        }
        });
       };

    // publishes new tweets by taking the most recent item (last) from the JSON array
    // then prepends to the .freshtweet class to make it appear at the top of all loaded tweets
     function publishNewTweet () {
      $.getJSON("/tweets/", function(data) {
        console.log(data);
        var $happy = createTweetElement(data.slice(-1)[0]);
        $('.freshtweets').prepend($happy);
          })
     }

    //publishes tweets from database by looping through the JSON provided
    //calls the createTweetElement function which provides the necessary HTML/CSS tags for each tweet
    function renderTweets(data) {
      console.log("we reached renderTweets")
      let tweets = data[0].tweets;
      console.log(Object.keys(data))
      for (num of tweets) {
        // console.log(num);
        var $tweet = createTweetElement(num);
        $('.freshtweets').append($tweet);
      }
    }

    //escape ensures that text provided from the user (their Tweet) is stripped of any HTML or malicious code
    function escape(str) {
      var div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
        }

    //creates formatted tweets from data
    //relevant data is pulled from the JSON using object literals
    //returns a fully formatted tweet that is used by renderTweets to create the tweet list
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
              ${escape(data.content.text)}
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


    //function used to caluculate the difference in today's date versus the date of tweets
    function dateDiff() {
      var today = new Date();
      var todaynum = today.getTime();
      return todaynum;
    }

    //GET tweets from mongoDB converts into JSON then call renderTweets to display them to the user
    function loadTweets() {
      $.getJSON("/tweets", function(data) {
        // $('.freshtweets').empty();
        console.log("fresh tweets", data)
        renderTweets(data)
      });
    };

    //Styiing for tweet creation which hides the compose tweet box until the Compose button is clicked
    //puts the user cursor into the text area then highlights the box
      $("#nav-bar button").click( function () {
        $( ".new-tweet" ).slideToggle(400);
        $( "#newtweet" ).focus();
      });





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

