import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import 'react-tooltip/dist/react-tooltip.css'
import './components/header.scss'
import './components/search.scss'
import './components/CRMTable.scss'
import './components/CRMHeading.scss'
import './components/CRMElement.scss'
import './components/AddButton.scss'
import './components/Modal.scss'
import './components/AddForm.scss'
import './components/ChangeForm.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
