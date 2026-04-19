import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {

  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  return (
    <div className='flex flex-col items-center gap-10 my-32 px-6'>
      <div className='max-w-[1280px] w-full flex flex-col md:flex-row items-end justify-between gap-6'>
          <div className='text-left'>
            <p className='text-[#00D4AA] font-black tracking-widest uppercase text-xs mb-4'>Elite Networks</p>
            <h1 className='text-4xl md:text-6xl font-black text-[#0A1628] leading-tight'>Top Rated Doctors</h1>
            <p className='text-gray-500 font-medium text-lg mt-4'>Curated list of experts ready for your consultation today.</p>
          </div>
          <button onClick={() => { navigate('/doctors'); window.scrollTo(0, 0) }} 
                  className='bg-[#0A1628] text-white px-10 py-4 rounded-xl text-sm font-black hover:bg-[#00D4AA] hover:text-[#0A1628] transition-all shadow-xl'>
            View Global Directory
          </button>
      </div>
      
      <div className='w-full max-w-[1400px] flex gap-8 overflow-x-auto pb-12 pt-10 px-6 scrollbar-hide'>
        {doctors.slice(0, 10).map((item, index) => (
          <div onClick={() => { navigate(`/appointment/${item._id || item.id}`); window.scrollTo(0, 0) }} 
               className='min-w-[320px] bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden cursor-pointer tilt-card hover:border-[#00D4AA]/50 group' 
               key={index}>
            <div className='relative aspect-[5/6] overflow-hidden bg-slate-50'>
                <img className='w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110' src={item.image} alt={item.name} />
                
                {/* Status Dot */}
                <div className='absolute top-6 left-6 flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg border border-white/20'>
                    <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-[#00D4AA] animate-pulse' : 'bg-gray-400'}`}></span>
                    <span className='text-[10px] font-black text-[#0A1628] uppercase tracking-tighter'>Available Today</span>
                </div>
            </div>

            <div className='p-8'>
              <div className='flex items-center justify-between'>
                  <span className='px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-lg uppercase tracking-widest'>{item.speciality}</span>
                  <div className='flex items-center gap-1 text-amber-500 font-bold text-sm'>
                      ★ <span className='text-gray-900'>4.9</span>
                  </div>
              </div>
              
              <h2 className='text-[#0A1628] text-2xl font-black mt-4 group-hover:text-[#00D4AA] transition-colors line-clamp-1'>{item.name}</h2>
              <p className='text-gray-400 text-sm font-bold uppercase tracking-widest mt-1'>{item.experience} EXPERIENCE</p>
              
              <button className='w-full mt-8 py-4 px-6 bg-[#00D4AA]/5 text-[#00D4AA] font-black rounded-2xl hover:bg-[#00D4AA] hover:text-[#0A1628] transition-all duration-300 border border-[#00D4AA]/10'>
                 Book Appointment →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopDoctors
