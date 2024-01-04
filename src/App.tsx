import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './connect.ts'



function App() {
  

  const [account, setAccount] = useState('')

  const connectKaikas = async () => {
    // connect.ts 참고
    if (window.klaytn) {
      try {
        const accounts = await window.klaytn.enable();
        setAccount(accounts[0]);
      } catch (error) {
        console.log(error);
      }
    }
  }


  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => connectKaikas()}>
          connect Kaikas
        
        </button>
        
        <p>
        connect is {account}
        </p>
      </div>
    </>
  )
}

export default App
