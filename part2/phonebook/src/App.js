import { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Entries from './components/Phonebook'


const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    phonebookService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const updateEntry = (newName, newNumber) => {
    const person = persons.find(p => p.name === newName)

    const changedPerson = { ...person, number: newNumber }

    phonebookService
      .update(person.id, changedPerson)
      .then(response => {
        setPersons(persons.map(p => p.id !== person.id ? p : response.data))
      })
      .catch(error => {
        alert(
          `the person '${person.name}' was already deleted from server`
        )
        setPersons(persons.filter(p => p.name !== newName))
      })
  }

  const addEntry = (event) => {
    event.preventDefault()

    if (persons.find(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        updateEntry(newName, newNumber)
      }
    }
    else {
      // TODO: input validation?
      const personObject = {
        name: newName,
        number: newNumber
      }

      phonebookService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const deleteEntry = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      phonebookService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>New Entry</h2>
      <PersonForm
        addEntry={addEntry}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Entries persons={persons} filter={filter} deleteEntry={deleteEntry} />
    </div>
  )
}

export default App