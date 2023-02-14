// import {getCurrentWeather} from "./weather.js"
// import {addCity} from "./storage.js"

const close = document.querySelector('#close')
close.addEventListener("click", function(){document.location.href = "change-cities.html";})

$("button").click(async function(){
	var cityname = $('#submit').val();
	getfeedbackdata(cityname);
});

async function getfeedbackdata(city){
	try{
	let weather = await getCurrentWeather(city);
	console.log(city);
	alert("Add successfully");
	}
	catch(e){
    alert("No such city, please try again");
 	}
    addCity(city);
	document.location.href = "change-cities.html";
	 // document.location.reload("change-cities.html");
}
function addCity(cityName){
	// cities.push(cityName);
	if(window.localStorage.getItem("cities")!=null){
		var origincities = window.localStorage.getItem("cities").split(",");
	}
	else {
		var origincities = null;
	}
	origincities.push(cityName);
	window.localStorage.setItem("cities", origincities.toString());
}