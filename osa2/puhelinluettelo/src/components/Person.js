import React from 'react'
import personService from '../services/persons'

const Person = ({ person, persons, setPersons }) => {

  const deletThis = id => {
    if (window.confirm("are u sure ?")) {
      console.log(`deleting person id ${id}`)
      personService
        .delet(id)
        .then(setPersons(persons.filter(person => person.id !== id)))
    }

  }

  return (
    <li>{person.name} {person.number}
     <button type="button" onClick={() => deletThis(person.id)}>delete</button></li>
  )
}

export default Person