

import React, { useState, useEffect, useMemo, Component, ErrorInfo, ReactNode } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home, Shield, MessageSquare } from 'lucide-react';
import { Project, Admin, ChatMessage } from './types';
import { ADMINS, INITIAL_PROJECTS } from './constants';

// Pages
import HomePage from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import LegendsProfile from './pages/LegendsProfile';

// --- Error Boundary Component ---
interface Props { children: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false, error: null };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-10 text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4 font-mono">APP_CRASH_DETECTED</h1>
          <p className="text-zinc-400 mb-8 max-w-md">The system encountered an unexpected error during execution.</p>
          <div className="glass p-6 rounded-3xl text-left font-mono text-xs text-red-400 overflow-auto max-w-full">
            {this.state.error?.toString()}
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="mt-8 px-8 py-3 bg-red-600 rounded-full font-bold uppercase tracking-widest text-sm"
          >
            Reboot System
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('sh_projects');
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch (e) {
      console.error("Failed to load projects from storage:", e);
      return INITIAL_PROJECTS;
    }
  });

  const [currentUser, setCurrentUser] = useState<Admin | null>(() => {
    try {
      const saved = localStorage.getItem('sh_auth');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error("Failed to load auth from storage:", e);
      return null;
    }
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('sh_messages');
      return saved ? JSON.parse(saved) : [
        { id: 'm1', sender: 'System', text: 'Welcome to Source Code Hub Chat!', isAdmin: true, timestamp: Date.now() }
      ];
    } catch (e) {
      return [{ id: 'm1', sender: 'System', text: 'Welcome!', isAdmin: true, timestamp: Date.now() }];
    }
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
  };

  // Log app initialization to Vercel
  useEffect(() => {
    console.log("[System] Application initialized successfully.");
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen pb-24">
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
    </ErrorBoundary>
  );
};

export default App;
