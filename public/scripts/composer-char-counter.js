

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





