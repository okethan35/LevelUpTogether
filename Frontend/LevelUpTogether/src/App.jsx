import { useState } from 'react'
import appLogo from './assets/LevelUp_Together.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='scrolling'>
      <div className='logo'>
        <img src={appLogo} alt="Level Up Together Logo" />
      </div>
        <h1 className='title'>Welcome! </h1>
      <div className="card">
        <label>
          First Name: 
          <br />
          <input name="userFName" type="text"/>
        </label>
        <br />
        <label>
          Last Name:
          <br/>
          <input name="userFName" type="text"/>
        </label>
        <br />
        <br />
        <button>
          Submit
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </div>
  )
}


export default App
