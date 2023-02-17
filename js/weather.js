const hat = document.querySelector('#hat');
const scarf = document.querySelector('#scarf');
const winterJacket = document.querySelector('#winter-jacket');
const trousers = document.querySelector('#trousers');
const hoodie = document.querySelector('#hoodie');
const tShirt = document.querySelector('#tshirt');
const shorts = document.querySelector('#shorts');
const umbrella = document.querySelector('#umbrella');

function setClothingToInvisible(){
	hat.style.visibility = "hidden";
	scarf.style.visibility = "hidden";
	winterJacket.style.visibility = "hidden";
	trousers.style.visibility = "hidden";
	hoodie.style.visibility = "hidden";
	tShirt.style.visibility = "hidden";
	shorts.style.visibility = "hidden";
}
function setClothingToFreezing(){
	setClothingToInvisible();
	hat.style.visibility = "visible";
	scarf.style.visibility = "visible";
	winterJacket.style.visibility = "visible";
	trousers.style.visibility = "visible";
}
function setClothingToCold(){
	setClothingToInvisible();
	winterJacket.style.visibility = "visible";
	trousers.style.visibility = "visible";
}
function setClothingToComfortable(){
	setClothingToInvisible();
	trousers.style.visibility = "visible";
	hoodie.style.visibility = "visible";
}
function setClothingToWarm(){
	setClothingToInvisible();
	tShirt.style.visibility = "visible";
	trousers.style.visibility = "visible";
}
function setClothingToHot(){
	setClothingToInvisible();
	tShirt.style.visibility = "visible";
	shorts.style.visibility = "visible";
}
function setUmbrella(visible){
	if(visible)
		umbrella.style.visibility =  "visible";
	else
		umbrella.style.visibility =  "hidden";
}

async function getWeatherAPI(lat, long) {
	var url = "https://api.open-meteo.com/v1/forecast?latitude=$LAT&longitude=$LONG&hourly=apparent_temperature,precipitation&current_weather=true";
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
		4: "smoke",
		5: "haze",
		6: "dust",
		7: "dust or sand",
		8: "dust or sand whirl(s)",
		9: "dust or sand storm in sight",
		10: "mist",
		11: "shallow fog",
		12: "shallow fog",
		13: "lighning visible, no thunder heard",
		14: "precipitation in sight",
		15: "precipitation in sight",
		16: "precipitation in sight",
		17: "thunderstorm without precipitation",
		18: "squalls",
		19: "funnel cloud(s)",
		20: "drizzle",
		21: "rain",
		22: "snow",
		23: "rain and snow or ice pellets",
		24: "freezing drizzle",
		25: "shower(s) of rain",
		26: "shower(s) of snow",
		27: "shower(s) of hail",
		28: "fog or ice fog",
		29: "thunderstorm",
		30: "slight or moderate dust or sand storm (decreasing)",
		31: "slight or moderate dust or sand storm (no change)",
		32: "slight or moderate dust or sand storm (increasing)",
		33: "severe dust or sand storm (decreasing)",
		34: "severe dust or sand storm (no change)",
		35: "severe dust or sand storm (increasing)",
		36: "slight or moderate blowing of snow (below eye level)",
		37: "heavy drifting snow (below eye level)",
		38: "slight or moderate blowing of snow (above eye level)",
		39: "heavy drifting snow (above eye level)",
		40: "fog or ice fog at a distance",
		41: "fog or ice fog in patche",
		42: "fog",
		43: "fog",
		44: "fog",
		45: "fog",
		46: "fog",
		47: "fog",
		48: "depositing rime fog",
		49: "depositing rime fog",
		50: "drizzle",
		51: "light drizzle",
		52: "moderate drizzle",
		53: "moderate drizzle",
		54: "heavy drizzle",
		55: "heavy drizzle",
		56: "light freezing drizzle",
		57: "heavy freezing drizzle",
		58: "slight drizzle and rain",
		59: "moderate or heavy drizzle and rain",
		60: "rain",
		61: "light rain",
		62: "moderate rain",
		63: "moderate rain",
		64: "heavy rain",
		65: "heavy rain",
		66: "light freezing rain",
		67: "heavy freezing rain",
		68: "rain or drizzle with slight snow",
		69: "rain or drizzle with moderate or heavy snow",
		70: "snow",
		71: "light snow",
		72: "moderate snow",
		73: "moderate snow",
		74: "heavy snow",
		75: "heavy snow",
		76: "ice prisms",
		77: "snow grains",
		78: "isolated starlike snow crystals",
		79: "ice pellets",
		80: "light rain showers",
		81: "moderate rain showers",
		82: "heavy rain showers",
		83: "showers of rain and snow mixed, slight",
		84: "howers of rain and snow mixed, moderate or heavy",
		85: "light snow showers",
		86: "heavy snow showers",
		87: "snow pallets",
		88: "snow pallets",
		89: "slight showers of hail",
		90: "moderate or heavy showers of hail",
		91: "slight rain",
		92: "moderate or heavy rain",
		93: "slight precipitation",
		94: "moderate or heavy precipitation",
		95: "thunderstorm",
		96: "thunderstorm with slight hail",
		97: "heavy thunderstorm",
		98: "thunderstorm with dust or sand storm",
		99: "thunderstorm with heavy hail",
	};
	return wmoTable[code];
}

async function getWeatherForecast(cityname) {
	let locationResponse = await getLocationAPI(cityname);
	const lat = locationResponse['results'][0]['latitude'];
	const long = locationResponse['results'][0]['longitude']
	//get the apparent_temperature forecast inbetween the set time
	let weatherResponse = await getWeatherAPI(lat, long);	
	return weatherResponse;
}
async function clothingAlgorithm() {
	let weatherResponse = await getWeatherForecast(getCurrentCity());
	const start = getTimeStart();
	const end = getTimeEnd();
	var temperatures = [end-start];
	var precipitation = [end - start];
	for(let i = start; i <= end; i++){
		temperatures[i-start] = weatherResponse['hourly']['apparent_temperature'][i];
		precipitation[i-start] = weatherResponse['hourly']['precipitation'][i];
	}
	const minTemp = Math.min(...temperatures);
	const maxPre = Math.max(...precipitation);
	if (minTemp < getFreezing()){setClothingToFreezing();}
	else if (minTemp < getCold()){setClothingToCold();}
	else if (minTemp < getComfortable()){setClothingToComfortable();}
	else if (minTemp < getWarm()){setClothingToWarm();}
	else{setClothingToHot();}
	if(maxPre > 0){
		setUmbrella(true);
	}
	else{
		setUmbrella(false);
	}
}
async function getCurrentWeather(cityname){

	let weatherResponse = await getWeatherForecast(cityname);
	const temp = weatherResponse['current_weather']['temperature'];
	const weatherCode = weatherResponse['current_weather']['weathercode'];
	const weatherCondition = wmoInterpreter(weatherCode);
	return [temp, weatherCondition];
}

