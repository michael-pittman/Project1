
var cityList = [];
var countryList = [];
var separation = [];
var selectedIndex;
var countrySearch;

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
	
	$("#city-input").keyup(function() {
		cityList = [];
		countryList = [];
		separation = [];
		countrySearch = "";
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
				appendTo: "#cityAutocomplete",
				select: function(event, ui){
					selectedIndex = $.inArray(ui.item.value,$("#city-input").autocomplete("option", "source"));
					separation = cityList[selectedIndex].split(",");
					console.log(separation);
					if (countryList[selectedIndex] === "US") {
						$("#country-input").val("United States");
						countrySearch = separation[1];
					} else {
						$("#country-input").val(separation[1]);
						countrySearch = countryList[selectedIndex];
					}
				}
			});				
		});
	});
});

$("#add-entry").on("click", function(event) {
    event.preventDefault();
    resetResults();
    var apiKey = "b9907322a6922ec3"; /*Hernan's API Key*/
    var citySearch = separation[0];
  	var queryURL = "http://api.wunderground.com/api/" + apiKey + "/geolookup/conditions/q/" + countrySearch + "/" + citySearch + ".json";
	
	$.ajax({
	  	url : queryURL,
	  	method: "GET"	
	}).done(function(response) {
		console.log(response);
		var city = response.location.city;
		var country = separation[1];
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

