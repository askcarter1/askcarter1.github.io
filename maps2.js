// Step 2: Ask students what kinds of information they need to start with:
//  -- Since this is a "Map API" - we probably need a map.
//  -- We also need to specify where to center the map!
//     Have the students go to Google and find out the
//     longitude and latitude of the SIP location.
//  -- In order to "see" the map and interact with it, we need
//     a view. A view is like a computer screen. The computer
//     can do processes without it, but we won't be able to see.
var ourLoc;
var view;
var map;
var gwc;
var ahome;

// Step 3: We should initalize our variables!
function init() {
	// Initalize things here
	ourLoc = ol.proj.fromLonLat([41.043316, 28.862457]);
	gwc = ol.proj.fromLonLat([-87.623177, 41.881832]);
	ahome = ol.proj.fromLonLat([-87.716261, 41.712447]);
	view = new ol.View({
		center: ourLoc,
		zoom: 6 // Students can play around with the starting zoom.
	});

	map = new ol.Map({
		target: 'map', // The "Target" is our <div> name.
		layers: [
		  new ol.layer.Tile({
		    source: new ol.source.OSM() // Explain: this is a required variable.
		  })
		  // Explain: Open Layer offers different types of layers. Layers are like
		  // different brushes used to make the same image. They look different.
		  // Some might take more time than others.
		],
		// Note from the View Animation website:
		// Improve user experience by loading tiles while animating. Will make
		// animations stutter on mobile or slow devices.
		loadTilesWhileAnimating: true,
		view: view
	});
}

function panHome(){
	view.animate({
		center:ourLoc,
		duration: 2000

	});

}

function panToLocation(){
	var countryName = document.getElementById("country-name").value;

	if(countryName === "") {
	 	alert("You didn't enter a country name!");
	 	return;
	}

	var query = "https://restcountries.eu/rest/v2/name/"+countryName+"?fullText=true"

	query = query.replace(/ /g, "%20")

	var countryRequest = new XMLHttpRequest();
	countryRequest.open('GET', query, false);

	countryRequest.send();

	if(countryRequest.readyState != 4 || countryRequest.status != 200 || countryRequest.responseText === "") {
	 	window.console.error("Request had an error!");
	 	return;
	}

	var countryInformation = JSON.parse(countryRequest.responseText);

	var lat = countryInformation[0].latlng[0];
	var lon = countryInformation[0].latlng[1];

	window.console.log(countryName + ": lon " + lon + " & lat " + lat);

	var location = ol.proj.fromLonLat([lon, lat]);


	view.animate({
		center: location, // Location
		duration: 2000  // Two seconds
	});

}
function panToGWC(){
	view.animate({
		center: gwc,
		duration: 2000,
		zoom: 20
	});
}
function panToAnayaHome(){
	view.animate({
		center: ahome,
		duration: 2000,
		zoom: 20
	});
}
// Step 4: We can run the init function when the window loads.
window.onload = init;
