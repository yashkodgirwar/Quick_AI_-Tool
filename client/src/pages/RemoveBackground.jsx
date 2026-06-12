import React from 'react'
import { Edit, Sparkles, Hash, Eraser } from 'lucide-react'
import { useState } from 'react'
import { getToken, useAuth } from '@clerk/react';
import axios from "axios"
import toast from 'react-hot-toast';

axios.defaults.baseURL=import.meta.env.VITE_BASE_URL;

const RemoveBackground = () => {


  const [file, setFile] = useState(null);
     const [loading,setLoading] =useState(false);
     const[content,setContent]=useState('')

      const {gettoken}=useAuth()

  const onsubmitHandler = async (e) => {
    e.preventDefault();
     try{
      setLoading(true)
      const formData =new formData()
      formData.append('image',input)
      const data=await axios.post('/api/ai/remove-image-background',formData,{
        headers:{Authorization:`Bearer ${await getToken()}`}
      })

      if(data.success){
        setContent(data.content)
      }else{
        toast.error(data.message)
      }
    }catch(error){
      toast.error(error.message)
    }
    setLoading(false);
  }
  }
  return (
    <div className='h-full  overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700 '>
      {/* left col  */}
      <form onSubmit={onsubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 outline'>
        <div className='flex items-center gap-3 text-gray-600'>
          <Sparkles className='w-6 text-[#FF4938]' />
          <h1 className='text-xl font-semibold '>Background Removal</h1>
        </div>
        <p className='mt-5 text-sm font-medium '>
          Upload Image
        </p>

        <input onChange={(e) => setFile(e.target.files[0])} type='file' accept='image/*' className='w-full p-2 mt-3 outline-none text-sm rounded-md border border-gray-300 mb-2' required />
        <p className='mt-4 text-sm font-medium'>Support JPG, PNG and other image formats</p>


        <button disabled={loading}
          className="w-full flex justify-center items-center gap-2
  bg-gradient-to-r from-[#FF9688] to-[#FF4938] text-white px-4 py-2 mt-6
  text-sm rounded-lg cursor-pointer transition-transform duration-200 hover:scale-105 shadow-md"
        >
         {loading ? <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span> :   <Eraser className="w-5" />}
          Remove Background
        </button>


      </form>
      {/* right-col */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border
border-gray-200 min-h-[24rem] ">

        <div className="flex items-center gap-3">
          <Eraser className="w-5 h-5 text-[#FF4938]" />
          <h1 className="text-xl font-semibold">Processed Image</h1>
        </div>
       
               { !content ?
               (<div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
            <Hash className="w-9 h-9" />
            <p>Upload an image and click "Remove background" to get started</p>
          </div>
        </div>):(
          <div>
            <img src={content} alt="image" className='mt-3 w-full h-full'></img>
          </div>
        )}      
        
      </div>



      <div>

      </div>
    </div>

  )


export default RemoveBackground
