'use client'
import React, { useState, useEffect } from 'react';
import { Camera, Upload, Newspaper, TrendingUp, Clock, X, ChevronRight, ArrowLeft, Share2, Search, Menu } from 'lucide-react';

const DEMO_DATA = [
  {
    id: 1,
    title: "Global Tech Summit 2024 Announces New AI Safety Standards",
    category: "TECHNOLOGY",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400",
    summary: "Leaders from top tech firms gather to discuss the future of artificial intelligence ethics and global regulation frameworks. The summit aims to establish a unified approach to AI development across borders.",
    timestamp: "2 mins ago"
  },
  {
    id: 2,
    title: "Urban Green Spaces Linked to Significant Mental Health Improvements",
    category: "HEALTH",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=400",
    summary: "New study suggests that spending just 20 minutes in city parks can lower cortisol levels by up to 15% in adults. Researchers emphasize the importance of incorporating nature into urban planning for long-term public health.",
    timestamp: "1 hour ago"
  },
  {
    id: 3,
    title: "Market Rally: Indices Reach Record Highs Amid Economic Optimism",
    category: "FINANCE",
    image: "https://images.unsplash.com/photo-1611974717528-587ce93ff71a?auto=format&fit=crop&q=80&w=400",
    summary: "Investors react positively to the latest manufacturing data, pushing major stock exchanges to unprecedented levels. Analysts predict continued growth if interest rates remain stable through the next quarter.",
    timestamp: "3 hours ago"
  },
  {
    id: 4,
    title: "Revolutionary Battery Tech Promises 1000-Mile EV Range",
    category: "TECH",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=400",
    summary: "A startup has unveiled a solid-state battery prototype that could double the range of current electric vehicles while reducing charging time to just ten minutes.",
    timestamp: "5 hours ago"
  },
  {
    id: 5,
    title: "Championship Underdogs Secure Historic Victory in Finals",
    category: "SPORTS",
    image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=400",
    summary: "Against all odds, the city's newest team clinched the national title in a nail-biting finish that left fans speechless and experts re-evaluating their predictions.",
    timestamp: "8 hours ago"
  }
];

