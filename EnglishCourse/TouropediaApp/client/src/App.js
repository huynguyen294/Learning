/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, Login, Register } from "./pages";
import { authActions } from "./redux/features";

import "./App.css";

function App() {
  const { setUser } = authActions;
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    dispatch(setUser(user));
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="bottom-right" />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
