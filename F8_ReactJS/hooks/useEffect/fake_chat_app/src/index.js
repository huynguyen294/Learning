import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//tạo ra custom eventListener (các events mặc định như: click, change...)
//emit có nghĩa là phát đi
function emitComment(channel){
  //những việc làm trong hàm này
  //2 giây phát ra một custom events
  setInterval(()=>{
    window.dispatchEvent(
      new CustomEvent(`lesson-${channel}`, {
      //giá trị trả ra của events (ev.detail)
      detail: `Nội dung comment của kênh: lesson-${channel}`
      })
    )
  }, 2000)
}

// khởi tạo 3 kênh
// mỗi 2 giây sẽ tạo ra 3 ev là lesson-${channel}
emitComment(1)
emitComment(2)
emitComment(3)


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
