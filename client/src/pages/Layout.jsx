import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Outlet, useNavigate } from 'react-router-dom'
import { X, Menu } from 'lucide-react'
import { useUser, SignIn } from '@clerk/react'
import Sidebar from '../components/Sidebar'

const Layout = () => {
    const navigate = useNavigate()
    const [sidebar, setSidebar] = useState(false)
    const { user, isLoaded } = useUser()

    // Reload user metadata to ensure we show the latest subscription plan
    useEffect(() => {
        if (user) {
            user.reload().catch(err => console.error("Error reloading user plan:", err))
        }
    }, [user?.id])

    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center h-screen bg-[#F4F7FB]">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#5044E5]"></div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-start h-screen w-full bg-[#F4F7FB]">
                <nav className="flex items-center justify-between w-full h-14 border-b border-gray-200 bg-white px-4 sm:px-6">
                    <img src={assets.logo} alt="Logo" className="w-32 sm:w-44 cursor-pointer" onClick={() => navigate('/')} />
                </nav>
                <div className="flex-1 flex items-center justify-center p-4">
                    <SignIn />
                </div>
            </div>
        )
    }

  return (
    <div className="flex flex-col items-start justify-start h-screen">
        <nav className="flex items-center justify-between w-full h-14 border-b border-gray-200 px-4 sm:px-6 bg-white">
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

