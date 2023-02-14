//import {getCurrentCity,getCities,getValues} from "./storage.js"
// import {getCurrentWeather} from "./weather.js"
const close = document.querySelector('#close')
close.addEventListener("click", function(){document.location.href = "index.html";})

const show = document.querySelector('#openchangebar')
var addsign = true;
show.addEventListener("click",function(){
	console.log("true")
	$('.check_box').toggle();
	if(addsign==true){
	$('#addarea').append('<div id = "addInarea" class="card bg-primary-subtle" style="margin-left: 20px;margin-right: 20px; background-color: grey; margin-top: 20px;"><div style="margin: 0 auto;"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/></svg></div></div>');
	$('#trash').css("display","table");
}
else{
	$('#addInarea').remove();
	$('#trash').css("display","none");
}
addsign = !addsign;
})
var trashmargin = ((window.innerWidth - 30 - 30)/2);
$('.container').css("width", 'auto');
$('#trash').css('margin-right', "0px")
$('#trash').css('margin-left', trashmargin.toString() + "px");
window.onload = initialCity();
// async function initialCity(){//
// 	$("#showcity").empty();
// 	console.log(window.localStorage.getItem("cities"));
// 	var cities = window.localStorage.getItem("cities").split(",");

// for (var i = 0; i<cities.length;i++){
// 	let currentWeather = await getCurrentWeather(cities[i]);
// 	$("#showcity").append('<div class="container" id ="city'+i+'"><div class="card bg-primary-subtle" style="margin-left: 20px;margin-right: 20px; background-color: ; margin-top: 20px;"><div class="row"><div class="col-6"><div class="card-body"><h5 class="card-title fs-4">'+cities[i]+'</h5><p class="card-text fs-6" >'+currentWeather[1]+'</p></div></div><div class="col-4"><div class="align-self-center text-white" style="font-size: 3rem;">'+parseInt(currentWeather[0])+'°</div></div><div class="col-2 align-self-center check_box" style="display: none;"><div class=""><input class="form-check-input " type="checkbox" name="check" value="'+i+'" aria-label="..."></div></div></div></div></div>');
// }
// }
async function initialCity(){//
	$("#showcity").empty();
	console.log(window.localStorage.getItem("cities"));
	var cities = window.localStorage.getItem("cities").split(",");
	for (var i = 0; i<cities.length;i++){
		let currentWeather = await getCurrentWeather(cities[i]);
		$("#showcity").append('<div class="container" id ="city'+i+'"><div class="card bg-primary-subtle" style="margin-left: 20px;margin-right: 20px; background-color: ; margin-top: 20px;"><div class="row"><div class="col-6"><div class="card-body"><h5 class="card-title fs-4">'+cities[i]+'</h5><p class="card-text fs-6" >'+currentWeather[1]+'</p></div></div><div class="col-4"><div class="align-self-center text-white" style="font-size: 3rem;">'+parseInt(currentWeather[0])+'°</div></div><div class="col-2 align-self-center check_box" style="display: none;"><div class=""><input class="form-check-input " type="checkbox" name="check" value="'+i+'" aria-label="..."></div></div></div></div></div>');
	}
}


$('#addarea').click(function(){document.location.href = "addcity.html";})

$('#trash').click(function(){
	var obj=document.getElementsByName('check'); 
	for(var i=0; i<obj.length; i++){ 
        if(obj[i].checked) {
        	console.log(typeof(obj[i].value));

        	var cities = window.localStorage.getItem("cities").split(",");
        	console.log(cities);
        	console.log(parseInt(obj[i].value));
        	cities.splice(parseInt(obj[i].value),1);
        	
        	console.log(cities);
        	window.localStorage.setItem("cities", cities.toString());
        	$("#city"+obj[i].value).remove();
        }; 
    } 
    // document.location.href = "change-cities.html";
})