function weatherWidget() {
    // main function starts to get current weather
    const getWeather = function(city) {
        const output = document.querySelector('.weather_current_output');
        fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=3`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "37c9f6164fmsh2b54545d16a53e4p1efa2cjsnd69c794c5aed",
                "x-rapidapi-host": "weatherapi-com.p.rapidapi.com"
            }
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            let city = data.location.name,
                local_time = data.location.localtime.slice((data.location.localtime.length -5)),
                currentWeatherImg = data.current.condition.icon,
                currentWeatherImgExpl = data.current.condition.text,
                temp = data.current.temp_c,
                feelslikeC = data.current.feelslike_c,
                humidity = data.current.humidity,
                windspeed = data.current.wind_mph,
                winddir = data.current.wind_dir;
            output.innerHTML = `
            <div class='weather_data'>
                <div class='weather_data_row'>
                    <span class='city_name'>${city}</span>
                </div>
                <div class='weather_data_row'>
                    <span title ='Local Time' class='main_font widget_pointer'>${local_time}</span>
                    <span class='main_font'>${currentWeatherImgExpl}</span>
                </div>
                <div class='weather_data_row'>
                    <span class='temp widget_pointer' title='Temperature C'>${temp}°</span>
                    <img class='weather_img widget_pointer' title='${currentWeatherImgExpl} 'src='http:${currentWeatherImg}' alt='${currentWeatherImgExpl}'>
                </div>
                <div class='weather_data_row'>
                    <span class='main_font widget_pointer' title='Feels Like C'>${feelslikeC}°</span>
                    <span class='humidity widget_pointer' title='Humidity'>${humidity}%</span>
                </div>
                <div class='weather_data_row'>
                    <span class='windspeed widget_pointer' title='Wind Speed'>${windspeed}mph<span class='winddir widget_pointer' title='${winddir}'></span></span>
                </div>
            </div>
            `;
            switch(winddir) {
                case 'N':  
                document.querySelector('.winddir').style.transform = `rotate(0deg)`; 
                break;
                case 'NNE':  
                document.querySelector('.winddir').style.transform = `rotate(25deg)`;  
                break;
                case 'NE':  
                document.querySelector('.winddir').style.transform = `rotate(45deg)`;  
                break;
                case 'ENE':  
                document.querySelector('.winddir').style.transform = `rotate(65deg)`;  
                break;
                case 'E':  
                document.querySelector('.winddir').style.transform = `rotate(90deg)`;  
                break;
                case 'ESE':  
                document.querySelector('.winddir').style.transform = `rotate(115deg)`;  
                break;
                case 'SE':  
                document.querySelector('.winddir').style.transform = `rotate(135deg)`;  
                break;
                case 'SSE':  
                document.querySelector('.winddir').style.transform = `rotate(155deg)`;  
                break;
                case 'S':  
                document.querySelector('.winddir').style.transform = `rotate(180deg)`;  
                break;
                case 'SSW':  
                document.querySelector('.winddir').style.transform = `rotate(205deg)`;  
                break;
                case 'SW':  
                document.querySelector('.winddir').style.transform = `rotate(225deg)`;  
                break;
                case 'WSW':  
                document.querySelector('.winddir').style.transform = `rotate(245deg)`;  
                break;
                case 'W':  
                document.querySelector('.winddir').style.transform = `rotate(270deg)`;  
                break;
                case 'WNW':  
                document.querySelector('.winddir').style.transform = `rotate(295deg)`;  
                break;
                case 'NW':  
                document.querySelector('.winddir').style.transform = `rotate(315deg)`;  
                break;
                case 'NNW':  
                document.querySelector('.winddir').style.transform = `rotate(335deg)`;  
                break;
                default:
                break;
            }
        })
        .catch(err => {
            console.error(err);
        });
    }
    // main function ends
    //function to change city
    const changeCity = function(newCity) {
        return city = newCity;
    }
    // autocomplete search function
    const autocompleteSearch = function() {
        search_input.addEventListener('keydown', e => {
            if (e.key === 'Backspace') {
                if (typeof request === 'string') {
                    request = request.split('');
                }
                request.pop();
                request = request.join('');
                if (request !== '') {
                    citySearch(request);
                search_output.innerHTML = '';
                }
            } else if (e.key != 'Alt' && e.key != 'Control' && e.key != 'Shift' && e.key != 'Tab' && e.key != 'CapsLock' && e.key != 'Enter' && e.key != 'Backspace') {
                console.log(e.key)
                request += e.key;
                if (request !== '') {
                    citySearch(request);
                    search_output.innerHTML = '';
                }
            }
        })
    };
    const citySearch = function(city) {
        let search_city = '',
            cities = '';
        fetch(`https://weatherapi-com.p.rapidapi.com/search.json?q=${city}`, {
            "method": "GET",
            "headers": {
            "x-rapidapi-key": "37c9f6164fmsh2b54545d16a53e4p1efa2cjsnd69c794c5aed",
            "x-rapidapi-host": "weatherapi-com.p.rapidapi.com"
            }
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            data.forEach(city => {
                search_output.innerHTML += `<p class='search_output_city' data-city='${city.name}'>${city.name}</p>`;
            })
            cities = document.querySelectorAll('.search_output_city');
            if (cities.length > 0) {
                cities.forEach( place => {
                    place.addEventListener('click', (e) => {
                        search_city = e.target.dataset.city;
                        document.querySelector('.city_name').innerHTML = search_city;
                        search_output.innerHTML = '';
                        search_input.value = '';
                        request = '';
                        changeCity(search_city);
                        if (document.querySelector('.weather_forecast.weather_forecast_transition')){
                            getForecast(city);
                        }
                    })
                })
            }
        })
        .catch(err => {
            console.error(err);
        });
    }
    const getForecast = function(place) {
        fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${place}&days=3`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "37c9f6164fmsh2b54545d16a53e4p1efa2cjsnd69c794c5aed",
                "x-rapidapi-host": "weatherapi-com.p.rapidapi.com"
            }
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            const forecast = data.forecast.forecastday;
            const allFDays = document.querySelectorAll('.weather_forecast_day'); 
            for (let i = 0; i < allFDays.length; i++) {
                allFDays[i].innerHTML = `
                    <div class='weather_data_row'>
                        <span class='main_font'>${forecast[i].date}</span>
                    </div>
                    <div class='weather_data_row'>
                        <span class='main_font'>${forecast[i].day.condition.text}</span>
                    </div>
                    <div class='weather_data_row'>
                        <span class='temp' title='Average temperature C'><span class='main_font widget_pointer'>${forecast[i].day.avgtemp_c}°</span></span>
                        <img class='weather_img widget_pointer' title='${forecast[i].day.condition.text} 'src='http:${forecast[i].day.condition.icon}' alt='${forecast[i].day.condition.text}'>
                    </div>
                    <div class='weather_data_row'>
                        <span title='Average Humidity'><span class='humidity widget_pointer'>${forecast[i].day.avghumidity}%</span></span>
                    </div>
                    <div class='weather_data_row'>
                        <span class='forecast_condition_temp widget_pointer' title='Max temperature C'>max ${forecast[i].day.maxtemp_c}°</span>
                        <span class='forecast_condition_temp widget_pointer' title='Min temperature C'>min ${forecast[i].day.mintemp_c}°</span>
                    </div>
                    <div class='weather_data_row'>
                        <span class='windspeed widget_pointer' title='Max Wind Speed'>${forecast[i].day.maxwind_mph}mph</span>
                    </div>
                `;
            }
            
        })
        .catch(err => {
            console.error(err);
        });
    }
    const getGeolocation  = () => {
        const success = (pos) => {
            let result = `${pos.coords.latitude},${pos.coords.longitude}`;
            console.log(result);
            return result;
        }
        const fail = (err) => {
            alert (err.message);
        }
        navigator.geolocation.getCurrentPosition(success, fail);
    };
    
    document.querySelector('.weather_get_forecast').addEventListener('click', () => {
        document.querySelector('.weather_forecast').classList.toggle('weather_forecast_transition');
        let days = document.querySelectorAll('.weather_forecast_day');
        days.forEach(e => {
            e.classList.toggle('weather_forecast_day_transition')
        })
        getForecast(city);
    });
    
    let city = '',
        request = '',
        search_output = document.querySelector('.weather_search_output'),
        search_input = document.querySelector('.weather_search');
    let city = getGeolocation();
    /*if (geolocation = 'undefined') {
        city = 'Riga'
    } else {
        city = geolocation;
    }*/
    getWeather(city);
    autocompleteSearch();
}
weatherWidget();
