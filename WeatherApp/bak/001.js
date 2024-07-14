
let searchForm = document.getElementById('search-form');
let cityInput = document.getElementById('city-input');
let citySpan = document.getElementById('city');
let countrySpan = document.getElementById('country');
let dateSpan = document.getElementById('date');
let temperatureSpan = document.getElementById('temperature');
const apiKey = "7e3f21edee540e6110af347b55eb1ab2";


let city = document.getElementById("city");
let country = document.getElementById("country");
let date = document.getElementById("date");
let temperature = document.getElementById("temperature");
let weatherDescription = document.getElementById("weather-description");
let weatherIcon = document.getElementById("weather-icon");
let minTemp = document.getElementById("min-temp");
let maxTemp = document.getElementById("max-temp");

// Function to fetch weather data based on city name
function fetchWeather(cityName) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data); // For debugging purposes

      city.textContent = data.name;
      country.textContent = data.sys.country;
      date.textContent = new Date().toLocaleDateString();
      temperature.textContent = Math.round(data.main.temp);
      weatherDescription.textContent = data.weather[0].description;
      weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      minTemp.textContent = Math.round(data.main.temp_min);
      maxTemp.textContent = Math.round(data.main.temp_max);
    })
    .catch(error => {
      console.error(error);
      alert("Error: City not found!");
    });
}

// Event listener for search (uncomment if using search button)
cityInput.addEventListener("keypress", (event) => {
    if (event.code === "Enter" || event.keyCode === 13) { // keyCode for Enter is 13
      event.preventDefault();
      let cityName = cityInput.value.trim();
      if (cityName) {
        fetchWeather(cityName);
      }
    }
  });
  
// Call fetchWeather on page load (assuming no search button)
window.addEventListener("load", () => {
  let cityName = cityInput.value.trim(); // Assuming initial city is pre-filled
  if (cityName) {
    fetchWeather(cityName);
  }
});
