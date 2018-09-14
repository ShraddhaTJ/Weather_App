const request = require('request');
const apiKey = 'd34c034c833b46d8aff458d2595d43ca';
var cors = require('cors');

// use it before all route definitions
const express = require('express')
const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// use it before all route definitions
app.use(cors({origin: '*'}));

app.use(express.static('public'));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  //res.send('Hello Dr. Gao ! The Weather App is on port : 3000')
  res.render('index', {weather: null, error: null});   // send the index.ejs (render to equivalent html)
})

app.post('/', function (req, res) {
    let cityName = req.body.cityName;
    if(!cityName){
	cityName="Portland";
	}
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`

    request(url, function (err, response, body) {
        if(err){
            res.render('index', {weather: [], error: 'Error, please try again'});
        }
        else {
            let weather = JSON.parse(body)
            if(weather.main == undefined){
                res.render('index', {weather: null, error: 'Error, please try again'});
            } 
            // else {
            //     let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
            //     console.log('\n------------ '+weather.name+' ------------');
            //     console.log('\n'+message);
            //     console.log('Min Temperature: '+weather.main.temp_min);
            //     console.log('Max Temperature: '+weather.main.temp_max);
            //     console.log('\n--------------');
            //     console.log('Latitude: '+weather.coord.lon);
            //     console.log('Logitude: '+weather.coord.lat);
            //     console.log('Country: '+weather.sys.country);
            //     console.log('\n--------------');
            //     console.log('Air Pressure: '+weather.main.pressure);
            //     console.log('Humidity: '+weather.main.humidity);
            //     console.log('Wind Speed: '+weather.wind.speed);  
            //     console.log('\n-------------------------------------');
            //     res.render('index', {weather: message, error: null});
            //   }

            else {  
                    let message = `--------------------- ${weather.name} -----------------------;It's ${weather.main.temp} degrees in ${weather.name}!;Min Temperature: ${weather.main.temp_min};Max Temperature: ${weather.main.temp_max};\nLatitude: ${weather.coord.lon};Logitude: ${weather.coord.lat};Country: ${weather.sys.country};Air Pressure: ${weather.main.pressure};Humidity: ${weather.main.humidity};Wind Speed: ${weather.wind.speed}`;
                    message=message.split(";");
                    console.log('\n'+message);
                    res.render('index', {weather: message, error: null});   

                  }

              
            }
        });
    })
        app.listen(3000, function () {
            console.log('The Weather App is on port : 3000!')
        })
