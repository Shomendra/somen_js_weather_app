//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key} , a23a01281ce315dae63d147fafe3ae99



const weatherApi = {
  key: "a23a01281ce315dae63d147fafe3ae99",
  baseUrl:"https://api.openweathermap.org/data/2.5/weather" 
}

const searchInputBox = document.getElementById('input-box');

//anonymous function call or Event listner function on keypress
searchInputBox.addEventListener('keypress', (event)=> {
  if(event.keyCode == 13){
    console.log(searchInputBox.value);
    getWeatherReport(searchInputBox.value);
  }
});

// get weather report
function getWeatherReport(city){
  fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
  .then(weather => {
    return weather.json();   
  }).then(showWeatherReport);
}

//Show weather report 
function showWeatherReport(weather){
  console.log(weather);

  let city = document.getElementById('city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let temperature = document.getElementById('temp');
   temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`; 

  let minMaxTemp = document.getElementById('min-max');
  minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;

  let weatherType =document.getElementById('weather');
  weatherType.innerHTML = `${weather.weather[0].main}`;
   
  let date = document.getElementById('date');
  let todayDate = new Date();
  date.innerText = dateManage(todayDate);

  if(weatherType.textContent == 'Clear'){
    document.body.style.backgroundImage = "url('image/clear.jpg')";
  } else if(weatherType.textContent == 'Clouds') {

    document.body.style.backgroundImage = "url('image/cloudy.jpg')";
    
} else if(weatherType.textContent == 'Haze') {

  document.body.style.backgroundImage = "url('image/cloudy.jpg')";
  
}   else if(weatherType.textContent == 'Rain') {
        
  document.body.style.backgroundImage = "url('image/rainy.jpg')";
  
}else if(weatherType.textContent == 'Snow') {
        
  document.body.style.backgroundImage = "url('image/snow.jpg')";

} else if(weatherType.textContent == 'Thunderstorm') {
    
  document.body.style.backgroundImage = "url('image/lightning.jpg')";
  
} 

}

// Date Manage
function dateManage(dateArg){
   
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let months = ["January", "Febrary", "March", "April", "May", "June" , "July" , "August", "September", "October" , "November", "December"]

  let year = dateArg.getFullYear();
  let month = months[dateArg.getMonth()];
  let date = dateArg.getDate();
  let day = days[dateArg.getDay()];

  return `${date} ${month} (${day}), ${year}`;

} 


