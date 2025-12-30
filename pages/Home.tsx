
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search as SearchIcon, Heart, Download, MessageSquare, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Project, ChatMessage } from '../types';
import { ADMINS } from '../constants';

interface HomeProps {
  projects: Project[];
  onLike: (id: string) => void;
  onDownload: (id: string) => void;
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

const HomePage: React.FC<HomeProps> = ({ projects, onLike, onDownload, messages, setMessages }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const filteredProjects = useMemo(() => {
    return projects
      .filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.language.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [projects, searchQuery]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const userNumber = Math.floor(Math.random() * 1000);
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: `USER${userNumber}`,
      text: chatInput,
      isAdmin: false,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, newMessage]);
    setChatInput('');

    // Simulated Auto-reply
    setTimeout(() => {
      const adminReplies = [
        "Sabar ya, admin lagi asik coding!",
        "Halo Legends! Ada yang bisa kami bantu?",
        "Project ini gratis kok, silahkan di download.",
        "Request project? Chat aja nanti kami cek."
      ];
      const randomReply = adminReplies[Math.floor(Math.random() * adminReplies.length)];
      const adminMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: ADMINS[0].name,
        text: randomReply,
        isAdmin: true,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, adminMsg]);
    }, 2000);
  };

  return (
    <div className="space-y-12">
      {/* Search Bar */}
      <div className="relative group max-w-2xl mx-auto">
        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
          <SearchIcon className="text-gray-400 group-focus-within:text-red-500 transition-colors" size={20} />
        </div>
        <input 
          type="text"
          placeholder="Search projects or languages..."
          className="w-full pl-14 pr-6 py-5 bg-zinc-900 border border-zinc-800 rounded-40 focus:outline-none focus:border-red-600 transition-all font-medium text-lg glass red-glow-hover"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Projects List */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight px-2 flex items-center">
          <span className="w-8 h-1 bg-red-600 mr-3 rounded-full"></span>
          LATEST RELEASES
        </h2>
        
        <div className="grid gap-4">
          {filteredProjects.map(project => (
            <Link 
              key={project.id} 
              to={`/project/${project.id}`}
              className="group glass p-6 rounded-40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all hover:scale-[1.02] red-glow-hover border-l-4 border-l-transparent hover:border-l-red-600"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${project.type === 'CODE' ? 'border-red-600 text-red-500' : 'border-zinc-500 text-zinc-400'} uppercase tracking-widest`}>
                    {project.type}
                  </span>
                  <span className="text-zinc-500 text-sm font-mono">{project.language}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold group-hover:text-red-500 transition-colors">
                  {project.name}
                </h3>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Heart size={18} className="group-hover:text-red-500" />
                  <span className="font-mono">{project.likes}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <Download size={18} className="group-hover:text-white" />
                  <span className="font-mono">{project.downloads}</span>
                </div>
              </div>
            </Link>
          ))}

          {filteredProjects.length === 0 && (
            <div className="text-center py-20 text-zinc-500 border border-dashed border-zinc-800 rounded-40">
              No projects found matching your search.
            </div>
          )}
        </div>
      </section>

      {/* Chat Admin Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight px-2 flex items-center">
          <span className="w-8 h-1 bg-red-600 mr-3 rounded-full"></span>
          COMMUNITY HUB
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Admin Chat Profile Cards */}
          <div className="space-y-4">
            {ADMINS.map(admin => (
              <div key={admin.id} className="glass p-6 rounded-40 flex items-center justify-between gap-4 border-l-4 border-l-red-600">
                <div className="flex items-center gap-4">
                  <img src={admin.photoUrl} alt={admin.name} className="w-14 h-14 rounded-full object-cover border-2 border-red-600 p-0.5" />
                  <div>
                    <h4 className="font-bold">{admin.name}</h4>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-xs text-zinc-400 uppercase tracking-widest">Online</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => alert(`Redirecting to ${admin.role} direct line...`)}
                  className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-full hover:bg-red-700 transition-colors uppercase tracking-widest"
                >
                  CHAT {admin.role.toUpperCase()}
                </button>
              </div>
            ))}
          </div>

          {/* Real-time Simulated Chat Box */}
          <div className="glass rounded-40 overflow-hidden flex flex-col h-[400px]">
            <div className="bg-zinc-900/50 p-4 border-b border-zinc-800 flex justify-between items-center">
              <span className="text-xs font-bold tracking-widest text-zinc-400">LIVE SERVER FEED</span>
              <span className="text-[10px] font-mono text-red-500">ENCRYPTED_V3</span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm">
              {messages.map(msg => (
                <div key={msg.id} className={`flex flex-col ${msg.isAdmin ? 'items-start' : 'items-end'}`}>
                  <span className={`text-[10px] mb-1 ${msg.isAdmin ? 'text-red-500' : 'text-zinc-500'}`}>
                    [{msg.sender}]
                  </span>
                  <div className={`max-w-[80%] p-3 rounded-2xl ${msg.isAdmin ? 'bg-zinc-800/50 border border-zinc-700' : 'bg-red-600/20 border border-red-600/30'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <div className="p-4 border-t border-zinc-800 flex gap-2">
              <input 
                type="text" 
                placeholder="Type a message..."
                className="flex-1 bg-black border border-zinc-800 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-red-600 transition-all"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button 
                onClick={handleSendMessage}
                className="bg-red-600 p-2 rounded-full hover:bg-red-700 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
