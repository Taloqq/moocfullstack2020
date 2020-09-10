import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css'

// Vähän laiskasti tehty

const Filter = ({ filter, handleFilter }) => { 
  return (
    <div> Find countries 
      <input 
      value={filter}
      onChange={handleFilter}/>
    </div>
  )
}
const List = ({ list, apikey, weather, setWeather}) => {
  console.log(list.length)
  if (list.length === 0) {
    return ("No countries found")
  }

  if (list.length === 1) {
    return (
      <Details apikey={apikey} country={list[0]} weather={weather} setWeather={setWeather}/>
    )
  }
  if (list.length > 10) {
    return ("Too many matches, specify another filter")
  }
    return (
      list.map(x =>
        <li key={x.alpha2Code}>{x.name}</li>)
    )
}

const Details = ({ country, apikey, weather, setWeather }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(i => 
          <li key={i.iso639_1}>{i.name}</li>)}
      </ul>
      <img className="img" src={country.flag} alt="finnish flag"/>
      <Weather apikey={apikey} place={country.capital} weather={weather} setWeather={setWeather}/>
    </div>
  )
}

const Weather = ({ place, apikey, weather, setWeather }) => {
  useEffect(() => {
    setWeather('')
    axios.get('http://api.weatherstack.com/current?access_key='+apikey+'&query='+place)
    .then(response => {
      console.log("sää saatu")
      setWeather(response.data.current)
    })
  }, [place, setWeather, apikey])
  console.log(weather)

  if (weather) {
    return (
      <div>
        <h2>Weather in {place}</h2> 
        <p>Temperature: {weather.temperature} Celsius </p>
        <img src={weather.weather_icons[0]} alt="kuva" />
        <p>Wind: {weather.wind_speed} mph direction {weather.win_dir}</p>
      </div>
    )
  }
  else {
    return(
      <div>Loading weather..</div>
    )
  }
}

const App = (props) => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [weather, setWeather] = useState()

  const toShow = !filter ? countries
  : countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  const api_key = process.env.REACT_APP_API_KEY
  const hook = () => {
    console.log("effect")
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  useEffect(hook, [])

  return (
    <div>
      <Filter filter={filter} handleFilter={handleFilter}/>
      <ul>
        <List apikey={api_key} list={toShow} weather={weather} setWeather={setWeather} />
      </ul>
    </div>
  )
}

export default App