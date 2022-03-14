import './App.css';

import { useStore, actions } from './store';

function App() {
  const { setTask, addTask } = actions;
  const [state, dispatch] = useStore();
  const { tasks, task } = state;

  return (
    <div className="App">
      <input
        type="text"
        value={task}
        placeholder="Enter input"
        onChange={(e) => dispatch(setTask(e.target.value))}
      />
      <button
        onClick={() => {
          dispatch(addTask(task));
        }}
      >
        add task
      </button>
      <ul>
        {tasks.map((task, idx) => (
          <li key={idx}>{task}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
