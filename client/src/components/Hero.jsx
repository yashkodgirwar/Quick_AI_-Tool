import { ArrowDown, ArrowRight } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className='px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen'>
      
      <div className="text-center mb-6">
       <h1 className="text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-[1.2]">
  Create amazing content <br /> with
  <span className="text-primary inline-flex items-center gap-2">
   &nbsp;AI tools
    <img 
      src="/arrow_img.webp" 
      alt="Arrow Image" 
      className="w-10 h-11 transition-transform duration-300 group-hover:translate-x-1.5 rotate-90" 
    />
  </span>
</h1>

        <p className="mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl mx-auto max-sm:text-xs text-gray-600">
          Transform your content creation with our suite of premium AI tools.
          Write articles, generate images, and enhance your workflow.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs">
       
        <button
          onClick={() => navigate('/ai')}
          className=" group bg-primary text-white px-10 py-3 rounded-full hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
        >
          <span className="text-sm font-medium">Start Creating <ArrowRight className='w-4 h-4 inline gap-2' />
          
          </span>
     
        
        </button>
       
       

      </div>
     <div className='flex items-center gap-3 mt-8 mx-auto text-grey-600>'>
<img src={assets. user_group} alt="" className='h-10'/> Trusted by<span className='font-bold'>10k+</span> people
people
</div>

    </div>
  );
};

export default Hero;