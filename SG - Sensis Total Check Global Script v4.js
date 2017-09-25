$(document).ready(function() {

    var globalConfig = {
        blacklist: ['0400000000', '0411111111', '0422222222', '0433333333', '0455555555', '0466666666', '04777777777', '0488888888', '0499999999', '0412345678'],
    };
var submitted = false;
    // Sensis Total Check Object
    var SensisTotalCheck = function(config) {

        // ======================================== Injection Functions ===============================================
        // determine fields to be checked by sensis
        this.addSensisCheck = function(fieldId) {
            $('#'+fieldId).addClass('sensisCheck');
        };

        this.assignSensisCheckType = function() {
            if(config.injectionConfig.sensisEmailCheck != null) { $('#'+config.injectionConfig.sensisEmailCheck).attr('sensisType','email');}
            if(config.injectionConfig.sensisPhoneCheck != null) { $('#'+config.injectionConfig.sensisPhoneCheck).attr('sensisType','phone');}
            if(config.injectionConfig.sensisCompanyCheck != null) { $('#'+config.injectionConfig.sensisCompanyCheck).attr('sensisType','company');}
            if(config.injectionConfig.sensisAddressCheck != null) { $('#'+config.injectionConfig.sensisAddressCheck).attr('sensisType','address');}
          	if(config.injectionConfig.sensisFirstNameCheck != null) { $('#'+config.injectionConfig.sensisFirstNameCheck).attr('sensisType','first_name');}
          	if(config.injectionConfig.sensisLastNameCheck != null) { $('#'+config.injectionConfig.sensisLastNameCheck).attr('sensisType','last_name');}
            //$('#'+config.injectionConfig.sensisNameCheck).attr('data-sensisType','last_name');}

        };

        this.prepareFields = function (fieldId) {
            $('#container_'+fieldId).append
            ('<span id="container_'+fieldId+'_check" class="sg-ajax-loader " style=""><img src="http://folderhop.com/assets/ajax-loader.gif" /></span>');
        };
        this.addResultContainer = function(fieldId) {
            $('#container_'+fieldId).append
            ('<br/><div id="'+fieldId+'_results" class="result-container " style="position:absolute; margin-top:2.5em; width:100%; z-index:15; background-color:white; font-size:12px; cursor:pointer; display:none;"></div>');
        };
        // ======================================== Injection Functions ===============================================

        //======================================= Sensis Utilities =============================================
        // sorting and preparing the results to a container for selection.
        SensisTotalCheck.sensisQueryResult = function(element,res,resultContainer,checkType) {
            var el = '';
            var i=0;
            var id = element.attr('id');
            console.log(id);

           // =================== Length of last_name input ==================
            if ((id == 'first_name') || (id == 'last_name')) {
                console.log('checking name');
                //if (res.result_count != '0' && element.val().length > 1) {

                    //element.addClass('sg-valid');
                    //element.siblings('.form-invalid-mark').css('display','none');
                   // element.siblings('.form-valid-mark').css('display','table');
                   // return true;
                //}
               // else{
                   // element.removeClass('sg-valid');
                   // element.siblings('.form-invalid-mark').css('display','table');
                  //  element.siblings('.form-valid-mark').css('display','none');
                  //  return false;
               // }
            }
            else {
                var result = res.results;
                var limit = 5;
                var tags = new Array();
                if(result.length < 5) { limit = result.length;}
                $('#'+resultContainer).empty();
                for(i=0;i<limit;i++){
                    if(checkType == 'address') {
                        el = '<div class="item-result" style="border-bottom:1px solid #000; padding:2px;" onClick="$(\'#'+resultContainer+'\').css(\'display\',\'none\'); $(\'#'+id+'\').val($(this).html());">'+result[i].formatted_address+'</div>';
                    }
                    else if(checkType == 'company') {
                      // WARNING: hardcoded #address here.
                        el = '<div class="item-result" style="border-bottom:1px solid #000; padding:2px;" onClick="$(\'#'+resultContainer+'\').css(\'display\',\'none\'); $(\'#'+id+'\').val(\''+result[i].primary_name+'\'); $(\'#address\').val(\''+result[i].formatted_address+'\');">'+
                        result[i].primary_name +'<br/>'+ result[i].formatted_address+'</div>';
                    }

                    $('#'+resultContainer).append(el);
                }
                $('#'+resultContainer).children().hover(function(){ $(this).css('background-color','#cccccc');},
                                                        function(){ $(this).css('background-color','#ffffff');});
                $('#'+resultContainer).css('display','block');
                element.addClass('sg-valid');
                // query always returns true
                return true;
            }
        };

        // validating using sensis
        SensisTotalCheck.sensisValidate = function(element,res,expectedField,validResult) {
            //var blackList = ['0400000000', '0411111111', '0422222222', '0433333333', '0455555555', '0466666666', '04777777777', '0488888888', '0499999999', '0412345678', 'me'];

            if ($.inArray(res.result[expectedField], validResult) != '-1' && $.inArray(element.val().split('@')[0], globalConfig.blacklist) == -1) {
              element.addClass('sg-valid');
              element.siblings('.form-invalid-mark').css('display', 'none');
              element.siblings('.form-valid-mark').css('display', 'table');
              return true;
            } else {
              element.removeClass('sg-valid');
              element.siblings('.form-invalid-mark').css('display', 'table');
              element.siblings('.form-valid-mark').css('display', 'none');
              return false;
            }
        };

        SensisTotalCheck.isElementValid = function(element) {
            if(element.hasClass('sg-valid')) {
                element.removeClass('sg-valid');
                return true;
            }
            return false;
        }

        // function to query to Sensis
        SensisTotalCheck.sensisCheck = function (element,checkType) {

            //var apiUrl = "https://stage-api.ext.sensisdata.com.au/rest/current/";
            var apiUrl = config.settings.url;
            var res = '';
            var validRes = '';
            var handlers = {};
            var resContainer = '';
            var valid = false;
            handlers.email   = 'validation';
            handlers.phone   = 'validation';
            handlers.name    = 'query';
            handlers.address = 'query';
            handlers.company = 'query';

            // when field is empty the execution stops here and change the border color
            if(element.val() == '') {
                element.removeClass('sg-valid');
                element.siblings('.form-invalid-mark').css('display','table');
                jQuery('#container_'+element.attr('id')+'_check').css('display','none');
                return false;
            }

            if(checkType == 'last_name') {
                apiUrl = apiUrl+'name?include_full_address_only=true&fuzzy_search=false&primary_name='+element.val();
                res = 'result_count';
                validRes = '0';
                resContainer = element.attr('id')+'_results';
            }
            else if (checkType == 'company') {
                apiUrl = apiUrl+'address?listing_type=business&primary_name='+element.val();
                res = '';
                validRes = '0';
                resContainer = element.attr('id')+'_results';
            }
            else if (checkType == 'address') {
                apiUrl = apiUrl+'address?formatted_address='+element.val();
                res = '';
                resContainer = element.attr('id')+'_results';
            }
            else if(checkType == 'email') {
                apiUrl = apiUrl+'email?email_address='+element.val();
                res = 'email_exists';
                validRes = new Array('VALID', 'UNKNOWN');
            }
            else if(checkType == 'phone') {
                apiUrl = apiUrl+'phone?country=AU&number='+element.val();
                res = 'phone_status';
                validRes = new Array('Active');
            }
            //else {
            //    return;
            //}

            $.ajax({
                url : apiUrl,
                method : "GET",
                //dataType: 'application/x-www-form-urlencoded',
                //async: false,

                xhr: function () { // to prevent x-requested-with header -- Leo's workaround
                    var xhr = jQuery.ajaxSettings.xhr();
                    var setRequestHeader = xhr.setRequestHeader;
                    xhr.setRequestHeader = function(name, value) {
                    if (name == 'X-Requested-With') {return;}
                    //if (name == 'Access-Control-Request-Headers') {return;}
                        setRequestHeader.call(this, name, value);
                    }
                    return xhr;
                },
                beforeSend: function(xhr){
                    xhr.setRequestHeader('X-Requested-With','Content-Type');
                    //xhr.setRequestHeader('Access-Control-Expose-Headers','x-json');
                    //xhr.setRequestHeader('Access-Control-Request-Headers', 'Content-Type');
                    xhr.setRequestHeader('Authorization', 'Basic '+config.settings.auth);
                    //xhr.setRequestHeader('Host', 'unbouncepages.com');
                    //xhr.setRequestHeader('Access-Control-Request-Method', 'GET');
                    //xhr.setRequestHeader('Origin', 'http://unbouncepages.com/sensis/');
                },
                success : function(result) {
                    if(typeof result == 'object') { // if query succeeded
                        if(handlers[checkType] == 'validation') {
                            valid = SensisTotalCheck.sensisValidate(element,result,res,validRes);
                        }
                        else {
                            valid = SensisTotalCheck.sensisQueryResult(element,result,resContainer,checkType);
                        }
                    }
                    else { // API down... return success
                        element.addClass('sg-valid');
                        element.siblings('.form-invalid-mark').css('display','none');
                        element.siblings('.form-valid-mark').css('display','table');
                    }
                    jQuery('#container_'+element.attr('id')+'_check').css('display','none');
                    jQuery('#container_'+element.attr('id')+'_check').css('display','none');
                },
                error : function() {
                    element.addClass('sg-valid');
                    element.siblings('.form-invalid-mark').css('display','none');
                    element.siblings('.form-valid-mark').css('display','table');
                },
            });

            if(element.hasClass('sg-valid')) {
                //element.removeClass('sg-valid');
                valid = true;
            }

            return valid;

        };

    // ======================================== Sensis Utilities END ======================================

    // ======================================== Utilities =================================================
        SensisTotalCheck.submissionCheck = function(fieldIds) {
            var formValid = true;
            var valid = true;
            var i =0;
            var element = '';
            for(i=0;i<fieldIds.length;i++){
                element = lp.jQuery('#'+fieldIds[i]);
                if(element.hasClass('sensisCheck')) {
                    if(SensisTotalCheck.sensisCheck(element,element.attr('sensisType')) == false){
                        formValid = false;
                        element.siblings('.form-invalid-mark').css('display','table');
                        element.siblings('.form-valid-mark').css('display','none');
                    }
                    else {
                        //alert('--->'+element.val());
                        element.siblings('.form-invalid-mark').css('display','none');
                        element.siblings('.form-valid-mark').css('display','table');
                    }
                }
                else {
                    if(element.val() == '') {
                        formValid = false;
                        element.siblings('.form-invalid-mark').css('display','table');
                        element.siblings('.form-valid-mark').css('display','none');
                    }
                    else {
                        element.siblings('.form-invalid-mark').css('display','none');
                        element.siblings('.form-valid-mark').css('display','table');
                    }
                }
            }
            return formValid;
        };

        SensisTotalCheck.executeHook = function( values, hook ) {
            var ready = false;
            var data = {};

            for(var key in values){
               data[key] = values[key];
            }

          console.log(values);
            $.ajax({
                url: hook,
                type: 'post',
                async: false,
                data: data,
                traditional: true,
                success: function(response) {
                    ready = true;
                }
            });
            return ready;
        };

        SensisTotalCheck.submitToOtherHooks = function(hooks, formId) {
            //var hooks = [
                        //'https://zapier.com/hooks/catch/3mnxw8/',
                        //'http://www.pages03.net/mirvacgroup/sg/Social-Garden-Jack-Rd-Web-Form'
            //            ];
            var formErrorElementId = formId+'-errors';
            var values = lp.jQuery("#"+formId+' form').serialize();
            console.log('val: '+values);
            values = values.replace(/\+/g, " "); // removing pluses after serializing
            values = values.split('&');
            var arrayVals = [];
            var cbox = '';
            var i=0;

            for(i=0;i<values.length;i++) {
                var pair = values[i].split('=');
                arrayVals[pair[0]] = decodeURIComponent(pair[1]);
            }

            if(Object.keys(window.sensisConfig.customFormFieldName).length > 0) {
                arrayVals=SensisTotalCheck.prepareCustomFormValues(arrayVals,
                         Object.keys(window.sensisConfig.customFormFieldName).length);
            }

            //console.log(arrayVals); //debugging purpose
            if(lp.jQuery('#'+formErrorElementId).css('display') != 'block') {
                // submits to handler if there's no error
                for(i=0;i<hooks.length;i++) {
                    SensisTotalCheck.executeHook(arrayVals,hooks[i]);
                }
            }
        };

        SensisTotalCheck.prepareCustomFormValues = function(arrayVals,length) {
            var val = '';
            var key = '';

            var customFields = window.sensisConfig.customFormFieldName;
            var tmp = '';

            for(i=0; i<length; i++) {
                tmp = customFields[i].split('=');
                key=tmp[0];
                val=tmp[1];//.split('formVal:');

                if(val.indexOf('formVal:') > -1){
                    val=val.split('formVal:');
                    val = val[(val.length-1)];
                    arrayVals[key] = arrayVals[val];
                }
                else if (val.indexOf('customArray:') > -1) {
                    val=val.split('customArray:');
                    tmp = val[(val.length-1)];
                    val = tmp.split(',');
                    arrayVals[key] = val;
                }
                else{
                    arrayVals[key]=val;


                }

            }
            return arrayVals;
        };

        SensisTotalCheck.delay = (function () {
            var timer = 0;
            return function (callback, ms) {
                clearTimeout(timer);
                timer = setTimeout(callback, ms);
            };
        })();

    // ======================================= Utilities END ===============================================

    // ========================================== Listener Setup ===========================================
        this.setQueryKeyupEvent = function(fieldId) {
            lp.jQuery('#'+fieldId).keyup(function(){
                var element = $(this);
                element.siblings('.form-invalid-mark').css('display','none');
                element.siblings('.form-valid-mark').css('display','none');
                if((element.val()).length > 0) {
                    jQuery('#container_'+element.attr('id')+'_check').css('display','block');
                    SensisTotalCheck.delay((function(){
                        if((element.val()).length > 5) {
                            SensisTotalCheck.sensisCheck(element,element.attr('sensisType'));
                        }
                    }) ,1000);
                }
            });
        };

        // this will make suggestion box dissapear when we unfocus the field
        this.setQueryBlurEvent = function(fieldId) {
            lp.jQuery('#'+fieldId).blur(function(){
                var element = $(this);
                // delay the execution so we can let ppl click on the suggestions
                setTimeout(function() { $('#'+element.attr('id')+'_results').css('display','none'); }, 200);
                if(element.val() != ''){
                    $('#'+element.attr('id')+'_results').siblings('.form-invalid-mark').css('display','none');
                    $('#'+element.attr('id')+'_results').siblings('.form-valid-mark').css('display','table');
                }
                else {
                    $('#'+element.attr('id')+'_results').siblings('.form-invalid-mark').css('display','none');
                }
            });
        };
        // for multiple results
        this.setupQueryListener = function(fieldIds) {
            var i = 0;
            for(i=0;i<fieldIds.length;i++) {
                this.setQueryKeyupEvent(fieldIds[i]);
                this.setQueryBlurEvent(fieldIds[i]);
            }
        };
        // for validation
        this.setupValidationListener = function(fieldIds) {
            var i = 0;
            var containsNumber = function(inputValue) {
                return (/\d/.test(inputValue));
            }
            for(i=0;i<fieldIds.length;i++) {
                lp.jQuery('#'+fieldIds[i]).blur(function(){
                    var element = $(this);
                    element.siblings('.form-invalid-mark').css('display','none');
                    element.siblings('.form-valid-mark').css('display','none');
                    if ((element.val()).length > 0 && ((element.attr('sensisType') == 'first_name') || (element.attr('sensisType') == 'last_name'))) {
                        jQuery('#container_' + element.attr('id') + '_check').css('display', 'block');
                        if (element.hasClass('sensisCheck')) {
                            SensisTotalCheck.sensisCheck(element, element.attr('sensisType'));
                        } else if (element.val().length > 1 && !containsNumber(element.val())) {
                            element.siblings('.form-valid-mark').css('display', 'block');
                        } else {
                            element.siblings('.form-invalid-mark').css('display', 'table');
                            element.siblings('.form-valid-mark').css('display', 'none');
                        }
                    } else if ((element.val()).length > 0) {
                    	jQuery('#container_' + element.attr('id') + '_check').css('display', 'block');
                        if (element.hasClass('sensisCheck')) {
                            SensisTotalCheck.sensisCheck(element, element.attr('sensisType'));
                        } else if (element.val().length > 0) {
                            element.siblings('.form-valid-mark').css('display', 'block');
                        } else {
                            element.siblings('.form-invalid-mark').css('display', 'table');
                            element.siblings('.form-valid-mark').css('display', 'none');
                        }
                    }
                });
            }
        };

        // trigger blur event
        SensisTotalCheck.triggerBlurEvent = function(fieldIds) {
            var i = 0;
            for(i=0;i<fieldIds.length;i++) {
                // only trigger blur if the fields has not been blurred yet
                if(lp.jQuery('#'+fieldIds[i]).siblings('.form-invalid-mark').css('display') == 'none' &&
                   lp.jQuery('#'+fieldIds[i]).siblings('.form-valid-mark').css('display') == 'none') {

                    lp.jQuery('#'+fieldIds[i]).trigger('blur');
                }
            }
        }

    // ======================================== Listener Setup END ==========================================


        this.injectionInit = function() {
            var i=0;

            for(i=0;i<(config.injectionConfig.fields).length;i++) {
                this.prepareFields(config.injectionConfig.fields[i]);
            }
            for(i=0;i<(config.injectionConfig.sensisCheckFields).length;i++) {
                this.addSensisCheck(config.injectionConfig.sensisCheckFields[i]);
            }
            for(i=0;i<config.fieldsToQuery.length;i++) {
                this.addResultContainer(config.fieldsToQuery[i]);
            }

            this.assignSensisCheckType();

            jQuery(".lp-form-errors").insertAfter("#"+config.formButtonId+" span");
            jQuery("#"+config.formId+" .lp-pom-form-field input[type=text]").after("<span class='form-invalid-mark' style=''>✕</span>");
            jQuery("#"+config.formId+" .lp-pom-form-field input[type=text]").after("<span class='form-valid-mark' style=''>✓</span>");
          	jQuery("#"+config.formId+" .lp-pom-form-field select").after("<span class='form-invalid-mark' style=''>✕</span>");
            jQuery("#"+config.formId+" .lp-pom-form-field select").after("<span class='form-valid-mark' style=''>✓</span>");
            jQuery("#"+config.formId+" .lp-pom-form-field .optionsList").after("<span class='form-invalid-mark' style=''>✕</span>");
            jQuery("#"+config.formId+" .lp-pom-form-field .optionsList").after("<span class='form-valid-mark' style=''>✓</span>");

            //console.log( jQuery('#phone').data('event') );
        };

    // ================================================ INIT ===================================================
    // ALL CALLING FUNCTIONS ARE DONE HERE!!! HEREEEEEEE!!!
        SensisTotalCheck.formSubmission = function() {
            SensisTotalCheck.triggerBlurEvent(config.fieldsCheckOnSubmit); // trigger the blur event when necessary
            setTimeout(function() {
                var formValid = true;
                // final field check before submission.
                formValid = SensisTotalCheck.submissionCheck(config.fieldsCheckOnSubmit);
              	
              	// Mouseflow - submit attempt
                if ($.cookie("mf_user")) {
              	window._mfq.push(['formSubmitAttempt', '#ub_form_id']);
                };
                
              if(formValid == true && !submitted) {
                  //heap.track('user_submitted');
                  
                  submitted = true;
                    //Social Garden:
                    // insert conversion true/false field for anonymous leads
                  	jQuery(".lp-pom-form .lp-pom-button").append('<span class="button-ajax"><img src="http://folderhop.com/assets/ajax-loader.gif" /></span>'); 
                    //console.log('submitted');
                    var $el = $("<span data-check-form-submit='true' id='check-form-submit' 'display='none'></span>");
                    $('form').append($el);
                  	
                  	// Mouseflow - submit success
                    if ($.cookie("mf_user")) {
                  	window._mfq.push(['formSubmitSuccess', '#ub_form_id']);
                    };
                
                    // GTM Custom Conversion Event - submit success
                		if (typeof dataLayer != "undefined") {
   					  				dataLayer.push({
                        'event': 'Conversion',
                        'eventCategory' : 'Lead Capture Page',
                        'eventAction' : 'Form Submission',
                        'eventLabel': window.location.href.split('?')[0],
                        'eventValue' : undefined
                      });
                      console.log('GTM-CC');
										};
                  
                    SensisTotalCheck.submitToOtherHooks (config.hooks, config.formId);
                    lp.jQuery('#'+config.formId+' form').submit();
                }
                else {
                  	// Mouseflow - submit failure
                    if ($.cookie("mf_user")) {
                  	window._mfq.push(['formSubmitFailure', '#ub_form_id']);
                    window._mfq = window._mfq || [];
					          window._mfq.push(["tag","Submit Error"]);
                    };
                    
                  	jQuery('.lp-form-errors').css('display','block'); 
                }
            },1000);
        };
        this.sensisInit = function() {
            this.setupQueryListener(config.fieldsToQuery); // for multiple results e.g. address
            this.setupValidationListener(config.fieldsToValidate); // for validations e.g. phone, email

            //lp.jQuery('#'+config.formId+' form').attr('action',lp.jQuery('#'+config.formId+' form').attr('action')+'#'+config.formId);

            lp.jQuery("#"+config.formButtonId).unbind("click"); // remove original click event from unbounce
            lp.jQuery("#"+config.formButtonId).unbind("touched"); // remove original touched event from unbounce
            lp.jQuery("#"+config.formButtonId).unbind("touchstart"); // remove original touhstart event from unbounce
            lp.jQuery("#"+config.formButtonId).attr("href",'javascript:void(0)'); // keep screen focus on the form

            lp.jQuery("#"+config.formButtonId).bind('mousedown',function(event){ // and then add our own event
                SensisTotalCheck.formSubmission();
            });
            lp.jQuery("#"+config.formButtonId).bind('touchstart',function(event){ // and then add our own event
                SensisTotalCheck.formSubmission();
            });
        };

        // ============================================ INIT END ===================================================

    };

    var sensis = new SensisTotalCheck(window.sensisConfig);
    sensis.injectionInit();
    sensis.sensisInit();


});
 