const PersonForm = ({
  addEntry,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange
}) => {

  return (
    <form onSubmit={addEntry}>
      <div>name: <input name='name' value={newName} onChange={handleNameChange} /></div>
      <div>number: <input name='number' value={newNumber} onChange={handleNumberChange} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

export default PersonForm