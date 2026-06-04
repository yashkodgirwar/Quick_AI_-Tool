import React from 'react'
import {Edit, Sparkles} from 'lucide-react'
import { useState } from 'react'

const WriteArticle = () => {
  const articleLength = [
{length: 800, text: 'Short (500-800 words)'},
{length: 1200, text: 'Medium (800-1200 words)'},
{length: 1600, text: 'Long (1200+ words)'}
  ]
  const[selectedlength,setselectedlength]=useState(articleLength[0]);
  const[input,setinput]=useState('');

  const onsubmitHandler=async(e)=>{
    e.preventDeafault();
  }

  return (
    <div className='h-full  overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700 '>
      {/* left col  */}
      <form  onSubmit={onsubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 outline'>
         <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#4A7AFF]'/>
          <h1 className='text-xl font-semibold '>ArticleConfiguration</h1>
         </div>
         <p className='mt-5 text-sm font-medium '>
          Article Topic
         </p>
         
         <input onChange={(e)=>setInput(e.target.value)} value={input} type='text' className='w-full p-2 mt-3 outline-none text-sm rounded-md border border-gray-300v mb-2' placeholder='the future of artificial intelligence is...' required/>
          <p clasName='mt-4 text-sm font-medium'>Article Length</p>
         <div className="mt-3 flex gap-3 flex-wrap sm:max-w-[82%]">
  {articleLength.map((item, index) => (
    <span
    onClick={()=>setselectedlength(item)}
      key={index}
      className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
        selectedlength.text === item.text
          ? "bg-blue-50 text-blue-700 border-blue-300"
          : "text-gray-500 border-gray-300"
      }`}
    >
      {item.text}
    </span>
  ))}
</div>
<br/>
<button
  className="w-full flex justify-center items-center gap-2
  bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white px-4 py-2 mt-6
  text-sm rounded-lg cursor-pointer transition-transform duration-200 hover:scale-105 shadow-md"
>
  <Edit className="w-5" />
  Generate Article
</button>


      </form>
      {/* right-col */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border
border-gray-200 min-h-[24rem] max-h-[600px]">

  <div className="flex items-center gap-3">
    <Edit className="w-5 h-5 text-[#4A7AFF]" />
    <h1 className="text-xl font-semibold">Generated article</h1>
  </div>

  <div className="flex-1 flex justify-center items-center">
    <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
      <Edit className="w-9 h-9" />
      <p>Enter a topic and click "Generate article" to get started</p>
    </div>
  </div>
</div>

      
      
      <div>

      </div>
    </div>
  )
}

export default WriteArticle
