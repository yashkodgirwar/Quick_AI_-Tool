import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiToolsData } from '../assets/assets'; 
import { useUser } from '@clerk/react';

const AiTools = () => {
  const navigate = useNavigate();
  const user=useUser()

  return (
    <div className="px-4 sm:px-20 xl:px-32 my-1 mt-1">
    
      <div className="text-center">
    <h2
className="text-[42px] font-semibold text-black   "
 
>
  Powerful AI Tools
</h2>

<style>
{`
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes shadowPulse {
  0%, 100% { box-shadow: 0 0 20px rgba(241, 25, 14, 0.6); }
  50% { box-shadow: 0 0 40px rgba(72, 80, 236, 0.8); }
}
`}
</style>

        <p className="text-gray-500 max-w-lg mx-auto">
          Everything you need to create, enhance, and optimize your content with
          cutting-edge AI technology.
        </p>
      </div>

      
      <div className="flex flex-wrap mt-10 justify-center">
        {AiToolsData.map((tool, index) => (
          <div
            key={index}
            className=" outline-1 p-8 m-4 max-w-xs rounded-lg bg-[#FDFDFE] shadow-lg border border-gray-100 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            onClick={() => navigate(tool.path)}
          >
    
            <tool.Icon
              className="w-12 h-12 p-3 text-white rounded-xl"
              style={{
                background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`,
              }}
            />
            <h3 className="mt-6 mb-3 text-lg font-semibold">{tool.title}</h3>
            <p className="text-gray-400 text-sm max-w-[95%]">
              {tool.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiTools;
