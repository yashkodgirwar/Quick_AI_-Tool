import React from 'react'
import {assets} from '../assets/assets'
import {useNavigate} from 'react-router-dom'
import { ArrowRight} from 'lucide-react'
import { SignInButton, UserButton, Show } from '@clerk/react'

const Navbar = () => {
    const navigate = useNavigate()
  return (
    
    <div className='fixed z-40 w-full backdrop-blur-2xl flex justify-between
items-center py-3 px-4 sm:px-20 xl:px-32 cursor-pointer bg-white/40'>
     <img src={assets.logo} alt="Logo" className='w-32 sm:w-44 cursor-pointer' onClick={()=> navigate('/')}/>
     
     <Show when="signed-out">
       <SignInButton mode="modal">
         <button className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5'>
           Get Started
           <ArrowRight className='w-4 h-4' />
         </button>
       </SignInButton>
     </Show>

     <Show when="signed-in">
       <UserButton />
     </Show>
     
    </div>
  )
}

export default Navbar
