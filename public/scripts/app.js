/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 * driver code(temporary).Eventually will get this from the server.
 */
// Fake data taken from tweets.json

$(function() {


  $("form").submit(function(event) { //serialize input into string obj NOT JSON

    event.preventDefault();

    var x;
    x = $("#text-input").val().length;
    if (x === 0) {
      alert("Can not post blank tweets");
    } else if (x > 140) {
      alert("Can't submit a tweet longer than 140 characters")
    } else {

      var tweetString = $("form").serialize();
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: tweetString,
        encode: true,
        success: function() {
          $("#text-input").val("");
          $(".counter").text("140");
          loadTweets();
        }
      })

      // $("#text-input").val('');
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
      .append($("<div>").addClass("tweet-timestamp").text((moment(tweet.created_at).fromNow())))
      .append($("<div>").addClass("tweet-actions"))
      .append($icons);

    var $combine = $article.append($header).append($main).append($icons).append($footer);

    return $combine;

  }

  function renderTweets() {

    console.log('HERE!');
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function(tweets) {
        tweets.forEach(function(eachT) {
          let $tweet = createTweetElement(eachT);
          $('#tweets-container').prepend($tweet);

        })
      }
    });
  }

  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function(data) {
        var arr = data[data.length - 1];
        var $newTweet = createTweetElement(arr);
        $('#tweets-container').prepend($newTweet);
        $('#tweets-container .tweet:first-child').hide().slideDown();
      }
    });
  }

  //slide down toggle to add compose tweet container
  $('.compose').on("click", function(event) {
    event.preventDefault()
    if ($(".new-tweet").is(":hidden")) {
      $(".new-tweet").slideDown("slow");
      //focus on that text area
      $('#text-input').focus();
    } else {
      $(".new-tweet").slideUp("slow");
    }
  });




  // loadTweets();

  renderTweets();

});