let icon = document.querySelector('.current .weather_icon');
let city = document.querySelector('.location .city');
let date = document.querySelector('.location .date');
let temp = document.querySelector('.current .temp');
let weather_el = document.querySelector('.current .weather');
let hilow = document.querySelector('.hi-low');

//POSITION GEOLOCATION

const weather = {};

weather.temperature = {
    unit : 'celsius'
}

const KEL = 273;

const api = {
    key: "2ba2a2a18971bec8eea3b0cb21ac9452",
    base: "https://api.openweathermap.org/data/2.5/"
} 

if('geolocation' in navigator){
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  out.style.display = 'block';
  out.innerHTML = '<P>Broswer doesn\'t Support Geolocation</p>';
}

function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getWeather(latitude, longitude);
}

function showError(error) {
  out.style.display = 'block';
  out.innerHTML = `<p> ${error.message} </p>`;
}

function getWeather(latitude, longitude) {
  let api2 = `${api.base}weather?lat=${latitude}&lon=${longitude}&appid=${api.key}`;
    
  fetch(api2)
    .then(function(response){
        let data = response.json();
        return data;
    })
    .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp - KEL);
        weather.description = data.weather[0].description;
        weather.city = data.name;
        weather.country = data.sys.country;
        weather.temperature.min = Math.floor(data.main.temp_min - KEL);
        weather.temperature.max = Math.floor(data.main.temp_max - KEL);
    })
    .then(function() {
        displayWeather();
    });
}


function displayWeather() {
    temp.innerHTML = `${weather.temperature.value}° <span>C</span>`;
    weather_el.innerHTML = weather.description;
    city.innerHTML = `${weather.city}, ${weather.country}`;
    hilow.innerHTML = `${weather.temperature.min}°c  ${weather.temperature.max}°c`;
  
    date.innerText = dateBuilder(now);
    
}



let now = new Date();
function dateBuilder (d) {
    let months = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "August", "Settembre", "Ottobre", "Novembre", "Dicembre"];
    let days = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }


  //SEARCH BOX

  const searchbox = document.querySelector('.search-box');
  searchbox.addEventListener('keypress', setQuery);
  
  function setQuery(evt){
    if (evt.keyCode == 13) {
      getResults(searchbox.value);
    }
  }
  
  function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(weather => {
        return weather.json();
      }) .then(displayResults);
  }
  
  
  function displayResults (weather) {
    city.innerText = `${weather.name}, ${weather.sys.country}`;
  
    let now = new Date();
    date.innerText = dateBuilder(now);
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
    weather_el.innerText = weather.weather[0].main;
    hilow.innerText = `${Math.round(weather.main.temp_min)}°C  ${Math.round(weather.main.temp_max)}°C`;
  }
  

