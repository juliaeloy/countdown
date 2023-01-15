///// COUNTER
const button = document.querySelector("#start-count");
const daysText = document.querySelector('#days')
const hoursText = document.querySelector('#hours')
const minText = document.querySelector('#min')
const secText = document.querySelector('#sec')
let startDate = document.querySelector("startDate"); //put the user input in global scope, as a reault we can work on diffrent function.
let endDate = document.querySelector("endDate");
// console.log(endDate); //User put end date

daysText.innerText =hoursText.innerText = minText.innerText = secText.innerText = "00";

let deadlineDate = new Date ("01 jun 2023");



button.addEventListener('click', setIntervalone())




function setIntervalone(){

  const {days,hours,min,sec} = processCountdownValue()
  renderCountdown({days,hours,min,sec})
 
,1000};


function addPadStart(value){
    return value < 10 ? `0${value}`: value
}

function renderCountdown({days,hours,min,sec}){
    daysText.innerText = addPadStart(days);
    hoursText.innerText = addPadStart(hours);
    minText.innerText = addPadStart(min);
    secText.innerText = addPadStart(sec);
}

function processCountdownValue() {
    const currentDate = new Date();
    const totalSeconds = (deadlineDate - currentDate)/1000

    const days = Math.floor((totalSeconds / 3600) / 24)
    const hours = Math.floor((totalSeconds / 3600) % 24)
    const min = Math.floor((totalSeconds / 60) % 60)
    const sec = Math.floor(totalSeconds % 60 )

    return {days,hours,min,sec}
}
/// END COUNTER

