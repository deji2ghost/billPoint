import { useState } from 'react'
import './App.css'
import InvoiceModal from './component/InvoiceModal'

function App() {
  const [ clicked, setClicked ] = useState(false)
  console.log('clicked data:', clicked)

  return (
    <div className='bg-slate-50 h-screen text-white'>
      <button className='border-none outline-none bg-gray-300 p-2 mx-auto flex text-gray-700' onClick={() => setClicked(!clicked)} type='submit'>Click me for invoice</button>

      {clicked ? <InvoiceModal clicked={clicked} setClicked={setClicked} /> : null}
    </div>
  )
}

export default App
