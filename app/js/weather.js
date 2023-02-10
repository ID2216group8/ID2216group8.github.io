const hat = document.querySelector('#hat');
const scarf = document.querySelector('#scarf');
const winterJacket = document.querySelector('#winter-jacket');
const longTrousers = document.querySelector('#trousers');
const hoodie = document.querySelector('#hoodie');
const tShirt = document.querySelector('#tshirt');
const shorts = document.querySelector('#shorts');

function setClothingToInvisible(){
	hat.style.visibility = "hidden";
	scarf.style.visibility = "hidden";
	winterJacket.style.visibility = "hidden";
	longTrousers.style.visibility = "hidden";
	hoodie.style.visibility = "hidden";
	tShirt.style.visibility = "hidden";
	shorts.style.visibility = "hidden";
}
function setClothingToFreezing(){
	setClothingToInvisible();
	hat.style.visibility = "visible";
	scarf.style.visibility = "visible";
	winterJacket.style.visibility = "visible";
	longTrousers.style.visibility = "visible";
}
function setClothingToCold(){
	setClothingToInvisible();
	winterJacket.style.visibility = "visible";
	longTrousers.style.visibility = "visible";
}
function setClothingToComfortable(){
	setClothingToInvisible();
	longTrousers.style.visibility = "visible";
	hoodie.style.visibility = "visible";
}
function setClothingToWarm(){
	setClothingToInvisible();
	tShirt.style.visibility = "visible";
	longTrousers.style.visibility = "visible";
}
function setClothingToHot(){
	setClothingToInvisible();
	tShirt.style.visibility = "visible";
	shorts.style.visibility = "visible";
}


async function getWeatherAPI(lat, long) {
	var url = "https://api.open-meteo.com/v1/forecast?latitude=$LAT&longitude=$LONG&hourly=apparent_temperature&current_weather=true";
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

function wmoInterpreter(code){
	const wmoTable = {
		0: "clear sky",
		1: "mainly clear",
		3: "overcast",
		45: "fog",
		48: "depositing rime fog",
		51: "light drizzle",
		53: "moderate drizzle",
		55: "heavy drizzle",
		56: "light freezing drizzle",
		57: "heavy freezing drizzle",
		61: "light rain",
		63: "moderate rain",
		65: "heavy rain",
		66: "light freezing rain",
		67: "heavy freezing rain",
		71: "light snow",
		73: "moderate snow",
		75: "heavy snow",
		77: "snow grains",
		80: "light rain showers",
		81: "moderate rain showers",
		82: "heavy rain showers",
		85: "light snow showers",
		86: "heavy snow showers",
		95: "thunderstorm",
		96: "thunderstorm with slight hail",
		99: "thunderstorm with heavy hail",
	};
	return wmoTable[code];
}

async function getWeatherForecast(cityname) {
	let locationResponse = await getLocationAPI(cityname); 
	const lat = locationResponse['results'][1]['latitude'];
	const long = locationResponse['results'][1]['longitude'];
	//get the apparent_temperature forecast inbetween the set time
	let weatherResponse = await getWeatherAPI(lat, long);
	return weatherResponse;
}
async function clothingAlgorithm() {
	let weatherResponse = await getWeatherForecast(getCurrentCity());
	const start = getTimeStart();
	const end = getTimeEnd();
	var temperatures = [end-start];
	for(let i = start; i <= end; i++){
		temperatures[i-start] = weatherResponse['hourly']['apparent_temperature'][i];
	}
	const minTemp = Math.min(...temperatures);
	if (minTemp < getFreezing()){setClothingToFreezing();}
	else if (minTemp < getCold()){setClothingToCold();}
	else if (minTemp < getComfortable()){setClothingToComfortable();}
	else if (minTemp < getWarm()){setClothingToWarm();}
	else{setClothingToHot();}
}
async function getCurrentWeather(cityname){
	let weatherResponse = await getWeatherForecast(cityname);
	const temp = weatherResponse['current_weather']['temperature'];
	const weatherCode = weatherResponse['current_weather']['weathercode'];
	const weatherCondition = wmoInterpreter(weatherCode);
	return [temp, weatherCondition];
}

