import React, { useState, useEffect } from 'react'
import { useUser, useAuth } from '@clerk/react'
import { Heart, Download } from 'lucide-react'
import axios from "axios"
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = useState([])
  const { user } = useUser()
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth()

  const fetchCreation = async () => {
    try {
      const { data } = await axios.get('/api/user/get-published-creations', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
      if (data.success) {
        setCreations(data.creations)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false);
  }

  const handleDownload = async (url, prompt) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      const filename = prompt ? prompt.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30) + '.png' : 'ai-image.png';
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      toast.success("Downloading image...");
    } catch (error) {
      console.error('Failed to download image', error);
      // Fallback: open in new tab
      window.open(url, '_blank');
    }
  }

  const imagelikeToggle = async (id) => {
    try {
      const { data } = await axios.post('/api/user/toggle-like-creation', 
        { id },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      )
      if (data.success) {
        toast.success(data.message)
        await fetchCreation()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user) {
      fetchCreation()
    }
  }, [user])

  return !loading ? (
    <div className="bg-white h-full w-full rounded-xl overflow-y-scroll p-6">
      <div className="flex flex-wrap -mx-3">
        {creations.map((creation, index) => (
          <div
            key={index}
            className="relative group inline-block pl-3 pt-3 w-full sm:w-1/2 lg:w-1/3"
          >
            <img
              src={creation.content}
              alt=""
              className="w-full h-full object-cover rounded-lg"
            />

            <div
              className="absolute top-3 left-3 right-0 bottom-0 flex gap-2 items-end justify-end 
                         group-hover:justify-between p-3 
                         group-hover:bg-gradient-to-b from-transparent to-black/80 
                         text-white rounded-lg"
            >
              <p className="text-sm hidden group-hover:block">{creation.prompt}</p>
              <div className="flex gap-2 items-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(creation.content, creation.prompt);
                  }}
                  className="p-1 rounded-full hover:bg-white/20 transition-all cursor-pointer"
                  title="Download Image"
                >
                  <Download className="w-5 h-5 text-white hover:scale-110" />
                </button>
                <div className="flex gap-1 items-center">
                  <p>{creation.likes ? creation.likes.length : 0}</p>
                  <Heart
                    onClick={() => imagelikeToggle(creation.id)}
                    className={`min-w-5 h-5 hover:scale-110 cursor-pointer 
                      ${creation.likes && user && creation.likes.includes(user.id) 
                        ? 'fill-red-500 text-red-600' 
                        : 'text-white'}`}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-full">
      <span className="w-10 h-10 my-1 rounded-full border-3 border-primary border-t-transparent animate-spin"></span>
    </div>
  )
}

export default Community
