import React from 'react'
import { dummyCreationData } from '../assets/assets'
import { Gem, Sparkles } from 'lucide-react';
import { useUser } from "@clerk/react";
import Creationitems from '../components/Creationitems';

const Dashboard = () => {
  const { user } = useUser();
  const creation = dummyCreationData;
  return (
    <div className='h-full overflow-y-scroll p-6'>
      <div className='flex justify-start gap-4 flex-wrap'>
        <div className=' outline flex justify-between items-center w-72 p-4 bg-white rounded-xl border-gray-200'>
          <div className='text-slate-600'>
            <p className='text-sm'>Total Creations</p>
            <h2 className='text-xl font-semibold'>{creation.length}</h2>
          </div>
          <div className='w-10 h-10 rounded-1g bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center'>
            <Sparkles className='w-5 text-white' />
          </div>
        </div>
        <div className=' outline flex justify-between items-center w-72 p-4 bg-white rounded-xl border-gray-200'>
          <div className='text-slate-600'>
            <p className='text-sm'>Active Plan</p>
            <h2 className='text-xl font-semibold'> {user?.publicMetadata?.plan === 'premium' ? 'Premium Plan' : 'Free Plan'}</h2>
          </div>
          <div className='w-10 h-10 rounded-1g bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center'>
            <Gem className='w-5 text-white' />
          </div>
        </div>

      </div>

     <div className='space-y-3 mt-10'>
      <p className='mt-6 mb-4'>Recent Creation</p>
      {
        creation.map((item)=> <Creationitems key={item.id} item={item}/>)
      }
         
     </div>
    </div>
  )
}

export default Dashboard
