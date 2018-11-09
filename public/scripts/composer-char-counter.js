

//simple function that is called when the doc is ready
//counts characters from the textarea as the user types moving to RED if the count > 140 char

$(document).ready(function() {

  $(".container textarea").keyup( function() {
  let count = $(this).val().length;
  if (140 < count) {
    $(this).parent().find(".counter").text(140 - count).css({"color": "red"});
  } else {
    $(this).parent().find(".counter").text(140 - count);
  }


});
});





