import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

//bài toán nhấn nút và lấy một phân thưởng bất kì

const gifts = [
  'CPU i9',
  'RAM 32GB RGB',
  'KEYBOARD RGB',
  '100k',
  '500k',
  '1000k',
];

function App() {
  // initSate để trống là undifine
  const [gift, setGift] = useState();

  const randomGift = () => {
    const idx = Math.floor(Math.random() * gifts.length);
    setGift(gifts[idx]);
  };

  return (
    <div className="App">
      <h1>{gift || 'Chưa có phần thưởng'}</h1>
      <button onClick={randomGift}>Lấy thưởng</button>
    </div>
  );
}

export default App;
