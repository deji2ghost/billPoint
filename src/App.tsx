import { useState } from 'react'
import './App.css'
import InvoiceModal from './component/InvoiceModal'
import InvoicePage from './page/InvoicePage'
import SideNav from './component/SideNav'
import CustomModal from './component/ui/CustomModal'

function App() {
  const [ clicked, setClicked ] = useState(false)
  const [options, setOptions] = useState<string | null>(null);
  console.log('clicked data:', clicked)
  // const optionsDropdown = (id: string) => {
  //   setOptions(options === id ? null : id);
  // };

  return (
    <div className='bg-slate-50 text-white flex items-start justify-normal min-h-screen overflow-hidden'>
      <div onClick={()=> setOptions(null)} className='w-[20%] h-screen bg-indigo-900 pl-4'>
        <SideNav />
      </div>
      <div className='w-full pr-4 mt-2'>
        <button className='border-none outline-none bg-transparent p-2 text-indigo-900 w-[18%] ml-[920px] font-bold' onClick={() => { setOptions(null); setClicked(!clicked)}} type='submit'>+ Click me for invoice</button>
        <InvoicePage options={options} setOptions={setOptions}/>
      </div>

      {clicked ? <InvoiceModal clicked={clicked} setClicked={setClicked} /> : null}
    </div>
  )
}

export default App
