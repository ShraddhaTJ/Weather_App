let request = require('request');
const argv = require('yargs').argv;

let apiKey = 'd34c034c833b46d8aff458d2595d43ca';
let cityName = argv.c || 'Portland';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`

request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    let weather = JSON.parse(body)
    let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
    console.log('\n------------ '+weather.name+' ------------');
    console.log('\n'+message);
    console.log('Min Temperature: '+weather.main.temp_min);
    console.log('Max Temperature: '+weather.main.temp_max);
    console.log('\n--------------');
    console.log('Latitude: '+weather.coord.lon);
    console.log('Logitude: '+weather.coord.lat);
    console.log('Country: '+weather.sys.country);
    console.log('\n--------------');
    console.log('Air Pressure: '+weather.main.pressure);
    console.log('Humidity: '+weather.main.humidity);
    console.log('Wind Speed: '+weather.wind.speed);  
    console.log('\n-------------------------------------');
  
  }
});
