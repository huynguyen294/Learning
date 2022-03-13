import logo from './logo.svg';
import { useReducer, useRef, useState } from 'react';
import reducer, { initialState } from './reducer/reducer';
import { setJob, addJob, deleteJob } from './reducer/actions';
import logger from './logger';
import './App.css';

function App() {
  const [state, dispatch] = useReducer(logger(reducer), initialState);
  const [message, setMessage] = useState('Không có công việc nào');
  const { job, jobs } = state;
  const inputRef = useRef();

  const handleSumit = () => {
    if (job !== '') {
      dispatch(addJob(job));
      dispatch(setJob(''));
      inputRef.current.focus();
    } else {
      setMessage('chưa nhập việc');
    }
  };

  return (
    <div className="App">
      <div className="add-form">
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter job"
          value={job}
          onChange={(e) => dispatch(setJob(e.target.value))}
        />
        <button onClick={() => handleSumit()}>Add</button>
      </div>
      <ul className="list-job">
        {jobs.length > 0 ? (
          jobs.map((job, idx) => (
            <li key={idx}>
              <span>{job}</span>
              <i
                className="fa fa-times"
                onClick={() => dispatch(deleteJob(idx))}
              ></i>
            </li>
          ))
        ) : (
          <li>{message}</li>
        )}
      </ul>
    </div>
  );
}

export default App;
