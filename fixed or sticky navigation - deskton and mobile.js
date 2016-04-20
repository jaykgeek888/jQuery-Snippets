//Replace ID below with your box ID
var boxToFix = '#lp-pom-box-560';

//Set the number of pixels to scroll before showing the header 
var scrollPositionToShowHeader = 800;  
var boxParent = $(boxToFix).parent();
var boxClone = $(boxToFix).clone();
     
$(boxClone).appendTo(boxParent).css({"position":"fixed", "left":"0", "top":"0", "width":"100%", "z-index":"100"}).children().remove();

$(boxToFix).css({"position":"fixed", "left":"auto", "top":"0px", "width":"100%", "z-index":"200", "border-style":"none none none none", "border-width":"0px", "background":"none"});

showOrHideHeader();

function showOrHideHeader() {
  var currentPositionFromTop = $(window).scrollTop(); 
  var currentPositionFromTopMobile = $(window).width();
  
  if (currentPositionFromTop > scrollPositionToShowHeader && currentPositionFromTopMobile > 600) {
    $(boxToFix).show();
    $(boxClone).show();
  } else {
    $(boxToFix).hide();
    $(boxClone).hide();
  }
   
}

$(window).scroll(function() {
  showOrHideHeader();
}); 