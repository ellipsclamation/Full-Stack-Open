import { useState } from 'react'

const Anecdote = ({ anecdote, votes }) => {
  return (
    <div>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  // creates an array of 0s with the same length as anecdotes to represent the amount of votes each anecdote receives
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState({ points: 0, index: 0 })

  const randomSelection = () => {
    const updatedSelection = Math.floor(Math.random() * anecdotes.length)
    setSelected(updatedSelection)
  }

  const updateVote = () => {
    const updatedPoints = [...points]
    updatedPoints[selected] += 1

    // tracks the anecdotes with most votes as the vote button is clicked
    if (updatedPoints[selected] > mostVoted.points) {
      setMostVoted({ points: updatedPoints[selected], index: selected })
    }

    setPoints(updatedPoints)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={points[selected]} />
      <button onClick={updateVote}>vote</button>
      <button onClick={randomSelection}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      <Anecdote anecdote={anecdotes[mostVoted.index]} votes={points[mostVoted.index]} />
    </div>
  )
}

export default App