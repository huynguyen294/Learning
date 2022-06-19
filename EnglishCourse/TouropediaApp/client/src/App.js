import './App.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home, Login, Register, CheckLogin } from './pages';
import { useSelector } from 'react-redux';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer />
        <CheckLogin />
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
