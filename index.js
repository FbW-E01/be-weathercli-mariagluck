import axios from 'axios';
import process from 'process';
import APIkey from  './api.js';


const APIurl = 'https://api.openweathermap.org/data/2.5/weather';
const forecastAPI = 'https://api.openweathermap.org/data/2.5/forecast'
const APIkey = '4523728d0d48f713b476cad4faf3e18b';
const location =  process.argv.slice(2);
const fullAPI  = `${APIurl}?q=${location[0]}, ${location[1]}&appid=${APIkey}`;
const fullForecastAPI = `${forecastAPI}?q=${location[0]}, ${location[1]}&appid=${APIkey}`;

axios
  .get(fullAPI)
  .then(response => {
    const temperatureK = response.data.main.temp;
    const humidity     = response.data.main.humidity;
    const cityName     = response.data.name;
    const countryName  = response.data.sys.country;
    

    // Temperature conversions from Kelvins to celcius and Farenheit
    const temperatureC = temperatureK - 273.15; 
    const temperatureF = (temperatureK * 9) / 5 - 459.67;


   //print the info in a string
    const weatherDisplay = `Right now, in \
        ${cityName}, ${countryName} the current temperature is \
        ${temperatureC.toFixed(1)}ºC \
        (${temperatureF.toFixed(1)}ºF), with ${humidity}% humidity, \
       
        The current weather conditions are: ${response.data.weather[0].description} `.replace(/\s+/g, " ");

    console.log(weatherDisplay)
  })
  .catch(error => console.log("Error", error));




//bonus 5 days forecast with string info print
  axios.get(fullForecastAPI)
      .then(response => { 
        const cityName = process.argv.slice(2);

        response.data.list.map(date => { 
            console.log(`Weather forecast in ${cityName} on date: `, date.dt_txt);
            date.weather.map(des => {
                console.log(` will be: `,  des.description);
            })
          });

  })
  .catch(error => console.log("Error", error));