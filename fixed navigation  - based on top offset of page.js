$(document).ready(function() {
  var $top = $('#lp-pom-block-764');
  var window_offset = $top.offset().top; 
  var $window = $(window);
    $(document).scroll(function(){
      if ( $window.scrollTop() >= window_offset) {
         $('#lp-pom-box-810').addClass('scrolled');   
      } 
      else {
         $('#lp-pom-box-810').removeClass('scrolled'); 
      }
      
    });  	
});	 