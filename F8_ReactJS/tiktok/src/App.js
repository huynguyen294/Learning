import {useState} from 'react'

function App() {

  const [counter, setCounter] = useState(1)

  const handleIncrease = () => {
    setCounter(counter + 1)
  }

  return (
    <div className="App">
      <h1 style={{padding: '20px'}}>{counter}</h1>
      <button onClick={handleIncrease}></button>
    </div>
  );
}

export default App;
