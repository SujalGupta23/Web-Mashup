document.getElementById("fetchData").addEventListener("click", async () => {
  const location = document.getElementById("location").value;
  const timezone = document.getElementById("timezone").value;

  // Display the results in the 'result' section of the HTML
  const result = document.getElementById("result");
  // result.innerHTML = "Fetching data..."; // Show a loading message

  async function fetchWeatherAPI(location) {
    try {
      // Replace 'YOUR_WEATHER_API_URL' with the actual URL of the weather API

      console.log(location);
      // Replace 'YOUR_WEATHER_API_KEY' with your API key (if required)
      const apiKey = "626161e43e40faff0d6f1d0f16e0f16b";
      const weatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
      const response = await axios.get(weatherAPIURL);

      console.log("weather", response.data);
      return response.data; // Assuming the API returns JSON data
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error;
    }
  }
  try {
    // Handle weather API request
    const weatherData = await fetchWeatherAPI(location);
    // Display weather information
    console.log("displaying weather");
    displayWeatherInfo(weatherData);

    // Use latitude and longitude from weatherData to fetch location and timezone
    const latitude = weatherData.coord.lat;
    const longitude = weatherData.coord.lon;
    const locationInfo = await fetchLocationAndTimezone(latitude, longitude);
    displayLocationAndTimezone(locationInfo);
  } catch (error) {
    // result.innerHTML = "Error fetching data. Please try again later.";
    console.error(error);
  }
});


// Function to fetch location and timezone
async function fetchLocationAndTimezone(latitude, longitude) {
  try {
    // Replace 'YOUR_LOCATION_API_URL' with the actual URL of the location and timezone API
    const locationAPIURL = `https://api.api-ninjas.com/v1/worldtime?lat=${latitude}&lon=${longitude}`;
    // const locationAPIURL = `https://api.api-ninjas.com/v1/worldtime?lat=19.0144&lon=72.8479`;
    // Replace 'YOUR_LOCATION_API_KEY' with your API key (if required)
    const apiKey = "hx7zMGXiEkiV8NSkpjyUhA==ltfXeWvNRG82ihps";

    console.log("lat long", latitude, longitude);
    const response = await axios.get(locationAPIURL, {
      headers: {
        "X-Api-Key": `${apiKey}`,
      },
    });

    return response.data; // Assuming the API returns JSON data
  } catch (error) {
    console.error("Error fetching location and timezone data:", error);
    throw error;
  }
}

/// Function to display weather information
function displayWeatherInfo(weatherData) {
 
  let weatherDescription = document.getElementById("weatherDescription");
  let temp = document.getElementById("temperature");
  let latitutde = document.getElementById("lat");
  let longitude = document.getElementById("long");
  console.log("Weather Data:", weatherData); // Log the weather data to the console
  console.log("weather: ", weatherDescription, temp);
  if (weatherData && weatherData.weather && weatherData.main) {
    weatherDescription.innerHTML = `Weather: ${weatherData.weather[0].description}`;
    temp.innerHTML = `Temperature: ${Math.floor(
      weatherData.main.temp - 273.15
    )}&deg;C`;
    latitutde.innerHTML = `Latitude : ${weatherData.coord.lat}`;
    longitude.innerHTML = `Longitude : ${weatherData.coord.lon}`;
  } else {
    weatherDescription.textContent = "Weather data not available.";
    temperature.textContent = "";
  }
}

// Function to display location and timezone information
function displayLocationAndTimezone(locationInfo) {
  const timezone = document.getElementById("timezone");

  console.log("location", locationInfo);

  timezone.textContent = `Timezone: ${locationInfo.timezone}`;
}
