import {APIKEY} from "./apikey.js";

navigator.geolocation.getCurrentPosition(function(position){
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    async function apiCall(){

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=imperial`);
        const data = await response.json();
        console.log(data);

        const fiveDay = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKEY}`);
        const fiveDayData = await fiveDay.json();
        console.log(fiveDayData);
        
        return data, fiveDayData;
        
    }
    apiCall();
});