function controlFromSlider(fromSlider, toSlider, timeStart, timeEnd) {
  const [from, to] = getParsed(fromSlider, toSlider);
  fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
  if (from > to) {
    fromSlider.value = to;
    changeTimeWindow(to, timeStart);
    changeTimeWindow(to, timeEnd);
  }
  else{
    changeTimeWindow(from, timeStart);
    changeTimeWindow(to, timeEnd);
  }
}

function controlToSlider(fromSlider, toSlider, timeStart, timeEnd) {
  const [from, to] = getParsed(fromSlider, toSlider);
  fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
  setToggleAccessible(toSlider);
  if (from <= to) {
    toSlider.value = to;
    changeTimeWindow(from, timeStart);
    changeTimeWindow(to, timeEnd);
  } else {
    toSlider.value = from;
    changeTimeWindow(from, timeStart);
    changeTimeWindow(from, timeEnd);
  }
}
function changeTimeWindow(value, container){
  if(value > 12){
    container.value = value;
    value -= 12;
    container.innerHTML = value + "pm"
  }
  else{
    container.value = value;
    container.innerHTML = value + "am"
  }
}

function getParsed(currentFrom, currentTo) {
  const from = parseInt(currentFrom.value, 10);
  const to = parseInt(currentTo.value, 10);
  return [from, to];
}

function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
    const rangeDistance = to.max-to.min;
    const fromPosition = from.value - to.min;
    const toPosition = to.value - to.min;
    controlSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${(fromPosition)/(rangeDistance)*100}%,
      ${rangeColor} ${((fromPosition)/(rangeDistance))*100}%,
      ${rangeColor} ${(toPosition)/(rangeDistance)*100}%, 
      ${sliderColor} ${(toPosition)/(rangeDistance)*100}%, 
      ${sliderColor} 100%)`;
}

function setToggleAccessible(currentTarget) {
  const toSlider = document.querySelector('#toSlider');
  if (Number(currentTarget.value) <= 0 ) {
    toSlider.style.zIndex = 2;
  } else {
    toSlider.style.zIndex = 0;
  }
}

function getTimeEnd(){return timeEnd.value;}
function getTimeStart(){return timeStart.value;}

function setDefault(fromSlider, toSlider, timeStart, timeEnd) {
  const start = parseInt(getDefaultStart());
  const end = parseInt(getDefaultEnd());
  fromSlider.value = start;
  toSlider.value = end;
  changeTimeWindow(start, timeStart);
  changeTimeWindow(end, timeEnd);
}

const fromSlider = document.querySelector('#fromSlider');
const toSlider = document.querySelector('#toSlider');
const timeStart = document.querySelector('#time-start');
const timeEnd = document.querySelector('#time-end');
setDefault(fromSlider, toSlider, timeStart, timeEnd);
fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
setToggleAccessible(toSlider);

fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, timeStart, timeEnd);
toSlider.oninput = () => controlToSlider(fromSlider, toSlider, timeStart,timeEnd);
