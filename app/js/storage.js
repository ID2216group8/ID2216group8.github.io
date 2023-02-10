var currentCity = "Stockholm";
var defaultStart = "8";
var defaultEnd = "18";
var cities = ["Stockholm"];
var freezing = "0";
var cold = "10";
var comfortable = "15";
var warm = "23";

function getValues(){
	if(window.localStorage.getItem("defaultStart") == null)
		window.localStorage.setItem("defaultStart", defaultStart);
	if(window.localStorage.getItem("defaultEnd") == null)
		window.localStorage.setItem("defaultEnd", defaultEnd);
	if(window.localStorage.getItem("cities")== null)
		window.localStorage.setItem("cities", cities.toString());
	if(window.localStorage.getItem("freezing") == null)
		window.localStorage.setItem("freezing", freezing);
	if(window.localStorage.getItem("cold") == null)
		window.localStorage.setItem("cold", cold);
	if(window.localStorage.getItem("comfortable")== null)
		window.localStorage.setItem("comfortable", comfortable);
	if(window.localStorage.getItem("warm")== null)
		window.localStorage.setItem("warm", warm);

	defaultStart = window.localStorage.getItem("defaultStart");
	defaultEnd = window.localStorage.getItem("defaultEnd");
	cities = window.localStorage.getItem("cities").split(',');

	freezing = window.localStorage.getItem("freezing");
	cold = window.localStorage.getItem("cold");
	comfortable = window.localStorage.getItem("comfortable");
	warm = window.localStorage.getItem("warm");

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

function getFreezing(){return freezing;}
function getCold(){return cold;}
function getComfortable(){return comfortable;}
function getWarm(){return warm;}

function swipeLeft(){
	const currentCityIndex = cities.indexOf(currentCity);
	currentCity = cities[(currentCityIndex - 1 + cities.length) % cities.length];
	updateNavbar(cityName, cityIndicatior);
	clothingAlgorithm();
	return currentCity;
}
function swipeRight(){
	const currentCityIndex = cities.indexOf(currentCity);
	currentCity = cities[(currentCityIndex + 1 + cities.length) % cities.length];
	updateNavbar(cityName, cityIndicatior);
	clothingAlgorithm();
	return currentCity;
}
const cityName = document.querySelector('#city-name');
const cityIndicatior = document.querySelector('#city-indicator');



