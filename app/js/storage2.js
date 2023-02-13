var currentCity = "Stockholm";
var defaultStart = "8";
var defaultEnd = "18";
var cities = ["Stockholm"];
var freezing = "0";
var cold = "10";
var comfortable = "15";
var warm = "23";
var tempUnit = "C";
var clothing ={
	hat: "/res/hat.png",
	hat2: "/res/hat2.png",
	hoodie:"/res/hoodie.png",
	hoodie2:"/res/hoodie2.png",
	scarf:"/res/scarf.png",
	scarf2:"/res/scarf2.png",
	shorts:"/res/shorts.png",
	shorts2:"/res/shorts2.png",
	trousers:"/res/trousers.png",
	trousers2:"/res/trousers2.png",
	tshirt:"/res/tshirt.png",
	tshirt2:"/res/tshirt2.png",
	umbrella:"/res/umbrella.png",
	umbrella2:"/res/umbrella2.png",
	winterJacket:"/res/winter-jacket.png",
}

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
	if(window.localStorage.getItem("tempUnit")== null)
		window.localStorage.setItem("tempUnit", tempUnit);
	if(window.localStorage.getItem("clothing") == null)
		window.localStorage.setItem("clothing", JSON.stringify(clothing));

	defaultStart = window.localStorage.getItem("defaultStart");
	defaultEnd = window.localStorage.getItem("defaultEnd");
	cities = window.localStorage.getItem("cities").split(',');

	freezing = window.localStorage.getItem("freezing");
	cold = window.localStorage.getItem("cold");
	comfortable = window.localStorage.getItem("comfortable");
	warm = window.localStorage.getItem("warm");

	tempUnit = window.localStorage.getItem("tempUnit");

	clothing = JSON.parse(window.localStorage.getItem("clothing"));
	updateClothing();

	currentCity = cities[0];
}

function updateClothing(){
	document.getElementById("hat-img").src = clothing['hat'];
	document.getElementById("hoodie-img").src = clothing['hoodie'];
	document.getElementById("scarf-img").src = clothing['scarf'];
	document.getElementById("shorts-img").src = clothing['shorts'];
	document.getElementById("trousers-img").src = clothing['trousers'];
	document.getElementById("tshirt-img").src = clothing['tshirt'];
	document.getElementById("umbrella-img").src = clothing['umbrella'];
	document.getElementById("winter-jacket-img").src = clothing['winterJacket'];
}

function setClothing(typeOfClothe, src){
	if(typeOfClothe === "winterJacket")
		typeOfClothe = "winter-jacket";
	document.getElementById(typeOfClothe + "-img").src = src;
	clothing[typeOfClothe] = src;
	window.localStorage.setItem("clothing", JSON.stringify(clothing));
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
function getTempUnit(){return tempUnit;}

function addCity(cityName){
	cities.push(cityName);
	window.localStorage.setItem("cities", cities.toString());
	updateNavbar(cityName, cityIndicatior);
}
function deleteCity(cityName){
	const index = cities.indexOf(cityName);
	cities.splice(index, index);
	window.localStorage.setItem("cities", cities.toString());
	updateNavbar(cityName, cityIndicatior);
}
function changeCityOrder(city1, city2){
	const city1index = cities.indexOf(city1);
	const city2index = cities.indexOf(city2);
	cities[city1index] = city2;
	cities[city2index] = city1;
	window.localStorage.setItem("cities", cities.toString());
}

function tempInKelvin(temp){
	if(temp instanceof String){
		const t = parseInt(temp);
		return t + 273.15;
	}
	return temp + 273.15;
}

function tempInFahrenheit(temp){
	if(temp instanceof String){
		const t = parseInt(temp);
		return (t * 1.8)+32;
	}
	return (temp * 1.8)+32;
}

function setDefaultStart(start) {
	defaultStart = start.toString;
	window.localStorage.setItem("defaultStart", defaultStart);
}
function setDefaultStart(end) {
	defaultEnd = end.toString;
	window.localStorage.setItem("defaultEnd", defaultEnd);
}
function setTempUnit(unit){
	tempUnit = unit;
	window.localStorage.setItem("tempUnit", tempUnit);
}
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




