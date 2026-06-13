import { ArrowRight, Sparkles } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className='px-4 sm:px-20 xl:px-32 relative flex flex-col w-full justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen overflow-hidden'>
      
      {/* 3D Parallax Gradient Spheres */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 rounded-full bg-purple-400/15 blur-[100px] pointer-events-none animate-pulse duration-[6000ms]" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-indigo-400/20 blur-[120px] pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute top-1/3 right-1/4 w-60 h-60 rounded-full bg-pink-400/10 blur-[80px] pointer-events-none" />

      {/* Floating Header Badge */}
      <div className="mx-auto mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/15 bg-white/70 backdrop-blur-md text-xs font-semibold text-indigo-600 shadow-sm hover:border-indigo-500/30 transition-all duration-300">
        <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-spin duration-[4000ms]" />
        <span>Introducing Quick.ai 2.0</span>
      </div>

      <div className="text-center mb-8 relative">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mx-auto leading-[1.15] tracking-tight bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
          Create amazing content <br /> with 
          <span className="text-indigo-600 relative inline-flex items-center gap-2 px-3">
            AI tools
            <img 
              src="/arrow_img.webp" 
              alt="Arrow" 
              className="w-8 h-9 sm:w-10 sm:h-11 transition-transform duration-500 hover:translate-x-1.5 rotate-90 filter drop-shadow-md" 
            />
          </span>
        </h1>

        <p className="mt-6 max-w-md sm:max-w-xl mx-auto text-sm sm:text-base text-slate-500 leading-relaxed font-medium">
          Transform your content creation process with our next-generation suite of AI tools. 
          Generate professional copy, refine resumes, edit images, and supercharge your workflow in seconds.
        </p>
      </div>

      <div className="flex justify-center gap-4 relative">
        <button
          onClick={() => navigate('/ai')}
          className="group relative bg-gradient-to-r from-indigo-600 via-indigo-600 to-indigo-700 text-white px-10 py-3.5 rounded-full font-semibold shadow-[0_8px_25px_rgba(79,70,229,0.3)] hover:shadow-[0_15px_30px_rgba(79,70,229,0.45)] hover:scale-103 active:scale-97 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
        >
          {/* Specular button gloss reflection */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span>Start Creating</span>
          <ArrowRight className='w-4.5 h-4.5 group-hover:translate-x-1 transition-transform duration-300' />
        </button>
      </div>

      <div className='flex items-center gap-3 mt-12 mx-auto text-slate-500 bg-white/60 border border-slate-200/40 px-5 py-2.5 rounded-2xl shadow-sm backdrop-blur-sm hover:scale-102 transition-transform duration-300'>
        <img src={assets.user_group} alt="User group" className='h-9 filter drop-shadow-sm'/> 
        <span className="text-sm font-medium">
          Trusted by <span className='font-bold text-slate-800 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>10k+</span> creators worldwide
        </span>
      </div>

    </div>
  );
};

export default Hero;