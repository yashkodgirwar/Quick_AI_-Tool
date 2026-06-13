import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { ChevronDown, ChevronUp, Image, BookOpen, Sparkles, FileText } from 'lucide-react';

const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  // Define styling map based on creation type
  const typeConfig = {
    'image': {
      label: 'Image',
      badgeClass: 'bg-green-50 text-green-700 border-green-200',
      icon: <Image className="w-4 h-4 text-green-600" />
    },
    'article': {
      label: 'Article',
      badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: <BookOpen className="w-4 h-4 text-blue-600" />
    },
    'blog-title': {
      label: 'Blog Titles',
      badgeClass: 'bg-purple-50 text-purple-700 border-purple-200',
      icon: <Sparkles className="w-4 h-4 text-purple-600" />
    },
    'resume-review': {
      label: 'Resume Review',
      badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
      icon: <FileText className="w-4 h-4 text-rose-600" />
    }
  };

  const currentConfig = typeConfig[item.type] || {
    label: item.type,
    badgeClass: 'bg-slate-50 text-slate-700 border-slate-200',
    icon: <Sparkles className="w-4 h-4 text-slate-600" />
  };

  return (
    <div
      className={`border rounded-2xl cursor-pointer bg-white transition-all duration-300 ${
        expanded 
          ? 'border-slate-300 shadow-md ring-1 ring-slate-100' 
          : 'border-slate-200/80 shadow-sm hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5'
      }`}
      onClick={() => setExpanded(!expanded)} 
    >
      {/* Header element */}
      <div className="p-5 flex justify-between items-center gap-6">
        <div className="space-y-1.5 flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-slate-800 truncate pr-4">{item.prompt}</h3>
          <p className="text-xs text-slate-400 font-medium">
            {new Date(item.created_at).toLocaleDateString(undefined, { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}
          </p>
        </div>
        
        <div className="flex items-center gap-3 shrink-0">
          <div className={`flex items-center gap-1.5 px-3 py-1 border text-xs font-semibold rounded-full ${currentConfig.badgeClass}`}>
            {currentConfig.icon}
            <span>{currentConfig.label}</span>
          </div>
          <div className="text-slate-400 hover:text-slate-600 transition-colors">
            {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </div>
      </div>

      {/* Expanded Content element */}
      {expanded && (
        <div className="border-t border-slate-100 bg-slate-50/30 rounded-b-2xl p-6" onClick={(e) => e.stopPropagation()}>
          {item.type === 'image' ? (
            <div className="flex justify-center items-center">
              <img
                src={item.content}
                alt="image"
                className="w-full max-w-md rounded-xl shadow-md border border-slate-100 max-h-[400px] object-contain"
              />
            </div>
          ) : (
            <div className="text-slate-600 text-sm max-w-none">
              <Markdown
                components={{
                  h1: ({node, ...props}) => <h1 className="text-xl font-bold mt-5 mb-3 text-slate-800 flex items-center gap-2 border-b pb-2 border-slate-100" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-lg font-bold mt-4 mb-2 text-slate-800 border-b pb-1 border-slate-100" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-base font-semibold mt-3 mb-2 text-slate-800" {...props} />,
                  p: ({node, ...props}) => <p className="mb-3 text-xs leading-relaxed text-slate-600" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-3 space-y-1.5 text-xs text-slate-600" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-3 space-y-1.5 text-xs text-slate-600" {...props} />,
                  li: ({node, ...props}) => <li className="mb-0.5 pl-0.5" {...props} />,
                  code: ({node, ...props}) => <code className="bg-slate-100 text-[#FF4938] px-1.5 py-0.5 rounded font-mono text-xs border border-slate-200" {...props} />,
                  hr: ({node, ...props}) => <hr className="my-4 border-slate-100" {...props} />,
                  strong: ({node, ...props}) => <strong className="font-semibold text-slate-800" {...props} />,
                }}
              >
                {item.content}
              </Markdown>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreationItem;
