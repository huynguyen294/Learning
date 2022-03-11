import logo from './logo.svg';
import {useState, useEffect} from 'react'
import Content from './Content';
import './App.css';

function App() {
  
  const [content, setContent] = useState(false)

  return (
    <div className="App">
      <button
        onClick={()=>setContent(!content)}
      >Toggle</button>
      {content && <Content></Content>}
    </div>
  );
}

export default App;
