
$(document).ready(function() {
var seached = "lawton"
	//$(#ofinputfeild).html(val().trim)
var queryURL = "http://api.wunderground.com/api/eb190ccc88c7b1f8/geolookup/conditions/q/IA/" + seached + ".json";
	
	$.ajax({
  	url : queryURL
	
  }).done(function(response) {
  	
	var location = response.location.city;
	var temp_f = response.current_observation.temp_f;
	var temp_c = response.current_observation.temp_c;
	var lon = response.location.lon;
	var lat = response.location.lat;
	console.log(response);
	console.log(location);
	console.log(lat);
	console.log(lon);
  });
});
	
	

	
	
