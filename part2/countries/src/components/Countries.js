const Countries = ({ filteredCountries, setFilteredCountries }) => {
  if (filteredCountries.length <= 1) {
    return null
  }

  if (filteredCountries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  return (
    <div>
      {filteredCountries.map((country) => (
        <div key={country.name.common}>
          {country.name.common}
          <button onClick={() => setFilteredCountries([country])} >Show</button>
        </div>
      ))}
    </div>
  )
}

export default Countries