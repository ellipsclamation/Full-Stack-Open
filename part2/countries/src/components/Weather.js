import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ city }) => {
  const OPENWEATHER_API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY
  const [weather, setWeather] = useState()

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPENWEATHER_API_KEY}`)
      .then((response) => {
        setWeather(response.data)
      })
      .catch((error) => {
        console.log('No capital found')
        console.log(error)
      })
  }, [])

  if (weather) {
    return (
      <div>
        <h2>Weather in {city}</h2>
        <p>temperature {weather.main.temp}°C</p>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
        <div>Wind {weather.wind.speed} m/s</div>
      </div>
    )
  }
}

export default Weather