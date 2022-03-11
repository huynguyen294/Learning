import logo from './logo.svg';
import {useState, useEffect, useRef} from 'react'
import './App.css';

function App() {
  
  const [count, setCount] = useState(60)

  const timerId = useRef()
  const prevCount = useRef()

  useEffect(()=>{
    prevCount.current = count
  }, [count])

  const handleStart = () =>{
    console.log('start')
    timerId.current = setInterval(()=>{
      setCount(prev=>prev-1)
    }, 1000)
  }

  const handleStop = ()=>{
    console.log(timerId.current, 'stops')
    clearInterval(timerId.current)
  }

  console.log(count, prevCount)
  
  return (
    <div className="App">
      <h1>{count}</h1>
      <button
        onClick={()=>handleStart()}
      >start</button>
      <button
        onClick={()=>handleStop()}
      >stop</button>
    </div>
  );
}

export default App;
