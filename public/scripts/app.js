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
        var $happy = createTweetElement(data.slice(-1)[0]);
        $('.freshtweets').prepend($happy);
          })
     }

    //publishes tweets from database by looping through the JSON provided
    //calls the createTweetElement function which provides the necessary HTML/CSS tags for each tweet
    function renderTweets(data) {
      for (num of data) {
        // console.log(num);
        var $tweet = createTweetElement(num);
        $('.freshtweets').prepend($tweet);
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
        renderTweets(data)
      });
    };

    //Styiing for tweet creation which hides the compose tweet box until the Compose button is clicked
    //puts the user cursor into the text area then highlights the box
      $("#nav-bar button").click( function () {
        $( ".new-tweet" ).slideToggle(400);
        $( "#newtweet" ).focus();
      });

});



