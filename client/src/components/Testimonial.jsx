import React, { useState, useEffect } from 'react';
import axios from 'axios';

const staticTestimonials = [
  {
    text: "Quick AI's Background Remover saved me so much time while editing product photos. The results are clean and professional.",
    name: "Cristofer Levin",
    role: "E-commerce Seller",
    rating: 5,
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
  },
  {
    text: "The Resume Analyzer gave me detailed feedback on my resume and helped me improve it before applying for internships.",
    name: "Rohan Mehta",
    role: "Computer Science Student",
    rating: 5,
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
  },
  {
    text: "I use the AI Blog Writer regularly for content creation. It generates high-quality drafts within seconds and boosts my productivity.",
    name: "Jason Kim",
    role: "Content Creator",
    rating: 5,
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60"
  },
  {
    text: "The Object Remover feature works surprisingly well. I removed unwanted elements from images without needing expensive editing software.",
    name: "Alex Turner",
    role: "Freelance Designer",
    rating: 5,
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60"
  },
  {
    text: "Quick AI combines multiple powerful tools in one place. From image editing to content generation, everything feels seamless.",
    name: "Sofia Martinez",
    role: "Digital Marketer",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop"
  },
  {
    text: "Our team uses Quick AI daily for resume reviews, blog generation, and image enhancement. It's become an essential productivity tool.",
    name: "Daniel Wong",
    role: "Startup Founder",
    rating: 5,
    image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/userImage/userImage1.png"
  }
];

const Testimonial = () => {
    const [dynamicTestimonials, setDynamicTestimonials] = useState([]);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const { data } = await axios.get('/api/user/get-feedbacks');
                if (data.success && data.feedbacks) {
                    const formatted = data.feedbacks.map(f => ({
                        text: f.feedback,
                        name: f.user_name || "Anonymous Creator",
                        role: "Quick.ai User",
                        rating: f.rating || 5,
                        image: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(f.user_name || "User")}`
                    }));
                    setDynamicTestimonials(formatted);
                }
            } catch (err) {
                console.error("Failed to load feedbacks:", err);
            }
        };
        fetchFeedbacks();
    }, []);

    const allTestimonials = [...dynamicTestimonials, ...staticTestimonials];
    const half = Math.ceil(allTestimonials.length / 2);
    const row1 = allTestimonials.slice(0, half);
    const row2 = allTestimonials.slice(half);

    const renderCard = (testimonial, index) => (
        <div key={index} className="bg-white/80 backdrop-blur-md border border-slate-200/50 hover:border-indigo-500/20 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_20px_50px_rgba(79,70,229,0.06)] hover:-translate-y-1.5 rounded-2xl p-6 shrink-0 w-[350px] mt-6 transition-all duration-300">
            <div className="flex gap-1 mb-4">
                {Array(5).fill(0).map((_, i) => (
                    <svg 
                      key={i} 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="15" 
                      height="15" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className={`lucide lucide-star text-transparent ${
                        i < testimonial.rating ? 'fill-amber-400' : 'fill-slate-200'
                      }`} 
                      aria-hidden="true"
                    >
                      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                    </svg>
                ))}
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">"{testimonial.text}"</p>
            <div className="flex items-center gap-3">
                <img src={testimonial.image} alt={testimonial.name} className="w-11 h-11 rounded-full border border-slate-100 object-cover shadow-sm"/>
                <div>
                    <p className="font-semibold text-slate-800 text-sm">{testimonial.name}</p>
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mt-0.5">{testimonial.role}</p>
                </div>
            </div>
        </div>
    );

  return <>
   
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
                    *{
                        font-family: "Outfit", sans-serif;
                    }

                    @keyframes scroll {
                        0% {
                            transform: translateX(0);
                        }
                        100% {
                            transform: translateX(-50%);
                        }
                    }
                    @keyframes scrollReverse {
                        0% {
                            transform: translateX(-50%);
                        }
                        100% {
                            transform: translateX(0);
                        }
                    }
                    .animate-scroll {
                        animation: scroll 20s linear infinite;
                    }
                    .animate-scroll-reverse {
                        animation: scrollReverse 20s linear infinite;
                    }
                `}
            </style>
            <section className="bg-gradient-to-b from-transparent via-slate-50/30 to-transparent py-16 px-4 mt-20 mb-10">
                <div className="max-w-6xl mx-auto">

                    <div className="text-center mb-10">
                        <div className="inline-block bg-indigo-50/60 border border-indigo-500/10 rounded-full px-4 py-1.5 mb-4 shadow-sm">
                            <span className="text-xs font-bold text-indigo-600">Loved by creators</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight mb-4">
                            What people are saying
                        </h2>
                        <p className="text-slate-500 text-sm sm:text-base font-medium max-w-md mx-auto leading-relaxed">
                            Real feedback from designers, writers, and teams building and scaling with our tools.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="relative overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
                            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>

                            <div className="flex gap-6 animate-scroll">
                                {[...row1, ...row1].map((testimonial, index) =>
                                    renderCard(testimonial, index)
                                )}
                            </div>
                        </div>

                        <div className="relative overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
                            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>

                            <div className="flex gap-6 animate-scroll-reverse">
                                {[...row2, ...row2].map((testimonial, index) =>
                                    renderCard(testimonial, index)
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
  </>
}

export default Testimonial
