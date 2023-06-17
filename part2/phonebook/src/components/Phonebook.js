const Entry = ({ name, number, filter }) => {
  if (name.toLowerCase().includes(filter.toLowerCase())) {
    return (
      <p>{name} {number}</p>
    )
  }
}

const Entries = ({ persons, filter }) => {
  return (
    <div>
      {persons.map(person => <Entry key={person.name} name={person.name} number={person.number} filter={filter} />)}
    </div>
  )
}

export default Entries