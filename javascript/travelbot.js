
jQuery(document).ready(function($) {
  $.ajax({
  url : "http://api.wunderground.com/api/Your_Key/geolookup/conditions/q/IA/Cedar_Rapids.json",
  dataType : "jsonp",
  success : function(parsed_json) {
  var location = parsed_json['location']['city'];
  var temp_f = parsed_json['current_observation']['temp_f'];
  alert("Current temperature in " + location + " is: " + temp_f);
  }
  });
});
	
	
var queryURL = "http://api.wunderground.com/api/" + weatherKey + "/geolookup/conditions/q/IA/" + serched + ".json" ;
var weatherKey = "eb190ccc88c7b1f8"
var seached = ""	
	console.log("called")
	
