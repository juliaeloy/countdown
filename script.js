// Elements
const calculateButtonElement = document.querySelector('#button-start-count')
const title = document.querySelector('title')
const daysText = document.querySelector('#days')
const hoursText = document.querySelector('#hours')
const minText = document.querySelector('#min')
const secText = document.querySelector('#sec')
const currentDate = new Date();
let endDate = document.querySelector("enddate");


// Functions

function validateDate(endDate) {
    // To do Here
    if (endDate > currentDate ){
        return true
    }
    else {
        alert ("End date must be different from today's date!")
    }

}

function validateTitle(title) {
    const titleElement = document.getElementById('title')
    const titletext = titleElement.value
    if (titletext == ""){
        alert ("Please, insert a Title for your Countdown!")
        return false
    }
    return true
}

function validateCountdown() {

    const endDateElement = document.getElementById('enddate')
    const titleElement = "" // To do
    const endDate = endDateElement.value
    //block the calendar icon to not accept dates before today's date
    //endDate.min = new Date().toISOString().split('T')[0];
    const dateToSend = new Date(endDate)

    const dateIsValid = validateDate(dateToSend)
    const titleIsValid = validateTitle()

    if (dateIsValid && titleIsValid) {
        startCoundown(dateToSend)
    } else {
        alert ('Preencha todos os campos corretamente')
    }
}

function getCountdownValue(deadlineDate) {
    const currentDate = new Date();
    const totalSeconds = (deadlineDate - currentDate)/1000
    const days = Math.floor((totalSeconds / 3600) / 24)
    const hours = Math.floor((totalSeconds / 3600) % 24)
    const min = Math.floor((totalSeconds / 60) % 60)
    const sec = Math.floor(totalSeconds % 60 )
    return {days,hours,min,sec}
}

function updateCountdown(deadlineDate) {
    const {days,hours,min,sec} = getCountdownValue(deadlineDate)
    renderCountdown({days,hours,min,sec})
}

function addPadStart(value){
    return value < 10 ? `0${value}`: value
}

function renderCountdown({days,hours,min,sec}){
      daysText.innerText = addPadStart(days);
      hoursText.innerText = addPadStart(hours);
      minText.innerText = addPadStart(min);
      secText.innerText = addPadStart(sec);
}

function startCoundown(deadlineDate) {
    setInterval(function () {
        updateCountdown(deadlineDate)
    }, 1000)
}

// Listeners 
calculateButtonElement.addEventListener('click', validateCountdown)

// Setters
daysText.innerText = hoursText.innerText = minText.innerText = secText.innerText = "00";


