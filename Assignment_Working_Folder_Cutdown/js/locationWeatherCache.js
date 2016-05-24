
// Returns a date in the format "YYYY-MM-DD".
Date.prototype.simpleDateString = function() {
    function pad(value)
    {
        return ("0" + value).slice(-2);
    }

    var dateString = this.getFullYear() + "-" + 
            pad(this.getMonth() + 1, 2) + '-' + 
            pad(this.getDate(), 2);
    
    return dateString;
}

// Date format required by forecast.io API.
// We always represent a date with a time of midday,
// so our choice of day isn't susceptible to time zone errors.
Date.prototype.forecastDateString = function() {
    return this.simpleDateString() + "T12:00:00";
}


// Code for LocationWeatherCache class and other shared code.

// Prefix to use for Local Storage.  You may change this.
var APP_PREFIX = "weatherApp";

function LocationWeatherCache()
{
    // Private attributes:

    var locations = [];
    var callbacks = {};

    // Public methods:
    
    // Returns the number of locations stored in the cache.
    //
    this.length = function() {
    };
    
    // Returns the location object for a given index.
    // Indexes begin at zero.
    //
    this.locationAtIndex = function(index) {
    };

    // Given a latitude, longitude and nickname, this method saves a 
    // new location into the cache.  It will have an empty 'forecasts'
    // property.  Returns the index of the added location.
    //
    this.addLocation = function(latitude, longitude, nickname)
    {
        console.log(longitude);
        
    }

    // Removes the saved location at the given index.
    // 
    this.removeLocationAtIndex = function(index)
    {
    }

    // This method is used by JSON.stringify() to serialise this class.
    // Note that the callbacks attribute is only meaningful while there 
    // are active web service requests and so doesn't need to be saved.
    //
    this.toJSON = function() {
    };

    // Given a public-data-only version of the class (such as from
    // local storage), this method will initialise the current
    // instance to match that version.
    //
    this.initialiseFromPDO = function(locationWeatherCachePDO) {
    };

    // Request weather for the location at the given index for the
    // specified date.  'date' should be JavaScript Date instance.
    //
    // This method doesn't return anything, but rather calls the 
    // callback function when the weather object is available. This
    // might be immediately or after some indeterminate amount of time.
    // The callback function should have two parameters.  The first
    // will be the index of the location and the second will be the 
    // weather object for that location.
    // 
    this.getWeatherAtIndexForDate = function(index, date, callback) {
    };
    
    // This is a callback function passed to forecast.io API calls.
    // This will be called via JSONP when the API call is loaded.
    //
    // This should invoke the recorded callback function for that
    // weather request.
    //
    this.weatherResponse = function(response) {
    };

    // Private methods:
    
    // Given a latitude and longitude, this method looks through all
    // the stored locations and returns the index of the location with
    // matching latitude and longitude if one exists, otherwise it
    // returns -1.
    //
    function indexForLocation(latitude, longitude)
    {
      
} 
    }

// Restore the singleton locationWeatherCache from Local Storage.
//





function loadLocations()
// locations previously accepted and stored by AddLocation.html and Map.js
{
  // location string to initilise local storage  
  var i;
  weatherTextStringGlob = '';     // Global scope as defined here but populated&printed by "getWeather" function
                                  // which is called repetitvely from a loop in this function. Do not want to
                                  // recreate and initialise repetitively !   
    
  var STORAGE_KEY = "GeoLocation Details";
    
  retrievedObject = JSON.parse(localStorage.getItem(STORAGE_KEY));
                                              
  var  locationObject = { 
          address:"paris",
          nickname:"par",
          latitude:33.456,
          longitude:123.564
        };      
                 
   
      var len = retrievedObject.length;                      
    
        for (i = 0; i < len; i++) {  
        getWeather(retrievedObject[i].latitude, retrievedObject[i].longitude, i ) ;   
        }          
}
    
   
   
function getWeather(lat,long, ind){

            var apiKey = 'd79230ac23ff01c34c4447bcc3c6e6d3';
            var url = 'https://api.forecast.io/forecast/';
            var lati = lat;
            var longi = long;
            var weatherData = [];
            

            jQuery.getJSON(url + apiKey + "/" + lati + "," + longi + "?callback=?", function(weatherData) {
                                 
                if(!weatherData) {
                    summary = "Error - no weather data retrieved";
                    console.log("Have null data available for that location Latitude", lati);
                }  else {     
              retrievedObject[ind].summary = weatherData.currently.summary;        
              retrievedObject[ind].temperatureMin = weatherData.daily.data[ind].temperatureMin;
              retrievedObject[ind].temperatureMax = weatherData.daily.data[ind].temperatureMax; 
                                
 //Manually make the temp into SI! converting it to celcius
                    
              retrievedObject[ind].temperatureMin =  (retrievedObject[ind].temperatureMin - 32) * (5/9);
              retrievedObject[ind].temperatureMax =  (retrievedObject[ind].temperatureMax - 32) * (5/9);
 
                    
//To fixed loop _min
    var temp_1 = retrievedObject[ind].temperatureMin;            
    temp_1 = temp_1.toFixed(1);           
    retrievedObject[ind].temperatureMin = temp_1;        
                
//To fixed loop _max
    var temp_2 = retrievedObject[ind].temperatureMax;                
    temp_2 = temp_2.toFixed(1);               
    retrievedObject[ind].temperatureMax = temp_2;        
                        
 //Pad Favourites - Summary                 
             var summ =   retrievedObject[ind].summary;        
           var pad = "";    
           var numSpaces = 15 - Number(summ.length); 
          for (k=0;k<= numSpaces ; k++)   
             {
                pad = pad + ".";
               }
            retrievedObject[ind].summPadding = pad;  
                         
   //Pad Favourites - Min Temp               
             var minTemp=   retrievedObject[ind].temperatureMin;         
           var pad = "";    
           var numSpaces = 4 - Number(minTemp.length); 
          for (k=0;k<= numSpaces ; k++)   
             {
                pad = pad + ".";
               }
            retrievedObject[ind].minTempPadding = pad; 
                         
 // Main statement for displaying Favourites output
                    
 weatherTextStringGlob += "Location: " +  retrievedObject[ind].address + " ....Nickname: " +  retrievedObject[ind].nickname + "<br>"+  "Summary: " + retrievedObject[ind].summary + retrievedObject[ind].summPadding + "Min Temp(C): " +  retrievedObject[ind].temperatureMin + retrievedObject[ind].minTempPadding + "......Max Temp(C): "  +  retrievedObject[ind].temperatureMax +  "<br>" ;
   };
     document.getElementById("outputArea").innerHTML = weatherTextStringGlob;
  });
                         
    
 };


// Save the singleton locationWeatherCache to Local Storage.
//
function saveLocations()
{
 localStorage.setItem('place', 'Melbourne');
 localStorage.setItem('place', 'Sydney');   
}

