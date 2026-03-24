'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, Upload, Newspaper, TrendingUp, Clock, X, ChevronRight, ArrowLeft, Share2, Search, Menu, Loader2, LogOut } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  
  // App State
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [news, setNews] = useState([]);
  const [isLoadingNews, setIsLoadingNews] = useState(true);
  const [selectedNews, setSelectedNews] = useState(null);
  
  // Upload Form State
  const [isUploading, setIsUploading] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: 'GENERAL', summary: '' });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // 1. Fetch News Logic (Wrapped in useCallback so we can call it after upload too)
  const fetchNews = useCallback(async () => {
      const token = localStorage.getItem('authToken');

    setIsLoadingNews(true);
    try {
      const response = await fetch('https://lightgrey-badger-968935.hostingersite.com/api/fetch_news.php',
        {method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }}
      );
      const result = await response.json();
      if (response.ok && result.success) {
        setNews(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch news:", error);
    } finally {
      setIsLoadingNews(false);
    }
  }, []);

  // 2. Security Gate & Initial Data Load
  useEffect(() => {
    const verifySession = async () => {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        router.replace('/login');
        return;
      }

      try {
        const response = await fetch('https://lightgrey-badger-968935.hostingersite.com/api/auth_check', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          setIsAuthenticating(false); 
          fetchNews(); // Load real data once authenticated
        } else {
          throw new Error('Invalid session');
        }
      } catch (error) {
        localStorage.removeItem('authToken'); 
        router.replace('/login');
      }
    };

    verifySession();
  }, [router, fetchNews]);

  // 3. Handlers
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.replace('/login');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!imageFile) return alert("Please select a cover image.");
    
    setIsPublishing(true);
    const token = localStorage.getItem('authToken');
    
    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('category', formData.category);
    submitData.append('summary', formData.summary);
    submitData.append('image', imageFile);

    console.log("submitData",token)
    
    try {
      const response = await fetch('https://lightgrey-badger-968935.hostingersite.com/api/fetch_news.php', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: submitData
      });

      const result = await response.json();
