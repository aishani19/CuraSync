import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from './context/AppContext'
import { assets } from './assets/assets'
import RelatedDoctors from './components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {
  const { docId } = useParams()
  const navigate = useNavigate()
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = async () => {
    const doc = doctors.find((doc) => String(doc._id || doc.id) === String(docId))
    if (doc) {
      setDocInfo({ ...doc, slots_booked: doc.slots_booked || {} })
    }
  }

  const getAvailableSlots = () => {
    if (!docInfo) return
    setDocSlots([])

    const today = new Date()

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      const endTime = new Date(currentDate)
      endTime.setHours(21, 0, 0, 0)

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      const timeSlots = []

      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })

        const day = currentDate.getDate()
        const month = currentDate.getMonth() + 1
        const year = currentDate.getFullYear()
        const slotDate = `${day}_${month}_${year}`
        const slotTime = formattedTime

        const isSlotAvailable =
          !docInfo?.slots_booked?.[slotDate] ||
          !docInfo.slots_booked[slotDate].includes(slotTime)

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          })
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlots((prev) => [...prev, timeSlots])
    }
  }

  const bookAppointment = async () => {

    if (!token) {
      toast.warning('Login to book appointment')
      return navigate('/login')
    }

    const date = docSlots[slotIndex][0].datetime
  
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    const slotDate = day + "_" + month + "_" + year

    try {

      const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  }

  useEffect(() => {
    if (doctors.length > 0) {
      fetchDocInfo()
    }
  }, [doctors, docId])

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots()
    }
  }, [docInfo])

  return (
    docInfo && (
      <div className='max-w-6xl mx-auto py-8 px-4'>
        {/* Doctor Banner Card */}
        <div className='bg-white shadow-2xl rounded-[2rem] overflow-hidden border border-gray-50 flex flex-col md:flex-row'>
          <div className='md:w-1/3 bg-slate-50'>
            <img className='w-full h-full object-cover min-h-[350px]' src={docInfo.image} alt={docInfo.name} />
          </div>
          
          <div className='md:w-2/3 p-6 md:p-10 flex flex-col justify-center'>
            <div className='flex items-center gap-3'>
              <h1 className='text-3xl md:text-4xl font-extrabold text-gray-900'>{docInfo.name}</h1>
              <img className='w-6 h-6' src={assets.verified_icon} alt="verified" />
            </div>
            
            <div className='flex flex-wrap items-center gap-4 mt-3'>
              <p className='text-xl text-primary font-bold'>{docInfo.degree} — {docInfo.speciality}</p>
              <span className='px-4 py-1 bg-primary/10 text-primary text-xs font-black rounded-full border border-primary/20 uppercase tracking-widest'>
                {docInfo.experience} EXP
              </span>
            </div>

            <div className='mt-6 bg-secondary/50 p-4 rounded-2xl border border-gray-100 italic text-gray-600'>
               <p className='text-sm leading-relaxed'>" {docInfo.about} "</p>
            </div>

            <div className='mt-8 grid grid-cols-2 md:grid-cols-3 gap-6 border-t border-gray-100 pt-8'>
                <div>
                    <p className='text-xs text-gray-400 font-bold uppercase mb-1'>Consultation Fee</p>
                    <p className='text-2xl font-black text-gray-900'>{currencySymbol}{docInfo.fees}</p>
                </div>
                <div className='col-span-1 md:col-span-2'>
                    <p className='text-xs text-gray-400 font-bold uppercase mb-1'>Education</p>
                    <p className='text-base font-bold text-gray-700'>{docInfo.college || 'Verified Institution'}</p>
                </div>
            </div>

            <div className='mt-8 flex flex-wrap gap-4'>
                <button onClick={() => navigate(`/chat/${docId}`, { state: { doctor: docInfo } })} 
                        className={`flex items-center gap-3 px-8 py-3.5 ${docInfo.speciality === 'Gynecologist' ? 'bg-gynecologist' : 'bg-primary'} text-white rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all`}>
                    <img src={assets.chats_icon} className='w-5 invert' alt="" /> 
                    Live Consultation
                </button>
            </div>
          </div>
        </div>

        {/* Booking Section */}
        <div className='mt-16 bg-white shadow-xl rounded-[2rem] p-8 md:p-12 border border-blue-50/50'>
          <div className='flex items-center gap-3 mb-10'>
              <div className='w-3 h-8 bg-primary rounded-full'></div>
              <h2 className='text-2xl font-extrabold text-gray-900'>Select Your Preferred Slot</h2>
          </div>

          <div className='space-y-10'>
              {/* Days Select */}
              <div>
                  <p className='text-sm font-black text-gray-400 uppercase tracking-widest mb-6'>Choose Day</p>
                  <div className='flex gap-4 overflow-x-auto pb-4 scrollbar-hide'>
                    {docSlots.length > 0 && docSlots.map((item, index) => (
                        <div key={index} 
                             onClick={() => setSlotIndex(index)}
                             className={`min-w-[80px] py-6 flex flex-col items-center justify-center rounded-2xl cursor-pointer transition-all duration-300 shadow-sm
                                ${slotIndex === index ? 'bg-primary text-white scale-110 shadow-primary/40' : 'bg-secondary text-gray-500 hover:bg-gray-100'}`}>
                            <p className='text-xs font-black uppercase'>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                            <p className='text-xl font-black mt-1'>{item[0] && item[0].datetime.getDate()}</p>
                        </div>
                    ))}
                  </div>
              </div>

              {/* Time Select */}
              <div>
                  <p className='text-sm font-black text-gray-400 uppercase tracking-widest mb-6'>Pick a Time</p>
                  <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3'>
                    {docSlots.length > 0 && docSlots[slotIndex]?.map((item, index) => (
                        <div key={index} 
                             onClick={() => setSlotTime(item.time)}
                             className={`px-4 py-3 rounded-xl text-center cursor-pointer font-bold transition-all border
                                ${item.time === slotTime 
                                    ? 'bg-primary text-white border-primary shadow-lg scale-105' 
                                    : 'bg-white text-gray-500 border-gray-100 hover:border-primary/30 hover:text-primary'}`}>
                            {item.time.toLowerCase()}
                        </div>
                    ))}
                  </div>
              </div>

              {/* Action Button */}
              <div className='pt-10 flex justify-center'>
                  <button onClick={bookAppointment}
                          className='w-full sm:w-auto px-20 py-4 magenta-gradient text-white font-extrabold rounded-2xl shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all'>
                      Confirm Booking
                  </button>
              </div>
          </div>
        </div>

        {/* Related Doctors */}
        <div className='mt-24'>
            <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
        </div>
      </div>
    )
  )
}

export default Appointment
