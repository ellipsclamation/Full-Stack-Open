import { useState, useEffect } from 'react'
import axios from 'axios'

import Search from './components/Search'
import Countries from './components/Countries'
import Country from './components/Country'

const App = () => {
  const URL = 'https://studies.cs.helsinki.fi/restcountries/api/all'

  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState(null)
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        setCountries(response.data)
      })
  }, [])

  if (!countries) {
    return null
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
    setFilteredCountries(countries.filter((country) =>
      country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
    )
  }

  return (
    <div>
      <Search filter={filter} handleFilter={handleFilter} />
      <Countries filteredCountries={filteredCountries} setFilteredCountries={setFilteredCountries} />
      <Country filteredCountries={filteredCountries} />
    </div>
  )
}

export default App