console.log("result",result)
      if (response.ok && result.success) {
        // Refresh the news feed to get the newly inserted item with its correct timestamp
        fetchNews();
        setIsUploading(false);
        setFormData({ title: '', category: 'GENERAL', summary: '' });
        setImageFile(null);
        setImagePreview('');
      } else {
        alert(result.message || "Failed to upload story.");
      }
    } catch (error) {
      alert("Network error occurred during upload.");
    } finally {
      setIsPublishing(false);
    }
  };

  // 4. Loading State Screen
  if (isAuthenticating) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-red-700" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative overflow-x-hidden">
      
      {/* PC/Laptop Header Container */}
      <div className="bg-red-700 w-full sticky top-0 z-50 shadow-md">
        <header className="max-w-7xl mx-auto text-white p-3 flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-4">
            <img src="logo.jpg" className="h-8 w-auto" alt="Logo" />
            <div className="bg-white text-red-700 p-1 rounded font-black text-xs">24/7</div>
            
            <nav className="hidden md:flex items-center gap-6 ml-8 text-[11px] font-bold uppercase tracking-widest border-l border-red-600/50 pl-8">
              <button className="hover:text-red-200">World</button>
              <button className="hover:text-red-200">Politics</button>
              <button className="hover:text-red-200">Business</button>
              <button className="hover:text-red-200">Tech</button>
              <button className="hover:text-red-200">Sports</button>
            </nav>
          </div>
          
          <div className="flex items-center gap-2 md:gap-3">
            <button className="hidden md:flex items-center gap-2 bg-red-800 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-900">
              <Search size={16} /> SEARCH
            </button>
            <button onClick={() => setIsUploading(true)} className="bg-white text-red-700 p-1.5 md:px-4 md:py-1.5 rounded-full md:rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2">
              <Upload size={18} />
              <span className="hidden md:inline font-bold text-xs uppercase">Post News</span>
            </button>
            <button onClick={handleLogout} className="bg-transparent border border-red-500/50 text-white p-1.5 md:px-3 md:py-1.5 rounded-full md:rounded-lg hover:bg-red-800 transition-colors flex items-center gap-2" title="Logout">
              <LogOut size={18} />
              <span className="hidden md:inline font-bold text-xs uppercase">Exit</span>
            </button>
          </div>
        </header>
      </div>

      {/* Breaking Ticker */}
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
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-red-700">
            <TrendingUp size={16} />
            <span className="text-xs font-black uppercase tracking-[0.2em]">Top Stories & Updates</span>
          </div>
        </div>
        
        {isLoadingNews ? (
           <div className="flex justify-center items-center py-20">
             <Loader2 className="animate-spin text-gray-400" size={32} />
           </div>
        ) : news.length === 0 ? (
           <div className="text-center py-20 text-gray-400 font-bold text-sm">
             No news published yet.
           </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {news.map((item) => (
              <article key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:border-red-100 active:scale-[0.98] transition-all group flex flex-col">
                <div className="relative h-48 md:h-52 w-full overflow-hidden">
                  <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=400" }} />
                  <div className="absolute top-3 left-3 bg-red-700 text-white text-[9px] font-bold px-2 py-1 rounded-md shadow-lg">
                    {item.category}
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex items-center gap-1 text-gray-400 text-[10px] mb-2 font-semibold">
                    <Clock size={12} /> <span>{item.timestamp || 'Recently'}</span>
                  </div>
                  <h2 className="text-base font-bold leading-snug text-gray-900 mb-2 group-hover:text-red-700 transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-4">
                    {item.summary}
                  </p>
                  <div className="mt-auto pt-3 border-t border-gray-50 flex justify-end">
                    <button onClick={() => setSelectedNews(item)} className="text-red-700 font-bold text-[11px] flex items-center gap-1 hover:gap-2 transition-all">
                      READ FULL STORY <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Full Story View Overlay */}
      {selectedNews && (
        <div className="fixed inset-0 z-[110] bg-black/40 backdrop-blur-sm flex items-center justify-center p-0 md:p-6 animate-in fade-in duration-300">
          <div className="bg-white w-full h-full md:h-auto md:max-w-4xl md:max-h-[90vh] md:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom md:zoom-in duration-300">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
              <button onClick={() => setSelectedNews(null)} className="text-gray-900 flex items-center gap-2 font-bold text-xs hover:text-red-700 transition-colors">
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
                  <img src={selectedNews.image_url} className="w-full h-64 md:h-full object-cover rounded-xl shadow-lg" alt="full view" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=400" }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-gray-400 text-[11px] mb-3 font-bold uppercase">
                    <Clock size={14} /> {selectedNews.timestamp || 'Recently'} • SENIOR CORRESPONDENT
                  </div>
                  <h1 className="text-2xl md:text-3xl font-black leading-tight text-gray-900 mb-6 tracking-tight">
                    {selectedNews.title}
                  </h1>
                  <div className="text-sm md:text-base text-gray-700 leading-relaxed space-y-4">
                    <p className="font-semibold text-gray-900 italic border-l-4 border-red-700 pl-4 py-2 bg-gray-50 rounded-r-lg">
                      {selectedNews.summary}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t bg-gray-50 flex justify-end">
              <button onClick={() => setSelectedNews(null)} className="bg-black text-white font-bold py-2.5 px-8 rounded-lg text-xs hover:bg-gray-800 transition-colors">
                CLOSE ARTICLE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal (With File Input) */}
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
                <input type="text" required className="w-full border-b-2 border-gray-100 focus:border-red-700 outline-none py-2 text-base font-bold transition-all" placeholder="Enter compelling title..." value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Topic</label>
                  <select className="w-full border-b-2 border-gray-100 focus:border-red-700 outline-none py-2 text-sm bg-transparent font-bold cursor-pointer" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                    <option>GENERAL</option>
                    <option>TECHNOLOGY</option>
                    <option>POLITICS</option>
                    <option>SPORTS</option>
                    <option>FINANCE</option>
                  </select>
                </div>
                
                {/* File Input */}
                <div className="space-y-1 flex flex-col">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Cover Image</label>
                  <div className="flex items-center gap-3 mt-1">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="h-10 w-10 md:h-12 md:w-12 object-cover rounded shadow-sm border border-gray-200 shrink-0" />
                    ) : (
                      <div className="h-10 w-10 md:h-12 md:w-12 bg-gray-50 flex items-center justify-center rounded border border-gray-200 shrink-0 text-gray-400"><Camera size={16}/></div>
                    )}
                    <input 
                      type="file" 
                      accept="image/jpeg, image/png, image/webp" 
                      required 
                      className="w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-[10px] file:font-bold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 cursor-pointer"
                      onChange={handleImageChange} 
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Story Brief</label>
                <textarea required rows={4} className="w-full border-2 border-gray-100 focus:border-red-700 outline-none p-3 text-sm rounded-xl mt-1 resize-none" placeholder="Summarize the key events..." value={formData.summary} onChange={(e) => setFormData({...formData, summary: e.target.value})}></textarea>
              </div>

              <button disabled={isPublishing} type="submit" className="w-full bg-red-700 text-white font-black py-4 rounded-xl hover:bg-red-800 transition-all shadow-xl shadow-red-200 active:scale-95 disabled:opacity-70 flex justify-center items-center gap-2">
                {isPublishing ? <Loader2 size={18} className="animate-spin" /> : 'PUBLISH STORY'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Footer */}
      <nav className="md:hidden bg-white border-t border-gray-200 p-2 flex justify-around items-center sticky bottom-0 z-50">
        <button className="flex flex-col items-center text-red-700"><Newspaper size={20} /><span className="text-[8px] font-bold mt-1 uppercase">Latest</span></button>
        <button className="flex flex-col items-center text-gray-400"><TrendingUp size={20} /><span className="text-[8px] font-bold mt-1 uppercase">Trending</span></button>
        <button onClick={() => setIsUploading(true)} className="flex flex-col items-center -mt-8 bg-red-700 p-3.5 rounded-full text-white shadow-2xl border-4 border-gray-50"><Camera size={24} /></button>
        <button className="flex flex-col items-center text-gray-400"><Clock size={20} /><span className="text-[8px] font-bold mt-1 uppercase">Recent</span></button>
        <button className="flex flex-col items-center text-gray-400"><Menu size={20} /><span className="text-[8px] font-bold mt-1 uppercase">Menu</span></button>
      </nav>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee { 0% { transform: translateX(50%); } 100% { transform: translateX(-150%); } }
        .animate-marquee { animation: marquee 30s linear infinite; }
        @media (min-width: 768px) { @keyframes marquee { 0% { transform: translateX(20%); } 100% { transform: translateX(-100%); } } }
      `}} />
    </div>
  );
}