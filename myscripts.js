$(document).ready(function() {
    var lon, lat;

    var sunny = 'ion-ios-sunny-outline';
    var cloudy = 'ion-ios-cloudy-outline';
    var partlySunny = 'ion-ios-partlysunny-outline';
    var rainy = 'ion-ios-rainy-outline';
    var thunderstorm = 'ion-ios-thunderstorm-outline';
    var snowy = 'ion-ios-snowy';
       
    $.getJSON("http://ip-api.com/json", function(json) {
        lon = json.lon;
        lat = json.lat;
        var apiURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=bff0b7a9a7566e0c8b493ea9b3feb4e1";

        $.getJSON(apiURL, function(data) {

            var city = data.name;
            var country = data.sys.country;

            var temp = data.main.temp;
            var weatherId = data.weather[0].id;

            var weatherType = data.weather[0].description;
            var wind = data.wind.speed;
            var humid = data.main.humidity;
            var clouds = data.clouds.all;

            var sRise = data.sys.sunrise;
            var sSet = data.sys.sunset;

            // convert temperatures from Kelvin to C and F
            var celsCurrent = Math.round(temp - 273);
            var farnCurrent = Math.round(((temp - 273) * 1.8) + 32);

            // convert wind speed from m/s to km/h
            var windSpeed = Math.round((wind * 18) / 5);

            // convert sunrise and sunset times
            var d = new Date(sRise * 1000);
            var dMins = function() {
                if (d.getMinutes() < 10) {
                    dMins = ':0' + d.getMinutes();
                } else { dMins = ':' + d.getMinutes();}
                return dMins;
            }
            var dHours = function() {
                if (d.getHours() < 10) {
                    dHours = '0' + d.getHours();
                } else { dHours = d.getHours();}
                return dHours;
            }
            
            var sunriseTime = dHours() + dMins();
            var e = new Date(sSet * 1000);
            var eMins = function() {
                if (e.getMinutes() < 10) {
                    eMins = ':0' + e.getMinutes();
                } else { eMins = ':' + e.getMinutes();}
                return eMins;
            }
            var sunsetTime = e.getHours() + eMins();

            // for current time
            var h = new Date();
            var mins = function() {
                if (h.getMinutes() < 10) {
                    mins = ':0' + h.getMinutes();
                } else {mins=':'+h.getMinutes();}
                return mins;
            }
            var hours = function() {
                if (h.getHours() < 10) {
                    hours = '0' + h.getHours();
                } else { hours = h.getHours();}
                return hours;
            }
            var currentTime = hours() + mins();

            // make first letter of weather description a capital letter
            var weatherDesc = weatherType.charAt(0).toUpperCase() + weatherType.slice(1);

            // to get weather icon        
            var wIcon = function() {
                if (weatherId < 240) {
                    wIcon = thunderstorm;
                } else if (weatherId < 540) {
                    wIcon = rainy;
                } else if (weatherId < 630) {
                    wIcon = snowy;
                } else if (weatherId < 790) {
                    wIcon = cloudy;
                } else if (weatherId == 800) {
                    wIcon = sunny;
                } else if (weatherId === 801) {
                    wIcon = partlySunny;
                } else { wIcon = cloudy; }
                return wIcon;
            }

            $('#cityName').html(city);
            $('#countryName').html(country);
            $('#tempCurrent').html(celsCurrent);
            $('#wDesc').html(weatherDesc);
            $('.weatherIcon').addClass(wIcon);
            $('#currentTime').html(currentTime);
            $('#humidity').html(humid);
            $('#wSpeed').html(windSpeed);
            $('#clouds').html(clouds);
            $('#sunrise').html(sunriseTime);
            $('#sunset').html(sunsetTime);

            // for buttons to change between c and f
            $('#celButton').on('click', function() {
                $('#tempCurrent').html(celsCurrent);
                $('button').toggleClass('activeTemp');
            });
            $('#farButton').on('click', function() {
                $('#tempCurrent').html(farnCurrent);
                $('button').toggleClass('activeTemp');
            });

        })
      
    })
});