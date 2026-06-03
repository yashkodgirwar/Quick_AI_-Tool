import React from 'react'
import {PricingTable} from '@clerk/react'

const Plan = () => {
  return (
    <div className='max-w-2xl mx-auto z-20 my-20'>
        <div className='text-center mt-1'>
        <h2 className="text-[42px] font-semibold text-black">Choose Your Plan</h2>
         <p className='text-gray-500 '>Start for free and scale up as you grow.
Find the perfect plan for your content creation needs.</p>
        </div>
      <div className='mt-10'>
        <PricingTable/>
      </div>
    </div>

  )
}

export default Plan
