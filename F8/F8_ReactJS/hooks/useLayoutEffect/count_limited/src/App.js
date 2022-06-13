import logo from './logo.svg';
import {useState, useEffect, useLayoutEffect} from 'react'
import './App.css';

function App() {

  const [count, setCount] = useState(0)

  const handleCount = ()=>{
    setInterval(()=>{
      setCount(count+1)
    })
  }

  /* //chạy useEffect để thấy lỗi UI
  useEffect(()=>{
    if(count>3)
      setCount(0)
  }, [count]) */

  // useLayoutEffect chỉ khác useEffect là khi xử lí xong callback và cleanup
  // một cách đồng bộ thì mới render lại UI
  useLayoutEffect(()=>{
    if(count>3)
      setCount(0)
  }, [count])

  return (
    <div className="App">
      <h1>{count}</h1>
      <button
        onClick={()=>handleCount}
      >Count</button>
    </div>
  );
}

export default App;
