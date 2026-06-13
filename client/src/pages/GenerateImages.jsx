import React, { useState } from 'react'
import { Sparkles, Image, Check } from 'lucide-react'
import { useAuth } from '@clerk/react';
import axios from "axios"
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImages = () => {
  const imageStyle = ['Realistic', 'Ghibli style', 'Anime style', 'Cartoon style',
    'Fantasy style', 'Realistic style', '3D style', 'Portrait style']
  const [selectedStyle, setselectedStyle] = useState(imageStyle[0]);
  const [input, setInput] = useState('');
  const [publish, setPublish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('')

  const { getToken } = useAuth()

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const prompt = `Generate an Image of ${input} in the style ${selectedStyle}`
      const { data } = await axios.post('/api/ai/generate-image', { prompt, publish }, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })

      if (data.success) {
        setContent(data.content)
        toast.success("Image generated successfully!")
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
          <Sparkles className="w-8 h-8 text-[#00AD25] animate-pulse" />
          AI Image Generator
        </h1>
        <p className="text-slate-500 mt-1">
          Describe the image you want to see, select an artistic style, and watch AI bring it to life.
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
        {/* Left Column (Configuration Form) */}
        <form onSubmit={onsubmitHandler} className='lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-6'>
          <div>
            <h2 className='text-lg font-semibold text-slate-800 mb-1'>Image Configuration</h2>
            <p className='text-xs text-slate-400'>Describe what you want to generate</p>
          </div>

          <div className="space-y-2">
            <label className='text-sm font-medium text-slate-700'>Image Description (Prompt)</label>
            <textarea 
              onChange={(e) => setInput(e.target.value)} 
              rows={4} 
              value={input} 
              className='w-full p-3 outline-none text-sm rounded-xl border border-slate-200 focus:border-[#00AD25] focus:ring-1 focus:ring-[#00AD25] transition-all resize-none' 
              placeholder='Describe what you want to see in the image in detail...' 
              required 
            />
          </div>

          <div className="space-y-3">
            <label className='text-sm font-medium text-slate-700'>Artistic Style</label>
            <div className="grid grid-cols-2 gap-2">
              {imageStyle.map((item) => (
                <div
                  onClick={() => setselectedStyle(item)}
                  key={item}
                  className={`text-xs p-2.5 border rounded-xl cursor-pointer text-center truncate transition-all ${
                    selectedStyle === item
                      ? "bg-green-50/50 text-[#00AD25] border-[#00AD25] font-medium"
                      : "text-slate-600 border-slate-100 hover:bg-slate-50"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
            <label className="relative cursor-pointer flex items-center">
              <input
                type="checkbox"
                onChange={(e) => setPublish(e.target.checked)}
                checked={publish}
                className="sr-only peer"
              />
              <div className={`w-9 h-5 rounded-full transition ${publish ? 'bg-[#00AD25]' : 'bg-slate-200'}`}>
                <span
                  className={`absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-all ${publish ? 'translate-x-4' : 'translate-x-0'}`}
                ></span>
              </div>
            </label>
            <span className="text-sm font-medium text-slate-600">Make this image Public</span>
          </div>

          <button 
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00AD25] to-[#04FF50] hover:opacity-95 text-white font-medium px-4 py-3 text-sm rounded-xl cursor-pointer shadow-md transition-transform active:scale-98"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                Generating Image...
              </>
            ) : (
              <>
                <Image className="w-5 h-5" />
                Generate Image
              </>
            )}
          </button>
        </form>

        {/* Right Column (Generated Image Output) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 flex flex-col min-h-[450px]">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#00AD25]/10 flex justify-center items-center">
              <Image className="w-5 h-5 text-[#00AD25]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Generated Output</h2>
              <p className="text-xs text-slate-400">High fidelity visualization output</p>
            </div>
          </div>

          {!content ? (
            <div className="flex-1 flex flex-col justify-center items-center py-12 text-center">
              <Image className="w-16 h-16 text-slate-200 mb-4" />
              <h3 className="text-slate-600 font-medium text-base mb-1">No Image Generated</h3>
              <p className="text-slate-400 text-sm max-w-sm">Enter details and choose a style on the left, then click "Generate Image" to create your asset.</p>
            </div>
          ) : (
            <div className="mt-3 flex justify-center items-center flex-1">
              <img src={content} alt="generated" className='max-w-full h-auto rounded-xl shadow-md border border-slate-100 max-h-[550px] object-contain' />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GenerateImages
