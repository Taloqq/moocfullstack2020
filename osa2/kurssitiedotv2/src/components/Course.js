import React from 'react';

const Header = () => {
  return (
    <h1>Web shit</h1>
  )
}

const Content = ({ course }) => {
  return (
    <div>
      <h3>{course.name}</h3>
      {course.parts.map(part =>
        <Part key={part.id} parts={part} />
      )}
      {<Total course={course} />}
    </div>
  ) 
}

const Part = ({ parts }) => {
  return (
    <p>{parts.name} {parts.exercises}</p>
    )
}

const Total = ({ course }) => {
  // Maps each parts exercises' value into an array, and sums them up with reduce
  let sum = course.parts.map(part => part.exercises).reduce(
    (cur, acc) => cur + acc , 0
  )
  return(
    <b>Total of {sum} exercises</b>
  ) 
}
 
const Course = ({ course }) => {
  return (
  <div>
    <Header />
    {console.log(course)}
    {course.map(kurssi => <Content key={kurssi.id} course={kurssi} />)}
  </div>
  )
}

export default Course