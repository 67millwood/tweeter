/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

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
              10 days ago.
            </footer>

            </article>
          </section>`
      return tweetmaker;
    };

  var $tweet = createTweetElement(tweetData);
  $('.container').append($tweet);

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



// test data

