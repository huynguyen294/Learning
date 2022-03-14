import { SET_TASK, ADD_TASK } from './constants';

const initState = {
  tasks: [],
  task: '',
};

function reducer(state, { type, payload }) {
  switch (type) {
    case SET_TASK:
      return {
        ...state,
        task: payload,
      };
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, payload],
      };
    default:
      throw console.error('Invalid actions');
  }
}

export { initState };
export default reducer;
