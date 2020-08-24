import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => {
  return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
  )
}

const Statistics = ({ good, neutral, bad, ratings }) => {
  const total = () => (good + neutral + bad)
  const countAverage = () => {
    let average = ratings.reduce((acc,cur) => acc + cur, 0) / ratings.length
    return (average)
  }

  const countPositive = () => {
    let positives = 0
    ratings.forEach(val => {
      if (val === 1) {
        positives = positives + 1
      }
    })
    return (positives / total() * 100)    
  }

  if (!total()) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  else {
    return (
      <div>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={total()} />
            <StatisticLine text="average" value={countAverage()} />
            <StatisticLine text="positive" value={countPositive()} />
          </tbody>
        </table>
      </div>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [ratings, addRating] = useState([])
  
  const handleGoodClick = () => {
    setGood(good + 1)
    addRating(ratings.concat(1))
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    addRating(ratings.concat(0))
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    addRating(ratings.concat(-1))
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text="good" handleClick={handleGoodClick}/>
      <Button text="neutral" handleClick={handleNeutralClick} />
      <Button text="bad" handleClick={handleBadClick} />
      <Statistics good={good} neutral={neutral} bad={bad} ratings={ratings} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)