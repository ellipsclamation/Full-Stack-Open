import Weather from './Weather'

const Country = ({ filteredCountries }) => {
  if (filteredCountries.length === 1) {
    const country = filteredCountries[0]
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital: {country.capital}</p>
        <p>area: {country.area}</p>
        <h3>languages:</h3>
        <ul>
          {Object.keys(country.languages).map((language) =>
            <li key={country.languages[language]}>{country.languages[language]}</li>
          )}
        </ul>
        <img src={country.flags.png} />
        <Weather city={country.capital} />
      </div>
    )
  }
}

export default Country