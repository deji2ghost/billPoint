import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import store from './Redux/store.ts'
import { Provider } from 'react-redux'
import Header from './component/Header.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <Header />
    <App />
    </Provider>
  </StrictMode>,
)
