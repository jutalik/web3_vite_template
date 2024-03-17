import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './connect.ts'
import Caver from 'caver-js'
import axios from 'axios'
import {tokenAddr,tokenABI} from './assets/constants'

// const caver = new Caver('https://api.baobab.klaytn.net:8651/')
const PER = new caver.klay.Contract(tokenABI, tokenAddr);
const apiRoot = axios.create({
  baseURL: 'http://localhost:8080'
})
function App() {
  

  const [account, setAccount] = useState('')
  const [_caver, setCaver] = useState<Caver>()
  const connectKaikas = async () => {
    // connect.ts 참고
    if (window.klaytn) {
      try {
        const accounts = await window.klaytn.enable();
        setCaver(new Caver(window.klaytn))
        setAccount(accounts[0]);
        
      } catch (error) {
        console.log(error);
      }
    }
  }

  const sign = async () => {

  const caver = new Caver(window.klaytn)
  const data = PER.methods.transfer('0xaAFD419b0d608abE68E1485BbF857Fb9919FCDF9', '1000000000000000000').encodeABI();

  const {rawTransaction} = await caver.klay.signTransaction(
    {
      type: "FEE_DELEGATED_SMART_CONTRACT_EXECUTION",
      from: account,
      to: tokenAddr,
      data: data,
      gas: "0x4bfd200",
    }
  );
  
  console.log(rawTransaction);
  
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
        <button onClick={() => sign()}>
        sign
        </button>
        
        <p>
        connect is {account}
        </p>
      </div>
    </>
  )
}

export default App
