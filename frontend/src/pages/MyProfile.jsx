import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {
    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)

    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

    const updateUserProfileData = async () => {
        try {
            const formData = new FormData()
            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)
            image && formData.append('image', image)

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    return userData ? (
        <div className='max-w-4xl mx-auto p-4 sm:p-6 mb-10'>
            <div className='bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100 mt-5'>
                {/* Header Background */}
                <div className='h-32 bg-gradient-to-r from-primary to-purple-500'></div>

                <div className='px-6 pb-8'>
                    <div className='relative flex flex-col sm:flex-row items-center sm:items-end -mt-16 gap-6'>
                        {/* Profile Image */}
                        <div className='relative'>
                            {isEdit ? (
                                <label htmlFor='image' className='cursor-pointer group'>
                                    <div className='w-40 h-40 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-white'>
                                        <img className='w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-all' 
                                             src={image ? URL.createObjectURL(image) : (userData.image || assets.profile_pic)} alt="" />
                                        <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all'>
                                            <img className='w-12 bg-white p-2 rounded-full shadow-lg' src={assets.upload_icon} alt="" />
                                        </div>
                                    </div>
                                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                                </label>
                            ) : (
                                <div className='w-40 h-40 rounded-2xl border-4 border-white shadow-xl overflow-hidden bg-white'>
                                    <img className='w-full h-full object-cover' src={userData.image || assets.profile_pic} alt="" />
                                </div>
                            )}
                        </div>

                        {/* Name Section */}
                        <div className='flex-1 text-center sm:text-left'>
                            {isEdit ? (
                                <input className='text-3xl font-bold text-gray-800 border-b-2 border-primary outline-none bg-transparent py-1 w-full' 
                                    type="text"
                                    onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                                    value={userData.name}
                                />
                            ) : (
                                <>
                                    <h1 className='text-3xl font-bold text-gray-900'>{userData.name}</h1>
                                    <p className='text-primary font-medium mt-1'>Patient Profile</p>
                                </>
                            )}
                        </div>

                        {/* Edit/Save Button */}
                        <div className='sm:ml-auto mb-2'>
                            {isEdit ? (
                                <button onClick={updateUserProfileData} className='bg-primary text-white px-8 py-2.5 rounded-xl shadow-lg hover:shadow-primary/30 transition-all font-semibold active:scale-95'>
                                    Save Changes
                                </button>
                            ) : (
                                <button onClick={() => setIsEdit(true)} className='bg-primary/10 text-primary border-2 border-primary/20 px-8 py-2.5 rounded-xl hover:bg-primary hover:text-white transition-all font-semibold'>
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 px-2'>
                        {/* Contact info column */}
                        <div className='bg-secondary rounded-2xl p-6'>
                            <h3 className='text-lg font-bold text-gray-800 mb-6 flex items-center gap-2'>
                                <span className='w-2 h-6 bg-primary rounded-full'></span>
                                Contact Information
                            </h3>
                            <div className='space-y-5'>
                                <div className='flex items-center gap-4'>
                                    <div className='w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm'>
                                        <p className='text-primary'>📧</p>
                                    </div>
                                    <div className='flex-1'>
                                        <p className='text-xs text-gray-400 uppercase tracking-wider font-bold'>Email</p>
                                        <p className='text-gray-700 font-medium break-all'>{userData.email}</p>
                                    </div>
                                </div>

                                <div className='flex items-center gap-4'>
                                    <div className='w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm'>
                                        <p className='text-primary'>📞</p>
                                    </div>
                                    <div className='flex-1'>
                                        <p className='text-xs text-gray-400 uppercase tracking-wider font-bold'>Phone</p>
                                        {isEdit ? (
                                            <input className='w-full border-b border-gray-300 outline-none focus:border-primary bg-transparent py-0.5' 
                                                type="text"
                                                onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                                                value={userData.phone}
                                            />
                                        ) : (
                                            <p className='text-gray-700 font-medium'>{userData.phone || 'Not Provided'}</p>
                                        )}
                                    </div>
                                </div>

                                <div className='flex items-center gap-4'>
                                    <div className='w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm'>
                                        <p className='text-primary'>📍</p>
                                    </div>
                                    <div className='flex-1'>
                                        <p className='text-xs text-gray-400 uppercase tracking-wider font-bold'>Address</p>
                                        {isEdit ? (
                                            <div className='space-y-2 mt-1'>
                                                <input className='w-full border-b border-gray-300 outline-none focus:border-primary bg-transparent py-0.5' 
                                                    type="text"
                                                    onChange={(e) => setUserData(prev => ({
                                                        ...prev,
                                                        address: { ...(prev.address || {}), line1: e.target.value }
                                                    }))}
                                                    value={userData.address?.line1 || ''}
                                                    placeholder='Line 1'
                                                />
                                                <input className='w-full border-b border-gray-300 outline-none focus:border-primary bg-transparent py-0.5' 
                                                    type="text"
                                                    onChange={(e) => setUserData(prev => ({
                                                        ...prev,
                                                        address: { ...(prev.address || {}), line2: e.target.value }
                                                    }))}
                                                    value={userData.address?.line2 || ''}
                                                    placeholder='Line 2'
                                                />
                                            </div>
                                        ) : (
                                            <p className='text-gray-700 font-medium'>
                                                {userData.address?.line1 || 'Not Set'} <br /> 
                                                {userData.address?.line2 || ''}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Basic Info Column */}
                        <div className='bg-secondary rounded-2xl p-6'>
                            <h3 className='text-lg font-bold text-gray-800 mb-6 flex items-center gap-2'>
                                <span className='w-2 h-6 bg-purple-500 rounded-full'></span>
                                Basic Information
                            </h3>
                            <div className='space-y-5'>
                                <div className='flex items-center gap-4'>
                                    <div className='w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm'>
                                        <p className='text-purple-500'>👤</p>
                                    </div>
                                    <div className='flex-1'>
                                        <p className='text-xs text-gray-400 uppercase tracking-wider font-bold'>Gender</p>
                                        {isEdit ? (
                                            <select className='w-full border-b border-gray-300 outline-none focus:border-purple-500 bg-transparent py-1'
                                                onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                                                value={userData.gender}
                                            >
                                                <option value="Not Selected">Not Selected</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                        ) : (
                                            <p className='text-gray-700 font-medium'>{userData.gender}</p>
                                        )}
                                    </div>
                                </div>

                                <div className='flex items-center gap-4'>
                                    <div className='w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm'>
                                        <p className='text-purple-500'>🎂</p>
                                    </div>
                                    <div className='flex-1'>
                                        <p className='text-xs text-gray-400 uppercase tracking-wider font-bold'>Birthday</p>
                                        {isEdit ? (
                                            <input className='w-full border-b border-gray-300 outline-none focus:border-purple-500 bg-transparent py-1' 
                                                type='date'
                                                onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                                                value={userData.dob}
                                            />
                                        ) : (
                                            <p className='text-gray-700 font-medium'>{userData.dob || 'Not Selected'}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className='flex items-center justify-center min-h-[60vh]'>
            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary'></div>
        </div>
    )
}

export default MyProfile
