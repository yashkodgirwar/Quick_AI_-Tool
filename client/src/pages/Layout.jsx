import React from 'react'
import { assets } from '../assets/assets'
import { Outlet, useNavigate } from 'react-router-dom'
import { X, Menu } from 'lucide-react'
import { useState } from 'react'
import Sidebar from '../components/Sidebar'

const Layout = () => {
    const navigate = useNavigate()
    const [sidebar, setSidebar] = useState(false)

  return (
    <div className="flex flex-col items-start justify-start h-screen">
        <nav className="flex items-center justify-between w-full h-14 border-b border-gray-200 px-4 sm:px-6">
            <img src={assets.logo} alt="Logo" className="w-32 sm:w-44 cursor-pointer" onClick={() => navigate('/')} />
            {
                sidebar ? (
                    <X className="w-6 h-6 text-gray-600 sm:hidden cursor-pointer" onClick={() => setSidebar(false)}/>
                ) : (
                    <Menu className="w-6 h-6 text-gray-600 sm:hidden cursor-pointer" onClick={() => setSidebar(true)}/>
                )
            }
        </nav>
        <div className='flex w-full h-[calc(100vh-56px)] relative'>
            <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
            <div className='flex-1 bg-[#F4F7FB] overflow-y-auto'>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Layout

