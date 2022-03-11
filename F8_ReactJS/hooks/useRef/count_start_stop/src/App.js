import logo from './logo.svg';
import {useState, useEffect, useRef} from 'react'
import Content from './Content';
import './App.css';

function App() {
  
  const [count, setCount] = useState(60)
  let timerId

  const handleStart = ()=>{
    timerId = setInterval(()=>{
      setCount(prev=>prev-1)
    }, 1000)
  }

  const handleStop = ()=>{
    clearInterval(timerId)
  }
  
  return (
    <div className="App">
      <h1>{count}</h1>
      <button
        onClick={()=>handleStart}
      >start</button>
      <button
        onClick={()=>handleStop}
      >stop</button>
    </div>
  );
}

export default App;
