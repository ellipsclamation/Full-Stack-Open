const Search = ({ filter, handleFilter }) => {
  return (
    <div>
      find countries
      <input name='countries' value={filter} onChange={handleFilter} />
    </div>
  )
}

export default Search