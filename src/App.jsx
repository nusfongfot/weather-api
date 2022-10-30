import { useState } from 'react'
import key from './key'
import './App.css';

const api = {
  key: key.API_KEY,
  base: key.BASE_URL
}

function App() {
  const dataBuild = (d) => {
    let date = String(new Date())
    date = date.slice(3, 15)
    return date
  }

  const [search, setSearch] = useState('')
  const [weather, setWeather] = useState({})
  const searchval = (e) => {
    if(e.key === "Enter"){
      fetch(`${api.base}weather?q=${search}&units=metric&appid=${api.key}`)
      .then((res) => res.json())
      .then((results) => {
        setSearch('')
        setWeather(results)
      })
    }
  }
  return (
    <div className={
      typeof weather.main !== "undefined" ? weather.main.temp > 30 ? "App hot" : "App cold" : "App"     
    }>    
       <main>
        <div className="search__container">
          <input type="text" placeholder="Search...Weather" className='search__bar' 
          onChange={(e) => setSearch(e.target.value)}
          value={search} 
          onKeyDown={searchval}
          />
        </div>
        {typeof weather.main != "undefined" ? (      
        <div className="location__container">
          <div className="localtion">
             {weather.name}, {weather.sys.country}
          </div>
          <div className="date">{dataBuild(new Date())}</div>
          <div className="weather__container">
            <div className="temperature">
              {Math.round(weather.main.temp)}°C
            </div>
            <div className="weather">{weather.weather[0].main}</div>
         </div>
        </div>
           ): ("")}
       </main>
    </div>
  );
}

export default App;
