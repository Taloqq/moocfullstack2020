import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(new Uint8Array(6))
  const [mostVoted, setMostVoted] = useState(0)

  const changeAnecdote = () => {
    var randomNumber = Math.floor((Math.random() * 6))
    setSelected(randomNumber)
  }

  const addVote = () => {
    let y = Array.from(votes)
    y[selected] += 1
    setVote(y)
    let max = Math.max(...y)
    setMostVoted(y.indexOf(max))
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <div>Has {votes[selected]} votes</div>
      <div>
        <Button text="Next anecdote" handleClick={changeAnecdote}/>
        <Button text="Vote" handleClick={addVote}/>
      </div>
      <h1>Anecdote with the most votes</h1>
      {props.anecdotes[mostVoted]}
      <div>has {Math.max(...votes)} votes </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)