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