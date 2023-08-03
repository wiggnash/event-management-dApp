import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { EventProvider } from './context/EventContext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <EventProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </EventProvider>
)
