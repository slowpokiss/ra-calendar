import React from 'react'
import ReactDOM from 'react-dom/client'
import Calendar from './Calendar.jsx'

//const now = new Date(2024, 1, 2);
//const now = new Date(2024, 2, 2);
const now = new Date();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Calendar date={now}/>
  </React.StrictMode>,
)
