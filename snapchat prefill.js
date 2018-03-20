	 <script type="text/javascript">  
		(function(win, doc, sdk_url){
			if(win.snaptr) return;
			var tr=win.snaptr=function(){
				tr.handleRequest? tr.handleRequest.apply(tr, arguments):tr.queue.push(arguments);
			};
			tr.queue = [];
			var s='script';
			var new_script_section=doc.createElement(s);
			new_script_section.async=!0;
			new_script_section.srt=sdk_url;
			var insert_pos=doc.getElementsByTagName(s)[0];
			insert_pos.parentNode.insertBefore(new_script_section,insert_pos);
		})(window, document, 'https://sc-static.net/scevent.min.js');  
		
		
		//request data using the builtin snapchat call back function
		var request = {
			//this is the callback function
			onComplete : function(info) {
					//use the data returned from the app
					if('name' in info) $('.mktoForm #FirstName').val(info['name']);
					if('email' in info) $('.mktoForm #Email').val(info['email']);
					if('phone' in info) $('.mktoForm #MobilePhone').val(info['phone']);
			},
			// these are the requested fields
			fields : ['name', 'email', 'phone'] 
		};

		snaptr('autofill', request);
       
       
		setTimeout(function(){    
			snaptr('autofill', request); 
		}, 1000); 
       
		//console.log(name);
		//utm_Name = info['name'];
		//utm_Email = info['email'];
		//utm_Phone = info['phone']; 
			
		/*$(document).ready(function() { 
		  setTimeout(function(){    
			$('.mktoForm #FirstName').val(utm_Name); 
			$('.mktoForm #Email').val(utm_Email); 
			$('.mktoForm #Phone').val(utm_Phone);

			console.log(utm_Name + ' ' + utm_Email + ' ' + utm_Phone); 
		  
		  }, 1000); 
		  
		  
		});*/
	</script>