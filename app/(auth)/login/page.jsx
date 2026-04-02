'use client'
import React, { useState } from 'react';
import { ShieldCheck, Phone, Lock, Loader2, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ mobile: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Adjust this URL to point to your actual PHP server environment
      const response = await fetch('https://haalchaal.live/api/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Store token and redirect to the secure dashboard
        localStorage.setItem('authToken', result.token);
        router.push('/dashboard');
      } else {
        setError(result.message || 'Authentication failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Ensure the server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-3">
      <div className="bg-white w-full max-w-sm rounded-xl shadow-lg border border-gray-100 p-5">
        
        <div className="flex flex-col items-center text-center mb-5">
          <div className="bg-red-100 p-2.5 rounded-full text-red-700 mb-2">
            <ShieldCheck size={28} />
          </div>
          <h1 className="text-lg font-black text-gray-900 tracking-tight">SECURE PORTAL</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Authorized Access Only</p>
        </div>

        {error && (
          <div className="mb-4 p-2.5 bg-red-50 border-l-4 border-red-600 flex items-center gap-2 text-red-800 text-xs font-semibold rounded-r">
            <AlertCircle size={14} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Mobile Number</label>
            <div className="relative">
              <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="tel" 
                required
                maxLength="15"
                className="w-full bg-gray-50 border border-gray-200 focus:border-red-700 focus:bg-white outline-none py-2.5 pl-9 pr-3 text-sm font-bold rounded-lg transition-all"
                placeholder="Enter mobile number"
                value={formData.mobile}
                onChange={(e) => setFormData({...formData, mobile: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="password" 
                required
                className="w-full bg-gray-50 border border-gray-200 focus:border-red-700 focus:bg-white outline-none py-2.5 pl-9 pr-3 text-sm font-mono tracking-widest rounded-lg transition-all"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-red-700 text-white font-black py-3 rounded-lg text-xs hover:bg-red-800 active:scale-95 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:pointer-events-none"
          >
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : 'LOGIN TO DASHBOARD'}
          </button>
        </form>

      </div>
    </div>
  );
}