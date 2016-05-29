// Code for the View Location page.

// This is sample code to demonstrate navigation.
// You need not use it for final app.

var STORAGE_KEY = "GeoLocation Details";

var locationIndex = localStorage.getItem(APP_PREFIX + "-selectedLocation"); 
if (locationIndex !== null)
{
    var locationNames = [ "Melbourne", "Sydney", "Brisbane", "Adelaide" ];
    

    // If a location name was specified, use it for header bar title.
    document.getElementById("headerBarTitle").textContent = locationNames[locationIndex];
    
    
    var retrievedObject4 = JSON.parse(localStorage.getItem(STORAGE_KEY));
    console.log('IN viewlocation.js , local sdtor is :',retrievedObject4 );
}
