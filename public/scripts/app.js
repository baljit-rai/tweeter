/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 * driver code(temporary).Eventually will get this from the server.
 */
// Fake data taken from tweets.json

$(function() {

  //form validation for counter and post function for tweets.
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

      }

    })

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

  //create article and append all the elements needed to compose the layout of a tweet
  function createTweetElement(tweet) {

    var $article = $("<article>").addClass("tweet")
      .append($("<img>").addClass("user-avatar").attr("src", tweet.user.avatars.small))

    var $header = $("<header>").addClass("tweet-header")

    .append($("<div>").addClass("user-name").text(tweet.user.name))
      .append($("<p>").addClass("user-handle").text(tweet.user.handle))



    var $main = $("<main>").addClass("tweet-content")


    .append($("<p>").addClass("tweet-content").text(tweet.content.text))

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

  // get request to load tweets into memory, and have them ready for rendering
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

  // render and prepend tweets to #tweets-container
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

  renderTweets();

});