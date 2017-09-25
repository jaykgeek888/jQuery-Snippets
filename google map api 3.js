		var mapstyles = [
							{
								"featureType": "water",
								"elementType": "all",
								"stylers": [
									{
										"hue": "#0ab8f7"
									},
									{
										"saturation": -48
									},
									{
										"lightness": 18
									}
								]
							},
							{
								"featureType": "water",
								"elementType": "all",
								"stylers": [
									{
										"hue": "#0ab8f7"
									},
									{
										"saturation": -48
									},
									{
										"lightness": 18
									}
								]
							},
							{
								"featureType": "landscape.natural.terrain",
								"elementType": "all",
								"stylers": [
									{
										"visibility": "off"
									},
									{
										"saturation": -5
									}
								]
							},
							{
								"featureType": "landscape.man_made",
								"elementType": "all",
								"stylers": [
									{
										"visibility": "off"
									}
								]
							},
							{
								"featureType": "poi.school",
								"elementType": "all",
								"stylers": [
									{
										"visibility": "off"
									}
								]
							},
							{
								"featureType": "poi.business",
								"elementType": "all",
								"stylers": [
									{
										"visibility": "off"
									}
								]
							},
							{
								"featureType": "poi.park",
								"elementType": "all",
								"stylers": [
									{
										"visibility": "off"
									}
								]
							},
							{
								"featureType": "poi.sports_complex",
								"elementType": "all",
								"stylers": [
									{
										"visibility": "off"
									}
								]
							},
							{
								"featureType": "poi.attraction",
								"elementType": "all",
								"stylers": [
									{
										"visibility": "off"
									}
								]
							},
							{
								"featureType": "poi.government",
								"elementType": "all",
								"stylers": [
									{
										"visibility": "off"
									}
								]
							},
							{
								"featureType": "transit.line",
								"elementType": "all",
								"stylers": [
									{
										"visibility": "on"
									}
								]
							},
							{
								"featureType": "road.arterial",
								"elementType": "geometry",
								"stylers": [
									{
										"visibility": "on"
									},
									{
										"color": "#dedace"
									}
								]
							},
							{
								"featureType": "road.highway",
								"elementType": "geometry",
								"stylers": [
									{
										"saturation": -21
									},
									{
										"lightness": 48
									}
								]
							},
							{
								"featureType": "road.highway.controlled_access",
								"elementType": "geometry",
								"stylers": [
									{
										"saturation": -29
									},
									{
										"lightness": 42
									}
								]
							},
							{
								"featureType": "landscape.natural",
								"elementType": "geometry.fill",
								"stylers": [
									{
										"saturation": -13
									},
									{
										"lightness": 47
									}
								]
							}
						];
			
  var map;
  function initMap() {
    var myLatlng = new google.maps.LatLng(-33.832014, 151.074042);
		var mapCenter = myLatlng;
    
/*     map = new google.maps.Map(document.getElementById('map_canvas'), {
      //center: {lat: -33.832014, lng: 151.074042},
      zoom: 14,
      mapTypeControlOptions: {
			  mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
			}
    }); */
    
    var mapOptions = {
			zoom: 14,
			mapTypeControl: false,
			panControl: true,
			panControlOptions: {
				position: google.maps.ControlPosition.LEFT_TOP
			},
			zoomControl: true,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.SMALL,
				position: google.maps.ControlPosition.LEFT_TOP
			},
			streetViewControl: false,
			center: mapCenter,
			mapTypeControlOptions: {
			  mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
			},
			scrollwheel:  false
		};
    
    var map = new google.maps.Map(document.getElementById('map_canvas'),mapOptions);
    
    var rendererOptions = {
		  map: map,
		  suppressMarkers : true
		}
    var styledMapOptions = {
			name: 'Custom Map'
		};
		
		var customMapType = new google.maps.StyledMapType(mapstyles, styledMapOptions);
		map.mapTypes.set('map_style', customMapType);
		map.setMapTypeId('map_style');
		
		var platmkr = new google.maps.MarkerImage(
		  'https://app.unbouncepreview.com/publish/assets/c8a86ece-d766-4727-8f33-67f9abd331b8/18ff5819-one-marker.png'
		); 
		
		var marker = new google.maps.Marker({
			position: myLatlng, 
			map: map,
			icon: platmkr,	
			size: new google.maps.Size(100, 100),			
			anchor: new google.maps.Point(100, 50),
			origin: new google.maps.Point(0, 0),
			title:"One The Waterfront"
		});
    
    marker.setMap(map);
  }
