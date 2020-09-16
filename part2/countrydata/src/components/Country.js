import React from 'react'

import Weather from './Weather'

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <div>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
      </div>
      <h2>Languages</h2>
      <div>
        {country.languages.map((language) => (
          <p key={language.iso639_2}>{language.name}</p>
        ))}
      </div>
      <h2>Flag</h2>
      <img src={country.flag} alt="" style={{ width: `20%` }} />
      <Weather country={country} />
    </div>
  )
}

export default Country