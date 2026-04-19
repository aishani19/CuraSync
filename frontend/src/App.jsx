import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointment from './pages/MyAppointment'
import Appointment from './Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Chat from './pages/Chat'
import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import DoctorAppointments from './pages/Doctor/DoctorAppointments'
import DoctorProfile from './pages/Doctor/DoctorProfile'
import DoctorChat from './pages/Doctor/DoctorChat'
import BloodBank from './pages/BloodBank'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='w-full'>
      <ToastContainer />
      <Navbar />
      <main>
          <Routes>
            <Route path='/' element={<Home />} />
            
            {/* Standard Pages with Padding */}
            <Route path='/doctors' element={<div className='mx-4 sm:mx-[10%] pt-20'><Doctors /></div>} />
            <Route path='/doctors/:speciality' element={<div className='mx-4 sm:mx-[10%] pt-20'><Doctors /></div>} />
            <Route path='/blood-bank' element={<BloodBank />} />
            <Route path='/login' element={<div className='mx-4 sm:mx-[10%] pt-20'><Login /></div>} />
            <Route path='/about' element={<div className='mx-4 sm:mx-[10%] pt-20'><About /></div>} />
            <Route path='/contact' element={<div className='mx-4 sm:mx-[10%] pt-20'><Contact /></div>} />
            <Route path='/my-profile' element={<div className='mx-4 sm:mx-[10%] pt-20'><MyProfile /></div>} />
            <Route path='/my-appointments' element={<div className='mx-4 sm:mx-[10%] pt-20'><MyAppointment /></div>} />
            <Route path='/appointment/:docId' element={<div className='mx-4 sm:mx-[10%] pt-20'><Appointment /></div>} />
            <Route path='/chat/:docId' element={<div className='mx-4 sm:mx-[10%] pt-20'><Chat /></div>} />

            {/* Doctor Routes with Padding */}
            <Route path='/doctor-dashboard' element={<div className='mx-4 sm:mx-[10%] pt-20'><DoctorDashboard /></div>} />
            <Route path='/doctor-appointments' element={<div className='mx-4 sm:mx-[10%] pt-20'><DoctorAppointments /></div>} />
            <Route path='/doctor-profile' element={<div className='mx-4 sm:mx-[10%] pt-20'><DoctorProfile /></div>} />
            <Route path='/doctor-chat/:userId' element={<div className='mx-4 sm:mx-[10%] pt-20'><DoctorChat /></div>} />
          </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
