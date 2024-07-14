let searchForm = document.getElementById('search-form');
let cityInput = document.getElementById('city-input');
let citySpan = document.getElementById('city');
let countrySpan = document.getElementById('country');
let dateSpan = document.getElementById('date');
let temperatureSpan = document.getElementById('temperature');
const apiKey = "7e3f21edee540e6110af347b55eb1ab2";

// Function to fetch weather data based on city name
function fetchWeather(cityName) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data); // For debugging purposes

      citySpan.textContent = data.name;
      countrySpan.textContent = data.sys.country;
      dateSpan.textContent = new Date().toLocaleDateString();
      temperatureSpan.textContent = Math.round(data.main.temp);

      // Update additional weather elements (assuming they exist in your HTML)
      let weatherDescription = document.getElementById("weather-description");
      if (weatherDescription) {
        weatherDescription.textContent = data.weather[0].description;
      }
      let weatherIcon = document.getElementById("weather-icon");
      if (weatherIcon) {
        weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      }
      let minTemp = document.getElementById("min-temp");
      if (minTemp) {
        minTemp.textContent = Math.round(data.main.temp_min);
      }
      let maxTemp = document.getElementById("max-temp");
      if (maxTemp) {
        maxTemp.textContent = Math.round(data.main.temp_max);
      }
    })
    .catch(error => {
      console.error(error);
      alert("Error: City not found!");
    });
}

// Event listener for search (uncomment if using search button)
cityInput.addEventListener("keypress", (event) => {
  if (event.code === "Enter" || event.keyCode === 13) {
    event.preventDefault();
    let cityName = cityInput.value.trim();
    if (cityName) {
      fetchWeather(cityName);
    }
  }
});

// Call fetchWeather on page load (assuming no search button)
// Consider adding a search button listener or allowing user modification before fetch
// window.addEventListener("load", () => {
//   let cityName = cityInput.value.trim();
//   if (cityName) {
//     fetchWeather(cityName);
//   }
// });
