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
import HolidayPackageList from './components/HolidayPackageList'
import EmployeeNotificationForm from './components/EmailNotification'

import UiMatrix from './components/UiMatrix'
import Calculate from './components/Calculate'
import ViewIncentiveTable from './components/ViewIncentiveTable'
import CreateIncentiveTable from './components/CreateIncentiveTable'
import UpdateIncentiveTable from './components/UpdateIncentiveTable'



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
      <Route path='/send-mail' element={<EmployeeNotificationForm />}></Route>
      <Route path='/uimatrix' element={<UiMatrix />}></Route>
      <Route path='/calculate' element={<Calculate />}></Route>
      <Route path='/view' element={<ViewIncentiveTable />}></Route>
      <Route path='/create' element={<CreateIncentiveTable />}></Route>
      <Route path='/update/:id' element={<UpdateIncentiveTable />}></Route>
      


      
      <Route path='/sales' element={<SalesForm />}></Route>

      
    </Routes>
    <AppFooter/>
    
    </BrowserRouter>
  
  )
}

export default App
