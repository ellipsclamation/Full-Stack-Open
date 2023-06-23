const Entry = ({ name, number, filter, deleteEntry }) => {
  if (name.toLowerCase().includes(filter.toLowerCase())) {
    return (
      <div>
        {name} {number}
        <button onClick={deleteEntry}>delete</button>
      </div>
    )
  }
}

const Entries = ({ persons, filter, deleteEntry }) => {
  return (
    <div>
      {persons.map(person => <Entry
        key={person.id}
        name={person.name}
        number={person.number}
        filter={filter}
        deleteEntry={() => deleteEntry(person.id, person.name)}
      />)}
    </div>
  )
}

export default Entries