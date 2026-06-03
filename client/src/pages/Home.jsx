import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AiTools from '../components/AItools'
import Testimonials from '../components/Testimonial'
import Plan from"../components/Plan"
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <AiTools/>
        <Testimonials/>
        <Plan/>
        <Footer/>
    </div>
  )
}

export default Home
