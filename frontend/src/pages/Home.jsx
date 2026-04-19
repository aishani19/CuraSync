import React from 'react'
import Header from '../components/Header'

import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Testimonials from '../components/Testimonials'

const Home = () => {
  return (
    <div className='overflow-x-hidden'>
      <Header />

      <SpecialityMenu />
      <TopDoctors />
      <Testimonials />
    </div>
  )
}

export default Home