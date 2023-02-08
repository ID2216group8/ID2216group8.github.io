// navigation
const plus = document.querySelector('#plus');
const mannequin = document.querySelector('#mannequin');
const settings = document.querySelector('#settings-dots');

plus.addEventListener("click", function(){document.location.href = "change-cities.html";})
mannequin.addEventListener("click", function(){document.location.href = "change-clothing.html";})
settings.addEventListener("click", function(){document.location.href = "settings.html";})

//weather algorithm

async function getWeatherAPI(lat, long) {
	var url = "https://api.open-meteo.com/v1/forecast?latitude=$LAT&longitude=$LONG&hourly=apparent_temperature";
	url = url.replace("$LAT", lat);
	url = url.replace("$LONG", long);
	let response = await fetch(url, {
  		credentials: 'same-origin'
	});
	let data = await response.json();
	return data;
}
async function getLocationAPI(name){
	var url = "https://geocoding-api.open-meteo.com/v1/search?name=$NAME";
	url = url.replace("$NAME", name);
	let response = await fetch(url, {
  		credentials: 'same-origin'
	});
	let data = await response.json();
	return data;
}
async function algorithm(argument) {
	const divlong = document.querySelector('#long');
	const divlat = document.querySelector('#lat');
	let locationResponse = await getLocationAPI("Berlin");
	const lat = locationResponse['results'][1]['latitude'];
	const long = locationResponse['results'][1]['longitude'];
	let weatherResponse = await getWeatherAPI(lat, long);
	console.log(weatherResponse);
}
algorithm();