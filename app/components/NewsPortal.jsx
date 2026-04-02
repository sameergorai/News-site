'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { Newspaper, TrendingUp, Clock, X, ChevronRight, ArrowLeft, Share2, Search, Menu, Loader2, RefreshCcw } from 'lucide-react';

export default function PublicNewsPage() {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState(null);

  // Fetch live news for public viewing (No auth required, Cache busted)
  const fetchNews = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://haalchaal.live/api/fetch_news.php?t=${Date.now()}`, {
        method: 'GET',
        cache: 'no-store' // Prevents Next.js from caching the stale data
      });

      const result = await response.json();
      console.log("Fetched news data:", result); // Debug log to check the response structure
      if (response.ok && result.success) {
        setNews(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch news:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load news immediately when the page opens
  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative overflow-x-hidden">

      {/* PC/Laptop Header Container */}
      <div className="text-blue-950 w-full sticky top-0 z-50 shadow-md">
        <header className="max-w-7xl mx-auto text-white p-3 flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-4">
            <img src="logo.jpg" className="h-16 w-auto" alt="Logo" />
            {/* <h1 className="text-2xl md:text-3xl font-black tracking-tighter italic text-blue-950">Haal<span className='ml-2 bg-red-700 text-white rounded-lg px-2'>Chaal</span></h1> */}
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="192" height="56" viewBox="0 0 152 46">
              
              <rect x="1" y="14.765" width="121.637" height="90.1856" fill="#061836" stroke="white" stroke-width="0.6" />

       
              <rect x="110" y="1" width="37" height="30" fill="#EC2027" stroke="white" stroke-width="0.6" />

              <text x="10" y="40" fill="white" font-size="18" font-family="Poppins, Arial, sans-serif" font-weight="600">
                Haalchaal
              </text>

        
              <text x="113" y="20" fill="white" font-size="14" font-family="Poppins, Arial, sans-serif" font-weight="700">
                24/7
              </text>
            </svg> */}
            <div className="bg-white text-red-700 p-1 rounded font-black text-xs ">24/7</div>
            <nav className="hidden md:flex items-center gap-6 ml-8 text-[11px] font-bold uppercase tracking-widest border-l border-red-600/50 pl-8 text-blue-950">
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
        <div className="flex items-center gap-2 mb-4 text-red-700">
          <TrendingUp size={16} />
          <span className="text-xs font-black uppercase tracking-[0.2em]">Top Stories & Updates</span>
        </div>

        {isLoading ? (
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
              <article
                key={item.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:border-red-100 active:scale-[0.98] transition-all group flex flex-col"
              >
                <div className="relative h-48 md:h-52 w-full overflow-hidden">
                  <img
                    src={item.image_url}
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
                    <span>{item.timestamp || 'Recently'}</span>
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
        )}
      </main>

      {/* Full Story View Overlay */}
      {selectedNews && (
        <div className="fixed inset-0 z-[110] bg-black/40 backdrop-blur-sm flex items-center justify-center p-0 md:p-6 animate-in fade-in duration-300">
          <div className="bg-white w-full h-full md:h-auto md:max-w-4xl md:max-h-[90vh] md:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom md:zoom-in duration-300">
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
                    src={selectedNews.image_url}
                    className="w-full h-64 md:h-fit object-cover rounded-xl shadow-lg"
                    alt="full view"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=400" }}
                  />
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

        {/* Refresh button to pull latest news manually */}
        <button
          onClick={fetchNews}
          className="flex flex-col items-center -mt-8 bg-red-700 p-3.5 rounded-full text-white shadow-2xl border-4 border-gray-50"
        >
          <RefreshCcw size={24} className={isLoading ? "animate-spin" : ""} />
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

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee { 0% { transform: translateX(50%); } 100% { transform: translateX(-150%); } }
        .animate-marquee { animation: marquee 30s linear infinite; }
        @media (min-width: 768px) { @keyframes marquee { 0% { transform: translateX(20%); } 100% { transform: translateX(-100%); } } }
      `}} />
    </div>
  );
}