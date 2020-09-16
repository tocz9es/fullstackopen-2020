import React, { useState } from 'react'

import Country from './Country'

const Countries = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0])

  const handleSelectCountry = (country) => () => {
    setSelectedCountry(country)
  }

  if (selectedCountry) {
    return <Country country={selectedCountry} />
  }

  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (countries.length < 10 && countries.length !== 1) {
    return (
      <div>
        {countries.map((country) => (
          <div key={country.name}>
            <span>{country.name}</span>
            <button onClick={handleSelectCountry(country)}>Show</button>
          </div>
        ))}
      </div>
    )
  } else if (countries.length === 1) {
    return (
      <div>
        <Country country={countries[0]} />
      </div>
    )
  }
}

export default Countries