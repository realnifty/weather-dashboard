var cityFormEl = document.querySelector(`#search-form`);
var cityInputEl = document.querySelector(`#search`);
var citySearch = document.querySelector(`#search-btn`);
var cityBtnContainer = document.querySelector(`#city-btn-container`);
var cityListBtn = document.querySelector(`.city-btn`)

var getCoords = function (cityName) {
    var cityName = cityInputEl.value.trim();
    var lonlatAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=08fa64b302981421cf0aa8c34c592018`;

    fetch(lonlatAPI)
    .then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                var lon = data[0].lon;
                var lat = data[0].lat;
                var fiveDayAPI = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=08fa64b302981421cf0aa8c34c592018`;
                
                fetch(fiveDayAPI)
                .then(function(response) {
                    if(response.ok) {
                        response.json().then(function(data) {
                            console.log(data)
                        })
                    }
                    else {
                        alert(`Error: ` + response.statusText);
                    }
                })
            });
        }
        else {
            alert(`Error: ` + response.statusText);
        }
    })
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


cityFormEl.addEventListener(`submit`, makeCityBtn)
cityFormEl.addEventListener(`submit`, citySubmitHandler);