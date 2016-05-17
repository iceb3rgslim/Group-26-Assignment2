// Code for the Add Location page.

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {lat: -37.876823, lng: 145.045837}
  });
  var geocoder = new google.maps.Geocoder();

  document.getElementById('addlocation').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });
    
 var labelIndex = 0;
    function geocodeAddress(geocoder, resultsMap) {
        var address = document.getElementById('Address').value;
        geocoder.geocode({'address': address}, function(results, status) {
            
            var nickname = document.getElementById('Nickname').value;
            var labels = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
           
            
            
            
            if (status === google.maps.GeocoderStatus.OK) {
                resultsMap.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location,
                label: labels[labelIndex],
                title: nickname           
      })        ;
                labelIndex++;
                
                var loc = [0,0];
                loc[0] = results[0].geometry.location.lat();
                loc[1] = results[0].geometry.location.lng();
                console.log(loc)
                console.log(labelIndex)
    }      
            else {
                alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
    
}