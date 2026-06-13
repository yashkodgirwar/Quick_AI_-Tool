import { useUser, useClerk } from "@clerk/react";
import { NavLink } from 'react-router-dom'
import { House, SquarePen, Hash, Image, Eraser, Scissors, FileText, Users, LogOut, MessageSquareHeart } from 'lucide-react'
import React from 'react'

const navItems = [
  { to: '/ai', label: 'Dashboard', Icon: House },
  { to: '/ai/write-article', label: 'Write Article', Icon: SquarePen },
  { to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash },
  { to: '/ai/generate-images', label: 'Generate Images', Icon: Image },
  { to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser },
  { to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors },
  { to: '/ai/review-resume', label: 'Review Resume', Icon: FileText },
  { to: '/ai/community', label: 'Community', Icon: Users },
]

const Sidebar = ({ sidebar, setSidebar, onOpenFeedback }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk()

  return (
    <div
      className={`w-64 bg-white/85 backdrop-blur-xl border-r border-slate-200/50 flex flex-col justify-between h-[calc(100vh-3.5rem)] sm:h-screen max-sm:absolute top-14 bottom-0 ${
        sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'
      } transition-all duration-300 ease-in-out z-30`}
    >
      {/* Top Section */}
      <div className="py-6 w-full flex-1 overflow-y-auto">
        {user && (
          <div className="px-6 mb-6 text-center group cursor-pointer" onClick={openUserProfile}>
            <div className="relative inline-block">
              <img
                src={user.imageUrl}
                alt="User avatar"
                className="w-16 h-16 rounded-full mx-auto ring-4 ring-indigo-500/10 group-hover:ring-indigo-500/30 transition-all duration-300 shadow-md object-cover"
              />
              <div className="absolute bottom-0 right-1 w-4 h-4 rounded-full border-2 border-white bg-green-500 shadow-sm" />
            </div>
            <h1 className="mt-3 font-semibold text-slate-800 text-sm tracking-wide group-hover:text-indigo-600 transition-colors">
              {user.fullName}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">Welcome back</p>
          </div>
        )}
        
        {/* Navigation Section */}
        <div className="px-4 mt-2 space-y-1 text-sm font-medium">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/ai'}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `group/link px-4 py-3 flex items-center gap-3.5 rounded-xl transition-all duration-300 border border-transparent ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 via-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/15 border-indigo-600/20 translate-x-1'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/40 hover:translate-x-1.5'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-4.5 h-4.5 transition-transform duration-300 group-hover/link:scale-110 ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover/link:text-indigo-500'
                    }`}
                  />
                  <span className="font-medium tracking-wide">{label}</span>
                </>
              )}
            </NavLink>
          ))}

          {/* Feedback Button */}
          {onOpenFeedback && (
            <button
              onClick={() => {
                setSidebar(false);
                onOpenFeedback();
              }}
              className="w-full group/link px-4 py-3 flex items-center gap-3.5 rounded-xl transition-all duration-300 border border-transparent text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/40 hover:translate-x-1.5 cursor-pointer text-left"
            >
              <MessageSquareHeart className="w-4.5 h-4.5 text-slate-400 group-hover/link:text-indigo-500 transition-transform duration-300 group-hover/link:scale-110" />
              <span className="font-medium tracking-wide">Send Feedback</span>
            </button>
          )}
        </div>
      </div>

      {/* Footer Profile Section */}
      <div className="p-4 w-full border-t border-slate-100 bg-slate-50/40">
        <div className="bg-white border border-slate-100 rounded-xl p-3 flex items-center justify-between shadow-sm hover:shadow-md hover:border-slate-200/60 transition-all duration-300">
          <div onClick={openUserProfile} className="flex items-center gap-2.5 cursor-pointer group flex-1 min-w-0">
            <img src={user?.imageUrl} className="w-9 h-9 rounded-full border border-slate-200 group-hover:border-indigo-400 transition-colors object-cover" alt="" />
            <div className="flex-1 min-w-0">
              <h1 className="text-xs font-semibold text-slate-800 truncate group-hover:text-indigo-600 transition-colors">
                {user?.fullName}
              </h1>
              <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">
                {user?.publicMetadata?.plan === 'premium' ? '★ Premium' : 'Free User'}
              </p>
            </div>
          </div>
          <button 
            onClick={signOut} 
            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
