// function for the character counter in the bottom right corner for when you're typing out a new tweet
$(document).ready(function() {
  $('textarea').keydown(function() {
    var left = 140 - $(this).val().length;
    if (left < 0) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', 'black');
    }
    $('.counter').text(left);
  })

})