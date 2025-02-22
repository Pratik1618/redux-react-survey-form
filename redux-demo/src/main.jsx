import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {store} from './stores/store.js'
import { Provider } from 'react-redux'; // Make sure this is correct
import { BrowserRouter } from 'react-router-dom'
createRoot(document.getElementById('root')).render(
  <Provider store={store}>

  
  <StrictMode>
    <App />
  </StrictMode>,

  </Provider>
)
