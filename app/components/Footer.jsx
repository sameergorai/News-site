import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <footer className="hidden md:block bg-gray-900 text-gray-400 py-10 mt-10 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-4 gap-8">
          <div className="col-span-1">
            <h4 className="text-white font-black italic mb-4">NEWS CHANNEL</h4>
            <p className="text-xs leading-relaxed">Global news coverage provided 24/7. Trusted sources, unbiased reporting, and breaking updates from around the world.</p>
          </div>
          <div>
            <h5 className="text-white text-xs font-bold mb-4 uppercase tracking-widest">Categories</h5>
            <ul className="text-[11px] space-y-2 font-medium">
              <li><a href="#" className="hover:text-red-500">World News</a></li>
              <li><a href="#" className="hover:text-red-500">Technology</a></li>
              <li><a href="#" className="hover:text-red-500">Business</a></li>
              <li><a href="#" className="hover:text-red-500">Entertainment</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white text-xs font-bold mb-4 uppercase tracking-widest">Company</h5>
            <ul className="text-[11px] space-y-2 font-medium">
              <li><a href="#" className="hover:text-red-500">About Us</a></li>
              <li><a href="#" className="hover:text-red-500">Contact</a></li>
              <li><a href="#" className="hover:text-red-500">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-red-500">Terms of Service</a></li>
            </ul>
          </div>
          {/* <div>
            <h5 className="text-white text-xs font-bold mb-4 uppercase tracking-widest">Subscribe</h5>
            <div className="flex bg-gray-800 p-1 rounded-lg">
              <input type="email" placeholder="Email" className="bg-transparent border-none outline-none text-xs px-2 flex-1" />
              <button className="bg-red-700 text-white text-[10px] font-bold px-3 py-1.5 rounded-md">GO</button>
            </div>
          </div> */}
        </div>
        {/* <div className="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-gray-800 text-[10px] text-center">
          © 2024 NEWS CHANNEL. ALL RIGHTS RESERVED.
        </div> */}
         <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-slate-400">
        <div className="container mx-auto px-6">
          <p>&copy; 2026 HAALCHAAL. All Rights Reserved | Powered by <Link href="https://edigitalindian.com/" target="_blank" className="text-[#ffcc00] hover:underline">E Digital India</Link></p>
        </div>
      </div>
      </footer>
  )
}

export default Footer