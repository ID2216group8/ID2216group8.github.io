// navigation
const plus = document.querySelector('#plus');
const mannequin = document.querySelector('#mannequin');
const settings = document.querySelector('#settings-dots');
const slider = document.querySelector('#slider');

plus.addEventListener("click", function(){document.location.href = "change-cities.html";})
mannequin.addEventListener("click", function(){document.location.href = "change-clothing.html";})
settings.addEventListener("click", function(){document.location.href = "settings.html";})

getValues();
updateNavbar(cityName, cityIndicatior);
clothingAlgorithm();

//set hight of the slider with respect to sceen hight
var sliderTopMargin = (window.innerHeight - 8 - 43 - 381 - (0.2 * window.innerWidth)-106)/2;
slider.style.marginTop = sliderTopMargin.toString() + "px";
