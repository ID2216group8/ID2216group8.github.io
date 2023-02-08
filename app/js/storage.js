var currentCity = "Stockholm";
var defaultStart = "8";
var defaultEnd = "18";
var cities = ["Stockholm"];

function getValues(){
	if(window.localStorage.getItem("defaultStart") == null)
		window.localStorage.setItem("defaultStart", defaultStart);
	if(window.localStorage.getItem("defaultEnd") == null)
		window.localStorage.setItem("defaultEnd", defaultEnd);
	if(window.localStorage.getItem("cities")== null)
		window.localStorage.setItem("cities", cities.toString());

	defaultStart = window.localStorage.getItem("defaultStart");
	defaultEnd = window.localStorage.getItem("defaultEnd");
	cities = window.localStorage.getItem("cities").split(',');
	currentCity = cities[0];
}
function updateNavbar(cityName, dots){
	cityName.innerHTML = currentCity;
	const currentCityIndex = cities.indexOf(currentCity);
	var string = "";
	for(let i = 0; i < cities.length;i++){
		if(i===currentCityIndex){
			string += "x";
		}
		else{
			string += "-";
		}
	}
	dots.innerHTML = string;
}
function getCurrentCity(){return currentCity;}
function getDefaultStart(){return defaultStart;}
function getDefaultEnd(){return defaultEnd;}
function getCities(){return cities;}
const cityName = document.querySelector('#city-name');
const cityIndicatior = document.querySelector('#city-indicator');

getValues();
updateNavbar(cityName, cityIndicatior);



