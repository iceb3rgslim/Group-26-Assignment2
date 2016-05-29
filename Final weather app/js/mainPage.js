// Code for the main app page (locations list).

// This is sample code to demonstrate navigation.
// You need not use it for final app.

function viewLocation(locationName)
{
    
     STORAGE_KEY = "GeoLocation Details";
   
   var retrievedObject2 = JSON.parse(localStorage.getItem(STORAGE_KEY));
 
  console.log('IN Mainpage Retrieved object array2 data is ', retrievedObject2);
    
    
    
    // Save the desired location to local storage
  localStorage.setItem(APP_PREFIX + "-selectedLocation", locationName); 
  
    // And load the view location page.
    location.href = 'viewlocation.html';
    
    
   
}
