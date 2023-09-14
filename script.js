document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '29b3f20eaddb52ec12932ed1794cfe40';
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
    const searchInput = document.querySelector('input[type="text"]');
    const searchButton = document.querySelector('button');
    const weatherIcon = document.querySelector('.weather-icon');
    const weatherContainer = document.querySelector('.weather');

    //hides the weather until city is searched
    weatherContainer.style.display = "none";
    
    // Event listener for the search button
    searchButton.addEventListener('click', () => {
      const cityName = searchInput.value;
      
      //  API request
      fetch(`${apiUrl}?q=${cityName}&appid=${apiKey}&units=imperial`) 
        .then(response => {
          if (!response.ok) {
            throw new Error('PROBLEM');
          }
          return response.json();
        })
        .then(data => {

        // Rounds out the temperature to a whole number
        const temperature = Math.floor(data.main.temp);
        const windSpeed = Math.floor(data.wind.speed);
        const humidity = Math.floor(data.main.humidity);

 
        document.getElementById('temp').textContent = `${temperature}°F`;
        document.getElementById('city').textContent = data.name;
        document.getElementById('humidity').textContent = `${data.main.humidity}%`;
        document.getElementById('wind').textContent = `${windSpeed} mph`;
          
          // Weather Icon if statements changing the icon depending on the weather in the searched city
          if(data.weather[0].main === "Clouds") {
            weatherIcon.src = "images/clouds.png";
          } else if (data.weather[0].main === "Clear"){
            weatherIcon.src = "images/clear.png";
          }else if (data.weather[0].main === "Rain"){
            weatherIcon.src = "images/rain.png";
          } else if (data.weather[0].main === "Drizzle"){
            weatherIcon.src = "images/drizzle.png";
          }else if (data.weather[0].main === "Mist"){
            weatherIcon.src = "images/mist.png";
          } else if(data.weather[0].main === "Snow"){
            weatherIcon.src = "images/snow.png";
          } 

          // shows the weather once the city is searched
          weatherContainer.style.display = 'block';
        })
        .catch(error => {
          console.error('PROBLEM', error);
        });
    });
  });
  