import { SET_TASK, ADD_TASK } from './constants';

export const setTask = (payload) => ({
  type: SET_TASK,
  payload,
});

export const addTask = (payload) => ({
  type: ADD_TASK,
  payload,
});
