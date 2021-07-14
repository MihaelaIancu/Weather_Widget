let clockDiv = document.querySelector(".clock");
let bg = document.querySelector("body");
let form = document.querySelector("form");
let formInput = document.querySelector("form input");
let display = document.querySelector("form display");
let submitBtn = document.querySelector("#submitBtn");
let refreshBtn = document.querySelector("#refreshBtn");
let container = document.querySelector(".container");
let localHours = document.querySelector("#localH");
let localMinutes = document.querySelector("#localM");
let localSeconds = document.querySelector("#localS");
let hours = document.querySelector("#hours");
let minutes = document.querySelector("#minutes");
let seconds = document.querySelector("#seconds");

//local weather
// API key - 2ec935e30295b2a0b292ef7533ec6804
// API call - api.openweathermap.org/data/2.5/weather?q=Bucharest&appid={API key}

const bgImg = {
    "rain": "https://unsplash.com/photos/3D-K5_DsyaE/download?force=true&w=2400",
    "clear": "https://unsplash.com/photos/l5n7jmRJwBY/download?force=true&w=2400",
    "clouds": "https://unsplash.com/photos/DGFwQWKf-5o/download?force=true&w=2400",
    "snow": "https://unsplash.com/photos/Nx2djwRZxWU/download?force=true&w=2400",
    "default": "https://unsplash.com/photos/tnuZFnY7OWw/download?force=true"
}
const apiKey = "2ec935e30295b2a0b292ef7533ec6804";


form.addEventListener("submit", e => {

    e.preventDefault();
    container.style.display = "grid";
    
    // localTime.style.display = "none";
    // clearTimeout(getTime);

    let formInputValue = formInput.value;
    // console.log(formInputValue);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${formInputValue}&appid=${apiKey}&units=metric`;
    document.querySelector("#city").innerHTML = formInputValue.toUpperCase();

    fetch(url, { cache: "no-cache" })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Something went wrong...try again');
            }

        })
        .then(data => {
            let weatherCondition = data.weather[0].main;

            switch (weatherCondition) {
                case "Clear":
                    bg.style.backgroundImage = `url(${bgImg.clear})`;
                    break;
                case "Rain":
                    bg.style.backgroundImage = `url(${bgImg.rain})`;
                    break;
                case "Drizzle":
                    bg.style.backgroundImage = `url(${bgImg.rain})`;
                    break;
                case "Snow":
                    bg.style.backgroundImage = `url(${bgImg.snow})`;
                    break;
                case "Clouds":
                    bg.style.backgroundImage = `url(${bgImg.clouds})`;
                    break;
                case "Thunderstorm":
                    bg.style.backgroundImage = `url(${bgImg.clouds})`;
                    break;
                default:
                    bg.style.backgroundImage = `url(${bgImg.default})`;
                    break;
            }
            // console.log(data);
            // console.log(data.weather[0].main);

            let weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            //condition
            document.querySelector(".weatherDescriptionItem").style.display = "inline-block";
            document.querySelector("#weatherDescr").innerHTML = data.weather[0].description;
            document.querySelector("#weatherDescr").style.display = "block";
            document.querySelector("#weatherIcon").src = weatherIcon;

            if (document.querySelector("#weatherDescr").innerHTML.split(" ").length >= 3) {
                document.querySelector("#weatherDescr").style.margin = "-10% auto";
            } else {
                document.querySelector("#weatherDescr").style.margin = "0 auto";
            }
            //humidity
            document.querySelector("#humidity").innerHTML = data.main.humidity + "&#37;";
            document.querySelector("#humidity").style.display = "block";
            document.querySelector(".fa-humidity").style.display = "block";
            //pressure
            document.querySelector("#pressure").innerHTML = data.main.pressure + " &#13169;";
            document.querySelector("#pressure").style.display = "block";
            document.querySelector(".fa-tachometer-alt").style.display = "block";
            //max-temp
            document.querySelector("#max-temp").innerHTML = data.main.temp_max + "&#8451";
            document.querySelector("#max-temp").style.display = "block";
            document.querySelector(".fa-temperature-high").style.display = "block";
            //wind
            document.querySelector("#wind").innerHTML = data.wind.speed + " m/s";
            document.querySelector("#wind").style.display = "block";
            document.querySelector(".fa-wind").style.display = "block";
            //country
            document.querySelector("#country").innerHTML = data.sys.country;
            //metric, temp
            document.querySelector("#metric").style.display = "block";
            document.querySelector("#metric").innerHTML = data.main.temp + "&#8451";
            //location
            document.querySelector(".fa-thumbtack").style.display = "inline-block";
            //localTime
            //hours
            //minutes
            //seconds

            // let destinationCity = data.name;
            // let destinationTimezone = data.timezone;

            window.setInterval(function () {
                // let destinationCity = data.name;
                let destinationTimezone = data.timezone;
                let date = new Date();
                let localDate = date.getTime();
                let localOffset = date.getTimezoneOffset() * 60000;
                let utc = localDate + localOffset;
                let finalTime = utc + (1000 * destinationTimezone);
                let convertedTime = new Date(finalTime);
                // cityTime = nd.getTime();
                let currTime = {
                    'Total': convertedTime,
                    'Hours': convertedTime.getHours(),
                    'Minutes': convertedTime.getMinutes(),
                    'Seconds': convertedTime.getSeconds()
                };

                hours.innerHTML = currTime.Hours < 10 ? "0" + currTime.Hours : currTime.Hours;
                minutes.innerHTML = currTime.Minutes < 10 ? "0" + currTime.Minutes : currTime.Minutes;
                seconds.innerHTML = currTime.Seconds < 10 ? "0" + currTime.Seconds : currTime.Seconds;
                console.log(convertedTime);
                // return document.querySelector("#clock").innerHTML += hours + minutes + seconds;

            }, 1000);

        })
        .catch(function (err) {
            // console.log(err);
            bg.style.backgroundImage = `url(${bgImg.default})`;
            document.querySelector(".display").style.display = "block";
            document.querySelector(".B").style.display = "none";
            document.querySelector(".display").innerHTML = err;
            setTimeout(function () {
                document.querySelector(".display").style.display = "none";
                document.querySelector(".B").style.display = "block";
            }, 5000);

        });

    form.reset();

});

refreshBtn.addEventListener("click", function () {
    window.location.reload();
});


/*
function addLeadingZero(number) {
    if (number < 10) {
        return "0" + number.toString();
    } else {
        return number.toString();
    }
}

local time
*/
function getTime() {
    // let formattedTime = "";
    let time = new Date();
    let localTime = {
        'Total': time,
        'Hours': time.getHours(),
        'Minutes': time.getMinutes(),
        'Seconds': time.getSeconds()
    };

    localHours.innerHTML = localTime.Hours < 10 ? "0" + localTime.Hours : localTime.Hours;
    localMinutes.innerHTML = localTime.Minutes < 10 ? "0" + localTime.Minutes : localTime.Minutes;
    localSeconds.innerHTML = localTime.Seconds < 10 ? "0" + localTime.Seconds : localTime.Seconds;

}

window.setInterval(getTime, 1000);



