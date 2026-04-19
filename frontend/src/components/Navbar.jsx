import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const { token, setToken, dToken, setDToken } = useContext(AppContext)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
    setDToken(false)
    localStorage.removeItem('dToken')
    navigate('/login')
  }

  const isHome = location.pathname === '/'

  return (
    <div className='fixed top-0 left-0 w-full z-50 transition-all duration-300'>
      {/* Top Announcement Bar */}
      <div className='bg-[#0A1628] border-b border-white/5 py-2 text-center overflow-hidden flex justify-center gap-10 items-center'>
          <p className='text-[10px] sm:text-xs font-bold tracking-widest text-[#00D4AA] uppercase animate-pulse shrink-0'>
             🩺 Now available in 50+ cities — Get 20% off your first consultation
          </p>
          <div className='hidden md:block w-px h-4 bg-white/10'></div>
          <p className='hidden md:block text-[10px] sm:text-xs font-bold tracking-widest text-red-500 uppercase shrink-0'>
             🚨 Critical: O- Negative donors needed at City Central
          </p>
      </div>

      <nav className={`transition-all duration-500 py-4 px-6 md:px-12 flex items-center justify-between ${(isScrolled || !isHome) ? 'glass-light shadow-xl py-3 border-b border-gray-100' : 'bg-transparent'}`}>
        
        {/* Logo */}
        <div onClick={() => navigate('/')} className='flex items-center gap-2 cursor-pointer group'>
            <div className='w-10 h-10 bg-[#00D4AA] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4V20M4 12H20" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <span className={`text-2xl font-black tracking-tighter transition-colors ${(isScrolled || !isHome) ? 'text-[#0A1628]' : 'text-white'}`}>
                Cura<span className='text-[#00D4AA]'>Sync</span>
            </span>
        </div>

        {/* Desktop Links */}
        <ul className={`hidden lg:flex items-center gap-8 font-semibold text-sm transition-colors ${(isScrolled || !isHome) ? 'text-gray-600' : 'text-gray-100'}`}>
          <NavLink to='/' className='hover:text-[#00D4AA] transition-all'>HOME</NavLink>
          <NavLink to='/doctors' className='hover:text-[#00D4AA] transition-all'>FIND DOCTORS</NavLink>
          <NavLink to='/blood-bank' className='hover:text-[#00D4AA] transition-all uppercase'>Blood Bank</NavLink>
          <span 
            onClick={() => {
              if (location.pathname === '/') {
                document.getElementById('speciality')?.scrollIntoView({ behavior: 'smooth' });
              } else {
                navigate('/');
                setTimeout(() => {
                  document.getElementById('speciality')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className='hover:text-[#00D4AA] transition-all uppercase cursor-pointer'
          >
            Specialties
          </span>
          <NavLink to='/about' className='hover:text-[#00D4AA] transition-all uppercase'>About</NavLink>
          <NavLink to='/contact' className='hover:text-[#00D4AA] transition-all uppercase'>Contact</NavLink>
        </ul>

        {/* Buttons */}
        <div className='flex items-center gap-4'>
          {token || dToken ? (
            <button onClick={logout} className='bg-[#0A1628] text-white px-6 py-2.5 rounded-full text-xs font-bold hover:scale-105 active:scale-95 transition-all'>
              LOGOUT
            </button>
          ) : (
            <>
              <button onClick={() => navigate('/login')} className={`hidden sm:block text-xs font-bold transition-all ${(isScrolled || !isHome) ? 'text-gray-600 hover:text-[#00D4AA]' : 'text-gray-200 hover:text-white'}`}>
                SIGN IN
              </button>

              <button onClick={() => navigate('/login')} className='bg-[#00D4AA] text-[#0A1628] px-8 py-3 rounded-xl text-xs font-black shadow-lg glow-teal hover:scale-105 active:scale-95 transition-all'>
                BOOK NOW
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Navbar
