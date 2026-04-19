import React from 'react'

const Footer = () => {
    return (
        <footer className='bg-[#0A1628] pt-32 pb-12 px-6'>
            <div className='max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 pb-20 border-b border-white/5'>
                
                {/* Column 1: Branding */}
                <div className='flex flex-col gap-6'>
                    <div className='flex items-center gap-2'>
                        <div className='w-10 h-10 bg-[#00D4AA] rounded-xl flex items-center justify-center shadow-lg'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 4V20M4 12H20" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <span className='text-3xl font-black tracking-tighter text-white'>
                            Cura<span className='text-[#00D4AA]'>Sync</span>
                        </span>
                    </div>
                    <p className='text-gray-400 text-lg leading-relaxed'>
                        Synchronizing the world's medical expertise with patients who need it most. Leading with technology, fueled by care.
                    </p>
                    <div className='flex gap-4'>
                        {['𝕏', 'f', '📸', 'in'].map(s => (
                            <div key={s} className='w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white font-bold hover:bg-[#00D4AA] hover:text-[#0A1628] transition-all cursor-pointer'>
                                {s}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Column 2: Platform */}
                <div>
                    <h4 className='text-white font-black uppercase tracking-widest text-xs mb-10'>Platform</h4>
                    <ul className='space-y-6 text-gray-400 font-bold'>
                        <li className='hover:text-[#00D4AA] cursor-pointer transition-all'>Find Doctors</li>
                        <li className='hover:text-[#00D4AA] cursor-pointer transition-all'>Symptom Search</li>
                        <li className='hover:text-[#00D4AA] cursor-pointer transition-all'>Online Consults</li>
                        <li className='hover:text-[#00D4AA] cursor-pointer transition-all'>Prescription Vault</li>
                    </ul>
                </div>

                {/* Column 3: Company */}
                <div>
                    <h4 className='text-white font-black uppercase tracking-widest text-xs mb-10'>Company</h4>
                    <ul className='space-y-6 text-gray-400 font-bold'>
                        <li className='hover:text-[#00D4AA] cursor-pointer transition-all'>About CuraSync</li>
                        <li className='hover:text-[#00D4AA] cursor-pointer transition-all'>Privacy Policy</li>
                        <li className='hover:text-[#00D4AA] cursor-pointer transition-all'>Terms of Service</li>
                        <li className='hover:text-[#00D4AA] cursor-pointer transition-all'>HIPAA Compliance</li>
                    </ul>
                </div>

                {/* Column 4: Newsletter */}
                <div>
                    <h4 className='text-white font-black uppercase tracking-widest text-xs mb-10'>Join the Future</h4>
                    <p className='text-gray-400 font-medium mb-8 leading-relaxed'>
                        Get the latest medical news and feature updates directly in your inbox.
                    </p>
                    <div className='relative'>
                        <input type="email" placeholder='Email address' className='w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm focus:outline-none focus:border-[#00D4AA]' />
                        <button className='absolute right-2 top-2 bottom-2 bg-[#00D4AA] text-[#0A1628] px-6 rounded-xl font-bold hover:scale-105 transition-all text-xs'>JOIN</button>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className='max-w-[1280px] mx-auto pt-12 flex flex-col md:flex-row items-center justify-between gap-8'>
                <p className='text-gray-500 text-xs font-bold uppercase tracking-widest'>© 2026 CuraSync Health. All Rights Reserved.</p>
                <div className='flex gap-10 opacity-30 grayscale'>
                    <div className='text-white font-black italic text-sm tracking-tighter'>HIPAA COMPLIANT</div>
                    <div className='text-white font-black italic text-sm tracking-tighter'>SSL SECURED</div>
                    <div className='text-white font-black italic text-sm tracking-tighter'>FDA APPROVED</div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
