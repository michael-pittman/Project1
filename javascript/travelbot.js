
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
	console.log(response);
	console.log(location);
	console.log(temp_f);
	console.log(temp_c);
  });
});
	
	

	
	
