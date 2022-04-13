var cityFormEl = document.querySelector(`#search-form`);
var cityInputEl = document.querySelector(`#search`);
var citySearch = document.querySelector(`#search-btn`);
var cityBtnContainer = document.querySelector(`#city-btn-container`);
var cityListBtn = document.querySelector(`.city-btn`);
var currentDay = moment().format('L');

var getCoords = function (cityName) {
    var cityName = cityInputEl.value.trim();
    var lonlatAPI = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=08fa64b302981421cf0aa8c34c592018`;

    fetch(lonlatAPI)
    .then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                var lon = data[0].lon;
                var lat = data[0].lat;
                var fiveDayAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=08fa64b302981421cf0aa8c34c592018`;
                
                fetch(fiveDayAPI)
                .then(function(response) {
                    if(response.ok) {
                        response.json().then(function(data) {
                            var curWeather = document.querySelector(`#current-city`);
                            var curDay = document.querySelector(`#current-day`);
                            var wIcon = document.querySelector(`#current-weather-icon`);
                            var curWind = document.querySelector(`#current-city-wind`);
                            var curTemp = document.querySelector(`#current-city-temp`);
                            var curHumidity = document.querySelector(`#current-city-humidity`);
                            var curUvi = document.querySelector(`#current-city-uvi`);
                            var getIcon = data.current.weather[0].icon;
                            wIcon.src = `https://openweathermap.org/img/wn/${getIcon}@2x.png`;
                            curWeather.innerText = cityName;
                            curDay.innerText = `(${currentDay})`;
                            curWind.innerText = `${data.current.wind_speed} MPH`;
                            curTemp.innerText = `${data.current.temp}°F`;
                            curHumidity.innerText = `${data.current.humidity}%`
                            curUvi.innerText = data.current.uvi;
                            if(data.current.uvi >= 0 && data.current.uvi <= 2 ) {
                                curUvi.classList.add(`low`);
                            }
                            else if (data.current.uvi >= 2 && data.current.uvi <= 5 ) {
                                curUvi.classList.add(`moderate`);
                            }
                            else if (data.current.uvi > 5 && data.current.uvi <= 7) {
                                curUvi.classList.add(`high`);
                            }
                            else if (data.current.uvi > 7 && data.current.uvi <= 10) {
                                curUvi.classList.add(`very-high`);
                            }
                            else if (data.current.uvi > 10 && data.current.uvi <= 11) {
                                curUvi.classList.add(`extreme`);
                            }
                            
                            var d1Date = document.querySelector('#d1date');
                            d1Date.innerText = moment().add(1, 'days').format('l');
                            var d1Icon = document.querySelector('#d1icon');
                            var d1wIcon = data.daily[0].weather[0].icon;
                            var d1IconGet = `http://openweathermap.org/img/wn/${d1wIcon}@2x.png`;
                            d1Icon.src = d1IconGet;
                            var d1Temp = document.querySelector('#d1temp');
                            d1Temp.innerText = `${data.daily[0].temp.day}F`;
                            var d1Wind = document.querySelector('#d1wind');
                            d1Wind.innerText = `${data.daily[0].wind_speed} MPH`;
                            var d1Humidity = document.querySelector('#d1humid');
                            d1Humidity.innerText = `${data.daily[0].humidity}%`;

                            var d2Date = document.querySelector('#d2date');
                            d2Date.innerText = moment().add(2, 'days').format('l');
                            var d2Icon = document.querySelector('#d2icon');
                            var d2wIcon = data.daily[1].weather[0].icon;
                            var d2IconGet = `http://openweathermap.org/img/wn/${d2wIcon}@2x.png`;
                            d2Icon.src = d2IconGet;
                            var d2Temp = document.querySelector('#d2temp');
                            d2Temp.innerText = `${data.daily[1].temp.day}F`;
                            var d2Wind = document.querySelector('#d2wind');
                            d2Wind.innerText = `${data.daily[1].wind_speed} MPH`;
                            var d2Humidity = document.querySelector('#d2humid');
                            d2Humidity.innerText = `Humidity: ${data.daily[1].humidity}%`;

                            var d3Date = document.querySelector('#d3date');
                            d3Date.innerText = moment().add(3, 'days').format('l');
                            var d3Icon = document.querySelector('#d3icon');
                            var d3wIcon = data.daily[2].weather[0].icon;
                            var d3wIconGet = `http://openweathermap.org/img/wn/${d3wIcon}@2x.png`;
                            d3Icon.src = d3wIconGet;
                            var d3Temp = document.querySelector('#d3temp');
                            d3Temp.innerText = `${data.daily[2].temp.day}F`;
                            var d3Wind = document.querySelector('#d3wind');
                            d3Wind.innerText = `${data.daily[2].wind_speed} MPH`;
                            var d3Humidity = document.querySelector('#d3humid');
                            d3Humidity.innerText = `${data.daily[2].humidity}%`;
                        
                            var d4Date = document.querySelector('#d4date');
                            d4Date.innerText = moment().add(4, 'days').format('l');
                            var d4Icon = document.querySelector('#d4icon');
                            var d4wIcon = data.daily[3].weather[0].icon;
                            var d4wIconGet = `http://openweathermap.org/img/wn/${d4wIcon}@2x.png`;
                            d4Icon.src = d4wIconGet;
                            var d4Temp = document.querySelector('#d4temp');
                            d4Temp.innerText = `${data.daily[3].temp.day}F`;
                            var d4Wind = document.querySelector('#d4wind');
                            d4Wind.innerText = `${data.daily[3].wind_speed} MPH`;
                            var d4Humidity = document.querySelector('#d4humid');
                            d4Humidity.innerText = `${data.daily[3].humidity}%`;
                        
                            var d5Date = document.querySelector('#d5date');
                            d5Date.innerText = moment().add(5, 'days').format('l');
                            var d5Icon = document.querySelector('#d5icon');
                            var d5wIcon = data.daily[4].weather[0].icon;
                            var d5wiconGet = `http://openweathermap.org/img/wn/${d5wIcon}@2x.png`
                            d5Icon.src = d5wiconGet;
                            var d5Temp = document.querySelector('#d5temp');
                            d5Temp.innerText = `${data.daily[4].temp.day}F`;
                            var d5wind = document.querySelector('#d5wind');
                            d5wind.innerText = `${data.daily[4].wind_speed} MPH`;
                            var d5Humidity = document.querySelector('#d5humid');
                            d5Humidity.innerText = `${data.daily[4].humidity}%`

                            console.log(data);
                        })
                    }
                    else {
                        alert(`Error: ` + response.statusText);
                    }

                });
            });
        }
        else {
            alert(`Error: ` + response.statusText);
        }
    });
};



var citySubmitHandler = function(event) {
    event.preventDefault();

    var city = cityInputEl.value.trim();

    if(city) {
        getCoords(city);
        cityInputEl.value = ``;
    }
    else {
        alert(`You must enter a city name.`);
    }
};

var makeCityBtn = function() {
    var cityBtn = document.createElement(`button`);
    cityBtn.classList = `city-btn text-black w-100 rounded my-2 py-1`;
    cityBtn.setAttribute(`type`, `submit`);
    cityBtn.textContent = cityInputEl.value.trim();
    cityBtnContainer.appendChild(cityBtn);
};


cityFormEl.addEventListener(`submit`, makeCityBtn);
cityFormEl.addEventListener(`submit`, citySubmitHandler);