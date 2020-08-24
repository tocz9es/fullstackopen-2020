import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistics = ({ statistics }) => {
  const { good, neutral, bad } = statistics
  const count = Object.values(statistics).reduce((a, b) => a + b)

  if (count) {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <Statistic text="good" value={good}></Statistic>
            <Statistic text="neutral" value={neutral}></Statistic>
            <Statistic text="bad" value={bad}></Statistic>
            <Statistic text="all" value={count}></Statistic>
            <Statistic text="average" value={(good - bad) / count}></Statistic>
            <Statistic text="positive" value={(good / count) * 100 + '%'}></Statistic>
          </tbody>
        </table>
      </div>
    )
  } else {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
}

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const statistics = {
    good: good,
    neutral: neutral,
    bad: bad
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={() => setGood(good + 1)}></Button>
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)}></Button>
      <Button text="bad" handleClick={() => setBad(bad + 1)}></Button>

      <Statistics statistics={statistics}></Statistics>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
