/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 * driver code(temporary).Eventually will get this from the server.
 */
// Fake data taken from tweets.json

$(function() {


  // var tweetData = [{
  //   "user": {
  //     "name": "Newton",
  //     "avatars": {
  //       "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
  //       "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
  //       "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
  //     },
  //     "handle": "@SirIsaac"
  //   },
  //   "content": {
  //     "text": "If I have seen further it is by standing on the shoulders of giants"
  //   },
  //   "created_at": 1461116232227
  // }, {
  //   "user": {
  //     "name": "Descartes",
  //     "avatars": {
  //       "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
  //       "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
  //       "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
  //     },
  //     "handle": "@rd"
  //   },
  //   "content": {
  //     "text": "Je pense , donc je suis"
  //   },
  //   "created_at": 1461113959088
  // }, {
  //   "user": {
  //     "name": "Johann von Goethe",
  //     "avatars": {
  //       "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
  //       "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
  //       "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
  //     },
  //     "handle": "@johann49"
  //   },
  //   "content": {
  //     "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
  //   },
  //   "created_at": 1461113796368
  // }];

  $("form").submit(function(event) { //serialize input into string obj NOT JSON

    event.preventDefault();

    var x;
    x = $("#text-input").val().length;
    if (x === 0) {
      alert("Can not post blank tweets");
    }
    if (x > 140) {
      alert("Can't submit a tweet longer than 140 characters")
    } else {

      var tweetString = $("form").serialize();
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: tweetString,
        encode: true,
        success: function() {
          $("tweet-input").value = "";
          loadTweets();
        }
      })

      $("#text-input").val('');
    }

  })


  function createTweetElement(tweet) {

    var $article = $("<article>").addClass("tweet")

    var $header = $("<header>").addClass("tweet-header")
      .append($("<img>").addClass("user-avatar").attr("src", tweet.user.avatars.small))
      .append($("<h1>").addClass("user-name").text(tweet.user.name))
      .append($("<span>").addClass("user-handle").text(tweet.user.handle))

    var $main = $("<main>").addClass("tweet-content")
      .append($("<div>").addClass("tweet-content").text(tweet.content.text))

    var $icons = $("<div>").addClass("tweet-actions")
      .append($("<i>").addClass("fa fa-flag"))
      .append($("<i>").addClass("fa fa-retweet"))
      .append($("<i>").addClass("fa fa-heart"))

    var $footer = $("<footer>").addClass("tweet-footer")
      .append($("<div>").addClass("tweet-timestamp").text(tweet.created_at))
      .append($("<div>").addClass("tweet-actions"))
      .append($icons);

    var $combine = $article.append($header).append($main).append($icons).append($footer);

    return $combine;

  }

  function renderTweets(tweets) {
    tweets.forEach(function(eachT) {
      let $tweet = createTweetElement(eachT);
      $('#tweets-container').prepend($tweet);

    });
  }

  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function(data) {
        var arr = data[data.length - 1];
        var $newTweet = createTweetElement(arr);
        $('#container').prepend($newTweet);
        renderTweets(data);
      }
    });
  }



  loadTweets();

  renderTweets(tweetData);

});