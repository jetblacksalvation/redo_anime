import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
const create3DWindow = () =>{

  ReactDOM.createRoot(document.getRootNode().getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}
// createRoot();
export {create3DWindow}