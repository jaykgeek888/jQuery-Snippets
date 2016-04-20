//DEPENDENCIES TO BE PLACED ON HEAD TAG
//REFERENCE ---> http://jqueryvalidation.org/documentation/
<script src="https://ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/jquery.validate.min.js"></script>
<script src="https://ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/additional-methods.min.js"></script>


//CALLBACK FUNCTION
<script>
jQuery(document).ready(function() {

		//NORMAL VALIDATION
    jQuery(".infusion-form").validate({
        rules: {
            inf_field_FirstName: {
                required: true
            },
            inf_field_LastName: {
                required: true
            }, 
            inf_field_Email: {
                required: true,
                email: true
            },  
        }
    });
  
		//ADDED VALIDATION FOR PHONE NUMBER
		jQuery( "#inf_field_Phone1" ).rules( "add", { 
				minlength: 8,
				number: true,
				digits: true,
				messages: { 
					minlength: jQuery.validator.format("Phone number needs to be valid."),
					number: jQuery.validator.format("Phone number needs to be valid."),
					digits: jQuery.validator.format("Phone number needs to be valid.")
				}
			}); 
});
</script>