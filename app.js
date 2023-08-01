// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=;
const Header = document.querySelector("#header");
const LocationSearchInput = document.querySelector("#LocationSearch");
const LoadDataBtn = document.querySelector("#LoadDataBtn");
const WeatherCardContainer = document.querySelector("#WeatherCardContainer");
const WeatherCard = document.querySelector("#WeatherCard");
const Box = document.querySelector(".Box");
const ErrorShow = document.querySelector("#ErrorShow");


document.addEventListener('scroll', (e) => {
    if (window.scrollY > 0) {
        Header.style.background = "#001220";
    } else {
        Header.style.background = "#00122085";
    }
})


// When we reload the page the focus on goes on the Search Box
document.addEventListener("DOMContentLoaded", (e) => {
    LocationSearchInput.focus();
})

//Render The Load Data
function RenderData(LocatinName) {
    let Promise = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${LocatinName}&appid=7f0117dcd127d932b96f488a1931eea9`);
    Promise.then((response) => {
        return response.json();
    }).then((data) => {
        if (data.cod == 404) {
             WeatherCardContainer.innerHTML = "";
             ErrorShow.style.display = "flex";
             LocationSearchInput.value = "";
             LocationSearchInput.focus();
             ErrorShow.innerText = `${data.message}`;
             LocationSearchInput.focus();
             setTimeout(HideErrorMessage, 2000);
            return;
        }
        Box.style.display = "none";
        WeatherCardContainer.innerHTML = "";
        let Icon = data.weather[0].icon;
        let IconUrl = `http://openweathermap.org/img/w/${Icon}.png`;
        let TEMP = data.main.temp - 273.15;
        let WeatherInfo = `<div id="WeatherCard">
    <h3 id="LocationName">${data.name}</h3>
   <div class="WeatherIconBox">
    <img src="${IconUrl}" alt="Weather-Icon" id="WeatherIcon" />
    <span id="Weatherdescription">${data.weather[0].description}</span>
   </div>
    <p class="WeatherInfo">
      <i class="fa-solid fa-temperature-high icon"></i>Temperature:
      <span id="Temp">${TEMP.toFixed(2) + " ℃"}</span>
    </p>

    
    <p class="WeatherInfo">
        <i class="fa-solid fa-wind icon"></i></i>wind Speed:
      <span id="Wind">${data.wind.speed + " m/s"}</span>
    </p>

    <p class="WeatherInfo">
        <i class="fa-solid fa-temperature-three-quarters icon"></i>Humidity:
      <span id="Humidity">${data.main.humidity + " %"}</span>
    </p>
  </div>`;
  
        WeatherCardContainer.insertAdjacentHTML("beforeend", WeatherInfo);
        LocationSearchInput.value = "";
        LocationSearchInput.focus();
    })
}

//AutoMatic Hiding  Message
function HideErrorMessage() {
    ErrorShow.style.display = "none";
    ErrorShow.innerText = "";
}

//Checking the validation 
function ValidationChecking() {
    let Location = LocationSearchInput.value;
    let MatchStr = /^[A-Za-z]+$/;
    if (Location === "") {
        ErrorShow.style.display = "flex";
        ErrorShow.innerText = "Enter  Your City Name";
        LocationSearchInput.focus();
        setTimeout(HideErrorMessage, 1000);
    } else if (Location.match(MatchStr)) {
        RenderData(Location);
    } else {
        ErrorShow.style.display = "flex";
        ErrorShow.innerText = "City Name Can't be a Number";
        LocationSearchInput.focus();
        LocationSearchInput.value = "";
        setTimeout(HideErrorMessage, 1000);
    }
}



LocationSearchInput.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
        ValidationChecking();
    }
})

LoadDataBtn.addEventListener('click', ValidationChecking)
