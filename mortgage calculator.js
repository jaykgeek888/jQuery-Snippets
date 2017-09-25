  $(function() {
      /*field variables*/
      var LoanAmount = $('#loan_amount'),
          LoanTerm = $('.form_elem_home_loan_term'),
          RepaymentFrequency = $('#repayment_frequency'),
          InterestRate = $('#interest_rate'),  
          valLoanAmount,
          valLoanTerm = 30,
          valReFrequency = 12,   
          resMonthlyPercent, 
          resMonthlyPayment,
          resTotalInterest,  
		  fInterestRate, 
          fRepaymentInterest, 
          fRepaymentPrincipal, 
          fRepaymentPeriod, 
          fTotalRepayment, 
          ffTotalRepayment,
          tempIntRate,
          tempLoanTerm,
          tempLoanAmmount, 
          tempValLoanAmmount,
          valLoanAmmount, 
          costLoan,
          totalCostLoan ,
          tempIntRateUp,
          valIntRateUp,
          fInterestRateUp,
          costLoanuP,
          totalCostLoanuP,
          totalCostLoanuP,
          valRepaymentType = 'Principal and interest',
          initIntRateUp,
          fInterestRateuP

     function setMRepaymentFreq() { 
      tempIntRate =  parseInt($(InterestRate).val()) / valReFrequency;
      tempIntRateUp = parseFloat(0.50) / valReFrequency;
      tempLoanAmmount = $(LoanAmount).val().substring(1);
      tempValLoanAmmount = tempLoanAmmount.replace(/,/g, '');  
      fInterestRate = parseFloat($(InterestRate).val()) /   100 / valReFrequency;
      fInterestRateuP = parseFloat(0.50) /   100 / valReFrequency + fInterestRate; 
      fRepaymentPeriod = parseFloat(valLoanTerm) * valReFrequency; 
	  
	  function PMT(fInterestRate, fRepaymentPeriod, tempValLoanAmmount) {
        return  tempValLoanAmmount * (fInterestRate * (Math.pow((1 + fInterestRate), fRepaymentPeriod)) / (1 - Math.pow((1 + fInterestRate), fRepaymentPeriod)));
      } 
	  
       
       function PMTS(fInterestRateuP, fRepaymentPeriod, tempValLoanAmmount) {
        return  tempValLoanAmmount * (fInterestRateuP * (Math.pow((1 + fInterestRateuP), fRepaymentPeriod)) / (1 - Math.pow((1 + fInterestRateuP), fRepaymentPeriod)));
      } 
          
      
      //initComp();
      fTotalRepayment =  -PMT(fInterestRate, fRepaymentPeriod, tempValLoanAmmount).toFixed(2);   
      valIntRateUp = -PMTS(fInterestRateuP, fRepaymentPeriod, tempValLoanAmmount).toFixed(2);   
       
      initIntRateUp = valIntRateUp + fTotalRepayment;  
      fRepaymentPrincipal =  fTotalRepayment - fRepaymentInterest;   
      costLoan = fTotalRepayment * fRepaymentPeriod; 
      costLoanuP = valIntRateUp * fRepaymentPeriod;  
      totalCostLoan = costLoan - tempValLoanAmmount; 
      totalCostLoanuP =  costLoanuP - tempValLoanAmmount; 
      
      
       
      if(valRepaymentType == 'Interest only') { 
	     fTotalRepayment =   tempValLoanAmmount * fInterestRate; 
         valIntRateUp = tempValLoanAmmount * fInterestRateuP;
         initIntRateUp =   tempValLoanAmmount * tempIntRateUp; 
         totalCostLoan = fTotalRepayment * fRepaymentPeriod;
         totalCostLoanuP =   valIntRateUp * fRepaymentPeriod; 
         //totalCostLoanuP = valIntRateUp * fRepaymentPeriod; 
         //totalCostLoanuP = fTotalRepayment + totalCostLoanuP;
         
	  } 
       
      //console.log(fInterestRateuP); 
       //console.log(valIntRateUp); 
      displayTimeframeRepayment();  
      //$('#timeframe_repayments').text('$' + fTotalRepayment.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));  
      $('#total_interest').text('$' + totalCostLoan.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));  
      $('#monthly_repayments_up').text('$' + valIntRateUp.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')); 
      $('#total_interest_up').text('$' + totalCostLoanuP.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')); 
 	  //console.log('Repayment Interest:' + '$' + fRepaymentInterest.toFixed(2));
       
 		/*console.log('Interest rate:' + tempIntRate.toFixed(2) + '%');
        console.log('Repayment period:' + fRepaymentPeriod);
        console.log('Repayment Interest:' + '$' + fRepaymentInterest.toFixed(2));
        console.log('Repayment Principal:' + '$' + fRepaymentPrincipal.toFixed(2));
        console.log('Principal + Interest:' + '$' + fTotalRepayment);*/
     }   
    
    
     
    
    function setIntroductoryRate() { 
      tempIntRate =  parseInt($('#interest_rate_during_introductory_period').val()) / valReFrequency; 
      tempLoanAmmount = $(LoanAmount).val().substring(1);
      tempValLoanAmmount = tempLoanAmmount.replace(/,/g, '');  
      fInterestRate = parseFloat($('#interest_rate_during_introductory_period').val()) / 100 /  valReFrequency;
      fRepaymentPeriod = parseFloat(valLoanTerm) * valReFrequency; 
	   function PMT(fInterestRate, fRepaymentPeriod, tempValLoanAmmount) {
        return  tempValLoanAmmount * (fInterestRate * (Math.pow((1 + fInterestRate), fRepaymentPeriod)) / (1 - Math.pow((1 + fInterestRate), fRepaymentPeriod)));
      } 
      fRepaymentInterest =   tempValLoanAmmount * fInterestRate;   
      ffTotalRepayment =  -PMT(fInterestRate, fRepaymentPeriod, tempValLoanAmmount).toFixed(2); 
      displayTotalInterest();
      displayTimeframeRepayment(); 
      $('#total_introductory').text('$' + ffTotalRepayment.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')); 
     }   

     /*repayment frequency*/
    function getRepaymentFrequency() { 
        if ($(RepaymentFrequency).val() == 'monthly') {
          valReFrequency = 12; 
        }
        else if ($(RepaymentFrequency).val() == 'fortnightly') {
          valReFrequency = 26; 
        }
        else {
          valReFrequency = 52; 
        } 
      	setMRepaymentFreq();
      }


      $(RepaymentFrequency).change(function() {
         getRepaymentFrequency();   
      });  


    $('#lp-pom-button-610, #lp-pom-button-609,#lp-pom-button-617, #lp-pom-button-618').click(function() {  
      setMRepaymentFreq();
      setIntroductoryRate()
    });  
    
 	$('#lp-pom-button-638, #lp-pom-button-637').click(function() {  
      setIntroductoryRate();
    });  
    
    function displayTimeframeRepayment(){
    	$('#timeframe_repayments').text('$' + fTotalRepayment.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
    }
    function displayTotalInterest(){
    	$('#total_interest').text('$' + totalCostLoan.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
    }

    $('.form_elem_repayment_type').change(function() { 
      if($(this).val() == 'Interest only') {
         valRepaymentType = 'Interest only';
         setMRepaymentFreq();  
        
       } else {
         valRepaymentType = 'Principal and interest';
         setMRepaymentFreq();   
       }  
    });  

     $('.form_elem_home_loan_term').change(function() {  
          if($(this).val() == '25 Years') {
             valLoanTerm = 25;  
             setMRepaymentFreq(); 	 
          } else {
             valLoanTerm = 30;    
             setMRepaymentFreq();  
          }  
     });


    /*load default computation*/ 
    setMRepaymentFreq(); 

    /*get results for display*/
    function setMontlhyPercentage() {
     var intRateText = InterestRate.val();
      $('.interest_rate_p').text(intRateText); 
    }   

    $(InterestRate).on('keypress, change, keyup', function() {
      setMontlhyPercentage();
      setMRepaymentFreq(); 
    });  
    
    $('#interest_rate_during_introductory_period').on('keypress, change, keyup', function() {
      setMontlhyPercentage();
      setIntroductoryRate(); 
    }); 
  }); 
