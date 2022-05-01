import React, { useState } from "react";
const api = {
  key: "YOUR API KEY",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = evt => {
      if(evt.key === "Enter") {
        fetch(`${api.base}weather?q=${query}&units=metric&cnt=10&APPID=${api.key}`)
          .then(res => res.json())
          .then(result => {
            setWeather(result);
            setQuery('');
            console.log(result)
          })
      }
    }
    const dateBuilder = d => {
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      return `${day} ${date} ${month} ${year}`;
    }
  return (
    <div className="App">
      <main>
        <div className="search-box">
          <input
          type="text"
          className="search-bar"
          placeholder="Search..." 
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div className="div_block">
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}
                <div className="degrees">°</div>
              </div>
              <div className="feels_like">{'feels like: ' + Math.round(weather.main.feels_like)}</div>
            </div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
            </div>
              <div className="date">{dateBuilder(new Date())}</div>
            <div>{weather.weather[0].descr}</div>
          </div>
        ) : ('')}
        
      </main>
    </div>
  );
}
export default App;
