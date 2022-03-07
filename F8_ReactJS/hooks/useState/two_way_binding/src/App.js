import logo from './logo.svg';
import './App.css';
import {useState} from 'react'

const courses = [
  {
    id: 1,
    name: 'htm, css',
  },
  {
    id: 2,
    name: 'javascript',
  },
  {
    id: 3,
    name: 'reactJS',
  },
]

function App() {
  const [rChecked, setRChecked] = useState()
  const [cChecked, setCChecked] = useState([])

  const handlecCheck = id => {
    setCChecked(prev=>{
      const isChecked = cChecked.includes(id)
      if(isChecked){
        // trả về mảng mới với hàm filter
        //bao gồm các phần tử khác id truyền vào
        //tức là xóa id ra khỏi mảng
        return cChecked.filter(item => item !== id)
      }else{
        return [...prev, id]
      }
    })
  }

  const handleCheckbox = ()=>{
    console.log({ids: cChecked})
  }


  const handleRadio = ()=>{
    console.log({id: rChecked})
  }

  return (
    <div className="App">
      <div className='Radio'>

        {
          courses.map(course => {
            return (
              <div key={course.id}>
                <input 
                  type='radio'
                  checked={rChecked===course.id}
                  onChange={()=>setRChecked(course.id)}
                />
                <label>{course.name}</label>
              </div>
            )
          })
        }
        <button onClick={handleRadio}>Register</button>

      </div>
      <div className='Checkbox'>

        {
          courses.map(course => {
            return (
              <div key={course.id}>
                <input 
                  type='checkbox'
                  checked={cChecked.includes(course.id)}
                  onChange={()=>handlecCheck(course.id)}
                />
                <label>{course.name}</label>
              </div>
            )
          })
        }
        <button onClick={handleCheckbox}>Register</button>

      </div>
    </div>
  );
}

export default App;
