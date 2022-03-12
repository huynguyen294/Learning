import { SET_JOB, ADD_JOB, DELETE_JOB } from './actions';

export const initialState = {
  job: '',
  jobs: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_JOB:
      // sử dụng ES6 để bảo lưu dữ liệu cũ
      // và thay đổi job, vì job được gọi sau nên
      // sẽ đè lên job ở state cũ
      return {
        ...state,
        job: payload,
      };
    case ADD_JOB:
      return {
        ...state,
        jobs: [...state.jobs, payload],
      };
    case DELETE_JOB:
      const temp = [...state.jobs];
      temp.splice(payload, 1);
      return {
        ...state,
        jobs: temp,
      };
  }
};
