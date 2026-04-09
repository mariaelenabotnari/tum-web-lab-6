import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // Ensure .jsx is here if it's named App.jsx
import './style.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)