
$("#add-entry").on("click", function(event) {
    event.preventDefault();
    var seached = $("#city-input").val().trim();
      
	//$(#ofinputfeild).html(val().trim)
	var queryURL = "http://api.wunderground.com/api/eb190ccc88c7b1f8/geolookup/conditions/q/IA/" + seached + ".json";
	
	$.ajax({
	  	url : queryURL,
	  	method: "GET"
	
	}).done(function(response) {
		var city = response.location.city;
		var country = response.location.country;
		var temp_f = response.current_observation.temp_f;
		var temp_c = response.current_observation.temp_c;
		$("#fahrenheit").append(temp_f + "F°");
		$("#celsius").append(temp_c + "C°");
		$("#cityResult").append(city);
		$("#countryResult").append(country);
		console.log(response);
		console.log(city);
		console.log(country);
		console.log(temp_f);
		console.log(temp_c);
	});
});
	
	
