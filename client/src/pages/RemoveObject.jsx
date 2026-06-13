import React, { useState } from 'react'
import { Sparkles, Hash, Eraser, UploadCloud, CheckCircle } from 'lucide-react'
import { useAuth } from '@clerk/react';
import axios from "axios"
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveObject = () => {
  const [file, setFile] = useState(null);
  const [object, setobject] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('')

  const { getToken } = useAuth()

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    if (!file) {
      return toast.error("Please upload an image first.");
    }
    if (object.trim().split(/\s+/).length > 1) {
      return toast.error("Please enter only one object name.");
    }
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('image', file)
      formData.append('object', object)

      const { data } = await axios.post('/api/ai/remove-image-object', formData, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })

      if (data.success) {
        setContent(data.content)
        toast.success("Object removed successfully!")
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
          AI Object Remover
        </h1>
        <p className="text-slate-500 mt-1">
          Upload an image, describe a single object you want to erase, and watch AI seamlessly paint it out.
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
        {/* Left Column (Upload & Settings Form) */}
        <form onSubmit={onsubmitHandler} className='lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-6'>
          <div>
            <h2 className='text-lg font-semibold text-slate-800 mb-1'>Object Eraser</h2>
            <p className='text-xs text-slate-400'>Select image and specify object</p>
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

          <div className="space-y-2">
            <label className='text-sm font-medium text-slate-700'>Object to Remove</label>
            <input 
              onChange={(e) => setobject(e.target.value)} 
              value={object} 
              type='text' 
              className='w-full p-3 outline-none text-sm rounded-xl border border-slate-200 focus:border-[#FF4938] focus:ring-1 focus:ring-[#FF4938] transition-all' 
              placeholder='e.g., cup, chair, person' 
              required 
            />
            <p className="text-slate-400 text-xs mt-1">Type exactly one word for best results.</p>
          </div>

          <button 
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#F6AB41] to-[#FF4938] hover:opacity-95 text-white font-medium px-4 py-3 text-sm rounded-xl cursor-pointer shadow-md transition-transform active:scale-98"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                Processing Image...
              </>
            ) : (
              <>
                <Eraser className="w-5 h-5" />
                Remove Object
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
              <p className="text-xs text-slate-400">Object removed using AI generative fill</p>
            </div>
          </div>

          {!content ? (
            <div className="flex-1 flex flex-col justify-center items-center py-12 text-center">
              <Eraser className="w-16 h-16 text-slate-200 mb-4" />
              <h3 className="text-slate-600 font-medium text-base mb-1">No Image Processed</h3>
              <p className="text-slate-400 text-sm max-w-sm">Upload your picture on the left, name the object to erase, and hit "Remove Object" to see the output.</p>
            </div>
          ) : (
            <div className="mt-3 flex justify-center items-center flex-1">
              <img src={content} alt="processed" className='max-w-full h-auto rounded-xl shadow-md border border-slate-100 max-h-[550px] object-contain' />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RemoveObject
