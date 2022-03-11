import logo from './logo.svg';
import {useState, useMemo, useRef} from 'react'
import './App.css';

function App() {

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [products, setProducts] = useState([])
  const nameRef = useRef()

  const handleAdd = () => {
    setProducts([...products, {
      name: name,
      price: parseInt(price),
    }])

    setName('')
    setPrice('')
    nameRef.current.focus()
  }

  /* // chạy đoạn mã này để thấy vấn đề gặp phải
  //reduce sẽ chạy lại mỗi lần set name do input onchange
  // sử dụng reduce để tính toán total giá
  const total = products.reduce((result, product) => {
    console.log('tính toán lại...')
    return result + product.price
  }, 0) */

  const total = useMemo(()=>{

    const result = products.reduce((result, product) => {
      console.log('tính toán lại...')
      return result + product.price
    }, 0)

    return result
  }, [products])

  return (
    <div className="App">
      <input type="text" 
        ref={nameRef}
        placeholder='Enter name'
        style={{padding: '0.7em 1.5em', margin: 10}}
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />
      <input type="text" 
        placeholder='Enter name'
        style={{padding: '0.7em 1.5em', margin: 10}}
        value={price}
        onChange={(e)=>setPrice(e.target.value)}
      />
      <button
        style={{padding: '0.7em 1.5em', margin: 10}}
        onClick={()=>handleAdd()}
      >Add</button>
      <p>total: {total ? (<span>${total}</span>) : 0}</p>
      <ul>
        {
          products.map((product, idx) => 
            //sử dụng React.frament để chứa 2 phần tử
            //cấu trúc jsx của React.frament
            <div key={idx}>
              <p>product {idx+1}:</p>
              <li>name: {product.name}</li>
              <li>price: {product.price}</li>
            </div>
          )
        }
      </ul>
    </div>
  );
}

export default App;
