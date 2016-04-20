//INSIDE THE HEAD TAG
<script src="https://a.unbounce.com/s/javascripts/jquery/jquery-ui.1.8.16.min.js"></script>
<link rel="stylesheet" type="text/css" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/themes/smoothness/jquery-ui.css" />

//BEFORE BODY END TAG
<script>
  $(function() {
    $( "#due_date" ).datepicker(); 
		//$( "#due_date" ).datepicker({ dateFormat: 'MM dd, yy' }); //AU FORMAT eg September 1, 2015
		//$( "#due_date" ).datepicker({  minDate: 0 });  //DISABLE PAST DATES
		//$('booking_date').datepicker({ maxDate:
  });
</script> 



//WORKING CALENDAR CODE
//BEFORE BODY END TAG
<script src="https://a.unbounce.com/s/javascripts/jquery/jquery-ui.1.8.16.min.js"></script>
<link rel="stylesheet" type="text/css" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/themes/smoothness/jquery-ui.css" />
<script>
  $(function() {
    $( "#date" ).datepicker({ dateFormat: 'MM dd, yy', minDate: 0  });  
  });
</script> 

	/*FOR PLACEHOLDER TEXT*/
	::-webkit-input-placeholder:after { 
		color: #FF2600;
		content: " *";
	}
	:-moz-placeholder:after { 
		color: #FF2600;
		content: " *";
	}

	::-moz-placeholder:after {  
		color: #FF2600;
		content: " *";
	}
	
	:-ms-input-placeholder:after { 
		color: #FF2600;
		content: " *";
	} 

//END OF WORKING CALENDAR CODE


//WITH DISABLE SPECIFIC DATE
    var unavailableDate = ["25-3-2016"];

    function unavailable(date) {
        dmy = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
        if ($.inArray(dmy, unavailableDate) == -1) {
            return [true, ""];
        } else {
            return [false, "", "Unavailable"];
        }
    }

    
    

//WITH DISABLE SPECIFIC DAYS
<script>

function DisableDate(date) {
 
	var day = date.getDay(); 
 if (day == 0 || day == 2 || day == 6)   {
 
 return [true] ; 
 
 } else { 
 
 return [false] ;
 }
  
}

  $(function() {
    $( "#booking_date" ).datepicker({
				dateFormat: 'MM dd, yy', 
				beforeShowDay: DisableDate
			}); 
		//$( "#due_date" ).datepicker({ dateFormat: 'MM dd, yy' }); //AU FORMAT eg September 1, 2015
  });
	
	
	
	
/////PUT DATE VALUE INTO HIDDEN FIELD
	/*SIMPLIFIED*/
	$(function() {
			$( "#what_day_suits" ).datepicker({
			dateFormat: 'MM dd, yy', 
			minDate: 0,
			onClose: function() {
				 var hiddenDate = $(this).val();
				 if (hiddenDate) {  
					 $('#sWhat_day_suits').val(hiddenDate);
				 }
			 }
		 });  
		});
		
	/*TOO LONG!!!!*/
	$(function() {
			$( "#what_day_suits" ).datepicker({
			dateFormat: 'MM dd, yy', 
			minDate: 0,
			onClose: function() {
				 var hiddenDate = new Date($(this).val());
				 if (hiddenDate) {
					 var month = new Array();
								month[0] = "January";
								month[1] = "February";
								month[2] = "March";
								month[3] = "April";
								month[4] = "May";
								month[5] = "June";
								month[6] = "July";
								month[7] = "August";
								month[8] = "September";
								month[9] = "October";
								month[10] = "November";
								month[11] = "December";
							 
					 var formatDate = (month[hiddenDate.getMonth()]) + " " + 
														 hiddenDate.getDate() + ", " + 
														 hiddenDate.getFullYear();
					 $('#sWhat_day_suits').val(formatDate);
				 }
			 }
		 });  
		});
		
</script> 



/*EXIT POPUP*/
<script type="text/javascript" src="http://folderhop.com/assets/scripts/bioep.min.js"></script><!-- Exit intent code-->

<script type="text/javascript">
  // Intitiate Pop up code
  bioEp.init({ 
    html:'<iframe width="450px" height="323px" frameborder="0" scrolling="no" src="http://landing.socialgarden.com.au/popup"></iframe>',
    cookieExp: 0,
    delay: 0
  }); 
</script>

<script type="text/javascript">
  //Connect to Vero for tracking
  var _veroq = _veroq || [];
_veroq.push(['init', { api_key: '9e6692cc9be9eeea739c16559fe5edfc038df5a5'} ]);

(function() {var ve = document.createElement('script'); ve.type = 'text/javascript'; ve.async = true; ve.src = '//d3qxef4rp70elm.cloudfront.net/m.js'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ve, s);})();
  
  //Track page view
    _veroq.push(['trackPageview']);
</script>



<script type="text/javascript">
  //LIMIT INPUT FIELDS TO NUMBERS ONLY WITH MAX LENGTH  
  $(document).ready(function(){  
    $("#lp-pom-form-42 #postcode").attr("maxlength", "4"); 
    $('#lp-pom-form-42 #postcode').unbind('keyup change input paste').bind('keyup change input paste',function(e){
      this.value = this.value.replace(/[^0-9\.]/g,'');
      var $this = $(this);
      var val = $this.val();
      var valLength = val.length;
      var maxCount = $this.attr('maxlength');
      if(valLength>maxCount){
          $this.val($this.val().substring(0,maxCount));
      }
    }); 
      
  });
</script>

