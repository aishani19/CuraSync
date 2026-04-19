import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()

    return (
        <div className='relative w-full min-h-screen hero-gradient flex flex-col justify-center items-center overflow-hidden pt-20 px-6'>
            
            {/* Background elements */}
            <div className='absolute top-20 left-10 w-64 h-64 bg-[#00D4AA]/10 rounded-full blur-[120px] animate-pulse'></div>
            <div className='absolute bottom-20 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px]'></div>

            <div className='max-w-[1280px] w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10 py-20'>
                
                {/* Left Side: Content */}
                <div className='flex flex-col items-start gap-8 animate-fadeIn'>
                    <div className='bg-white/10 glass px-4 py-1.5 rounded-full text-[#00D4AA] text-[10px] font-bold uppercase tracking-widest border border-[#00D4AA]/20'>
                        Trust built by 10,000+ Verified Doctors
                    </div>
                    
                    <h1 className='text-5xl md:text-7xl font-extrabold text-white leading-[1.1] tracking-tight'>
                        Your Health, <br /> 
                        <span className='teal-gradient-text'>Perfectly Synchronized</span>
                    </h1>
                    
                    <p className='text-xl text-gray-400 font-medium leading-relaxed max-w-lg'>
                        Connect with certified doctors in under 60 seconds. Real-time availability, instant booking, zero hassle healthcare at your fingertips.
                    </p>

                    <div className='flex flex-wrap gap-4 mt-4'>
                        <button onClick={() => navigate('/doctors')} 
                                className='bg-[#00D4AA] text-[#0A1628] px-10 py-5 rounded-2xl text-base font-black shadow-2xl glow-teal hover:scale-105 active:scale-95 transition-all flex items-center gap-2'>
                            Book Appointment <span className='text-xl'>→</span>
                        </button>
                    </div>

                    {/* Social Proof */}
                    <div className='flex items-center gap-4 mt-8 pt-8 border-t border-white/5'>
                        <div className='flex -space-x-3'>
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className='w-10 h-10 rounded-full border-2 border-[#0A1628] bg-gray-800 overflow-hidden'>
                                    <img src={assets.group_profiles} className='scale-150' alt="" />
                                </div>
                            ))}
                        </div>
                        <div>
                            <p className='text-white font-bold text-lg'>10,000+ Doctors</p>
                            <p className='text-gray-500 text-xs font-bold uppercase tracking-widest'>Average 4.9★ Rating</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Virtual UI & 3D Doctors */}
                <div className='hidden lg:flex relative items-center justify-center p-10 mt-10'>
                    {/* Main Frosted Glass Card */}
                    <div className='w-full max-w-[450px] aspect-[4/5] glass p-8 rounded-[40px] shadow-2xl relative z-20 hover:scale-105 transition-all duration-700 stagger-1'>
                        <div className='flex items-center justify-between'>
                            <div className='w-12 h-12 bg-[#00D4AA]/20 rounded-2xl flex items-center justify-center text-[#00D4AA] font-black'>CS</div>
                            <div className='w-8 h-8 rounded-full bg-white/10 animate-pulse'></div>
                        </div>
                        
                        <div className='mt-12 space-y-6'>
                            <div className='bg-white/5 rounded-2xl p-6 border border-white/5 relative overflow-hidden group'>
                                <div className='absolute inset-0 bg-gradient-to-r from-transparent via-[#00D4AA]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000'></div>
                                <p className='text-xs text-gray-500 font-bold uppercase mb-2 flex justify-between'>
                                    <span>Biometric Sync</span>
                                    <span className='text-[#00D4AA] animate-pulse'>Live</span>
                                </p>
                                <div className='flex items-center justify-between'>
                                    <div className='flex flex-col'>
                                        <p className='text-white font-black text-2xl'>98 <span className='text-xs text-gray-400 font-medium'>BPM</span></p>
                                        <div className='flex gap-1 mt-1'>
                                            {[1, 2, 3, 4, 5, 6, 7].map(i => (
                                                <div key={i} className='w-1.5 h-4 bg-[#00D4AA]/20 rounded-full overflow-hidden'>
                                                    <div className='w-full h-full bg-[#00D4AA] origin-bottom animate-wave' style={{animationDelay: `${i * 0.1}s`}}></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className='text-right'>
                                        <p className='text-white font-black text-2xl'>99% <span className='text-xs text-gray-400 font-medium'>SPO2</span></p>
                                        <p className='text-gray-500 text-[10px] font-bold uppercase'>Stable</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className='pt-4'>
                                <div className='w-full h-1 bg-white/5 rounded-full overflow-hidden'>
                                    <div className='h-full bg-gradient-to-r from-[#00D4AA] to-indigo-500 w-2/3 animate-sync-loader'></div>
                                </div>
                                <p className='text-[9px] text-gray-600 font-bold uppercase tracking-widest mt-3 text-center'>Synchronizing healthcare nodes... 88%</p>
                            </div>
                        </div>
                    </div>

                    {/* Floating elements */}
                    <div className='absolute -top-10 -right-5 w-40 h-52 glass rounded-[30px] shadow-2xl p-5 animate-float stagger-2 z-10'>
                        <div className='w-full h-32 bg-indigo-500/20 rounded-2xl overflow-hidden'>
                             <img className='w-full h-full object-cover' src={assets.header_img} alt="" />
                        </div>
                        <p className='text-white text-[10px] mt-4 font-bold'>Dr. Alex Rivera</p>
                        <div className='w-8 h-1.5 bg-[#00D4AA] rounded-full mt-1.5'></div>
                    </div>

                    <div className='absolute bottom-0 -left-10 w-48 h-20 glass rounded-2xl shadow-2xl flex items-center gap-4 px-5 animate-float stagger-3 z-30' style={{animationDirection: 'reverse', animationDuration: '4s'}}>
                         <div className='w-10 h-10 bg-[#00D4AA] rounded-2xl flex items-center justify-center font-bold'>4.9</div>
                         <div>
                             <p className='text-white text-[10px] font-bold tracking-widest uppercase'>Satisfaction</p>
                             <div className='flex gap-0.5 text-[#00D4AA] text-xs'>★★★★★</div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header