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
<<<<<<< HEAD

import UiMatrix from './components/UiMatrix'
import Calculate from './components/Calculate'
import ViewIncentiveTable from './components/ViewIncentiveTable'
import CreateIncentiveTable from './components/CreateIncentiveTable'
import UpdateIncentiveTable from './components/UpdateIncentiveTable'
=======
>>>>>>> 856196bc1a42d85e4aa485855109697a5f41c45e



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
<<<<<<< HEAD
      <Route path='/uimatrix' element={<UiMatrix />}></Route>
      <Route path='/calculate' element={<Calculate />}></Route>
      <Route path='/view' element={<ViewIncentiveTable />}></Route>
      <Route path='/create' element={<CreateIncentiveTable />}></Route>
      <Route path='/update/:id' element={<UpdateIncentiveTable />}></Route>
      

=======
>>>>>>> 856196bc1a42d85e4aa485855109697a5f41c45e

      
      <Route path='/sales' element={<SalesForm />}></Route>

      
    </Routes>
    <AppFooter/>
    
    </BrowserRouter>
  
  )
}

export default App
