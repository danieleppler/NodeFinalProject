import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {Routes,Route,BrowserRouter} from 'react-router-dom'
import {persistor,store} from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import App from './App'



ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <PersistGate persistor={persistor}>
    <BrowserRouter>
    <App />
    <React.StrictMode>
    </React.StrictMode>
    </BrowserRouter>  
    </PersistGate>
  </Provider>
    
  
)
