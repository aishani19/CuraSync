import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='min-h-screen bg-[#F8FAFF] pb-20'>
      <div className='max-w-[1280px] mx-auto pt-40 px-6'>
        <div className='text-center mb-20'>
          <p className='text-[#00D4AA] font-black uppercase tracking-widest text-xs mb-4'>Get in Touch</p>
          <h1 className='text-5xl md:text-6xl font-black text-[#0A1628]'>Contact <span className='text-gray-400'>US</span></h1>
        </div>

        <div className='bg-white rounded-[60px] p-10 md:p-20 shadow-2xl shadow-indigo-500/5 flex flex-col md:flex-row gap-16 border border-gray-100 items-center'>
          <div className='w-full md:w-1/2 relative overflow-hidden rounded-[40px] shadow-2xl'>
            <img className='w-full h-full object-cover hover:scale-105 transition-all duration-700' src={assets.contact_image} alt="CuraSync Office" />
            <div className='absolute inset-0 bg-gradient-to-t from-[#0A1628]/40 to-transparent'></div>
          </div>
          
          <div className='w-full md:w-1/2 flex flex-col justify-center items-start gap-12'>
            <div>
              <p className='font-black text-xs uppercase tracking-widest text-[#00D4AA] mb-4'>Headquarters</p>
              <h2 className='font-black text-4xl text-[#0A1628] leading-tight'>OUR OFFICE</h2>
            </div>
            
            <div className='space-y-8'>
              <div className='flex items-start gap-6'>
                <div className='w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-xl shadow-sm'>📍</div>
                <div className='text-gray-500 font-medium leading-relaxed'>
                  <p className='text-[#0A1628] font-bold'>CuraSync Digital Hub</p>
                  54709 Willms Station, Suite 350<br />
                  Washington, 20001, USA
                </div>
              </div>

              <div className='flex items-start gap-6'>
                <div className='w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-xl shadow-sm'>📞</div>
                <div className='text-gray-500 font-medium leading-relaxed'>
                  <p className='text-[#0A1628] font-bold'>Phone & Email</p>
                  Tel: (415) 555-0132<br />
                  <span className='text-[#00D4AA] hover:underline cursor-pointer'>support@curasync.me</span>
                </div>
              </div>
            </div>

            <button className='bg-[#0A1628] text-white px-12 py-5 rounded-2xl font-black text-sm hover:bg-[#00D4AA] hover:text-[#0A1628] transition-all shadow-xl shadow-indigo-500/10 active:scale-95'>
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
