/* This file is called from indexGeoCoding.html and manages the Google Maps retrieval and presentation */


var map;
var marker;



function initialize() {
    
      var latmap = 60;
      var latmap = localStorage.getItem("latitude");
      var longmap = localStorage.getItem("longitude");
        
	var mapOptions = {
        center: new google.maps.LatLng(latmap, longmap),
		zoom: 6,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
 
}

google.maps.event.addDomListener(window, 'load', initialize); 


function searchAddress() {

	var addressInput = document.getElementById('address-input').value;

	var geocoder = new google.maps.Geocoder();

	geocoder.geocode({address: addressInput}, function(results, status) {

		if (status == google.maps.GeocoderStatus.OK) {

      var myResult = results[0].geometry.location;

  //      var latt = results[0].geometry.location.lat();
  //      var longg =  results[0].geometry.location.lng();
             
   //         console.log(myResult); 
   //           console.log(latt);    
   //            console.log(longg);
   //            console.log(addressInput);
            
   //   createLocationObject(addressInput,latt,longg);   
            
      createMarker(myResult);

      map.setCenter(myResult);

      map.setZoom(17);
		}
	});

   
}


function createLocationObject(loc,lat,lng)  {
    STORAGE_KEY = "GeoLocation Details";
    
    var places = [];
       
    var retrievedLocationObject = JSON.parse(localStorage.getItem(STORAGE_KEY));
    places.push(retrievedLocationObject);
    
    console.log( 'just got local storage back. places =',places);
    
    locationObject = { 
          address:loc,
          latitude:lat,
          logitude:lng
        };
    console.log ('new object about to be pushed Object =', locationObject);
    
    places.push(locationObject);
    
     console.log(' just pushed loc,lat,lng. places now=',places ) ; 
    
    console.log(' just pushed merthy  places now=',places ) ; 
       
    console.log("Displaying dlocation object",locationObject);
    
    var dataToBeStored = JSON.stringify(places);
    console.log( 'data2B stored is',dataToBeStored );
    
     localStorage.setItem(STORAGE_KEY, dataToBeStored); 
    
    
    console.log('here is data 2 be stored');
    console.log(dataToBeStored);
    console.log('here is places');
    console.log(places);
    console.log('here is location object');
    console.log(locationObject);
      
  <!--   localStorage.clear();   -->
    
}

                   

function createMarker(latlng) {

  if(marker != undefined && marker != ''){
    marker.setMap(null);
    marker = '';
  }

  marker = new google.maps.Marker({
    map: map,
    position: latlng
  });
}