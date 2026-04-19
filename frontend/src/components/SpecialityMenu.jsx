import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <div id='speciality' className='flex flex-col items-center gap-12 py-32 bg-[#F8FAFF] px-6'>
            <div className='max-w-[1280px] w-full text-center'>
                <p className='text-[#00D4AA] font-black tracking-widest uppercase text-xs mb-4'>Intelligent Search</p>
                <h1 className='text-4xl md:text-6xl font-black text-[#0A1628] leading-tight'>Find the Right Specialist</h1>
            </div>

            <div className='max-w-[1280px] w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 pt-10'>
                {specialityData.map((item, index) => (
                    <Link to={`/doctors/${item.speciality}`} 
                          onClick={() => window.scrollTo(0, 0)} 
                          className='p-8 bg-white border border-gray-50 rounded-[40px] flex flex-col items-center group cursor-pointer hover:shadow-2xl hover:shadow-indigo-50 hover:translate-y-[-10px] transition-all duration-500' 
                          key={index}>
                        <div className={`w-20 h-20 mb-6 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 bg-slate-50 border border-gray-50`}>
                            <img className='w-12 h-auto' src={item.image} alt={item.speciality} />
                        </div>
                        <p className='text-sm font-black text-[#0A1628] transition-colors group-hover:text-[#00D4AA] tracking-tighter uppercase'>{item.speciality}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SpecialityMenu