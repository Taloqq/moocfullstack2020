import React from 'react'
import personService from '../services/persons'

const PersonForm = ({ errorStyle, setErrorStyle, setErrorMessage, persons, setPersons, newName, setNewName, newNumber, setNewNumber, handleNameChange, handleNumberChange }) => {
  
  const addNumber = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(e => e.name.toLowerCase() === newName.toLowerCase())){
      const person = persons.find(p => p.name === personObject.name)
      showAlert(person, personObject.number)
    }
    else {
      personService
        .create(personObject)
          .then(person => {
            setPersons(persons.concat(person))
          })
      setErrorStyle({color: 'green'})  
      setErrorMessage(
        `Added ${personObject.name}`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
    setNewName('')
    setNewNumber('')
  }
  const showAlert = (person, newNumber) => {
    const id = person.id
    if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
      console.log("OK!")
      const changedPerson = {...person, number: newNumber }
      personService
        .update(id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        })
        .catch(error => {
          setErrorStyle({color: 'red'})     
          setErrorMessage(
            `Info of ${person.name} has already been removed for the server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })
    }
  }

  return (
  <form onSubmit={addNumber}>
    <div> name: <input 
        value={newName}
        onChange={handleNameChange}/>
    </div>
    <div> number: <input 
        value={newNumber}
        onChange={handleNumberChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

export default PersonForm