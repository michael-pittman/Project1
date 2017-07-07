
var cityList = [];
var countryList = [];
var separation = [];
var selectedIndex;
var countrySearch;
var latitude
var longitude

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



//events ------------>
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
		var autocompleteURL = "https://autocomplete.wunderground.com/aq?&cb=call=?";

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
  	var queryURL = "https://api.wunderground.com/api/" + apiKey + "/geolookup/conditions/q/" + countrySearch + "/" + citySearch + ".json";



	$.ajax({
	  	url : queryURL,
	  	method: "GET"
	}).done(function(response) {
		console.log(response);
		var city = response.location.city;
		var country = separation[1];
		var temp_f = response.current_observation.temp_f;
		var temp_c = response.current_observation.temp_c;
		var lat = response.location.lat;
		var lon = response.location.lon;
		var state_dept = response.location.country_name;
		$("#fahrenheit").append(temp_f + "F°");
		$("#celsius").append(temp_c + "C°");
		$("#cityResult").append(city);
		$("#countryResult").append(country);
		console.log(response);
		console.log(city);
		console.log(country);
		console.log(temp_f);
		console.log(temp_c);
		console.log(lat);
		console.log(lon);
		latitude = parseFloat(lat)
		longitude = parseFloat(lon)
		resetEntries();

		$("#map_script").append("<script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyBoBixEgDuSpTPjepvL_RGMUlHUY0UlAgs&libraries=places&callback=initMap' async defer></script>")

// state department AJAX call is chained. uses location from first api ---------->

		$.ajax({
		  	url : "https://www.state.gov/api/v1/?command=get_country_fact_sheets&fields=title,title,terms&terms="+state_dept+":any,"+state_dept+":any"

		  }).done(function(response) {
				var state_dept_country = (response.country_fact_sheets [0].title)
				var state_dept_lower = state_dept_country.toLowerCase()
				var state_dept_url = 'https://travel.state.gov/content/passports/en/country/'+state_dept_lower+'.html'
				console.log(state_dept_url);

			$("#state_dept_link").attr("data_Url", state_dept_url);
			$("#click_here").attr("href", state_dept_url);

			});
	});
});
//maps ------------>

	var map;
  var infowindow;

  function initMap() {
    var pyrmont = {lat: latitude, lng: longitude};

    map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 15
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: pyrmont,
      radius: 500,
      type: ['resturant']
    }, callback);
  }

  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });


  }



//FireBase --------->
// Initialize Firebase
var config = {
	apiKey: "AIzaSyCP7gyAk2MT2rY5JFD2i9b0WDHXbGUn7mQ",
  authDomain: "project1-1499294091466.firebaseapp.com",
  databaseURL: "https://project1-1499294091466.firebaseio.com",
  projectId: "project1-1499294091466",
  storageBucket: "",
  messagingSenderId: "258284106684"
};

firebase.initializeApp(config);

var dataRef = firebase.database();

// Initial Values
var name = "";
var email = "";
var comment = "";

// Capture Button Click
$("#add-user").on("click", function(event) {
	event.preventDefault();

	// YOUR TASK!!!
	// Code in the logic for storing and retrieving the most recent user.
	// Don't forget to provide initial data to your Firebase database.
	name = $("#name-input").val().trim();
	email = $("#email-input").val().trim();
	comment = $("#comment-input").val().trim();

	// Code for the push
	dataRef.ref().push({

		name: name,
		email: email,
		comment: comment,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
	});
});

// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
dataRef.ref().on("child_added", function(childSnapshot) {

	// Log everything that's coming out of snapshot

	console.log(childSnapshot.val().name);
	console.log(childSnapshot.val().email);
	console.log(childSnapshot.val().comment);
	console.log(childSnapshot.val().joinDate);

	
// Handle the errors
}, function(errorObject) {
	console.log("Errors handled: " + errorObject.code);
});

dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

	// Change the HTML to reflect
	$("#name-display").html(snapshot.val().name);
	$("#email-display").html(snapshot.val().email);
	$("#age-display").html(snapshot.val().age);
	$("#comment-display").html(snapshot.val().comment);
});
