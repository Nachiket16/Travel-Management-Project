import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar'
import Signin from './pages/signin'
import Searchbus from './pages/searchbus'
import SearchResults from './pages/searchResults'
import Home from './pages/home'
import Signup from './pages/signup'
import SelectSeats from './pages/selectSeats'
import AddAllPassengers from './pages/addAllPassengers'
import Payment from './pages/payment'
import MyBookings from './pages/myBookings'
import MyProfile from './pages/myProfile'
import UpdateMyProfile from './pages/updateMyProfile'

import Admin from './pages/admin/admin'
import AddBus from './pages/admin/addBus'
import AddJourney from './pages/admin/addJourney'
import ViewJourney from './pages/admin/viewJourney'
import ViewBus from './pages/admin/viewBus'
import ViewPayment from './pages/admin/viewPayment'
import EditBus from './pages/admin/editBus'
import EditJourney from './pages/admin/editJourney'

// this toastr container will be used to show the toast messages
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/signin' element={<Signin />} />
        <Route path='/searchbus' element={<Searchbus />} />
        <Route path='/searchResults' element={<SearchResults />} />
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/selectSeats' element={<SelectSeats />} />
        <Route path='/addAllPassengers' element={<AddAllPassengers />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/myBookings' element={<MyBookings />} />
        <Route path='/myProfile' element={<MyProfile />} />
        <Route path='/updateMyProfile' element={<UpdateMyProfile />} />

        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/addBus' element={<AddBus />} />
        <Route path='/admin/addJourney' element={<AddJourney />} />
        <Route path='/admin/viewJourney' element={<ViewJourney />} />
        <Route path='/admin/editJourney' element={<EditJourney />} />
        <Route path='/admin/viewBus' element={<ViewBus />} />
        <Route path='/admin/editBus' element={<EditBus />} />
        <Route path='/admin/viewPayment' element={<ViewPayment />} />
      </Routes>
      {/* this container is used to show toast messages */}
      <ToastContainer position='top-center' autoClose={1000} />
    </BrowserRouter>
  )
}

export default App
