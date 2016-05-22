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
    STORAGE_KEY = "GeoLocation Details";
    
    var places = [];
    
       
    var retrievedLocationObject = JSON.parse(localStorage.getItem(STORAGE_KEY));
  
  console.log('Retrieved object array data is ', retrievedLocationObject);
    
    
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
    
 //   console.log('already stored', alreadyStored);
    
      if (!alreadyStored)    { 
          places[array_len ] = locationObject;
             }
   
    
//    console.log('Just pushed -  places 1 is', places);

     
    //Modify this to allow for more list elements!!!
    
   if (array_len >= 10)  {
     //for (j=0;j<=2;j++)
      places.splice(0,1);       //Modify this to add the cutoff elements.
   }
    console.log('places 1 is now', places[1]);

    
    
    var dataToBeStored = JSON.stringify(places);
    console.log( 'IN MAP.js DataToBeStored from JSON Stringify(places) =',dataToBeStored );
    
     window.localStorage.setItem(STORAGE_KEY, dataToBeStored); 
    
     retrievedLocationObject = JSON.parse(localStorage.getItem(STORAGE_KEY));
     console.log('MAP .js stored and retrived location object is ', retrievedLocationObject);
    
     console.log('MAP .js length retrieved locat object array is', retrievedLocationObject.length);
    
     console.log( ' &&&&& array lenght is', array_len);
    
   

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
            