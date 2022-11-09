import { configureStore } from "@reduxjs/toolkit";
import { authReducer, tourReducer } from "./features";

const store = configureStore({
  reducer: {
    auth: authReducer,
    tour: tourReducer,
  },
});

export default store;
