

$(document).ready(function() {
  console.log("the page has loaded")

  $(".container textarea").keyup( function() {
  console.log(140 - $(this).val().length);
  $(this).parent().find(".counter").text((140 - $(this).val().length));


});
});





