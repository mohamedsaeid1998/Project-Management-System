import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App.tsx'
import AuthContextProvider from './Context/AuthContext.tsx'
import ToastContextProvider from './Context/ToastContext.tsx'
import './Styles/global.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ToastContextProvider>
      <AuthContextProvider>
      <ToastContainer />
        <App />
      </AuthContextProvider>
    </ToastContextProvider>

)
