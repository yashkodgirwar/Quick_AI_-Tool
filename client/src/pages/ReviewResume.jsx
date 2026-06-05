import { FileText, Scissors, Sparkles} from 'lucide-react';
import React from 'react'
import { useState } from 'react';

const ReviewResume = () => {
   
  const [file, setFile] = useState(null);
  

  const onsubmitHandler = async (e) => {
    e.preventDefault();
  }
  return (
    <div className='h-full  overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700 '>
      {/* left col  */}
      <form onSubmit={onsubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 outline'>
        <div className='flex items-center gap-3 text-gray-600'>
          <Sparkles className='w-6 text-[#00DA83]' />
          <h1 className='text-xl font-semibold '> Resume Review</h1>
        </div>
        <p className='mt-5 text-sm font-medium '>
          Upload Resume
        </p>

        <input onChange={(e) => setFile(e.target.files[0])} type='file' accept='application/pdf' className='w-full p-2 mt-3 outline-none text-sm rounded-md border border-gray-300 mb-2' required />
       
       <p className='mt-5 text-sm font-medium '>
         Supports PDF resume only
        </p>

        <button
          className="w-full flex justify-center items-center gap-2
  bg-gradient-to-r from-[#00DA83] to-[#00AD25] text-white px-4 py-2 mt-6
  text-sm rounded-lg cursor-pointer transition-transform duration-200 hover:scale-105 shadow-md"
        >
          <FileText className="w-5" />
          Review Resume
        </button>


      </form>
      {/* right-col */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border
border-gray-200 min-h-[24rem] max-h-[600px]">

        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-[#FF4938]" />
          <h1 className="text-xl font-semibold">Analysis Results</h1>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
            <FileText className="w-9 h-9" />
            <p>Upload a resume and click "Review Resume" to get started</p>
          </div>
        </div>
      </div>



      <div>

      </div>
    </div>
  );
}

export default ReviewResume
