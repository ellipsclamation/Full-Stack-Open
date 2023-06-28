import { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Entries from './components/Phonebook'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  useEffect(() => {
    phonebookService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const updateMessage = (message, messageType) => {
    setMessage(message)
    setMessageType(messageType)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const updateEntry = (newName, newNumber) => {
    const person = persons.find(p => p.name === newName)

    const changedPerson = { ...person, number: newNumber }

    phonebookService
      .update(person.id, changedPerson)
      .then(response => {
        updateMessage(
          `Updated ${person.name} with new number`,
          'message'
        )
        setPersons(persons.map(p => p.id !== person.id ? p : response.data))
      })
      .catch(error => {
        console.log(error)
        updateMessage(
          `the person '${person.name}' was already deleted from server`,
          'error'
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
          updateMessage(
            `Added ${newName}`,
            'message'
          )
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
          updateMessage(
            `Removed ${name}`,
            'message'
          )
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          console.log(error)
          updateMessage(
            `the person '${name}' was already deleted from server`,
            'error'
          )
          setPersons(persons.filter(p => p.name !== name))
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
      <Notification message={message} messageType={messageType} />
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