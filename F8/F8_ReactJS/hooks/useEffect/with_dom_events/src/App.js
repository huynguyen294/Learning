import logo from './logo.svg';
import './App.css';
import {useState} from 'react'
import Content from './Content'

function App() {

  const [mounted, setMounted] = useState(false)

  return (
    <div className="App">
      <button
        onClick={() => setMounted(!mounted)}
      >
      Toggle</button>
      {mounted && <Content></Content>}
    </div>
  );
}

export default App;
