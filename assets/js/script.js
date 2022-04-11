var cityFormEl = document.querySelector(`#search-form`);
var cityInputEl = document.querySelector(`#search`);
var citySearch = document.querySelector(`#search-btn`);
var cityBtnContainer = document.querySelector(`#city-btn-container`);
var cityListBtn = document.querySelector(`.city-btn`);
var currentDay = moment().format('L');

var getCoords = function (cityName) {
    var cityName = cityInputEl.value.trim();
    var lonlatAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=08fa64b302981421cf0aa8c34c592018`;

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
                            wIcon.src = `http://openweathermap.org/img/wn/${getIcon}@2x.png`;
                            curWeather.innerText = cityName;
                            curDay.innerText = `(${currentDay})`;
                            curWind.innerText = `${data.current.wind_speed} MPH`;
                            curTemp.innerText = `${data.current.temp}°F`;
                            curHumidity.innerText = `${data.current.humidity}%`
                            curUvi.innerText = data.current.uvi;
                            if(data.current.uvi >= 0 && data.current.uvi <= 2 ) {
                                curUvi.classList.add(`low`);
                            }
                            else if (data.current.uvi >= 2.01 && data.current.uvi <= 5 ) {
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