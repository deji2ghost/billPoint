import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './page/Home'
import Header from './component/Header'
import LoginForm from './page/LoginForm'

function App() {
  // const optionsDropdown = (id: string) => {
  //   setOptions(options === id ? null : id);
  // };

  return (
    <div>
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/logIn' element={<LoginForm />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
