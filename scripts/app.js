import {APIKEY} from "./apikey.js";

const searchBar = document.getElementById("searchBar");
const cityStateName = document.getElementById("cityStateName");
const currentTemp = document.getElementById("currentTemp");
const highLowTemp = document.getElementById("highLowTemp");
const currentCityStateName = document.getElementById("currentCityStateName");
const currentTime = document.getElementById("currentTime");
const dayOneTemp = document.getElementById("dayOneTemp");
const dayTwoTemp = document.getElementById("dayTwoTemp");
const dayThreeTemp = document.getElementById("dayThreeTemp");
const dayFourTemp = document.getElementById("dayFourTemp");
const dayFiveTemp = document.getElementById("dayFiveTemp");
const dayOne = document.getElementById("dayOne");
const dayTwo = document.getElementById("dayTwo");
const dayThree = document.getElementById("dayThree");
const dayFour = document.getElementById("dayFour");
const dayFive = document.getElementById("dayFive");
const weatherCurrentDay = document.getElementById("weatherCurrentDay");
const weatherDayOne = document.getElementById("weatherDayOne");
const weatherDayTwo = document.getElementById("weatherDayTwo");
const weatherDayThree = document.getElementById("weatherDayThree");
const weatherDayFour = document.getElementById("weatherDayFour");
const weatherDayFive = document.getElementById("weatherDayFive");

navigator.geolocation.getCurrentPosition(function(position){
    console.log(position);
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    currentWeatherStartAPI(lat, lon);
});

async function currentWeatherStartAPI(lat, lon){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=imperial`);
    const startData = await response.json();

    geocodingAPI(startData.name);
    geocodingStartAPI(startData.name);

    return startData;
}

async function geocodingStartAPI(currentCityName){
    const limit = 1;
    const geocodingStart = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${currentCityName}&limit=${limit}&appid=${APIKEY}`);
    const geocodingStartData = await geocodingStart.json();

    let startCity = geocodingStartData[0].name;
    let startState = geocodingStartData[0].state;

    let time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    currentTime.innerText = `${hours}:${minutes}`;

    currentCityStateName.innerText = `${startCity}, ${startState}`;

    return geocodingStartData;
}

async function currentWeatherAPI(lat, lon)
{
    const currentWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=imperial`);
    const data = await currentWeather.json();

    let currentTempTxt = data.main.temp.toString();
    let highTemp = data.main.temp_max.toString();
    let lowTemp = data.main.temp_min.toString();

    currentTemp.innerText = `${currentTempTxt.split(".")[0]}°`;
    highLowTemp.innerText = `High ${highTemp.split(".")[0]}° - Low ${lowTemp.split(".")[0]}°`;

    return data;
}

async function fiveDayAPI(lat, lon)
{
    const fiveDay = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=imperial`);
    const fiveDayData = await fiveDay.json();

    let dayOneTxt = fiveDayData.list[1].dt_txt;
    let dayTwoTxt = fiveDayData.list[9].dt_txt;
    let dayThreeTxt = fiveDayData.list[17].dt_txt;
    let dayFourTxt = fiveDayData.list[25].dt_txt;
    let dayFiveTxt = fiveDayData.list[33].dt_txt;

    let dayOneDay = new Date(dayOneTxt);
    let dayTwoDay = new Date(dayTwoTxt);
    let dayThreeDay = new Date(dayThreeTxt);
    let dayFourDay = new Date(dayFourTxt);
    let dayFiveDay = new Date(dayFiveTxt);

    let dayOneTempTxt = fiveDayData.list[1].main.temp.toString();
    let dayTwoTempTxt = fiveDayData.list[9].main.temp.toString();
    let dayThreeTempTxt = fiveDayData.list[17].main.temp.toString();
    let dayFourTempTxt = fiveDayData.list[25].main.temp.toString();
    let dayFiveTempTxt = fiveDayData.list[33].main.temp.toString();

    dayOneTemp.innerText = `${dayOneTempTxt.split(".")[0]}°`;
    dayTwoTemp.innerText = `${dayTwoTempTxt.split(".")[0]}°`;
    dayThreeTemp.innerText = `${dayThreeTempTxt.split(".")[0]}°`;
    dayFourTemp.innerText = `${dayFourTempTxt.split(".")[0]}°`;
    dayFiveTemp.innerText = `${dayFiveTempTxt.split(".")[0]}°`;

    let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    dayOne.innerText = daysOfWeek[dayOneDay.getDay()];
    dayTwo.innerText = daysOfWeek[dayTwoDay.getDay()];
    dayThree.innerText = daysOfWeek[dayThreeDay.getDay()];
    dayFour.innerText = daysOfWeek[dayFourDay.getDay()];
    dayFive.innerText = daysOfWeek[dayFiveDay.getDay()];

    let dayCurrentWeather = fiveDayData.list[0].weather[0].main;
    let dayOneWeather = fiveDayData.list[1].weather[0].main;
    let dayTwoWeather = fiveDayData.list[9].weather[0].main;
    let dayThreeWeather = fiveDayData.list[17].weather[0].main;
    let dayFourWeather = fiveDayData.list[25].weather[0].main;
    let dayFiveWeather = fiveDayData.list[33].weather[0].main;

    weatherCurrentDay.src = `assets/images/${dayCurrentWeather}.png`;
    weatherDayOne.src = `assets/images/${dayOneWeather}.png`;
    weatherDayTwo.src = `assets/images/${dayTwoWeather}.png`;
    weatherDayThree.src = `assets/images/${dayThreeWeather}.png`;
    weatherDayFour.src = `assets/images/${dayFourWeather}.png`;
    weatherDayFive.src = `assets/images/${dayFiveWeather}.png`;
    
    console.log(fiveDayData);
    return fiveDayData;
}

async function geocodingAPI(cityName)
{
    const limit = 1;
    const geocoding = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${APIKEY}`);
    const geocodingData = await geocoding.json();

    let lat = geocodingData[0].lat;
    let lon = geocodingData[0].lon;
    let city = geocodingData[0].name;
    let state = geocodingData[0].state;

    cityStateName.innerText = `${city}, ${state}`;

    currentWeatherAPI(lat, lon);
    fiveDayAPI(lat, lon);

    return geocodingData;
}

searchBar.addEventListener("keydown", (event) => {
    if(event.key === "Enter"){
        let cityName = searchBar.value;
        geocodingAPI(cityName);
        searchBar.value = "";
    }
});