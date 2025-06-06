
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Signup from './pages/Signup'
import VerifyOTP from './pages/verifyOTP'
import Login from './pages/Login'
import ResetEmail from './pages/ResetEmail'
import Home from './pages/Home'
  import { ToastContainer} from 'react-toastify';

function App() {
  

  return (
    <div>      
      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/verify-otp' element={<VerifyOTP/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/forgot-password' element={<ResetEmail/>} />
      
      </Routes>
      <ToastContainer/>
    </div>
  )
}

export default App
