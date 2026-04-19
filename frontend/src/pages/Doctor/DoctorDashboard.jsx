import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

import { useNavigate } from 'react-router-dom'

const DoctorDashboard = () => {
  const navigate = useNavigate()
  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)

  const { slotDateFormat, currencySymbol } = useContext(AppContext)


  useEffect(() => {

    if (dToken) {
      getDashData()
    }

  }, [dToken])

  return dashData && (
    <div className='m-4 md:m-8'>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        
        {/* Earnings Card */}
        <div className='flex items-center gap-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 hover:scale-[1.02] transition-all group overflow-hidden relative'>
          <div className='absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-all duration-500'></div>
          <div className='bg-primary/10 p-4 rounded-2xl'>
            <img className='w-10 h-10' src={assets.earning_icon} alt="" />
          </div>
          <div>
            <p className='text-3xl font-black text-gray-900'>{currencySymbol} {dashData.earnings}</p>
            <p className='text-gray-400 font-bold text-xs uppercase tracking-widest'>Total Earnings</p>
          </div>
        </div>

        {/* Appointments Card */}
        <div className='flex items-center gap-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 hover:scale-[1.02] transition-all group overflow-hidden relative'>
          <div className='absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-all duration-500'></div>
          <div className='bg-purple-100 p-4 rounded-2xl'>
            <img className='w-10 h-10' src={assets.appointment_icon} alt="" />
          </div>
          <div>
            <p className='text-3xl font-black text-gray-900'>{dashData.appointments}</p>
            <p className='text-gray-400 font-bold text-xs uppercase tracking-widest'>Total Bookings</p>
          </div>
        </div>

        {/* Patients Card */}
        <div className='flex items-center gap-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 hover:scale-[1.02] transition-all group overflow-hidden relative'>
          <div className='absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-all duration-500'></div>
          <div className='bg-green-100 p-4 rounded-2xl'>
            <img className='w-10 h-10' src={assets.patients_icon} alt="" />
          </div>
          <div>
            <p className='text-3xl font-black text-gray-900'>{dashData.patients}</p>
            <p className='text-gray-400 font-bold text-xs uppercase tracking-widest'>Unique Patients</p>
          </div>
        </div>

      </div>

      <div className='bg-white rounded-3xl shadow-2xl shadow-gray-200/50 border border-gray-50 mt-10 overflow-hidden'>
        <div className='flex items-center justify-between px-8 py-6 border-b border-gray-50'>
          <div className='flex items-center gap-3'>
            <div className='w-2 h-6 bg-primary rounded-full'></div>
            <p className='text-xl font-bold text-gray-800'>Latest Bookings</p>
          </div>
          <button onClick={()=>navigate('/doctor-appointments')} className='text-primary font-bold text-sm hover:underline'>View All</button>
        </div>

        <div className=''>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div className='flex items-center px-8 py-5 gap-6 border-b border-gray-50 last:border-0 hover:bg-slate-50 transition-colors' key={index}>
              <div className='relative'>
                <img className='rounded-2xl w-14 h-14 object-cover border-2 border-white shadow-md' src={item.userData.image || assets.profile_pic} alt="" />
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${index % 2 === 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              </div>
              
              <div className='flex-1'>
                <p className='text-gray-900 font-bold text-lg'>{item.userData.name}</p>
                <div className='flex items-center gap-2 text-sm text-gray-500 mt-0.5'>
                    <span className='w-4 h-4'>📅</span>
                    {slotDateFormat(item.slotDate)}
                </div>
              </div>

              <div className='flex items-center gap-4'>
                {item.cancelled
                  ? <span className='px-4 py-1.5 bg-red-50 text-red-500 text-xs font-black uppercase rounded-full'>Rejected</span>
                  : <div className='flex items-center gap-3'>
                      <div onClick={() => navigate(`/doctor-chat/${item.user_id}`, { state: { patient: item.userData } })} 
                           className='p-3 bg-primary/10 text-primary rounded-xl cursor-pointer hover:bg-primary hover:text-white transition-all shadow-sm'
                           title="Fast Consultation">
                           <img src={assets.chats_icon} className='w-5 h-5 transition-all' style={item.is_completed ? {} : {filter: 'invert(37%) sepia(93%) saturate(1352%) hue-rotate(211deg) brightness(101%) contrast(105%)'}} alt="chat" />
                      </div>
                      
                      {item.is_completed
                        ? <span className='px-4 py-1.5 bg-green-50 text-green-600 text-xs font-black uppercase rounded-full'>Success</span>
                        : <div className='flex items-center gap-2'>
                          <button onClick={() => cancelAppointment(item._id)} className='p-2 hover:bg-red-50 rounded-xl transition-all' title='Reject'>
                             <img className='w-6' src={assets.cancel_icon} alt="" />
                          </button>
                          <button onClick={() => completeAppointment(item._id)} className='p-2 hover:bg-green-50 rounded-xl transition-all' title='Mark Complete'>
                             <img className='w-6' src={assets.tick_icon} alt="" />
                          </button>
                        </div>
                      }
                    </div>
                }
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default DoctorDashboard
