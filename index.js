var _flightData = [
	{
		"From": "Chennai",
		"To": "Madurai",
		"Date_of_travel": "2019-06-17",
		"Amount": "3000",
		"Flight_name": "Jet Airways"
	},
	{
		"From": "Chennai",
		"To": "Madurai",
		"Date_of_travel": "2019-06-17",
		"Amount": "3500",
		"Flight_name": "Indian AirLines"
	},
	{
		"From": "Coimbatore",
		"To": "Madurai",
		"Date_of_travel": "2019-06-18",
		"Amount": "4000",
		"Flight_name": "Indian AirLines"
	},
	{
		"From": "Coimbatore",
		"To": "Madurai",
		"Date_of_travel": "2019-06-18",
		"Amount": "3000",
		"Flight_name": "Jet Airways"
	},
	{
		"From": "Delhi",
		"To": "Madurai",
		"Date_of_travel": "2019-06-17",
		"Amount": "3000",
		"Flight_name": "Indian AirLines"
	}
];

var _flightOrigin = [];
var _flightDestination = [];

//Making array from the Json for autocomplete
for (var i = 0; i < _flightData.length; i++) {
	_flightOrigin[i] = _flightData[i].From;
	_flightDestination[i] = _flightData[i].To;
}

//Making unique array for autocomplete
_flightOrigin = getUnique(_flightOrigin);
_flightDestination = getUnique(_flightDestination);

//Getting Unique Array
function getUnique(array) {
	var uniqueArray = [];
	// Loop through array values
	for (i = 0; i < array.length; i++) {
		if (uniqueArray.indexOf(array[i]) === -1)
			uniqueArray.push(array[i]);
	}
	return uniqueArray;
}


//AutoComplete
$(function () {

	$("#origin").autocomplete({
		source: _flightOrigin
	});

	$("#destination").autocomplete({
		source: _flightDestination
	});
});

//Searching Flight Details from the JSON
function search_flight() {
	var From = document.getElementById("origin").value;
	var To = document.getElementById("destination").value;
	var Journery_Date = document.getElementById("journey_date").value;
	if (From != "" && To != "" && Journery_Date != "") {
		//Hiding Slide
		$("#mySlide").hide();

		//Disable the search Button
		$("#search").attr("disabled", true);

		//Filtering JSON by the input from the HTML
		var new_Array = getting_search_result(From, To, Journery_Date);

		//Dynamic Div based on the result
		for (var j = 0; j < new_Array.length; j++) {
			var newdiv = document.createElement("div");
			newdiv.innerHTML = "Origin : " + new_Array[j].From + "</br></br>Destination :" + new_Array[j].To + "</br><input type='submit' value='Select' style='float:right;' onclick='reset()'></br>Airline :" + new_Array[j].Flight_name + "</br/></br>Amount :" + new_Array[j].Amount + "</br></br></br> ";
			document.getElementById("div_1").appendChild(newdiv);
		}
	}
	else
		document.getElementById("mandatory_fields").innerHTML = "Please Select the Mandatory Field";
}

// Filtering the JSON based on the given Search
function getting_search_result(from, to, journey_date) {
	var new_array = _flightData.filter(function (i) {
		return from === i.From && to === i.To && journey_date === i.Date_of_travel;
	});
	return new_array;
}

//Reloading the page
function reset() {
	location.reload();
}

//SlideShow Functionalities
var myIndex = 0;
setTimeout(automatic_slideshow, 2000); // Initiate Slideshow

function automatic_slideshow() {
	$("#spinner").hide();
	var i;
	var x = document.getElementsByClassName("mySlides");
	for (i = 0; i < x.length; i++) {
		x[i].style.display = "none";
	}
	myIndex++;
	if (myIndex > x.length) { myIndex = 1 }
	x[myIndex - 1].style.display = "block";
	setTimeout(automatic_slideshow, 2000); // Change image every 2 seconds
}
