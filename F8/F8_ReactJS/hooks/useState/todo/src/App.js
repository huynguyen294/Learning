import logo from './logo.svg';
import {useState} from 'react'

function App() {

  const [tasks, setTasks] = useState(['Huy'])
  const [task, setTask] = useState('')
  const input = document.querySelector('input')

  function handleSubmit(){
    setTasks(prev => [...prev, task])
    setTask('')
    input.value = ''
    input.blur()
  }

  return (
    <div className="App" style={{padding: 32}}>
      <input 
        onChange={e=> setTask(e.target.value)}
      />
      <button onClick={()=>handleSubmit()}>Add</button>

      <ul>
        {
          tasks.map((task, idx) => (
              <li key={idx}>{task}</li>
            ))
        }
        
      </ul>
    </div>
  );
}

export default App;
