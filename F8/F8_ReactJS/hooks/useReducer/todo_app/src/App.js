import logo from './logo.svg';
import { useReducer, useRef } from 'react';
import './App.css';

// init state, bao gồm các state
const initState = {
  job: '',
  jobs: [],
};

const SET_JOB = 'set_job';
const ADD_JOB = 'add_job';
const DELETE_JOB = 'delete_job';

const setJob = (payload) => {
  return {
    type: SET_JOB,
    payload,
  };
};

const addJob = (payload) => {
  return {
    type: ADD_JOB,
    payload,
  };
};

const deleteJob = (payload) => {
  return {
    type: DELETE_JOB,
    payload,
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_JOB:
      // sử dụng ES6 để bảo lưu dữ liệu cũ
      // và thay đổi job, vì job được gọi sau nên
      // sẽ đè lên job ở state cũ
      return {
        ...state,
        job: action.payload,
      };
    case ADD_JOB:
      return {
        ...state,
        jobs: [...state.jobs, action.payload],
      };
    case DELETE_JOB:
      const temp = [...state.jobs];
      temp.splice(action.payload, 1);
      return {
        ...state,
        jobs: temp,
      };
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initState);
  const { job, jobs } = state;
  const inputRef = useRef();

  const handleSumit = (idx) => {
    dispatch(addJob(job));
    dispatch(setJob(''));
    inputRef.current.focus();
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
          <li>Không có công việc nào</li>
        )}
      </ul>
    </div>
  );
}

export default App;
