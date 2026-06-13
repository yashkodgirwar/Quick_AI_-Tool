import React, { useState } from 'react'
import { Sparkles, Hash, Eraser, UploadCloud, CheckCircle } from 'lucide-react'
import { useAuth } from '@clerk/react';
import axios from "axios"
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveBackground = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('')

  const { getToken } = useAuth()

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    if (!file) {
      return toast.error("Please upload an image first.");
    }
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('image', file)
      const { data } = await axios.post('/api/ai/remove-image-background', formData, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })

      if (data.success) {
        setContent(data.content)
        toast.success("Background removed successfully!")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false);
  }

  return (
    <div className='min-h-full p-6 sm:p-8 text-slate-700 max-w-7xl mx-auto'>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
          <Sparkles className="w-8 h-8 text-[#FF4938] animate-pulse" />
          AI Background Remover
        </h1>
        <p className="text-slate-500 mt-1">
          Upload any picture and instantly remove the background with high precision using AI.
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
        {/* Left Column (Upload Form) */}
        <form onSubmit={onsubmitHandler} className='lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-6'>
          <div>
            <h2 className='text-lg font-semibold text-slate-800 mb-1'>Background Eraser</h2>
            <p className='text-xs text-slate-400'>Select image to isolate subject</p>
          </div>

          <label className="border-2 border-dashed border-slate-200 hover:border-[#FF4938] rounded-xl p-8 transition-all flex flex-col items-center justify-center text-center cursor-pointer bg-slate-50/50 hover:bg-slate-50 relative group">
            <input 
              onChange={(e) => setFile(e.target.files[0])} 
              type='file' 
              accept='image/*' 
              className='hidden' 
              required 
            />
            {file ? (
              <div className="flex flex-col items-center">
                <CheckCircle className="w-12 h-12 text-[#FF4938] mb-3" />
                <span className="text-sm font-medium text-slate-700 max-w-[200px] truncate">{file.name}</span>
                <span className="text-xs text-slate-400 mt-1">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <UploadCloud className="w-12 h-12 text-slate-400 group-hover:text-[#FF4938] transition-colors mb-3" />
                <span className="text-sm font-medium text-slate-600">Choose image or drag & drop</span>
                <span className="text-xs text-slate-400 mt-1">Supports JPG, PNG, WEBP</span>
              </div>
            )}
          </label>

          <button 
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#FF9688] to-[#FF4938] hover:opacity-95 text-white font-medium px-4 py-3 text-sm rounded-xl cursor-pointer shadow-md transition-transform active:scale-98"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                Processing Background...
              </>
            ) : (
              <>
                <Eraser className="w-5 h-5" />
                Remove Background
              </>
            )}
          </button>
        </form>

        {/* Right Column (Processed Output) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 flex flex-col min-h-[450px]">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#FF4938]/10 flex justify-center items-center">
              <Eraser className="w-5 h-5 text-[#FF4938]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Processed Output</h2>
              <p className="text-xs text-slate-400">Isolated subject with transparent background</p>
            </div>
          </div>

          {!content ? (
            <div className="flex-1 flex flex-col justify-center items-center py-12 text-center">
              <Eraser className="w-16 h-16 text-slate-200 mb-4" />
              <h3 className="text-slate-600 font-medium text-base mb-1">No Image Processed</h3>
              <p className="text-slate-400 text-sm max-w-sm">Upload your picture on the left and click "Remove Background" to see the output.</p>
            </div>
          ) : (
            <div className="mt-3 flex justify-center items-center flex-1 bg-slate-50 border border-slate-100 rounded-xl p-4 [background-image:linear-gradient(45deg,#ccc_25%,transparent_25%),linear-gradient(-45deg,#ccc_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#ccc_75%),linear-gradient(-45deg,transparent_75%,#ccc_75%)] [background-size:20px_20px] [background-position:0_0,0_10px,10px_-10px,-10px_0px]">
              <img src={content} alt="processed" className='max-w-full h-auto rounded-xl max-h-[500px] object-contain' />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RemoveBackground
