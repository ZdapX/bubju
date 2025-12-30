
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ShieldAlert } from 'lucide-react';
import { ADMINS } from '../constants';
import { Admin } from '../types';

interface AdminLoginProps {
  onLogin: (admin: Admin) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const admin = ADMINS.find(a => a.username.toLowerCase() === username.toLowerCase() && a.password === password);
    
    if (admin) {
      onLogin(admin);
      localStorage.setItem('sh_auth', JSON.stringify(admin));
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials access restricted.');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="glass p-10 rounded-40 space-y-8 border-t-4 border-t-red-600 red-glow">
        <div className="text-center space-y-2">
          <div className="inline-block p-4 bg-red-600/10 rounded-full mb-2">
            <Lock className="text-red-600" size={32} />
          </div>
          <h1 className="text-3xl font-bold tracking-tighter">SECURE ACCESS</h1>
          <p className="text-zinc-500 text-sm font-mono">AUTHORIZED PERSONNEL ONLY</p>
        </div>

        {error && (
          <div className="bg-red-600/20 border border-red-600 text-red-500 px-4 py-3 rounded-xl text-sm flex items-center gap-3 font-bold animate-pulse">
            <ShieldAlert size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-2">Username</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
              <input 
                type="text" 
                className="w-full pl-12 pr-4 py-4 bg-black border border-zinc-800 rounded-3xl focus:outline-none focus:border-red-600 transition-all font-mono"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
              <input 
                type="password" 
                className="w-full pl-12 pr-4 py-4 bg-black border border-zinc-800 rounded-3xl focus:outline-none focus:border-red-600 transition-all font-mono"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-red-600 text-white font-bold py-4 rounded-3xl hover:bg-red-700 transition-all red-glow uppercase tracking-widest"
          >
            Authenticate
          </button>
        </form>

        <div className="text-center">
          <p className="text-[10px] text-zinc-600 font-mono">ENCRYPTION: AES-256 ACTIVE</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
