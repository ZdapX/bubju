
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Heart, Download, Copy, Check, ExternalLink } from 'lucide-react';
import { Project, ProjectType } from '../types';
import { ADMINS } from '../constants';

interface ProjectDetailProps {
  projects: Project[];
  onLike: (id: string) => void;
  onDownload: (id: string) => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projects, onLike, onDownload }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold">Project Not Found</h2>
        <button onClick={() => navigate('/')} className="text-red-500 underline">Return Home</button>
      </div>
    );
  }

  const author = ADMINS.find(a => a.id === project.authorId) || ADMINS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(project.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    onDownload(project.id);
    const blob = new Blob([project.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.name.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-zinc-500 hover:text-red-500 transition-colors font-bold uppercase tracking-widest text-xs"
      >
        <ChevronLeft size={16} /> BACK TO REPOSITORY
      </button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${project.type === ProjectType.CODE ? 'border-red-600 text-red-500' : 'border-zinc-500 text-zinc-400'} uppercase tracking-widest`}>
              {project.type}
            </span>
            <span className="text-zinc-500 text-sm font-mono">{project.language}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">{project.name}</h1>
          <p className="text-zinc-400 mt-2 flex items-center gap-2">
            Shared by <span className="text-white font-bold">{author.name}</span> • 
            {new Date(project.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={() => onLike(project.id)}
            className="flex items-center gap-2 glass px-6 py-3 rounded-full hover:border-red-600 transition-all red-glow-hover"
          >
            <Heart size={20} className="text-red-500 fill-red-500" />
            <span className="font-bold">{project.likes}</span>
          </button>
          <button 
            onClick={handleDownloadFile}
            className="flex items-center gap-2 bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 transition-all red-glow"
          >
            <Download size={20} />
            <span className="font-bold uppercase tracking-widest text-sm">Download</span>
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Content Box */}
          <div className="glass rounded-40 overflow-hidden">
            <div className="bg-zinc-900 px-6 py-4 flex justify-between items-center border-b border-zinc-800">
              <span className="font-mono text-xs text-zinc-400">SOURCE_VIEWER.EXE</span>
              <button 
                onClick={handleCopy}
                className="flex items-center gap-2 text-xs font-bold hover:text-red-500 transition-colors"
              >
                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                {copied ? 'COPIED' : 'COPY CODE'}
              </button>
            </div>
            <pre className="p-6 font-mono text-sm overflow-x-auto bg-black text-zinc-300 leading-relaxed whitespace-pre-wrap">
              <code>{project.content}</code>
            </pre>
          </div>

          {/* Notes */}
          {project.notes && (
            <div className="glass p-8 rounded-40 border-l-4 border-l-red-600">
              <h3 className="text-lg font-bold mb-4 uppercase tracking-widest text-red-500">Developer Notes</h3>
              <p className="text-zinc-400 leading-relaxed">{project.notes}</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="glass p-6 rounded-40 space-y-4">
            <h3 className="font-bold uppercase tracking-widest text-xs text-zinc-500">Preview</h3>
            <div className="relative group overflow-hidden rounded-3xl">
              <img src={project.previewUrl} alt="Preview" className="w-full h-48 object-cover transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <ExternalLink size={32} className="text-white" />
              </div>
            </div>
          </div>

          <div className="glass p-6 rounded-40 space-y-4">
             <h3 className="font-bold uppercase tracking-widest text-xs text-zinc-500">Author</h3>
             <div className="flex items-center gap-4">
               <img src={author.photoUrl} alt={author.name} className="w-12 h-12 rounded-full object-cover border-2 border-red-600" />
               <div>
                 <p className="font-bold">{author.name}</p>
                 <p className="text-xs text-zinc-500">{author.role}</p>
               </div>
             </div>
             <p className="text-xs text-zinc-400 italic">"{author.quote}"</p>
          </div>

          <div className="glass p-6 rounded-40 space-y-4">
             <h3 className="font-bold uppercase tracking-widest text-xs text-zinc-500">Stats</h3>
             <div className="grid grid-cols-2 gap-4">
               <div className="text-center p-4 bg-zinc-900/50 rounded-3xl border border-zinc-800">
                 <p className="text-2xl font-bold text-red-500">{project.likes}</p>
                 <p className="text-[10px] text-zinc-500 font-bold uppercase">Likes</p>
               </div>
               <div className="text-center p-4 bg-zinc-900/50 rounded-3xl border border-zinc-800">
                 <p className="text-2xl font-bold">{project.downloads}</p>
                 <p className="text-[10px] text-zinc-500 font-bold uppercase">Downloads</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
