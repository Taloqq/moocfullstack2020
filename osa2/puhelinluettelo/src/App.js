import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import Filter from './components/Filter'
import personService from './services/persons'
import './index.css'

const Notification = ({ message, errorStyle }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error" style={errorStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ errorMessage, setErrorMessage] = useState(null)
  const [ errorStyle, setErrorStyle ] = useState()

  useEffect(() => {
    personService
      .getAll()
        .then(initialData => {
        setPersons(initialData)
        })
  }, [])

  const toShow = !filter ? persons
  : persons.filter(person => person.name.toLowerCase().includes(filter))
  
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
      <Notification message={errorMessage} errorStyle={errorStyle} />
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>Add a new contact</h2>
      <PersonForm errorStyle={errorStyle} setErrorStyle={setErrorStyle} errorMessage={errorMessage} setErrorMessage={setErrorMessage} persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <ul>
      {toShow.map(person => 
        <Person key={person.id} person={person} persons={persons} setPersons={setPersons}/>
      )
      }
      </ul>
    </div>
  )

}

export default App