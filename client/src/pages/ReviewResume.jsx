import React, { useState } from 'react'
import { FileText, Sparkles, UploadCloud, CheckCircle } from 'lucide-react';
import { useAuth } from '@clerk/react';
import axios from "axios"
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('')

  const { getToken } = useAuth()

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    if (!file) {
      return toast.error("Please upload a resume file.");
    }
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('resume', file)
      const { data } = await axios.post('/api/ai/review-resume', formData, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })

      if (data.success) {
        setContent(data.content)
        toast.success("Resume analysis completed!")
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
          <Sparkles className="w-8 h-8 text-[#00DA83] animate-pulse" />
          AI Resume Reviewer
        </h1>
        <p className="text-slate-500 mt-1">
          Upload your resume in PDF format to get a comprehensive, detailed review and actionable optimization tips.
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
        {/* Left Column (Upload Form) */}
        <form onSubmit={onsubmitHandler} className='lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-6'>
          <div>
            <h2 className='text-lg font-semibold text-slate-800 mb-1'>Upload Resume</h2>
            <p className='text-xs text-slate-400'>Upload your PDF file (max size 5MB)</p>
          </div>

          <label className="border-2 border-dashed border-slate-200 hover:border-[#00DA83] rounded-xl p-8 transition-all flex flex-col items-center justify-center text-center cursor-pointer bg-slate-50/50 hover:bg-slate-50 relative group">
            <input 
              onChange={(e) => setFile(e.target.files[0])} 
              type='file' 
              accept='application/pdf' 
              className='hidden' 
              required 
            />
            {file ? (
              <div className="flex flex-col items-center">
                <CheckCircle className="w-12 h-12 text-[#00DA83] mb-3" />
                <span className="text-sm font-medium text-slate-700 max-w-[200px] truncate">{file.name}</span>
                <span className="text-xs text-slate-400 mt-1">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <UploadCloud className="w-12 h-12 text-slate-400 group-hover:text-[#00DA83] transition-colors mb-3" />
                <span className="text-sm font-medium text-slate-600">Choose file or drag & drop</span>
                <span className="text-xs text-slate-400 mt-1">Supports PDF only</span>
              </div>
            )}
          </label>

          <button 
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00DA83] to-[#00AD25] hover:opacity-95 text-white font-medium px-4 py-3 text-sm rounded-xl cursor-pointer shadow-md transition-transform active:scale-98"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                Analyzing Resume...
              </>
            ) : (
              <>
                <FileText className="w-5 h-5" />
                Review Resume
              </>
            )}
          </button>
        </form>

        {/* Right Column (Results) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 flex flex-col min-h-[450px]">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#FF4938]/10 flex justify-center items-center">
              <FileText className="w-5 h-5 text-[#FF4938]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Analysis Results</h2>
              <p className="text-xs text-slate-400">Detailed AI evaluation of your profile</p>
            </div>
          </div>

          {!content ? (
            <div className="flex-1 flex flex-col justify-center items-center py-12 text-center">
              <FileText className="w-16 h-16 text-slate-200 mb-4" />
              <h3 className="text-slate-600 font-medium text-base mb-1">No Evaluation Ready</h3>
              <p className="text-slate-400 text-sm max-w-sm">Upload your resume on the left and click "Review Resume" to generate your detailed feedback report.</p>
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

export default ReviewResume
