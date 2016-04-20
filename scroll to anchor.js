$(document).ready(function(){ 
  // The speed of the scroll in milliseconds:
  var speed = 1000; 
  
  // This finds links that are #anchors and scroll to them
  $('a[href*="#"]').not('.lp-pom-form .lp-pom-button').click(event(){
    event.preventDefault();
    // change the the number after .top to offset the anchor if you havea fixed nav so a 80px tall nav = 80px offset 
    $('html, body').animate({ scrollTop: $( $(this).attr('href') ).offset().top-86 }, speed);
  }); 
});
 