export default function App() {
  const [news, setNews] = useState(DEMO_DATA);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'GENERAL',
    summary: '',
    image: ''
  });

  const handleUpload = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      title: formData.title,
      category: formData.category,
      image: formData.image || "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=400",
      summary: formData.summary,
      timestamp: "Just now"
    };
    setNews([newItem, ...news]);
    setIsUploading(false);
    setFormData({ title: '', category: 'GENERAL', summary: '', image: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative overflow-x-hidden">
      {/* PC/Laptop Header Container */}
      
      {/* Breaking Ticker - Responsive Width */}
      <div className="bg-black text-white py-1.5 flex items-center overflow-hidden border-b border-red-600">
        <div className="max-w-7xl mx-auto w-full flex items-center px-3">
          <div className="bg-red-600 text-[10px] font-bold px-2 py-0.5 mr-3 animate-pulse shrink-0 z-9">BREAKING</div>
          <div className="text-xs font-medium animate-marquee whitespace-nowrap">
            Global markets surge as inflation data cools • Space exploration reaches new milestones • New sustainable energy policy announced • Global Tech Summit 2024 reveals breakthrough in quantum computing • 
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-3 md:p-6">
        <div className="flex items-center gap-2 mb-4 text-red-700">
          <TrendingUp size={16} />
          <span className="text-xs font-black uppercase tracking-[0.2em]">Top Stories & Updates</span>
        </div>
        
        {/* Grid Layout: 1 col on mobile, 2 on tablet, 3 on PC */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {news.map((item) => (
            <article 
              key={item.id} 
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:border-red-100 active:scale-[0.98] transition-all group flex flex-col"
            >
              <div className="relative h-48 md:h-52 w-full overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=400" }}
                />
                <div className="absolute top-3 left-3 bg-red-700 text-white text-[9px] font-bold px-2 py-1 rounded-md shadow-lg">
                  {item.category}
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-center gap-1 text-gray-400 text-[10px] mb-2 font-semibold">
                  <Clock size={12} />
                  <span>{item.timestamp}</span>
                </div>
                <h2 className="text-base font-bold leading-snug text-gray-900 mb-2 group-hover:text-red-700 transition-colors">
                  {item.title}
                </h2>
                <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-4">
                  {item.summary}
                </p>
                <div className="mt-auto pt-3 border-t border-gray-50 flex justify-end">
                  <button 
                    onClick={() => setSelectedNews(item)}
                    className="text-red-700 font-bold text-[11px] flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    READ FULL STORY <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Full Story View Overlay - Adapted for PC */}
      {selectedNews && (
        <div className="fixed inset-0 z-[110] bg-black/40 backdrop-blur-sm flex items-center justify-center p-0 md:p-6 animate-in fade-in duration-300">
          <div className="bg-white w-full h-full md:h-auto md:max-w-4xl md:max-h-[90vh] md:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom md:zoom-in duration-300">
            {/* Header for Modal */}
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
              <button 
                onClick={() => setSelectedNews(null)} 
                className="text-gray-900 flex items-center gap-2 font-bold text-xs hover:text-red-700 transition-colors"
              >
                <ArrowLeft size={20} /> <span className="hidden md:inline">BACK TO LIST</span>
              </button>
              <div className="text-xs font-black text-red-700 tracking-[0.3em] uppercase">{selectedNews.category}</div>
              <div className="flex items-center gap-4">
                <button className="text-gray-400 hover:text-blue-600"><Share2 size={18} /></button>
                <button onClick={() => setSelectedNews(null)} className="md:hidden text-gray-400"><X size={24} /></button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col md:flex-row gap-6 p-4 md:p-8">
                <div className="w-full md:w-2/5 shrink-0">
                  <img 
                    src={selectedNews.image} 
                    className="w-full h-64 md:h-full object-cover rounded-xl shadow-lg" 
                    alt="full view" 
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=400" }}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-gray-400 text-[11px] mb-3 font-bold uppercase">
                    <Clock size={14} /> {selectedNews.timestamp} • SENIOR CORRESPONDENT
                  </div>
                  <h1 className="text-2xl md:text-3xl font-black leading-tight text-gray-900 mb-6 tracking-tight">
                    {selectedNews.title}
                  </h1>
                  <div className="text-sm md:text-base text-gray-700 leading-relaxed space-y-4">
                    <p className="font-semibold text-gray-900 italic border-l-4 border-red-700 pl-4 py-2 bg-gray-50 rounded-r-lg">
                      {selectedNews.summary}
                    </p>
                    <p>
                      In a rapidly evolving landscape, this development represents a significant milestone for stakeholders involved. Local authorities have been monitoring the situation closely, providing regular updates to ensure transparency and public safety.
                    </p>
                    <p>
                      Experts suggest that the long-term implications could reshape how the industry approaches these challenges in the coming years. Further investigations are underway to determine the root causes and potential preventative measures for the future.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t bg-gray-50 flex justify-end">
              <button 
                onClick={() => setSelectedNews(null)}
                className="bg-black text-white font-bold py-2.5 px-8 rounded-lg text-xs hover:bg-gray-800 transition-colors"
              >
                CLOSE ARTICLE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal - Adapted for PC */}
      {isUploading && (
        <div className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex items-end md:items-center justify-center p-0 md:p-4">
          <div className="bg-white w-full max-w-lg rounded-t-3xl md:rounded-2xl p-6 md:p-8 animate-in slide-in-from-bottom md:zoom-in duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-gray-900 flex items-center gap-3">
                <div className="bg-red-700 p-2 rounded-lg text-white"><Newspaper size={20} /></div>
                SUBMIT STORY
              </h3>
              <button onClick={() => setIsUploading(false)} className="text-gray-400 hover:text-black">
                <X size={28} />
              </button>
            </div>
            
            <form onSubmit={handleUpload} className="space-y-5">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Article Headline</label>
                <input 
                  type="text" 
                  required
                  className="w-full border-b-2 border-gray-100 focus:border-red-700 outline-none py-2 text-base font-bold transition-all"
                  placeholder="Enter compelling title..."
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Topic</label>
                  <select 
                    className="w-full border-b-2 border-gray-100 focus:border-red-700 outline-none py-2 text-sm bg-transparent font-bold cursor-pointer"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option>GENERAL</option>
                    <option>TECHNOLOGY</option>
                    <option>POLITICS</option>
                    <option>SPORTS</option>
                    <option>FINANCE</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Cover Image URL</label>
                  <input 
                    type="text"
                    className="w-full border-b-2 border-gray-100 focus:border-red-700 outline-none py-2 text-sm"
                    placeholder="https://..."
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Story Brief</label>
                <textarea 
                  required
                  rows="4"
                  className="w-full border-2 border-gray-100 focus:border-red-700 outline-none p-3 text-sm rounded-xl mt-1 resize-none"
                  placeholder="Summarize the key events..."
                  value={formData.summary}
                  onChange={(e) => setFormData({...formData, summary: e.target.value})}
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-red-700 text-white font-black py-4 rounded-xl hover:bg-red-800 transition-all shadow-xl shadow-red-200 active:scale-95"
              >
                PUBLISH STORY
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer Navigation - Mobile Only */}
      <nav className="md:hidden bg-white border-t border-gray-200 p-2 flex justify-around items-center sticky bottom-0 z-50">
        <button className="flex flex-col items-center text-red-700">
          <Newspaper size={20} />
          <span className="text-[8px] font-bold mt-1 uppercase">Latest</span>
        </button>
        <button className="flex flex-col items-center text-gray-400">
          <TrendingUp size={20} />
          <span className="text-[8px] font-bold mt-1 uppercase">Trending</span>
        </button>
        <button 
          onClick={() => setIsUploading(true)}
          className="flex flex-col items-center -mt-8 bg-red-700 p-3.5 rounded-full text-white shadow-2xl border-4 border-gray-50"
        >
          <Camera size={24} />
        </button>
        <button className="flex flex-col items-center text-gray-400">
          <Clock size={20} />
          <span className="text-[8px] font-bold mt-1 uppercase">Recent</span>
        </button>
        <button className="flex flex-col items-center text-gray-400">
          <Menu size={20} />
          <span className="text-[8px] font-bold mt-1 uppercase">Menu</span>
        </button>
      </nav>

      {/* Desktop Footer */}
      

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(50%); }
          100% { transform: translateX(-150%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        @media (min-width: 768px) {
          @keyframes marquee {
            0% { transform: translateX(20%); }
            100% { transform: translateX(-100%); }
          }
        }
      `}} />
    </div>
  );
}