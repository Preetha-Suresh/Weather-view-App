import './App.css'
import cloudy from './assets/cloudy.png'
import axios from 'axios'
import clear from './assets/sunny.png'
import rain from './assets/rain.png'
import snow from './assets/snow.png'
import thunderstorm from './assets/thunderstorm.png' 
import windspeed from './assets/windspeed.png'
import humidity from './assets/humidity.png'
import { useEffect, useState } from 'react'

function App() {

  const [city,setCity]=useState("Chennai")
  const [weather,setWeather]=useState(null)
  const [icon,setIcon]=useState(cloudy)
  const [error,setError]=useState("")

  const apikey="4ace959097db63b5254adcc12a561e74"

  useEffect(()=>{
    fetchWeather(city)
  },[])

  function getWeatherIcon(main){
    switch(main){
      case "Clouds": return cloudy
      case "Clear": return clear
      case "Rain": return rain
      case "Snow": return snow
      case "Thunderstorm": return thunderstorm
      default: return clear
    }
  }

  function fetchWeather(cityName){
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}&units=metric`)
      .then((res) => {
        const data = res.data
        setWeather(data)
        setIcon(getWeatherIcon(data.weather[0].main))
        setError("")
      })
      .catch(() => {
        setWeather(null)
        setError("City not found")
      })
  }

  function handleSearch(event){
    event.preventDefault()
    let input=event.target.city.value.trim()
    if(!input){
      alert("Enter a Valid City !")
      return
    }
    setCity(input)
    fetchWeather(input)
    event.target.reset()
  }

  return (
    <div className="container m-5" style={{fontFamily: "sans-serif"}}>
      <div className="mx-auto rounded border p-4" style={{width: "350px", background: "linear-gradient(to bottom,rgb(13, 45, 105),rgb(41, 69, 173),rgb(87, 122, 197))"}}>
        <form className="d-flex" role="search" onSubmit={handleSearch} style={{margin: "20px"}}>
          <input name="city" className="form-control me-2" type="search" placeholder="Search"/>
          <button className="btn" type="submit" style={{ backgroundColor: "white" }}>
            <i className="bi bi-search" />
          </button>
        </form>

        {error && <p style={{ color: "white", textAlign: "center" }}>{error}</p>}

        {weather && (
          <>
            <div className="d-flex justify-content-center">
              <img src={icon} alt="cloudy"/>
            </div>
            <h3 style={{color: "rgb(255, 255, 255)", textAlign: "center"}}>{Math.round(weather.main.temp)}°C</h3>
            <h2 style={{color: "rgb(255, 220, 62)", textAlign: "center"}}>{weather.name.toUpperCase()}</h2>

            <br />
            <br />

            <div className="d-flex justify-content-between px-3" style={{color: "rgb(255, 255, 255)"}}>
              <div className="d-flex align-items-center">
                <img src={humidity} alt="humidity" style={{width: "30px", marginRight: "10px"}}/>
                <h5 className="mb-0">{weather.main.humidity} %</h5>
              </div>

              <div className="d-flex align-items-center">
                <img src={windspeed} alt="windspeed" style={{width: "30px", marginRight: "10px"}}/>
                <h5 className="mb-0">{weather.wind.speed} KM/H</h5>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App
