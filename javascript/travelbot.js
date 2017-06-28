
$(document).ready(function() {
  $.ajax({
  	url : "http://api.wunderground.com/api/eb190ccc88c7b1f8/geolookup/conditions/q/IA/Cedar_Rapids.json",
  	dataType : "jsonp",
  }).done(function(response) {
  	console.log(response);
  });
});
	
/*	
var weatherKey = "eb190ccc88c7b1f8"
var seached = ""	
var queryURL = "http://api.wunderground.com/api/" + weatherKey + "/geolookup/conditions/q/IA/" + serched + ".json" ;
	*/
	
	
	
