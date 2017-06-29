
$(document).ready(function() {
<<<<<<< HEAD
var seached = "lawton"
	//$(#ofinputfeild).html(val().trim)
var queryURL = "http://api.wunderground.com/api/eb190ccc88c7b1f8/geolookup/conditions/q/IA/" + seached + ".json";
	
	$.ajax({
  	url : queryURL
	
=======
  $.ajax({
  	url : "http://api.wunderground.com/api/eb190ccc88c7b1f8/geolookup/conditions/q/IA/Cedar_Rapids.json",
  	dataType : "jsonp",
>>>>>>> 7ee2688f34dc3731c39b03cc419018c6c0c15683
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
	
<<<<<<< HEAD
	

=======
/*	
var weatherKey = "eb190ccc88c7b1f8"
var seached = ""	
var queryURL = "http://api.wunderground.com/api/" + weatherKey + "/geolookup/conditions/q/IA/" + serched + ".json" ;
	*/
	
>>>>>>> 7ee2688f34dc3731c39b03cc419018c6c0c15683
	
	
