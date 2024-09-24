import { useState } from 'react'
import './App.css'
import InvoiceModal from './component/InvoiceModal'
import InvoicePage from './page/InvoicePage'
import SideNav from './component/SideNav'

function App() {
  const [ clicked, setClicked ] = useState(false)
  console.log('clicked data:', clicked)

  return (
    <div className='bg-slate-50 text-white flex items-start justify-normal min-h-screen'>
      <div className='w-[20%] h-screen bg-blue-800 pl-4'>
        <SideNav />
      </div>
      <div className='w-full pr-4'>
        <button className='border-none outline-none bg-gray-300 p-2 mx-auto flex text-gray-700' onClick={() => setClicked(!clicked)} type='submit'>Click me for invoice</button>
        <InvoicePage />
      </div>

      {clicked ? <InvoiceModal clicked={clicked} setClicked={setClicked} /> : null}
    </div>
  )
}

export default App
