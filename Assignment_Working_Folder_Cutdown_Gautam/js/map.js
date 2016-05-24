/* This file is called from indexGeoCoding.html and manages the Google Maps retrieval and presentation */
/* It also manages the addition and removal of locations */


var map;
var marker;


function initialize() {

      //var latmap = 60;
     latmap = -37.9116;
     longmap = 145.1340; 
    
 //     var latmap = localStorage.getItem("latitude");
 //     var longmap = localStorage.getItem("longitude");  
    
	var mapOptions = {
        center: new google.maps.LatLng(latmap, longmap),
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
 
}

google.maps.event.addDomListener(window, 'load', initialize); 


function searchAddress() {

	var addressInput = document.getElementById('address-input').value;
    
    var nickName;
    
    if(!document.getElementById('nickname-input').value) {
            nickName = addressInput;
    }
    else   { 
              nickName = document.getElementById('nickname-input').value;
           };
    
	var geocoder = new google.maps.Geocoder();

	geocoder.geocode({address: addressInput}, function(results, status) {

		if (status == google.maps.GeocoderStatus.OK) {

      var myResult = results[0].geometry.location;

      var latt = results[0].geometry.location.lat();
      var longg =  results[0].geometry.location.lng();
            
      createMarker(myResult);

      map.setCenter(myResult);

      map.setZoom(17);
            
      
		}
	});
   
}


function createLocationObject(loc,nic,lat,lng)  {
   var STORAGE_KEY = "GeoLocation Details";
    
    var places = [];
    
       
    var retrievedLocationObject = JSON.parse(localStorage.getItem(STORAGE_KEY));
  
//  console.log('Retrieved object array data is ', retrievedLocationObject);
    
 var cleanedObjectArray = [];
 if (retrievedLocationObject)      {  
      for (var i = 0; i < retrievedLocationObject.length; i++) {
        if (retrievedLocationObject[i]) {
            cleanedObjectArray.push(retrievedLocationObject[i]);
        }
     }
 }
//  console.log('New array is ', cleanedObjectArray);
    
    
// Test if "retrievedLocationObject" is not null or undefined. If it is null then
// array index = 0. Else copy each object into "places" array, incrementing the index.
    
    if (cleanedObjectArray) {
         var array_len =  cleanedObjectArray.length;
           for (var  i=0;i< array_len;i++ )  {
           places[i] = cleanedObjectArray[i];
         }        
    }
    else  {
         array_len = 0;
    }

        locationObject = { 
          address:loc,
          nickname:nic,    
          latitude:lat,
          longitude:lng
        };
    
    console.log('new obj #1 is ', locationObject);

    var alreadyStored = 0;
    
    if (cleanedObjectArray) {
        for (var i=0;i< cleanedObjectArray.length  ;i++)  {
             if (locationObject.address == cleanedObjectArray[i].address)   {
                  alreadyStored = 1;
                }
            }
       };
    
      if (!alreadyStored)    { 
          places[array_len ] = locationObject;
             }
   
   if (array_len >= 10)  {
      places.splice(0,1);      
   }
    
    var dataToBeStored = JSON.stringify(places);
    
     window.localStorage.setItem(STORAGE_KEY, dataToBeStored); 
     alert('Location has been added to list of favourites');
     retrievedLocationObject = JSON.parse(localStorage.getItem(STORAGE_KEY));

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


function searchAddress_1() {
   var addressInput = document.getElementById('address-input').value;
    
    var nickName;
    
    if(!document.getElementById('nickname-input').value) {
            nickName = addressInput;
    }
    else   { 
              nickName = document.getElementById('nickname-input').value;
           };
    
	var geocoder = new google.maps.Geocoder();

	geocoder.geocode({address: addressInput}, function(results, status) {

		if (status == google.maps.GeocoderStatus.OK) {

      var myResult = results[0].geometry.location;

      var latt = results[0].geometry.location.lat();
      var longg =  results[0].geometry.location.lng();
    
    createLocationObject(addressInput,nickName,latt,longg);   
            
       }
	});
   
}

function removeAddress(){
    
      var STORAGE_KEY = "GeoLocation Details"; 
      var places = [];       
      var retrievedLocationObject = JSON.parse(localStorage.getItem(STORAGE_KEY));
      var foundTheAddress = 0;
      var addressInput = document.getElementById('address-input').value;
    
 var cleanedObjectArray = [];
 if (retrievedLocationObject)      {  
      for (var i = 0; i < retrievedLocationObject.length; i++) {
        if (retrievedLocationObject[i]) {
            cleanedObjectArray.push(retrievedLocationObject[i]);
        }
     }
 }
    
// Test if "retrievedLocationObject" is not null or undefined. If it is null then
// array index = 0. Else copy each object into "places" array, incrementing the index.
    
    if (cleanedObjectArray) {
         var array_len =  cleanedObjectArray.length;
           for (var  i=0;i< array_len;i++ )  {
           places[i] = cleanedObjectArray[i];
         }        
    }
    else  {
         array_len = 0;
    }
   
        for (var i=0;i< places.length  ;i++)  {
             if (places[i].address == addressInput)   {
                  foundTheAddress = 1;
                  var indexx = i;        // Temporary variable to store "i" before we alter it to stop loop
                  i = places.length;     // Forces the "for loop" to stop
                }
            }
        if (foundTheAddress == 1) {
            places.splice(indexx,1);
        } 

    var dataToBeStored = JSON.stringify(places);
//    console.log( 'Remove address in MAP.js DataToBeStored from JSON Stringify(places) =',dataToBeStored );
    
     window.localStorage.setItem(STORAGE_KEY, dataToBeStored); 
     alert('Location has been removed from list of favourites');
    
};
  




