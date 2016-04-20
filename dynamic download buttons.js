$(function() {   
 var cta_print_default = "Download Now"; 
 var url_print_default = "http://milieuproperty.com.au/brochure/PEEL_PRODUCT_BROCHURE_WEB.pdf"; 
	$.urlParam = function(name){  	 
	  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href); 
	  if (results==null){  
			return "";
	  }
	  else{
		 return results[1] || 0;
	  }  
	}   
	 
 var cta_print_value = decodeURIComponent($.urlParam('download_cta'));  
 var url_print_value = $.urlParam('download_url');   
 
	if ($.urlParam('download_cta')=='' || $.urlParam(name)==null) {
		var cta_print = (cta_print_default);  
	 }
	 
	 else {
		var cta_print = (cta_print_value);   
	 } 

	 if ($.urlParam('download_url')=='' ||  $.urlParam(name)==null) { 
		var url_print = (url_print_default); 
	 }
	 
	 else { 
		var url_print = (url_print_value);  
	 }
  
	  $('#lp-pom-box-585').html("<span class='dynamicButton'><a href='" + (url_print) + "'target='_blank'>" + (cta_print) + "</a></span>");  
}); 