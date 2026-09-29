import ReacDOM from 'react-dom/client'
import './index.css'
import App from './App/App.jsx'
import {BrowserRouter} from 'react-router-dom'

ReacDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
