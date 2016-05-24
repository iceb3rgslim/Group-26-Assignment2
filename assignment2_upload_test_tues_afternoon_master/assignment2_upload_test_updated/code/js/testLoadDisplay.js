var testLocations  = [];

testLocations.push({ 'place': 'melbourne', 'latitude': 34.564, 'longitude': 123.456, 'weather': 'sunny' });
testLocations.push({ 'place': 'sydney', 'latitude': 47.564, 'longitude': 63.456, 'weather': 'raining' });
testLocations.push({ 'place': 'brisbane','latitude': 3.24, 'longitude': 32.66, 'weather': 'hot' });
testLocations.push({ 'place': 'hobart', 'latitude': 55.34, 'longitude': 53.06, 'weather': 'cold' });
testLocations.push({ 'place': 'adelaide', 'latitude': -4.567, 'longitude': 9.099, 'weather': 'foggy' });
testLocations.push({ 'place': 'darwin', 'latitude': 86.332, 'longitude': 34.567, 'weather': 'hot' });
 

localStorage.setItem('testLocations', JSON.stringify(testLocations));
              
var retrievedObject = localStorage.getItem('testLocations');

console.log('retrievedObject is: ', JSON.parse(retrievedObject));   

console.log('retrieved object 3 is ', retrievedObject[3]);
            
/* alert(retrievedObject);  */

/* document.write("<p>Object details are: " + retrievedObject +"</p>");           */

displayRetrievedObject();


 function displayRetrievedObject()
            {
                var outputAreaRef = document.getElementById("outputArea");
                var output = "";
                            
                if (retrievedObject)
                {
                    for (var i = 0; i < retrievedObject.length; i++)
                    {
         /*               output = retrievedObject.[i] + "....james" +  "<br/>";  */
                        
    /*   demop.innerHTML = demop.innerHTML + (value+"*"+ a +"="+ value*a);        */         
    /*                    output = output + testLocations[i] + "<br/>";           */
                        output = output + retrievedObject[i] + "<br/>"; 
              /*          outputAreaRef.innerHTML += output; */
                    }
                }
                else
                {
                    output = "Error: Test locations instance not loaded.<br />"
                }
                
                outputAreaRef.innerHTML = output;
            }            
            



