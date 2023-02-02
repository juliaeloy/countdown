// Elements
const calculateButtonElement = document.querySelector('#button-start-count')
const keepMePostedButtonElement = document.querySelector('#keep-me-posted')
const doAnotherOneButtonElement = document.querySelector('#doAnotherOne') 
const updateMeButtonElement = document.querySelector('#btn-submit')
const daysText = document.querySelector('#days')
const hoursText = document.querySelector('#hours')
const minText = document.querySelector('#min')
const secText = document.querySelector('#sec')
const currentDate = new Date();
const endDate = document.querySelector("#enddate")

//Global variables 
let canCalculateFlag = false 
let canSendEmail = false

// Functions
function doAnotherOne(){
    console.log('teste')
    alert ('deu certo')
}

function isCheckboxTicked(){
    const agreementElement = document.querySelector("#agreement")
    // em standby -> const agreementInside = agreementElement.value
    //posso garantir que quando eu ponho o .checked ele me retorna boolean? 
    if(agreementElement.checked){
        return true
    }
    else{
        alert ('Please agree with the terms, if you want to receive emails')
        return falses
    }

}

function validateKeepMePosted(){

    const nameIsValid = validateName()
    const surnameIsValid = validateSurname()
    const emailIsValid = validateEmail()
    const checkBox = isCheckboxTicked()

    if(nameIsValid && surnameIsValid && emailIsValid && checkBox) {
        canSendEmail = true
        window.location.href = ('http://127.0.0.1:5500/thankYou.html')
        //send email future 
        //does it open another page or just change the current one? 
    }
    else {
        canSendEmail = false
        alert ('Please check all the fields required. You seemed to have left one behind!')
    }
}

function validateName(){//ainda esta funcionando se colocar mais de dois espacos
    const nameElement = document.getElementById('name')
    const nameText = nameElement.value

    if (nameText.length<2){
        alert ("Please, Check if you have filled your name")
        return false
    }
    return true
}

function validateSurname(){
    const surnameElement = document.getElementById('surname')
    const surnameText = surnameElement.value

    if (surnameText.length<2){//ainda esta funcionando se colocar mais de dois espacos
        alert ("Please, Check if you have filled your surname")
        return false
    }
    return true

}

function validateEmail(){
    const emailElement = document.getElementById('surname')
    const emailText = emailElement.value

    if (emailText.length<2){ // como validar endereco de email, serve só 
        alert ("Please, Check if you have filled your surname")
        return false
    }
    return true

}

function SendInfoToKeepMePosted() {
    const titleElement = document.getElementById('title')
    const titletext = titleElement.value
    const endDateElement = document.getElementById('enddate')
    const endDate = endDateElement.value
    
    if (canCalculateFlag){
        setCookie("title", titletext, 1)
        setCookie("enddate", endDate, 1)
       if(window.confirm('You are going to be redirect to another page, do you want to continue?')){
        window.location.href = ("http://127.0.0.1:5500/keepMePosted.html")
       }
    }
    else {
        alert('Please, check if you have filled all the infos')
    }
}

function validateDate(endDate) {
    if (endDate > currentDate ){
        return true
    }
    else {
        alert ("End date must be different from today's date!")
    }

}

function validateTitle() {
    const titleElement = document.getElementById('title')
    const titletext = titleElement.value


    if (titletext.length<3 ){
        alert ("Please, insert a Title for your Countdown!")
        return false
    }
    return true
}

function validateCountdown() {

    const endDateElement = document.getElementById('enddate')
    const titleElement = "" // To do
    const endDate = endDateElement.value
    const dateToSend = new Date(endDate)

    const dateIsValid = validateDate(dateToSend)
    const titleIsValid = validateTitle()

    if (dateIsValid && titleIsValid) {
        startCoundown(dateToSend)
        canCalculateFlag = true
    } else {
        canCalculateFlag = false
        alert ('Please check all the fields required. You seemed to have left one behind!')
    }
}

function getCountdownValue(deadlineDate) {
    const currentDate = new Date()
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

function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

function setCookie(name, value, days) {
    var d = new Date;
    d.setTime(d.getTime() + 24*60*60*1000*days);
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
}

function deleteCookie(name) { setCookie(name, '', -1); }

// Listeners 
calculateButtonElement.addEventListener('click', validateCountdown)
keepMePostedButtonElement.addEventListener('click', SendInfoToKeepMePosted)
doAnotherOneButtonElement.addEventListener('click', doAnotherOne)
updateMeButtonElement.addEventListener('click', isCheckboxTicked)

//Setters
daysText.innerText = hoursText.innerText = minText.innerText = secText.innerText = "00";

//calendar
endDate.min = new Date().toISOString().split('T')[0];


