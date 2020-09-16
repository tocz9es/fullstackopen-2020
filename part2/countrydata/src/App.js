import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterName, setFilterName] = useState('')

  const handleFilterChange = (e) => {
    setFilterName(e.target.value)
  }

  const filterCountries = filterName
    ? countries.filter(
        (country) =>
          country.name
            .toLocaleLowerCase()
            .indexOf(filterName.toLocaleLowerCase()) !== -1
      )
    : countries

    console.log(filterCountries)

  const fetchCountries = () => {
    axios.get('https://restcountries.eu/rest/v2/all').then((res) => {
      setCountries(res.data)
    })
  }

  useEffect(fetchCountries, [])

  return (
    <div>
      <div>
        find countries
        <input value={filterName} onChange={handleFilterChange} />
      </div>
      <Countries countries={filterCountries} />
    </div>
  )
}

export default App