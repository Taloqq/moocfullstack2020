import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  console.log(props)
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.osa.name} {props.osa.tasks}</p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part osa={props.part[0]} />
      <Part osa={props.part[1]} />
      <Part osa={props.part[2]} />
    </div>
  )
}

const Total = (props) => {
  return (
    <p>
      Number of exercises {props.osat[0].exercises + props.osat[1].exercises + props.osat[2].exercises}
    </p>
  )
}

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [      
      {  
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        name: "Using props to pass data",
        exercises: 7
      },
      {
        name: "State of a component",
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content part={course.parts} />
      <Total osat={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))