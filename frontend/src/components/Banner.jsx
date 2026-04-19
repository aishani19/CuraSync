import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {

    const navigate = useNavigate()

    return (
        <section className='py-32 px-6'>
            <div className='max-w-[1280px] mx-auto bg-[#0A1628] rounded-[50px] p-12 md:p-24 overflow-hidden relative shadow-2xl'>
                
                {/* Background lighting */}
                <div className='absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-[140px]'></div>
                <div className='absolute bottom-0 left-0 w-64 h-64 bg-[#00D4AA]/20 rounded-full blur-[100px]'></div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10'>
                    
                    {/* Left Side: Phone Mockup */}
                    <div className='flex justify-center relative'>
                        <div className='w-full max-w-[320px] aspect-[9/19] glass rounded-[40px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/20 p-4 relative animate-float'>
                             <div className='absolute top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full z-20'></div>
                             <div className='w-full h-full bg-[#0A1628] rounded-[30px] overflow-hidden p-6 flex flex-col justify-between'>
                                 <div>
                                     <p className='text-xs font-black text-[#00D4AA] tracking-tighter uppercase mb-4'>Doctor List</p>
                                     <div className='space-y-3'>
                                         {[1,2,3].map(i => (
                                             <div key={i} className='bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center gap-3'>
                                                 <div className='w-10 h-10 rounded-xl bg-indigo-500/20'></div>
                                                 <div className='h-2 w-24 bg-white/10 rounded-full'></div>
                                             </div>
                                         ))}
                                     </div>
                                 </div>
                                 <div className='w-full h-12 bg-[#00D4AA] rounded-2xl'></div>
                             </div>
                        </div>
                        {/* Decorative circles */}
                        <div className='absolute -top-10 -left-10 w-32 h-32 bg-indigo-500 rounded-full blur-3xl opacity-20'></div>
                    </div>

                    {/* Right Side: Content */}
                    <div className='text-left'>
                        <p className='text-[#00D4AA] font-black tracking-widest uppercase text-xs mb-4'>Mobile First</p>
                        <h2 className='text-4xl md:text-6xl font-black text-white leading-tight'>Take CuraSync Everywhere</h2>
                        
                        <div className='mt-10 space-y-6'>
                            <div className='flex items-center gap-4 group'>
                                <div className='w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#00D4AA] group-hover:scale-110 transition-all'>✓</div>
                                <p className='text-xl text-gray-300 font-medium whitespace-nowrap'>Real-time chat consultations</p>
                            </div>
                            <div className='flex items-center gap-4 group'>
                                <div className='w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#00D4AA] group-hover:scale-110 transition-all'>✓</div>
                                <p className='text-xl text-gray-300 font-medium whitespace-nowrap'>Digital health record vault</p>
                            </div>
                            <div className='flex items-center gap-4 group'>
                                <div className='w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#00D4AA] group-hover:scale-110 transition-all'>✓</div>
                                <p className='text-xl text-gray-300 font-medium whitespace-nowrap'>One-tap booking renewals</p>
                            </div>
                        </div>

                        <div className='flex flex-wrap gap-4 mt-12'>
                            <button className='bg-white text-[#0A1628] px-10 py-5 rounded-2xl text-sm font-black flex items-center gap-3 hover:scale-105 transition-all'>
                                <span className='text-2xl'>🍎</span> App Store
                            </button>
                            <button className='bg-white/10 glass text-white px-10 py-5 rounded-2xl text-sm font-black flex items-center gap-3 hover:scale-105 transition-all'>
                                <span className='text-2xl'>🤖</span> Play Store
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Banner