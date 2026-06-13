import React, { useState } from 'react'
import { Edit, Sparkles, BookOpen, Check } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '@clerk/react';
import Markdown from 'react-markdown';
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const WriteArticle = () => {
  const articleLength = [
    { length: 800, text: 'Short (500-800 words)' },
    { length: 1200, text: 'Medium (800-1200 words)' },
    { length: 1600, text: 'Long (1200+ words)' }
  ]
  const [selectedlength, setselectedlength] = useState(articleLength[0]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('')

  const { getToken } = useAuth()

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const prompt = `Write an article about ${input} in ${selectedlength.text}`
      const { data } = await axios.post('/api/ai/generate-article', { prompt, length: selectedlength.length }, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })

      if (data.success) {
        setContent(data.content)
        toast.success("Article generated successfully!")
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
          <Sparkles className="w-8 h-8 text-[#4A7AFF] animate-pulse" />
          AI Article Generator
        </h1>
        <p className="text-slate-500 mt-1">
          Configure your topic and desired length to generate a high-quality, structured article.
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
        {/* Left Column (Configuration Form) */}
        <form onSubmit={onsubmitHandler} className='lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-6'>
          <div>
            <h2 className='text-lg font-semibold text-slate-800 mb-1'>Article Configuration</h2>
            <p className='text-xs text-slate-400'>Select topic and output requirements</p>
          </div>

          <div className="space-y-2">
            <label className='text-sm font-medium text-slate-700'>Article Topic</label>
            <input 
              onChange={(e) => setInput(e.target.value)} 
              value={input} 
              type='text' 
              className='w-full p-3 outline-none text-sm rounded-xl border border-slate-200 focus:border-[#4A7AFF] focus:ring-1 focus:ring-[#4A7AFF] transition-all' 
              placeholder='e.g., The Future of Quantum Computing...' 
              required 
            />
          </div>

          <div className="space-y-3">
            <label className='text-sm font-medium text-slate-700'>Article Length</label>
            <div className="flex flex-col gap-2">
              {articleLength.map((item, index) => (
                <div
                  onClick={() => setselectedlength(item)}
                  key={index}
                  className={`flex items-center justify-between text-sm p-3 border rounded-xl cursor-pointer transition-all ${
                    selectedlength.text === item.text
                      ? "bg-blue-50/50 text-[#4A7AFF] border-[#4A7AFF] font-medium"
                      : "text-slate-600 border-slate-100 hover:bg-slate-50"
                  }`}
                >
                  <span>{item.text}</span>
                  {selectedlength.text === item.text && <Check className="w-4 h-4 text-[#4A7AFF]" />}
                </div>
              ))}
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] hover:opacity-95 text-white font-medium px-4 py-3 text-sm rounded-xl cursor-pointer shadow-md transition-transform active:scale-98"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                Generating Article...
              </>
            ) : (
              <>
                <Edit className="w-5 h-5" />
                Generate Article
              </>
            )}
          </button>
        </form>

        {/* Right Column (Generated Article) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 flex flex-col min-h-[450px]">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#4A7AFF]/10 flex justify-center items-center">
              <BookOpen className="w-5 h-5 text-[#4A7AFF]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Generated Article</h2>
              <p className="text-xs text-slate-400">Your custom structured publication</p>
            </div>
          </div>

          {!content ? (
            <div className="flex-1 flex flex-col justify-center items-center py-12 text-center">
              <Edit className="w-16 h-16 text-slate-200 mb-4" />
              <h3 className="text-slate-600 font-medium text-base mb-1">No Article Generated</h3>
              <p className="text-slate-400 text-sm max-w-sm">Enter a topic and configuration on the left and click "Generate Article" to start writing.</p>
            </div>
          ) : (
            <div className='flex-1 text-slate-600 max-w-none overflow-y-auto pr-2'>
              <Markdown
                components={{
                  h1: ({node, ...props}) => <h1 className="text-2xl font-bold mt-6 mb-4 text-slate-800 flex items-center gap-2 border-b pb-2 border-slate-100" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-xl font-bold mt-5 mb-3 text-slate-800 border-b pb-1 border-slate-100" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-lg font-semibold mt-4 mb-2 text-slate-800" {...props} />,
                  p: ({node, ...props}) => <p className="mb-4 text-sm leading-relaxed text-slate-600" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4 space-y-2 text-sm text-slate-600" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-4 space-y-2 text-sm text-slate-600" {...props} />,
                  li: ({node, ...props}) => <li className="mb-1 pl-1" {...props} />,
                  code: ({node, ...props}) => <code className="bg-slate-50 text-[#FF4938] px-1.5 py-0.5 rounded font-mono text-xs border border-slate-100" {...props} />,
                  hr: ({node, ...props}) => <hr className="my-6 border-slate-100" {...props} />,
                  strong: ({node, ...props}) => <strong className="font-semibold text-slate-800" {...props} />,
                }}
              >
                {content}
              </Markdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WriteArticle
