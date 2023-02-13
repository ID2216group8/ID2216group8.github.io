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

var startx, starty;
//get angle
function getAngle(angx, angy) {
    return Math.atan2(angy, angx) * 180 / Math.PI;
};



// 1up 2down 3left 4right 0click
function getDirection(startx, starty, endx, endy) {
    var angx = endx - startx;
    var angy = endy - starty;

    //if swipe distance too short
    if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
        return 0;
    }
    
    var angle = getAngle(angx, angy);
    if (angle >= -135 && angle <= -45) {
        return 1;
    } else if (angle > 45 && angle < 135) {
        return 2;
    } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
    	//not swipe right on slider
    	var rect = slider .getBoundingClientRect();
    	if(starty > rect.top && starty < rect.bottom){
    		return 0;
    	}
        return 3;
    } else if (angle >= -45 && angle <= 45) {
    	//not swipe left on slider
    	var rect = slider .getBoundingClientRect();
    	if(starty > rect.top && starty < rect.bottom){
    		return 0;
    	}
        return 4;
    }
    
    return 0;
}

//finger touch screen
document.addEventListener("touchstart", function(e){
    startx = e.touches[0].pageX;
    starty = e.touches[0].pageY;
}, false);

//finger leave screen
document.addEventListener("touchend", async function(e) {
    var endx, endy;
    endx = e.changedTouches[0].pageX;
    endy = e.changedTouches[0].pageY;
    var direction = getDirection(startx, starty, endx, endy);
    switch (direction) {
        case 0:
            break;
        case 1:
            let data = await getCurrentWeather(getCurrentCity())
            console.log(data)
            const weather = data[1]
            const temperature = data[0]
            layer.open({
                type: 1,
                title: 'Weather Information',
                skin: 'layui-layer-lan',
                content: '<div style="padding: 20px;">' +
                    '<p><font color="#FF0000" size="6">' + weather + '</font></p>' +
                    '<p><font color="#0000FF" size="6">' + temperature + '°C</font></p>' +
                    '</div>'
            });
            layer.onClose(console.log(1));
            break;
        case 2:
        	
            break;
        case 3:
        	swipeRight();
            break;
        case 4:
        	swipeLeft();
            break;
        default:
            break;
    }
}, false);


