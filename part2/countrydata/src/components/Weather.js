import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY
  const [countryWeather, setCountryWeather] = useState(null)

  const fetchCountryWeather = () => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${country.name}`)
      .then(res => setCountryWeather(res.data))
  }

  useEffect(fetchCountryWeather, [])

  if (!countryWeather) {
    return (
      <div>
        <h2>Weather in {country.capital}</h2>
        Loading...
      </div>
    )
  }

  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <div>
        <p>Temperature: {countryWeather.current.temperature} ºC</p>
        <p>
          <img src={countryWeather.current.weather_icons} alt="" />
        </p>
        <p>
          Wind: {countryWeather.current.wind_speed} mph, Direction:{' '}
          {countryWeather.current.wind_dir}
        </p>
      </div>
    </div>
  )
}

export default Weather