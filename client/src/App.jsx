import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Registration from './components/Registration'
import { BrowserRouter , Routes,Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar'
import AppFooter from './components/AppFooter'
import Sidemenu from './components/Sidemenu'
import SalesForm from './components/SalesForm'
import HolidayPackage from './components/HolidayPackage'
import AdminPanel from './components/EmailNotification'
import HolidayPackageList from './components/HolidayPackageList'



function App() {
  

  return (
    <BrowserRouter>
    <Navbar />
    <Sidemenu />
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/register' element={<Registration />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/dashboard' element={<Dashboard />}></Route>
      <Route path='/holiday-package' element={<HolidayPackage />}></Route>
      <Route path='/packages' element={<HolidayPackageList />}></Route>
      <Route path='/send-mail' element={<AdminPanel />}></Route>

      
      <Route path='/sales' element={<SalesForm />}></Route>

      
    </Routes>
    <AppFooter/>
    
    </BrowserRouter>
  
  )
}

export default App
