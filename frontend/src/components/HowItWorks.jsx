import React from 'react'

const HowItWorks = () => {
    const steps = [
        {
            num: '01',
            title: 'Search Specialist',
            desc: 'Search by symptom, name, or medical specialty.',
            icon: '🔍',
            bg: 'bg-blue-50'
        },
        {
            num: '02',
            title: 'Pick Time Slot',
            desc: 'Choose a verified doctor & preferred time slot.',
            icon: '📅',
            bg: 'bg-[#00D4AA]/10'
        },
        {
            num: '03',
            title: 'Instant Confirmation',
            desc: 'Get confirmed & start your clinical consultation.',
            icon: '✅',
            bg: 'bg-indigo-50'
        }
    ]

    return (
        <section className='py-32 px-6 bg-white overflow-hidden'>
            <div className='max-w-[1280px] mx-auto text-center'>
                <p className='text-[#00D4AA] font-black tracking-[0.2em] uppercase text-xs mb-4'>Seamless Process</p>
                <h2 className='text-4xl md:text-6xl font-black text-[#0A1628] leading-tight'>
                    Your Healthcare, <br /> in Three Simple Steps
                </h2>
                
                <div className='grid grid-cols-1 md:grid-cols-3 gap-12 mt-24 relative'>
                    
                    {/* Dashed Connector Line */}
                    <div className='hidden md:block absolute top-[40%] left-0 w-full h-[2px] border-t-2 border-dashed border-gray-100 z-0'></div>

                    {steps.map((step, index) => (
                        <div key={index} className='relative z-10 group tilt-card'>
                            <div className={`w-28 h-28 rounded-[35px] ${step.bg} mx-auto flex items-center justify-center text-4xl shadow-xl group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500`}>
                                {step.icon}
                            </div>
                            
                            <div className='mt-8 bg-white p-10 rounded-[40px] border border-gray-50 shadow-2xl shadow-gray-100/50'>
                                <span className='text-[50px] font-black text-gray-100 absolute -top-8 -right-4 opacity-50'>{step.num}</span>
                                <h3 className='text-2xl font-black text-[#0A1628]'>{step.title}</h3>
                                <p className='text-gray-500 font-medium mt-4 leading-relaxed'>{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HowItWorks
