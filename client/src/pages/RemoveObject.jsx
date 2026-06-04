import { Scissors,Sparkles } from 'lucide-react';
import React from 'react'
import { useState } from 'react';

const RemoveObject = () => {
   
  const [input, setInput] = useState('');
  const [object, setobject] = useState('');

  const onsubmitHandler = async (e) => {
    e.preventDefault();
  }
  return (
    <div className='h-full  overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700 '>
      {/* left col  */}
      <form onSubmit={onsubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 outline'>
        <div className='flex items-center gap-3 text-gray-600'>
          <Sparkles className='w-6 text-[#FF4938]' />
          <h1 className='text-xl font-semibold '> Object  Removal</h1>
        </div>
        <p className='mt-5 text-sm font-medium '>
          Upload Image
        </p>

        <input onChange={(e) => setInput(e.target.files[0])} value={input} type='file' accept='image/*' className='w-full p-2 mt-3 outline-none text-sm rounded-md border border-gray-300 mb-2' required />
       
       <p className='mt-5 text-sm font-medium '>
          e.g.. watch or spoon ,Only single object name
        </p>

        <textarea onChange={(e) => setobject(e.target.value)} rows={4} value={object} type='text' className='w-full p-2 mt-3 outline-none text-sm rounded-md border border-gray-300 mb-2' placeholder='Describe what you want to see in the image' required />

        <button
          className="w-full flex justify-center items-center gap-2
  bg-gradient-to-r from-[#FF5310] to-[#FF4970] text-white px-4 py-2 mt-6
  text-sm rounded-lg cursor-pointer transition-transform duration-200 hover:scale-105 shadow-md"
        >
          <Scissors className="w-5" />
          Remove Object
        </button>


      </form>
      {/* right-col */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border
border-gray-200 min-h-[24rem] ">

        <div className="flex items-center gap-3">
          <Scissors className="w-5 h-5 text-[#FF4938]" />
          <h1 className="text-xl font-semibold">Processed Image</h1>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
            <Scissors className="w-9 h-9" />
            <p>Upload an image and click "Remove Object" to get started</p>
          </div>
        </div>
      </div>



      <div>

      </div>
    </div>
  );
}

export default RemoveObject
