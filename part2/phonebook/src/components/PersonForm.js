const PersonForm = ({
  persons,
  setPersons,
  newName,
  setNewName,
  handleNameChange,
  newNumber,
  setNewNumber,
  handleNumberChange
}) => {
  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }

    else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(personObject))
    }

    setNewName('')
    setNewNumber('')
  }

  return (
    <form onSubmit={addPerson}>
      <div>name: <input value={newName} onChange={handleNameChange} /></div>
      <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

export default PersonForm