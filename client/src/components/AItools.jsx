import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiToolsData } from '../assets/assets'; 
import { useUser } from '@clerk/react';
import { ArrowRight } from 'lucide-react';

const AiTools = () => {
  const navigate = useNavigate();
  const user = useUser();

  return (
    <div className="px-4 sm:px-20 xl:px-32 my-12">
    
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight mb-4">
          Powerful AI Tools
        </h2>
        <p className="text-slate-500 max-w-lg mx-auto font-medium text-sm sm:text-base leading-relaxed">
          Everything you need to create, enhance, and optimize your content with
          cutting-edge AI technology.
        </p>
      </div>

      <div className="flex flex-wrap mt-10 justify-center gap-4">
        {AiToolsData.map((tool, index) => (
          <div
            key={index}
            className="group relative p-8 w-full sm:w-[300px] rounded-2xl bg-white/70 backdrop-blur-md border border-slate-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:border-indigo-500/20 hover:shadow-[0_20px_50px_rgba(79,70,229,0.08)] hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 cursor-pointer flex flex-col items-start"
            onClick={() => navigate(tool.path)}
          >
            {/* Soft background glow on card hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

            <tool.Icon
              className="w-12 h-12 p-3 text-white rounded-xl shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${tool.bg.from}, ${tool.bg.to})`,
              }}
            />
            
            <h3 className="mt-6 mb-2 text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
              {tool.title}
            </h3>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-[95%]">
              {tool.description}
            </p>

            {/* Sliding explore CTA indicator */}
            <div className="flex items-center gap-1 text-xs font-semibold text-indigo-600 mt-6 opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <span>Try Tool</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiTools;
