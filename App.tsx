
import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, Info, Search, Shield, MessageSquare, ChevronLeft, LogOut, Github, Download, Heart } from 'lucide-react';
import { Project, Admin, ChatMessage } from './types';
import { ADMINS, INITIAL_PROJECTS } from './constants';

// Pages
import HomePage from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import LegendsProfile from './pages/LegendsProfile';

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('sh_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [currentUser, setCurrentUser] = useState<Admin | null>(() => {
    const saved = localStorage.getItem('sh_auth');
    return saved ? JSON.parse(saved) : null;
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('sh_messages');
    return saved ? JSON.parse(saved) : [
      { id: 'm1', sender: 'System', text: 'Welcome to Source Code Hub Chat!', isAdmin: true, timestamp: Date.now() }
    ];
  });

  useEffect(() => {
    localStorage.setItem('sh_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('sh_messages', JSON.stringify(messages));
  }, [messages]);

  const handleLike = (id: string) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  const handleDownload = (id: string) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, downloads: p.downloads + 1 } : p));
  };

  const handleAddProject = (project: Project) => {
    setProjects(prev => [project, ...prev]);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const handleUpdateAdmin = (updatedAdmin: Admin) => {
    setCurrentUser(updatedAdmin);
    localStorage.setItem('sh_auth', JSON.stringify(updatedAdmin));
    // Also update global ADMINS reference for the session if needed
  };

  return (
    <Router>
      <div className="min-h-screen pb-24">
        {/* Main Header */}
        <header className="px-6 py-8 flex flex-col items-center justify-center space-y-4">
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-3xl md:text-5xl font-bold tracking-tighter transition-all group-hover:text-red-600">
              <span className="text-red-600 font-mono">&lt;/&gt;</span> Source Code
            </span>
          </Link>
          
          <Link 
            to="/legends" 
            className="flex items-center space-x-2 px-6 py-2 glass rounded-full red-glow-hover transition-all text-sm font-semibold uppercase tracking-widest"
          >
            <span className="text-yellow-400">👑</span> INFO 👑
          </Link>
        </header>

        <main className="max-w-5xl mx-auto px-4 md:px-6">
          <Routes>
            <Route path="/" element={<HomePage projects={projects} onLike={handleLike} onDownload={handleDownload} messages={messages} setMessages={setMessages} />} />
            <Route path="/project/:id" element={<ProjectDetail projects={projects} onLike={handleLike} onDownload={handleDownload} />} />
            <Route path="/legends" element={<LegendsProfile />} />
            <Route path="/admin/login" element={<AdminLogin onLogin={setCurrentUser} />} />
            <Route 
              path="/admin/dashboard" 
              element={
                currentUser ? (
                  <AdminDashboard 
                    admin={currentUser} 
                    projects={projects} 
                    onAdd={handleAddProject} 
                    onDelete={handleDeleteProject}
                    onLogout={() => {
                      setCurrentUser(null);
                      localStorage.removeItem('sh_auth');
                    }}
                    onUpdateAdmin={handleUpdateAdmin}
                  />
                ) : (
                  <AdminLogin onLogin={setCurrentUser} />
                )
              } 
            />
          </Routes>
        </main>

        {/* Floating Bottom Nav */}
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <div className="glass px-8 py-4 rounded-full flex items-center space-x-12 red-glow">
            <Link to="/" className="text-white hover:text-red-500 transition-all flex flex-col items-center">
              <Home size={24} />
              <span className="text-[10px] mt-1 font-bold uppercase tracking-tighter">Home</span>
            </Link>
            <Link to="/legends" className="text-white hover:text-red-500 transition-all flex flex-col items-center">
              <Shield size={24} />
              <span className="text-[10px] mt-1 font-bold uppercase tracking-tighter">Legends</span>
            </Link>
            <Link to={currentUser ? "/admin/dashboard" : "/admin/login"} className="text-white hover:text-red-500 transition-all flex flex-col items-center">
              <MessageSquare size={24} />
              <span className="text-[10px] mt-1 font-bold uppercase tracking-tighter">Admin</span>
            </Link>
          </div>
        </nav>
      </div>
    </Router>
  );
};

export default App;
