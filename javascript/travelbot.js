
function resetEntries() {
	$("#city-input").val("");
	$("#country-input").val("");
};

function resetResults() {
	$("#fahrenheit").html("");
	$("#celsius").html("");
	$("#cityResult").html("");
	$("#countryResult").html("");
};

$(document).ready(function(){
	var firstLetters;
	var cityElements;
	var countryElements;
	var cityList = [];
	var countryList = [];
	var selectedIndex;

	$("#city-input").keyup(function() {
		firstLetters = $(this).val().trim();
		var autocompleteURL = "http://autocomplete.wunderground.com/aq?&cb=call=?";

		$.ajax({
			url: autocompleteURL,
			dataType: "jsonp",
			data: {
				"query": firstLetters
			},
			crossDomain: true

		}).done(function(response) {			
			$.each(response.RESULTS, function(i, element){
				cityElements = (response.RESULTS[i].name);
				countryElements = (response.RESULTS[i].c);
				cityList.push(cityElements);
				countryList.push(countryElements);
			});
			$("#city-input").autocomplete({
				source: cityList,
				select: function(event, ui){
					selectedIndex = $.inArray(ui.item.value,$("#city-input").autocomplete("option", "source"));
					$("#country-input").val(countryList[selectedIndex]);
				}
			});				
		});
	});
});

$("#add-entry").on("click", function(event) {
    event.preventDefault();
    resetResults();
    var citySearch = $("#city-input").val().trim();
    var countrySearch = $("#country-input").val().trim();
 	var queryURL = "http://api.wunderground.com/api/eb190ccc88c7b1f8/geolookup/conditions/q/" + countrySearch + "/" + citySearch + ".json";
	
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
		resetEntries();
	});
});

