import React from 'react'

const Testimonials = () => {
    const reviews = [
        {
            name: 'Emily Henderson',
            condition: 'Orthopedic Patient',
            text: 'The booking process was incredibly smooth. I found a top neurologist and had my consultation within 24 hours. Truly revolutionized my healthcare experience.',
            rating: 5
        },
        {
            name: 'Marcus Chen',
            condition: 'Cardiology Checkup',
            text: 'I love how clean the interface is. No more waiting on hold for hours. CuraSync makes it simple to see real-time availability and confirm instantly.',
            rating: 5
        },
        {
            name: 'Sarah Williams',
            condition: 'Pediatric Care',
            text: 'Highly recommended for busy parents. Being able to chat with the doctor before the appointment gave us so much peace of mind.',
            rating: 5
        }
    ]

    return (
        <section className='py-32 px-6 bg-[#F8FAFF]'>
            <div className='max-w-[1280px] mx-auto'>
                <div className='text-center mb-20'>
                    <p className='text-[#00D4AA] font-black tracking-widest uppercase text-xs mb-4'>Patient Voices</p>
                    <h2 className='text-4xl md:text-6xl font-black text-[#0A1628]'>Trusted by Thousands</h2>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    {reviews.map((rev, index) => (
                        <div key={index} className='bg-white p-12 rounded-[40px] border-l-4 border-[#00D4AA] shadow-xl shadow-gray-100 flex flex-col justify-between tilt-card'>
                            <div>
                                <div className='flex gap-1 text-[#00D4AA] mb-6'>
                                    {[...Array(rev.rating)].map((_, i) => <span key={i}>★</span>)}
                                </div>
                                <p className='text-gray-600 text-lg font-medium leading-relaxed italic'>"{rev.text}"</p>
                            </div>
                            
                            <div className='mt-10 flex items-center gap-4'>
                                <div className='w-12 h-12 rounded-full bg-gray-200'></div>
                                <div>
                                    <h4 className='text-[#0A1628] font-black'>{rev.name}</h4>
                                    <p className='text-xs font-bold text-gray-400 uppercase tracking-widest'>{rev.condition}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Testimonials
