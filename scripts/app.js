import {APIKEY} from "./apikey.js";

navigator.geolocation.getCurrentPosition(function(position){
    console.log(position);
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    currentWeatherAPI(lat, lon);
});

async function currentWeatherAPI(lat, lon){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=imperial`);
    const data = await response.json();
    console.log(data);
}

async function fiveDayAPI(lat, lon){
    const fiveDay = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=imperial`);
    const fiveDayData = await fiveDay.json();
    console.log(fiveDayData);
    
    return data, fiveDayData;
}

// find api that lists states