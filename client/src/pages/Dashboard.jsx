import React, { useState, useEffect } from 'react'
import { Gem, Sparkles, History, ArrowRight } from 'lucide-react';
import { useAuth, useUser } from "@clerk/react";
import Creationitems from '../components/Creationitems';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [creation, setCreation] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth()

  const getDashBoard = async () => {
    try {
      const { data } = await axios.get('/api/user/get-user-creations', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
      if (data.success) {
        setCreation(data.creations)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false);
  }

  const handleDeleteCreation = async (id) => {
    if (!window.confirm("Are you sure you want to delete this creation?")) {
      return;
    }
    try {
      const { data } = await axios.post('/api/user/delete-creation', { id }, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
      if (data.success) {
        toast.success(data.message || "Creation deleted successfully")
        setCreation(prev => prev.filter(item => item.id !== id))
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user) {
      getDashBoard()
    }
  }, [user])

  const isPremium = user?.publicMetadata?.plan === 'premium';

  return (
    <div className='min-h-full p-6 sm:p-8 text-slate-700 max-w-7xl mx-auto space-y-8'>
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Welcome back, {user?.firstName || 'Creator'}!
          </h1>
          <p className="text-slate-500 mt-1">
            Monitor your usage, view recent creations, and generate new content.
          </p>
        </div>
      </div>

      {/* Metrics Section */}
      <div className='flex gap-6 flex-wrap'>
        {/* Metric 1: Total Creations */}
        <div className='flex justify-between items-center w-full sm:w-80 p-6 bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group'>
          <div className='space-y-1'>
            <p className='text-xs font-semibold text-slate-400 uppercase tracking-wider'>Total Creations</p>
            <h2 className='text-3xl font-bold text-slate-800 transition-colors group-hover:text-[#3588F2]'>
              {creation.length}
            </h2>
          </div>
          <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center shadow-md shadow-blue-100'>
            <Sparkles className='w-6 h-6 text-white' />
          </div>
        </div>

        {/* Metric 2: Active Plan */}
        <div className='flex justify-between items-center w-full sm:w-80 p-6 bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group'>
          <div className='space-y-1'>
            <p className='text-xs font-semibold text-slate-400 uppercase tracking-wider'>Active Plan</p>
            <h2 className={`text-2xl font-bold transition-colors ${
              isPremium ? 'text-amber-500 group-hover:text-amber-600' : 'text-slate-700 group-hover:text-[#0BB0D7]'
            }`}>
              {isPremium ? 'Premium Plan' : 'Free Plan'}
            </h2>
          </div>
          <div className={`w-12 h-12 rounded-xl text-white flex justify-center items-center shadow-md ${
            isPremium 
              ? 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-amber-100' 
              : 'bg-gradient-to-br from-slate-400 to-slate-500 shadow-slate-100'
          }`}>
            <Gem className='w-6 h-6 text-white' />
          </div>
        </div>
      </div>

      {/* History and Creations Section */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex justify-center items-center">
            <History className="w-5 h-5 text-indigo-500" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Recent Creations</h2>
            <p className="text-xs text-slate-400">Your generated outputs and assets history</p>
          </div>
        </div>

        {loading ? (
          <div className='flex justify-center items-center py-16'>
            <div className='animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500'></div>
          </div>
        ) : creation.length === 0 ? (
          <div className='flex flex-col justify-center items-center py-16 text-center space-y-4'>
            <History className='w-16 h-16 text-slate-200' />
            <div>
              <h3 className='text-slate-600 font-medium text-base mb-1'>No Creations Found</h3>
              <p className='text-slate-400 text-sm max-w-sm'>You haven't generated any AI content yet. Explore the AI tools from the sidebar to get started!</p>
            </div>
          </div>
        ) : (
          <div className='space-y-4 max-w-5xl'>
            {creation.map((item) => (
              <Creationitems key={item.id} item={item} onDelete={handleDeleteCreation} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
