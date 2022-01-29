// http://api.openweathermap.org/data/2.5/weather?q=Oulu
// &appid=dc837293c5c4eaad32db39615a3cc0f9
// lat=${lat}&lon=${lon}
// unit=imperial optional parameter

'use strict';

let lat;
let lon;
let city = document.querySelector('.name');
let icon = document.querySelector('.icon');
let descrip = document.querySelector('.description');
let feel = document.querySelector('.feels_like');
let humid = document.querySelector('.humidity');
let press = document.querySelector('.pressure');
let ctemp = document.querySelector('.temp');
let tmax = document.querySelector('.temp_max');
let tmin = document.querySelector('.temp_min');
let wgust = document.querySelector('.gust');
//  sudden increase in wind speed
let wspeed = document.querySelector('.speed');


window.addEventListener("load", () => {
  if (navigator.geolocation) {

    // function success(position) {
    //   alert(position);
    //   lat = position.coords.latitude;
    //   lon = position.coords.longitude;
    // }
    // function error(err) {
    //   console.warn(`ERROR(${err.code}: ${err.message})`)
    // }
    // navigator.geolocation.getCurrentPosition((success, error, options)

    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      lat = position.coords.latitude;
      lon = position.coords.longitude;

      alert("Here's the latitude and longitude: " + lat + " " + lon);
      console.log(`Lat: ${lat}`); //65.0596574
      console.log(`Lon: ${lon}`); //25.6003254
      console.log(`More or less ${position.coords.accuracy} meters.`)
      // 9

      const api = 'dc837293c5c4eaad32db39615a3cc0f9';
      const base =
      // `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid={dc837293c5c4eaad32db39615a3cc0f9}`;
      // $ delimiters in url .json for metadata, not fields
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}` +
      `&appid=dc837293c5c4eaad32db39615a3cc0f9`;
      // backtick of interpolated template liberals for multi-line strs
      // ${ curly brackets } for escaping
      // drop the {} around the appid
      fetch(base)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          alert("Here finally comes the weather data.")
          city.textContent = 'Your location is ' + data.name;
          let cicon = data.weather[0].icon;
          icon.innerHTML =
          `<img src = 'http://openweathermap.org/img/wn/${cicon}@2x.png' style = 'height = 1rem'/>`;
          descrip.textContent = 'Your sky is ' + data.weather[0].description;
          feel.textContent = 'It feels like ' + Math.floor((data.main.feels_like-273.15)*1.8+32) + '°F';
          humid.textContent = 'Humidity is ' + data.main.humidity + '%';
          press.textContent = 'Air pressure is ' + data.main.pressure + 'hPa/mbar' + ' Sea level 1atm = 1,013.25hPa/mbar = 14.696psi';
          // 1 hPa(hectopascal) = 1 kg/(m*s^2) = 1 j/m^3
          ctemp.textContent = 'Current temperature is ' + Math.floor((data.main.temp-273.15)*1.8+32) + '°F';
          // kelvin to fahrenheit
          tmax.textContent = 'Max temp is ' + data.main.temp_max + '°K' + ' F = (K-273.15)*1.8+32';
          tmin.textContent = 'Min temp is ' + data.main.temp_min + '°K';
          wgust.textContent = 'Wind gust is ' + data.wind.gust + 'm/s';
          wspeed.textContent = 'Wind speed is ' + data.wind.speed + 'm/s';
        });
    });
  }
});
