import React from 'react'

const StatsStrip = () => {
    const stats = [
        { label: 'Verified Patients', value: '50K+', icon: '👤', color: 'text-blue-500' },
        { label: 'Certified Doctors', value: '1,200+', icon: '🩺', color: 'text-[#00D4AA]' },
        { label: 'Patient Satisfaction', value: '98%', icon: '★', color: 'text-indigo-500' },
        { label: 'Support Available', value: '24/7', icon: '📞', color: 'text-pink-500' }
    ]

    return (
        <div className='w-full py-12 bg-white relative z-20 shadow-2xl'>
            <div className='max-w-[1280px] mx-auto px-6'>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4'>
                    {stats.map((stat, index) => (
                        <div key={index} className='flex items-center justify-center gap-6 px-4 group'>
                            <div className='w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-3xl group-hover:scale-110 transition-all'>
                                {stat.icon}
                            </div>
                            <div className='text-left'>
                                <h3 className='text-3xl md:text-4xl font-black text-[#0A1628]'>{stat.value}</h3>
                                <p className='text-xs font-bold text-gray-400 uppercase tracking-widest mt-1'>{stat.label}</p>
                            </div>
                            {index < stats.length - 1 && (
                                <div className='hidden md:block w-px h-12 bg-gray-100 ml-auto'></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Background branding */}
            <div className='absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none'>
                <p className='text-[150px] font-black tracking-tighter'>CURASYNC</p>
            </div>
        </div>
    )
}

export default StatsStrip
