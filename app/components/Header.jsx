import { Search, Upload } from 'lucide-react'
import React from 'react'

function Header() {
  return (
    <div className="bg-red-700 w-full sticky top-0 z-50 shadow-md">
            <header className="max-w-7xl mx-auto text-white p-3 flex justify-between items-center">
              <div className="flex items-center gap-2 md:gap-4">
                {/* <h1 className="text-xl md:text-2xl font-black tracking-tighter italic">Haal-Chaal</h1> */}
                <img src="logo.jpg" className="h-8 w-auto" alt="Logo" />
                <div className="bg-white text-red-700 p-1 rounded font-black text-xs">24/7</div>
                
                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6 ml-8 text-[11px] font-bold uppercase tracking-widest border-l border-red-600/50 pl-8">
                  <button className="hover:text-red-200">World</button>
                  <button className="hover:text-red-200">Politics</button>
                  <button className="hover:text-red-200">Business</button>
                  <button className="hover:text-red-200">Tech</button>
                  <button className="hover:text-red-200">Sports</button>
                </nav>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="hidden md:flex items-center gap-2 bg-red-800 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-900">
                  <Search size={16} /> SEARCH
                </button>
                <button 
                //   onClick={() => setIsUploading(true)}
                  className="bg-white text-red-700 p-1.5 md:px-4 md:py-1.5 rounded-full md:rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  <Upload size={18} />
                  <span className="hidden md:inline font-bold text-xs uppercase">Post News</span>
                </button>
              </div>
            </header>
          </div>
    
  )
}

export default Header