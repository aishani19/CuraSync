import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { DoctorContext } from '../context/DoctorContext'

import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext)
  const { dToken, setDToken } = useContext(DoctorContext)
  const [state, setState] = useState('Sign Up')
  const [userType, setUserType] = useState('Patient') // 'Patient' or 'Doctor'

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  // Doctor specific fields
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [college, setCollege] = useState('')
  const [docImage, setDocImage] = useState(false)

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true)
    try {
      if (state === 'Sign Up') {
        if (userType === 'Patient') {
          const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })
          if (data.success) {
            localStorage.setItem('token', data.token)
            setToken(data.token)
          } else {
            toast.error(data.message)
          }
        } else {
          // Doctor Registration
          const formData = new FormData()
          formData.append('name', name)
          formData.append('email', email)
          formData.append('password', password)
          formData.append('speciality', speciality)
          formData.append('degree', degree)
          formData.append('experience', experience)
          formData.append('about', about)
          formData.append('fees', Number(fees))
          formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))
          formData.append('college', college)
          if (docImage) formData.append('image', docImage)

          const { data } = await axios.post(backendUrl + '/api/doctor/register', formData)
          if (data.success) {
            toast.success(data.message)
            setState('Login')
          } else {
            toast.error(data.message)
          }
        }
      } else {
        // Login Logic
        const endpoint = userType === 'Patient' ? '/api/user/login' : '/api/doctor/login'
        const { data } = await axios.post(backendUrl + endpoint, { email, password })

        if (data.success) {
          if (userType === 'Patient') {
            localStorage.setItem('token', data.token)
            setToken(data.token)
          } else {
            localStorage.setItem('dToken', data.token)
            setDToken(data.token)
            navigate('/doctor-dashboard')
          }
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
    if (dToken) {
      navigate('/doctor-dashboard')
    }
  }, [token, dToken])


  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center py-10'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-[450px] border rounded-xl text-[#5E5E5E] text-sm shadow-lg bg-white'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <div className='flex gap-4 mb-2'>
           <button type='button' onClick={()=>setUserType('Patient')} className={`px-4 py-1 rounded-full border ${userType === 'Patient' ? 'bg-primary text-white border-primary' : 'border-gray-300'}`}>Patient</button>
           <button type='button' onClick={()=>setUserType('Doctor')} className={`px-4 py-1 rounded-full border ${userType === 'Doctor' ? 'bg-primary text-white border-primary' : 'border-gray-300'}`}>Doctor</button>
        </div>
        
        <p>Please {state === 'Sign Up' ? 'sign up' : 'log in'} as a {userType}</p>

        {state === 'Sign Up' && (
          <div className='w-full'>
            <p>Full Name</p>
            <input onChange={(e) => setName(e.target.value)} value={name} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="text" required />
          </div>
        )}

        <div className='w-full'>
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
        </div>

        {/* Doctor Specific Registration Fields */}
        {state === 'Sign Up' && userType === 'Doctor' && (
          <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2'>
            <div>
              <p>Speciality</p>
              <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className='border border-[#DADADA] rounded w-full p-2 mt-1'>
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div>
              <p>Degree</p>
              <input onChange={(e) => setDegree(e.target.value)} value={degree} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="text" placeholder='MBBS' required />
            </div>
            <div>
              <p>Experience</p>
              <select onChange={(e) => setExperience(e.target.value)} value={experience} className='border border-[#DADADA] rounded w-full p-2 mt-1'>
                {[...Array(10).keys()].map(i => <option key={i} value={`${i+1} Year`}>{i+1} Year</option>)}
              </select>
            </div>
            <div>
              <p>Fees</p>
              <input onChange={(e) => setFees(e.target.value)} value={fees} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="number" placeholder='500' required />
            </div>
            <div className='col-span-full'>
              <p>College Name</p>
              <input onChange={(e) => setCollege(e.target.value)} value={college} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="text" placeholder='AIIMS, etc.' required />
            </div>
            <div className='col-span-full'>
              <p>About You</p>
              <textarea onChange={(e) => setAbout(e.target.value)} value={about} className='border border-[#DADADA] rounded w-full p-2 mt-1' rows={2} required />
            </div>
            <div className='col-span-full'>
              <p>Address</p>
              <input onChange={(e) => setAddress1(e.target.value)} value={address1} className='border border-[#DADADA] rounded w-full p-2 mt-1 mb-1' type="text" placeholder='Line 1' required />
              <input onChange={(e) => setAddress2(e.target.value)} value={address2} className='border border-[#DADADA] rounded w-full p-2' type="text" placeholder='Line 2' required />
            </div>
            <div className='col-span-full'>
              <p>Profile Image</p>
              <input type="file" onChange={(e) => setDocImage(e.target.files[0])} className='mt-1' />
            </div>
          </div>
        )}

        <button disabled={loading} type='submit' className='bg-primary text-white w-full py-2 my-2 rounded-md text-base disabled:opacity-50'>
          {loading ? 'Processing...' : (state === 'Sign Up' ? 'Create account' : 'Login')}
        </button>

        {state === 'Sign Up'
          ? <p>Already have an account? <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
          : <p>Create a new account? <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>Click here</span></p>
        }
      </div>
    </form>
  )
}


export default Login