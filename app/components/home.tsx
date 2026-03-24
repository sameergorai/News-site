'use client';

import React, { useEffect, useState } from 'react';

// Defining the shape of the data from the API
interface Post {
    id: number;
    title: string;
    body: string;
}

export default function NewsPage() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        async function fetchNewsData() {
            try {
                // Using a demo JSON API to simulate backend data
                const response = await fetch('https://dummyjson.com/posts?limit=15');
                if (!response.ok) throw new Error('Failed to fetch data');
                
                const data = await response.json();
                setPosts(data.posts);
            } catch (error) {
                console.error('Error fetching backend data:', error);
            }
        }

        fetchNewsData();
    }, []);

    return (
        <div className="bg-gray-100 text-gray-900 font-sans leading-tight min-h-screen">
            {/* Injecting the custom CSS animations and scrollbar hiding */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .ticker-wrap { width: 100%; overflow: hidden; white-space: nowrap; }
                .ticker-move { display: inline-block; animation: ticker 25s linear infinite; }
                .ticker-move:hover { animation-play-state: paused; }
                @keyframes ticker { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}} />

            {/* Top Bar: App Links & Language */}
            <div className="bg-gray-200 text-[0.65rem] flex justify-between items-center px-2 py-1 border-b border-gray-300">
                <div className="flex gap-2">
                    <a href="#" className="hover:text-[#da251d] font-medium">Download App</a>
                    <span className="text-gray-400">|</span>
                    <a href="#" className="hover:text-[#da251d] font-medium">Podcasts</a>
                </div>
                <div className="flex gap-2 font-medium">
                    <a href="#" className="text-[#da251d]">English</a>
                    <span className="text-gray-400">|</span>
                    <a href="#" className="hover:text-[#da251d]">हिंदी</a>
                </div>
            </div>

            {/* Main Header */}
            <header className="bg-white sticky top-0 z-50 border-b border-gray-200 shadow-sm">
                <div className="flex justify-between items-center px-2 py-1 sm:py-2">
                    {/* Hamburger & Logo */}
                    <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-gray-100 rounded">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </button>
                        <a href="#" className="text-xl sm:text-2xl font-extrabold text-[#da251d] tracking-tight">NEWS<span className="text-black">LIVE</span></a>
                    </div>
                    
                    {/* Right Actions: Live TV & Search */}
                    <div className="flex items-center gap-1 sm:gap-2">
                        <a href="#" className="bg-[#da251d] text-white text-xs sm:text-sm font-bold px-2 py-1 sm:px-3 sm:py-1.5 rounded flex items-center gap-1 animate-pulse">
                            <span className="w-2 h-2 bg-white rounded-full"></span> LIVE TV
                        </a>
                        <button className="p-1 hover:bg-gray-100 rounded">
                            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </button>
                    </div>
                </div>

                {/* Category Navigation (Scrollable) */}
                <nav className="bg-[#1a1a1a] text-white overflow-x-auto no-scrollbar border-t-2 border-[#da251d]">
                    <ul className="flex gap-3 sm:gap-5 px-2 py-1.5 text-xs sm:text-sm font-semibold whitespace-nowrap">
                        <li><a href="#" className="hover:text-gray-300">Home</a></li>
                        <li><a href="#" className="hover:text-gray-300">India</a></li>
                        <li><a href="#" className="hover:text-gray-300">World</a></li>
                        <li><a href="#" className="hover:text-gray-300">Elections</a></li>
                        <li><a href="#" className="hover:text-gray-300">Business</a></li>
                        <li><a href="#" className="hover:text-gray-300">Technology</a></li>
                        <li><a href="#" className="hover:text-gray-300">Entertainment</a></li>
                        <li><a href="#" className="hover:text-gray-300">Sports</a></li>
                        <li><a href="#" className="hover:text-gray-300">Web Stories</a></li>
                        <li><a href="#" className="hover:text-gray-300">Videos</a></li>
                    </ul>
                </nav>
            </header>

            {/* Breaking News Ticker */}
            <div className="bg-white border-b border-gray-300 flex items-center text-xs sm:text-sm">
                <div className="bg-[#da251d] text-white font-bold px-2 py-1 whitespace-nowrap z-10 shadow-md">
                    BREAKING NEWS
                </div>
                <div className="ticker-wrap font-medium text-gray-800">
                    <div className="ticker-move" id="ticker-content">
                        {posts.length > 0 ? (
                            posts.slice(0, 4).map(post => (
                                <span key={post.id} className="mx-4">• {post.title}</span>
                            ))
                        ) : (
                            <>
                                <span className="mx-4">• Global markets see unexpected surge following new trade agreements.</span>
                                <span className="mx-4">• Prime Minister announces new infrastructure projects for rural areas.</span>
                                <span className="mx-4">• National weather alert: Heavy rainfall expected in coastal regions over the next 48 hours.</span>
                                <span className="mx-4">• Tech giant unveils revolutionary AI model capable of real-time translation.</span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto p-1 sm:p-2 grid grid-cols-1 lg:grid-cols-12 gap-2">
                
                {/* Left Column: Hero & Top Stories (Spans 8 cols on Desktop) */}
                <div className="lg:col-span-8 flex flex-col gap-2">
                    
                    {/* Hero Article */}
                    {posts[4] ? (
                        <article className="bg-white relative shadow-sm rounded overflow-hidden group cursor-pointer">
                            <div className="w-full aspect-video bg-gray-300 relative">
                                <img src={`https://picsum.photos/seed/${posts[4].id}/800/450`} alt="Hero News" className="w-full h-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                                <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                                    <div className="bg-black bg-opacity-50 rounded-full p-2 sm:p-4">
                                        <svg className="w-8 h-8 sm:w-12 sm:h-12 text-white pl-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                    </div>
                                </div>
                            </div>
                            <div className="p-2 sm:p-3">
                                <span className="text-[#da251d] font-bold text-xs uppercase mb-1 block">Top Story</span>
                                <h1 className="text-lg sm:text-2xl font-bold leading-tight mb-1 group-hover:text-[#da251d] transition-colors">{posts[4].title}</h1>
                                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">{posts[4].body.substring(0, 150)}...</p>
                            </div>
                        </article>
                    ) : (
                        <article className="bg-white relative shadow-sm rounded overflow-hidden group cursor-pointer">
                            <div className="w-full aspect-video bg-gray-300 relative">
                                <img src="https://picsum.photos/seed/main/800/450" alt="Hero News" className="w-full h-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                                <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                                    <div className="bg-black bg-opacity-50 rounded-full p-2 sm:p-4">
                                        <svg className="w-8 h-8 sm:w-12 sm:h-12 text-white pl-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                    </div>
                                </div>
                            </div>
                            <div className="p-2 sm:p-3">
                                <span className="text-[#da251d] font-bold text-xs uppercase mb-1 block">Top Story</span>
                                <h1 className="text-lg sm:text-2xl font-bold leading-tight mb-1 group-hover:text-[#da251d] transition-colors">Historic Peace Treaty Signed Between Disputed Nations Putting an End to Decades of Conflict</h1>
                                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">World leaders gathered today to witness the historic signing of the comprehensive peace agreement, promising a new era of economic growth and stability for the entire region.</p>
                            </div>
                        </article>
                    )}

                    {/* 2-Column Grid for Sub-Hero Articles */}
                    <div className="grid grid-cols-2 gap-2">
                        {posts.length > 6 ? (
                            posts.slice(5, 7).map(post => (
                                <article key={post.id} className="bg-white shadow-sm rounded overflow-hidden">
                                    <div className="w-full aspect-[4/3] bg-gray-200">
                                        <img src={`https://picsum.photos/seed/${post.id}/400/300`} alt="News" className="w-full h-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                                    </div>
                                    <div className="p-1.5 sm:p-2">
                                        <h2 className="text-sm sm:text-base font-bold leading-tight hover:text-[#da251d]">{post.title.substring(0, 60)}...</h2>
                                    </div>
                                </article>
                            ))
                        ) : (
                            <>
                                <article className="bg-white shadow-sm rounded overflow-hidden">
                                    <div className="w-full aspect-[4/3] bg-gray-200">
                                        <img src="https://picsum.photos/seed/sub1/400/300" alt="News" className="w-full h-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                                    </div>
                                    <div className="p-1.5 sm:p-2">
                                        <h2 className="text-sm sm:text-base font-bold leading-tight hover:text-[#da251d]">New EV Policy Announced: Subsidies Increased for Buyers</h2>
                                    </div>
                                </article>
                                <article className="bg-white shadow-sm rounded overflow-hidden">
                                    <div className="w-full aspect-[4/3] bg-gray-200">
                                        <img src="https://picsum.photos/seed/sub2/400/300" alt="News" className="w-full h-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                                    </div>
                                    <div className="p-1.5 sm:p-2">
                                        <h2 className="text-sm sm:text-base font-bold leading-tight hover:text-[#da251d]">Cricket World Cup: Host Nation Announces 15-Member Squad</h2>
                                    </div>
                                </article>
                            </>
                        )}
                    </div>

                    {/* Ad Space Placeholder */}
                    <div className="w-full bg-gray-200 border border-gray-300 text-center py-4 sm:py-6 text-gray-500 text-xs font-bold uppercase tracking-widest my-1">
                        Advertisement
                    </div>

                    {/* News Grid: Section Category (e.g., Nation) */}
                    <div className="bg-white shadow-sm p-1.5 sm:p-2 rounded">
                        <div className="flex items-center gap-2 mb-2 border-b-2 border-[#da251d] pb-1">
                            <div className="bg-[#da251d] w-3 h-3 rounded-sm"></div>
                            <h3 className="font-bold text-base sm:text-lg uppercase">Nation</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {posts.length > 9 ? (
                                posts.slice(7, 10).map((post, index) => {
                                    const borderClass = index < 2 ? 'border-b sm:border-b-0 pb-2 sm:pb-0 border-gray-100' : '';
                                    return (
                                        <article key={post.id} className={`flex sm:flex-col gap-2 ${borderClass}`}>
                                            <div className="w-1/3 sm:w-full aspect-video bg-gray-200 shrink-0">
                                                <img src={`https://picsum.photos/seed/${post.id + 20}/300/168`} alt="News" className="w-full h-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                                            </div>
                                            <h4 className="text-xs sm:text-sm font-semibold leading-tight hover:text-[#da251d]">{post.title.substring(0, 50)}...</h4>
                                        </article>
                                    );
                                })
                            ) : (
                                <>
                                    <article className="flex sm:flex-col gap-2 border-b sm:border-b-0 pb-2 sm:pb-0 border-gray-100">
                                        <div className="w-1/3 sm:w-full aspect-video bg-gray-200 shrink-0">
                                            <img src="https://picsum.photos/seed/n1/300/168" alt="News" className="w-full h-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                                        </div>
                                        <h4 className="text-xs sm:text-sm font-semibold leading-tight hover:text-[#da251d]">Supreme Court delivers verdict on historical land dispute case</h4>
                                    </article>
                                    <article className="flex sm:flex-col gap-2 border-b sm:border-b-0 pb-2 sm:pb-0 border-gray-100">
                                        <div className="w-1/3 sm:w-full aspect-video bg-gray-200 shrink-0">
                                            <img src="https://picsum.photos/seed/n2/300/168" alt="News" className="w-full h-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                                        </div>
                                        <h4 className="text-xs sm:text-sm font-semibold leading-tight hover:text-[#da251d]">Monsoon updates: Red alert issued for five western states</h4>
                                    </article>
                                    <article className="flex sm:flex-col gap-2">
                                        <div className="w-1/3 sm:w-full aspect-video bg-gray-200 shrink-0">
                                            <img src="https://picsum.photos/seed/n3/300/168" alt="News" className="w-full h-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                                        </div>
                                        <h4 className="text-xs sm:text-sm font-semibold leading-tight hover:text-[#da251d]">Opposition parties hold joint rally ahead of upcoming assembly elections</h4>
                                    </article>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Photo Gallery / Web Stories (Horizontal Scroll) */}
                    <div className="bg-black text-white p-1.5 sm:p-2 rounded mt-1">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-base sm:text-lg uppercase flex items-center gap-1">
                                <svg className="w-5 h-5 text-[#da251d]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /></svg>
                                Web Stories
                            </h3>
                            <a href="#" className="text-xs text-gray-400 hover:text-white">View All</a>
                        </div>
                        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                            {/* Story Cards */}
                            {[
                                { seed: 'ws1', title: 'Top 10 Tourist Spots' },
                                { seed: 'ws2', title: 'Celebrity Red Carpet' },
                                { seed: 'ws3', title: 'Healthy Breakfast Ideas' },
                                { seed: 'ws4', title: 'Tech Gadgets 2026' },
                                { seed: 'ws5', title: 'Budget Home Decor' }
                            ].map((story, i) => (
                                <div key={i} className="w-24 sm:w-28 shrink-0 relative aspect-[9/16] bg-gray-800 rounded overflow-hidden">
                                    <img src={`https://picsum.photos/seed/${story.seed}/200/350`} alt={story.title} className="w-full h-full object-cover opacity-70" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                                    <p className="absolute bottom-1 left-1 right-1 text-xs font-bold leading-tight text-shadow">{story.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Right Column: Sidebar (Spans 4 cols on Desktop) */}
                <aside className="lg:col-span-4 flex flex-col gap-2">
                    
                    {/* Live TV Embed Placeholder */}
                    <div className="bg-[#1a1a1a] rounded p-1 shadow-sm">
                        <div className="flex items-center justify-between mb-1 px-1">
                            <div className="flex items-center gap-1 text-white font-bold text-sm uppercase">
                                <span className="w-2 h-2 bg-[#da251d] rounded-full animate-pulse"></span>
                                Live TV
                            </div>
                        </div>
                        <div className="w-full aspect-video bg-black relative flex items-center justify-center border border-gray-700">
                            <svg className="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                            <span className="absolute bottom-2 right-2 text-[0.65rem] text-white bg-black bg-opacity-60 px-1 rounded">Live Stream</span>
                        </div>
                    </div>

                    {/* Top Stories / Trending List */}
                    <div className="bg-white shadow-sm rounded p-2">
                        <h3 className="font-bold text-sm sm:text-base border-b-2 border-black mb-2 inline-block pb-0.5">Top Stories</h3>
                        <ul className="flex flex-col gap-2">
                            {posts.length > 14 ? (
                                posts.slice(10, 15).map((post, index) => {
                                    const borderClass = index < 4 ? 'border-b border-gray-100 pb-2' : '';
                                    return (
                                        <li key={post.id} className={`flex gap-2 items-start ${borderClass}`}>
                                            <span className="text-[#da251d] font-black text-xl leading-none">{index + 1}</span>
                                            <a href="#" className="text-xs sm:text-sm font-semibold hover:text-[#da251d] leading-tight">{post.title}</a>
                                        </li>
                                    );
                                })
                            ) : (
                                <>
                                    <li className="flex gap-2 items-start border-b border-gray-100 pb-2">
                                        <span className="text-[#da251d] font-black text-xl leading-none">1</span>
                                        <a href="#" className="text-xs sm:text-sm font-semibold hover:text-[#da251d] leading-tight">Stock Market Crash: Sensex drops by 1200 points in early trading</a>
                                    </li>
                                    <li className="flex gap-2 items-start border-b border-gray-100 pb-2">
                                        <span className="text-[#da251d] font-black text-xl leading-none">2</span>
                                        <a href="#" className="text-xs sm:text-sm font-semibold hover:text-[#da251d] leading-tight">Education Ministry announces revised dates for entrance exams</a>
                                    </li>
                                    <li className="flex gap-2 items-start border-b border-gray-100 pb-2">
                                        <span className="text-[#da251d] font-black text-xl leading-none">3</span>
                                        <a href="#" className="text-xs sm:text-sm font-semibold hover:text-[#da251d] leading-tight">Exclusive Interview: Lead actor speaks about his upcoming blockbuster film</a>
                                    </li>
                                    <li className="flex gap-2 items-start border-b border-gray-100 pb-2">
                                        <span className="text-[#da251d] font-black text-xl leading-none">4</span>
                                        <a href="#" className="text-xs sm:text-sm font-semibold hover:text-[#da251d] leading-tight">Health advisory: New virus strain detected, experts urge caution</a>
                                    </li>
                                    <li className="flex gap-2 items-start">
                                        <span className="text-[#da251d] font-black text-xl leading-none">5</span>
                                        <a href="#" className="text-xs sm:text-sm font-semibold hover:text-[#da251d] leading-tight">Space Agency successfully launches next-generation communication satellite</a>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>

                    {/* Election Widget / Special Feature */}
                    <div className="bg-blue-50 border border-blue-200 shadow-sm rounded p-2">
                        <h3 className="font-bold text-sm text-blue-800 mb-2 uppercase text-center border-b border-blue-200 pb-1">Election Results 2026</h3>
                        <div className="flex justify-between items-center text-xs sm:text-sm font-bold bg-white p-1 rounded border border-gray-200 mb-1">
                            <span>Party A</span>
                            <div className="flex-grow mx-2 bg-gray-200 h-2 rounded"><div className="bg-blue-600 h-2 rounded" style={{ width: '45%' }}></div></div>
                            <span>45%</span>
                        </div>
                        <div className="flex justify-between items-center text-xs sm:text-sm font-bold bg-white p-1 rounded border border-gray-200 mb-1">
                            <span>Party B</span>
                            <div className="flex-grow mx-2 bg-gray-200 h-2 rounded"><div className="bg-red-500 h-2 rounded" style={{ width: '38%' }}></div></div>
                            <span>38%</span>
                        </div>
                        <div className="flex justify-between items-center text-xs sm:text-sm font-bold bg-white p-1 rounded border border-gray-200">
                            <span>Others</span>
                            <div className="flex-grow mx-2 bg-gray-200 h-2 rounded"><div className="bg-gray-500 h-2 rounded" style={{ width: '17%' }}></div></div>
                            <span>17%</span>
                        </div>
                        <div className="text-center mt-2">
                            <a href="#" className="text-[0.65rem] text-blue-600 hover:underline">View Detailed Analysis &rarr;</a>
                        </div>
                    </div>

                    {/* Square Ad Space */}
                    <div className="w-full aspect-square bg-gray-200 border border-gray-300 flex items-center justify-center text-gray-500 text-xs font-bold uppercase tracking-widest shadow-sm">
                        Ad Space
                    </div>

                </aside>
            </main>

            {/* Footer */}
            <footer className="bg-[#1a1a1a] text-white mt-4 border-t-4 border-[#da251d] pt-4">
                <div className="max-w-7xl mx-auto px-2 grid grid-cols-2 sm:grid-cols-4 gap-4 pb-4">
                    <div>
                        <h4 className="font-bold mb-2 text-sm uppercase">Sections</h4>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li><a href="#" className="hover:text-white">India</a></li>
                            <li><a href="#" className="hover:text-white">World</a></li>
                            <li><a href="#" className="hover:text-white">Business</a></li>
                            <li><a href="#" className="hover:text-white">Tech & Auto</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-2 text-sm uppercase">Watch</h4>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li><a href="#" className="hover:text-white">Live TV</a></li>
                            <li><a href="#" className="hover:text-white">Latest Videos</a></li>
                            <li><a href="#" className="hover:text-white">Programmes</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-2 text-sm uppercase">About Us</h4>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li><a href="#" className="hover:text-white">About the Channel</a></li>
                            <li><a href="#" className="hover:text-white">Contact Us</a></li>
                            <li><a href="#" className="hover:text-white">Careers</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-2 text-sm uppercase">Legal</h4>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
                        </ul>
                    </div>
                </div>
                <div className="bg-black text-center text-[0.65rem] text-gray-500 py-2">
                    <p>&copy; 2026 NEWSLIVE Broadcasting Network. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}