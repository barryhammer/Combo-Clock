setInterval(setClock, 1000) //Run every 1000 milliseconds = 1 second
setInterval(displayDigitalTime, 1000)

const hourHand = document.querySelector('[data-hour-hand]')
const minuteHand = document.querySelector('[data-minute-hand]')
const secondHand = document.querySelector('[data-second-hand]')

function setClock() {
    var currentDate = new Date() //Gets current date and time
    var secondsRatio = currentDate.getSeconds() / 60
    // Move minute and hour hands gradually according to seconds and minutes
    var minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60
    var hoursRatio = (minutesRatio + currentDate.getHours()) / 12
    setRotation(secondHand, secondsRatio)
    setRotation(minuteHand, minutesRatio)
    setRotation(hourHand, hoursRatio)
    // Setting digital clock to be hidden on page load
    //document.getElementById("digital-clock").style.display = "none";

}

function setRotation (element, rotationRatio) {
    // Sets property of element to rotation variable in CSS 
    element.style.setProperty('--rotation', rotationRatio * 360)
}

function displayDigitalTime(){
    var currentDate = new Date();
    var hrs = currentDate.getHours();
    var min = currentDate.getMinutes();
    var sec = currentDate.getSeconds();
    var session = document.getElementById('session');

    if(hrs >= 12){
        session.innerHTML = 'PM';
    } else {
        session.innerHTML = 'AM'
    }

    // Changes format from 24 hour clock to 12 hour clock
    if(hrs > 12){
        hrs = hrs -12;
    }

    // Because minutes and seconds were not getting a padded 0 if the number
    // was less than 10, I have to use an extra if statement for minutes and
    // seconds. I found my answer here:
    // https://www.tutorialspoint.com/How-to-pad-a-number-with-leading-zeros-in-JavaScript

    if(min < 10){
        let paddedMin = min.toString().padStart(2, '0');
        min = paddedMin;
    }

    if(sec < 10){
        var paddedSec = sec.toString().padStart(2, '0');
        sec = paddedSec;
    }

    document.getElementById('hours').innerHTML = hrs;
    document.getElementById('minutes').innerHTML = min;
    document.getElementById('seconds').innerHTML = sec;
    
}

//https://stackoverflow.com/questions/10687479/javascript-replace-div-on-each-click
function toggleClock() {
    var analog = document.getElementById("analog-clock");
    var digital = document.getElementById("digital-clock");
    // If analog clock is not displayed, display it in place of digital clock.
    if (analog.style.display === "none") {
        analog.style.display = "block";
        digital.style.display = "none"; 
        //https://www.w3schools.com/jsref/prop_html_innerhtml.asp
        document.getElementById("btn").innerHTML = "Click me to display digital clock"
    } else {
        // If digital clock is not displayed, display it in place of analog clock.
        analog.style.display = "none";
        digital.style.display = "block"; 
        setInterval(displayDigitalTime, 1000)
        document.getElementById("btn").innerHTML = "Click me to display analog clock"
    }
}

setClock() //Sets clock to current time as soon as page is loaded.