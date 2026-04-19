import React, { useState } from 'react'
import { toast } from 'react-toastify'

const BloodBank = () => {

    const [selectedGroup, setSelectedGroup] = useState('All')
    const [viewType, setViewType] = useState('banks') // 'banks', 'donors', 'receivers'
    const [showModal, setShowModal] = useState(false)
    const [formType, setFormType] = useState('donor') // 'donor' or 'receiver'
    
    // Form States
    const [formData, setFormData] = useState({ name: '', phone: '', group: 'A+', location: '', units: '1' })

    const bloodGroups = ['All', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    
    const handleRegisterClick = (type) => {
        setFormType(type)
        setShowModal(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Simulate API call
        const message = formType === 'donor' 
            ? "Thank you for registering as a donor! You are now in our synchronized lifesaver network."
            : "Your urgent request has been broadcasted to all nearby donors and banks."
        
        toast.success(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
        })
        setShowModal(false)
        setFormData({ name: '', phone: '', group: 'A+', location: '', units: '1' })
    }

    const handleContactDonor = (donor) => {
        toast.info(`Synchronizing request with ${donor.name}...`, {
            position: "top-center",
            theme: "dark"
        })
        setTimeout(() => {
            toast.success(`Request sent! ${donor.name} has been notified of your urgent need.`, {
                position: "top-center",
                theme: "dark"
            })
        }, 1500)
    }

    const banks = [
        { name: 'City General Blood Bank', location: 'Downtown Medical Hub', groups: ['A+', 'B+', 'O+', 'AB+'], status: 'Active', distance: '2.5 km' },
        { name: 'Red Cross Center', location: 'Westside Plaza', groups: ['O-', 'A-', 'B-'], status: 'Urgent Need', distance: '4.1 km' }
    ]

    const donors = [
        { name: 'Aishani Billore', location: 'Green Valley Estates', groups: ['O-'], status: 'Verified', lastDonated: '3 months ago' },
        { name: 'Rahul Sharma', location: 'Skyline Residency', groups: ['B+'], status: 'Verified', lastDonated: '1 month ago' },
        { name: 'Priya Verma', location: 'Garden City', groups: ['A+'], status: 'Available', lastDonated: '6 months ago' }
    ]

    const receivers = [
        { patient: 'Emergency Patient #142', hospital: 'St. Mary’s Hospital', group: 'O-', priority: 'Critical', units: '3 Units' },
        { patient: 'Surgeons Request', hospital: 'Metro Trauma Center', group: 'AB+', priority: 'High', units: '2 Units' },
        { patient: 'Anjali Gupta', hospital: 'Apollo Specialist', group: 'B-', priority: 'Routine', units: '1 Unit' }
    ]

    return (
        <div className='min-h-screen bg-[#F8FAFF] pb-20'>
            {/* Hero Section */}
            <div className='hero-gradient pt-40 pb-20 px-6 text-center overflow-hidden relative'>
                <div className='absolute top-0 right-0 w-96 h-96 bg-[#00D4AA]/10 rounded-full blur-3xl'></div>
                <div className='max-w-4xl mx-auto z-10 relative'>
                    <p className='text-[#00D4AA] font-black uppercase tracking-widest text-xs mb-4'>Synchronized Life Support</p>
                    <h1 className='text-5xl md:text-7xl font-black text-white leading-tight'>CuraSync <span className='text-red-500'>Blood</span> Bank</h1>
                    <p className='text-gray-400 text-xl mt-6 max-w-2xl mx-auto'>Bridging the gap between heroes and those in need. Seamlessly connect with blood banks, verified donors, or submit an urgent request.</p>
                </div>
            </div>

            {/* Selection Tabs */}
            <div className='max-w-[1280px] mx-auto -mt-10 px-6 z-20 relative'>
                <div className='bg-white rounded-[40px] shadow-2xl p-4 flex flex-wrap justify-center gap-4 border border-gray-100'>
                    <button onClick={() => setViewType('banks')} className={`px-10 py-5 rounded-[30px] font-black text-sm uppercase tracking-widest transition-all ${viewType === 'banks' ? 'bg-[#0A1628] text-white shadow-xl scale-105' : 'text-gray-400 hover:text-[#0A1628]'}`}>Blood Banks</button>
                    <button onClick={() => setViewType('donors')} className={`px-10 py-5 rounded-[30px] font-black text-sm uppercase tracking-widest transition-all ${viewType === 'donors' ? 'bg-[#0A1628] text-white shadow-xl scale-105' : 'text-gray-400 hover:text-[#0A1628]'}`}>Verified Donors</button>
                    <button onClick={() => setViewType('receivers')} className={`px-10 py-5 rounded-[30px] font-black text-sm uppercase tracking-widest transition-all ${viewType === 'receivers' ? 'bg-red-500 text-white shadow-xl scale-105' : 'text-gray-400 hover:text-red-500'}`}>Urgent Requests</button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className='max-w-[1280px] mx-auto mt-20 px-6'>
                
                {/* Header context */}
                <div className='flex flex-col md:flex-row items-end justify-between gap-10 mb-16'>
                    <div>
                        <h2 className='text-4xl md:text-5xl font-black text-[#0A1628]'>
                            {viewType === 'banks' && "Certified Blood Repositories"}
                            {viewType === 'donors' && "Community Lifesavers"}
                            {viewType === 'receivers' && "Urgent Patient Requests"}
                        </h2>
                        <p className='text-gray-500 font-medium text-lg mt-2'>
                            {viewType === 'banks' && "Commercial and NGO repositories with real-time stock levels."}
                            {viewType === 'donors' && "Verified individual donors within your local area."}
                            {viewType === 'receivers' && "Live requests from hospitals and family members in critical need."}
                        </p>
                    </div>
                    <div className='flex gap-4'>
                        <button onClick={() => handleRegisterClick(viewType === 'receivers' ? 'receiver' : 'donor')} 
                                className='bg-[#00D4AA] text-[#0A1628] px-10 py-4 rounded-2xl font-black shadow-xl hover:scale-105 transition-all text-sm'>
                            {viewType === 'receivers' ? "Submit My Request" : "Register as Donor"}
                        </button>
                    </div>
                </div>

                {/* Filter Grid */}
                <div className='flex flex-wrap gap-3 mb-12 bg-white p-6 rounded-[30px] border border-gray-50 shadow-sm'>
                    {bloodGroups.map(group => (
                        <button key={group} onClick={() => setSelectedGroup(group)}
                            className={`px-6 py-3 rounded-xl font-black transition-all ${selectedGroup === group ? 'bg-[#00D4AA] text-[#0A1628]' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                        >
                            {group}
                        </button>
                    ))}
                </div>

                {/* List Logic */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    
                    {/* View: Blood Banks */}
                    {viewType === 'banks' && banks.map((bank, i) => (
                        <div key={i} className='bg-white p-8 rounded-[40px] border border-gray-100 shadow-xl tilt-card group'>
                            <div className='flex justify-between items-start'>
                                <div className='w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-all'>🏥</div>
                                <span className='px-4 py-1.5 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase'>{bank.status}</span>
                            </div>
                            <h3 className='text-2xl font-black text-[#0A1628] mt-8'>{bank.name}</h3>
                            <p className='text-gray-400 font-bold text-xs uppercase tracking-widest mt-1'>{bank.location}</p>
                            <div className='mt-6 flex flex-wrap gap-2'>
                                {bank.groups.map(g => <span key={g} className='px-3 py-1 bg-gray-50 text-[#0A1628] text-[10px] font-black rounded-lg border border-gray-100'>{g}</span>)}
                            </div>
                            <div className='mt-8 pt-8 border-t border-gray-50 flex items-center justify-between'>
                                <span className='text-xs font-bold text-gray-500'>📍 {bank.distance} away</span>
                                <button className='text-[#00D4AA] font-black text-sm hover:underline'>Contact Bank</button>
                            </div>
                        </div>
                    ))}

                    {/* View: Donors */}
                    {viewType === 'donors' && donors.map((donor, i) => (
                        <div key={i} className='bg-white p-8 rounded-[40px] border border-gray-100 shadow-xl tilt-card group'>
                            <div className='flex items-center gap-4'>
                                <div className='w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-3xl group-hover:rotate-6 transition-all'>🦸</div>
                                <div>
                                    <h3 className='text-xl font-black text-[#0A1628]'>{donor.name}</h3>
                                    <div className='flex items-center gap-2'>
                                        <span className='px-3 py-0.5 bg-[#00D4AA] text-[#0A1628] font-black rounded text-[10px]'>{donor.groups[0]}</span>
                                        <span className='text-[10px] font-black text-[#00D4AA] uppercase'>• {donor.status}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-8 space-y-4'>
                                <div className='flex items-center justify-between text-sm'>
                                    <span className='text-gray-400 font-medium'>📍 Location</span>
                                    <span className='text-[#0A1628] font-bold'>{donor.location}</span>
                                </div>
                                <div className='flex items-center justify-between text-sm'>
                                    <span className='text-gray-400 font-medium'>🕒 Last Donated</span>
                                    <span className='text-gray-600 font-bold italic'>{donor.lastDonated}</span>
                                </div>
                            </div>
                            <button onClick={() => handleContactDonor(donor)} className='w-full mt-8 bg-[#0A1628] text-white py-4 rounded-2xl font-black text-sm hover:bg-[#00D4AA] hover:text-[#0A1628] transition-all'>Request Donation</button>
                        </div>
                    ))}

                    {/* View: Receivers (Requests) */}
                    {viewType === 'receivers' && receivers.map((rec, i) => (
                        <div key={i} className='bg-white p-8 rounded-[40px] border border-red-50 shadow-2xl shadow-red-500/5 tilt-card group relative overflow-hidden'>
                            <div className='absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full -mr-12 -mt-12'></div>
                            <div className='flex justify-between items-start'>
                                <div className='w-14 h-14 bg-red-500 text-white rounded-2xl flex items-center justify-center text-2xl font-black group-hover:scale-110 transition-all'>{rec.group}</div>
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${rec.priority === 'Critical' ? 'bg-red-500 text-white animate-pulse' : 'bg-red-50 text-red-500'}`}>{rec.priority}</span>
                            </div>
                            <h3 className='text-2xl font-black text-[#0A1628] mt-8 leading-tight'>{rec.patient}</h3>
                            <div className='mt-4 flex flex-col gap-2'>
                                <div className='flex items-center gap-2 text-sm'>
                                    <span className='text-gray-400'>Hospital:</span>
                                    <span className='text-[#0A1628] font-bold'>{rec.hospital}</span>
                                </div>
                                <div className='flex items-center gap-2 text-sm'>
                                    <span className='text-gray-400'>Requirement:</span>
                                    <span className='text-red-500 font-black'>{rec.units}</span>
                                </div>
                            </div>
                            <button onClick={() => {
                                toast.success("Pledge received! Connecting you with the medical facility...", { theme: 'dark' })
                            }} className='w-full mt-8 bg-red-500 text-white py-4 rounded-2xl font-black text-sm hover:bg-red-600 transition-all shadow-lg shadow-red-500/20'>Pledge Support Now</button>
                        </div>
                    ))}

                </div>
            </div>

            {/* Donation Awareness Banner */}
            <div className='max-w-[1280px] mx-auto mt-32 px-6'>
                <div className='bg-[#0A1628] rounded-[60px] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl'>
                    <div className='absolute -top-20 -left-20 w-80 h-80 bg-red-500/10 rounded-full blur-3xl'></div>
                    <div className='relative z-10'>
                        <h2 className='text-4xl md:text-6xl font-black text-white leading-tight'>The Ultimate <span className='text-red-500'>Hero</span> Network</h2>
                        <p className='text-gray-400 text-xl mt-8 max-w-2xl mx-auto'>Whether you want to give back or need immediate help, CuraSync is the bridge that synchronizes lives.</p>
                        <div className='flex flex-wrap justify-center gap-6 mt-12'>
                            <button onClick={() => handleRegisterClick('donor')} className='bg-red-500 text-white px-12 py-5 rounded-2xl font-black hover:scale-105 transition-all shadow-2xl shadow-red-500/20'>
                                Open Donation Slot
                            </button>
                            <button onClick={() => {
                                setViewType('receivers');
                                window.scrollTo({ top: 400, behavior: 'smooth' });
                            }} className='bg-white/10 glass text-white px-12 py-5 rounded-2xl font-black hover:bg-white/20 transition-all'>
                                Guide for Receivers
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Registration/Request Modal */}
            {showModal && (
                <div className='fixed inset-0 z-[100] flex items-center justify-center p-6'>
                    <div className='absolute inset-0 bg-[#0A1628]/80 backdrop-blur-md' onClick={() => setShowModal(false)}></div>
                    <div className='bg-white w-full max-w-lg rounded-[40px] p-10 relative z-[110] shadow-2xl animate-slideUp'>
                        <button onClick={() => setShowModal(false)} className='absolute top-6 right-6 text-gray-400 hover:text-[#0A1628] font-black'>✕</button>
                        
                        <div className='text-center mb-8'>
                            <h2 className='text-3xl font-black text-[#0A1628]'>{formType === 'donor' ? 'Donor Registration' : 'Urgent Blood Request'}</h2>
                            <p className='text-gray-400 font-medium mt-2'>Please provide verified details for the {formType} portal.</p>
                        </div>

                        <form onSubmit={handleSubmit} className='space-y-6'>
                            <div>
                                <label className='text-xs font-black uppercase text-gray-400 tracking-widest ml-1'>Full Name</label>
                                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className='w-full bg-gray-50 border-none rounded-2xl p-4 mt-1 font-bold text-[#0A1628] focus:ring-2 focus:ring-[#00D4AA] transition-all' placeholder='Enter your name' />
                            </div>
                            
                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    <label className='text-xs font-black uppercase text-gray-400 tracking-widest ml-1'>Blood Group</label>
                                    <select value={formData.group} onChange={(e) => setFormData({...formData, group: e.target.value})} className='w-full bg-gray-50 border-none rounded-2xl p-4 mt-1 font-bold text-[#0A1628] focus:ring-2 focus:ring-[#00D4AA] outline-none'>
                                        {bloodGroups.filter(g => g !== 'All').map(g => <option key={g} value={g}>{g}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className='text-xs font-black uppercase text-gray-400 tracking-widest ml-1'>Phone Number</label>
                                    <input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className='w-full bg-gray-50 border-none rounded-2xl p-4 mt-1 font-bold text-[#0A1628] focus:ring-2 focus:ring-[#00D4AA] outline-none' placeholder='+1 234...' />
                                </div>
                            </div>

                            <div>
                                <label className='text-xs font-black uppercase text-gray-400 tracking-widest ml-1'>Hospital/Location</label>
                                <input required type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className='w-full bg-gray-50 border-none rounded-2xl p-4 mt-1 font-bold text-[#0A1628] focus:ring-2 focus:ring-[#00D4AA] outline-none' placeholder='Current city or hospital name' />
                            </div>

                            <button type='submit' className={`w-full py-5 rounded-2xl font-black text-white shadow-xl transition-all hover:scale-105 active:scale-95 ${formType === 'donor' ? 'bg-[#00D4AA] text-[#0A1628]' : 'bg-red-500'}`}>
                                {formType === 'donor' ? 'Complete Registration' : 'Broadcast Request'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}


export default BloodBank
