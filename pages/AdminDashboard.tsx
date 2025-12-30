
import React, { useState } from 'react';
import { Plus, Trash2, LogOut, Settings, Layout, Code, FileText, Camera, Save } from 'lucide-react';
import { Admin, Project, ProjectType } from '../types';

interface AdminDashboardProps {
  admin: Admin;
  projects: Project[];
  onAdd: (project: Project) => void;
  onDelete: (id: string) => void;
  onLogout: () => void;
  onUpdateAdmin: (updatedAdmin: Admin) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ admin, projects, onAdd, onDelete, onLogout, onUpdateAdmin }) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'upload' | 'profile'>('projects');
  
  // Upload State
  const [newName, setNewName] = useState('');
  const [newLang, setNewLang] = useState('');
  const [newType, setNewType] = useState<ProjectType>(ProjectType.CODE);
  const [newContent, setNewContent] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [newPreview, setNewPreview] = useState('https://picsum.photos/id/1/800/400');

  // Profile State
  const [editAdmin, setEditAdmin] = useState<Admin>(admin);
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');

  const adminProjects = projects.filter(p => p.authorId === admin.id);

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject: Project = {
      id: Math.random().toString(36).substr(2, 9),
      name: newName,
      language: newLang,
      type: newType,
      content: newContent,
      notes: newNotes,
      previewUrl: newPreview,
      likes: 0,
      downloads: 0,
      authorId: admin.id,
      createdAt: Date.now()
    };
    onAdd(newProject);
    setNewName('');
    setNewLang('');
    setNewContent('');
    setNewNotes('');
    setActiveTab('projects');
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass && oldPass !== admin.password) {
      alert("Old password incorrect!");
      return;
    }
    const updated = { ...editAdmin };
    if (newPass) updated.password = newPass;
    onUpdateAdmin(updated);
    alert("Profile Updated!");
    setOldPass('');
    setNewPass('');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter">DASHBOARD_LEGEND</h1>
          <p className="text-zinc-500 font-mono text-sm uppercase">Welcome back, {admin.name}</p>
        </div>
        <button 
          onClick={onLogout}
          className="flex items-center gap-2 text-zinc-500 hover:text-red-500 transition-colors font-bold text-xs uppercase tracking-widest"
        >
          <LogOut size={16} /> Sign Out
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 glass p-2 rounded-full w-fit">
        <button 
          onClick={() => setActiveTab('projects')}
          className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold transition-all ${activeTab === 'projects' ? 'bg-red-600 text-white' : 'hover:bg-zinc-800'}`}
        >
          <Layout size={14} /> PROJECTS
        </button>
        <button 
          onClick={() => setActiveTab('upload')}
          className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold transition-all ${activeTab === 'upload' ? 'bg-red-600 text-white' : 'hover:bg-zinc-800'}`}
        >
          <Plus size={14} /> UPLOAD
        </button>
        <button 
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold transition-all ${activeTab === 'profile' ? 'bg-red-600 text-white' : 'hover:bg-zinc-800'}`}
        >
          <Settings size={14} /> PROFILE
        </button>
      </div>

      {/* Projects List */}
      {activeTab === 'projects' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold uppercase tracking-widest px-2">Manage Projects</h2>
          <div className="grid gap-4">
            {adminProjects.map(p => (
              <div key={p.id} className="glass p-6 rounded-40 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">{p.name}</h3>
                  <p className="text-xs font-mono text-zinc-500">{p.language} • {p.type}</p>
                </div>
                <button 
                  onClick={() => onDelete(p.id)}
                  className="p-3 text-zinc-500 hover:text-red-600 hover:bg-red-600/10 rounded-full transition-all"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            {adminProjects.length === 0 && (
              <div className="text-center py-20 text-zinc-500 border border-dashed border-zinc-800 rounded-40">
                You haven't shared any projects yet.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Upload Form */}
      {activeTab === 'upload' && (
        <form onSubmit={handleAddProject} className="glass p-10 rounded-40 space-y-6 max-w-3xl border-l-4 border-l-red-600">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-2">Project Name</label>
              <input 
                type="text" 
                className="w-full px-6 py-4 bg-black border border-zinc-800 rounded-3xl focus:outline-none focus:border-red-600 transition-all"
                placeholder="My Awesome App"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-2">Language</label>
              <input 
                type="text" 
                className="w-full px-6 py-4 bg-black border border-zinc-800 rounded-3xl focus:outline-none focus:border-red-600 transition-all font-mono"
                placeholder="React, Python, PHP..."
                value={newLang}
                onChange={(e) => setNewLang(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-2">Project Type</label>
            <div className="flex gap-4">
              <button 
                type="button"
                onClick={() => setNewType(ProjectType.CODE)}
                className={`flex-1 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 border transition-all ${newType === ProjectType.CODE ? 'bg-red-600 border-red-600' : 'border-zinc-800'}`}
              >
                <Code size={18} /> CODE
              </button>
              <button 
                type="button"
                onClick={() => setNewType(ProjectType.FILE)}
                className={`flex-1 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 border transition-all ${newType === ProjectType.FILE ? 'bg-red-600 border-red-600' : 'border-zinc-800'}`}
              >
                <FileText size={18} /> FILE
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-2">Content (Code or Link)</label>
            <textarea 
              className="w-full px-6 py-4 bg-black border border-zinc-800 rounded-3xl focus:outline-none focus:border-red-600 transition-all font-mono h-48 text-sm"
              placeholder="Paste your source code or link here..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-2">Developer Notes (Optional)</label>
            <textarea 
              className="w-full px-6 py-4 bg-black border border-zinc-800 rounded-3xl focus:outline-none focus:border-red-600 transition-all h-24 text-sm"
              placeholder="Tell us more about this project..."
              value={newNotes}
              onChange={(e) => setNewNotes(e.target.value)}
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-2">Preview Image URL</label>
            <input 
              type="text" 
              className="w-full px-6 py-4 bg-black border border-zinc-800 rounded-3xl focus:outline-none focus:border-red-600 transition-all"
              placeholder="https://cloudinary.com/..."
              value={newPreview}
              onChange={(e) => setNewPreview(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-red-600 py-4 rounded-3xl font-bold uppercase tracking-widest hover:bg-red-700 transition-all red-glow"
          >
            Deploy Project
          </button>
        </form>
      )}

      {/* Profile Edit */}
      {activeTab === 'profile' && (
        <form onSubmit={handleUpdateProfile} className="glass p-10 rounded-40 space-y-6 max-w-3xl border-l-4 border-l-red-600">
           <div className="flex items-center gap-6 mb-8">
             <div className="relative group">
                <img src={editAdmin.photoUrl} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-red-600" />
                <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                   <Camera size={24} />
                </div>
             </div>
             <div>
               <h3 className="text-2xl font-bold">{editAdmin.name}</h3>
               <p className="text-zinc-500">{editAdmin.role}</p>
             </div>
           </div>

           <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-2">Display Name</label>
                <input 
                  type="text" 
                  className="w-full px-6 py-4 bg-black border border-zinc-800 rounded-3xl focus:outline-none focus:border-red-600 transition-all"
                  value={editAdmin.name}
                  onChange={(e) => setEditAdmin({...editAdmin, name: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-2">Photo URL</label>
                <input 
                  type="text" 
                  className="w-full px-6 py-4 bg-black border border-zinc-800 rounded-3xl focus:outline-none focus:border-red-600 transition-all font-mono"
                  value={editAdmin.photoUrl}
                  onChange={(e) => setEditAdmin({...editAdmin, photoUrl: e.target.value})}
                  required
                />
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-2">Personal Quote</label>
              <textarea 
                className="w-full px-6 py-4 bg-black border border-zinc-800 rounded-3xl focus:outline-none focus:border-red-600 transition-all h-24"
                value={editAdmin.quote}
                onChange={(e) => setEditAdmin({...editAdmin, quote: e.target.value})}
                required
              ></textarea>
           </div>

           <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-2">Hashtags (Comma separated)</label>
              <input 
                type="text" 
                className="w-full px-6 py-4 bg-black border border-zinc-800 rounded-3xl focus:outline-none focus:border-red-600 transition-all"
                value={editAdmin.hashtags.join(', ')}
                onChange={(e) => setEditAdmin({...editAdmin, hashtags: e.target.value.split(',').map(h => h.trim())})}
                required
              />
           </div>

           <hr className="border-zinc-800" />

           <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-2">Old Password</label>
                <input 
                  type="password" 
                  className="w-full px-6 py-4 bg-black border border-zinc-800 rounded-3xl focus:outline-none focus:border-red-600 transition-all"
                  value={oldPass}
                  onChange={(e) => setOldPass(e.target.value)}
                  placeholder="Keep empty to leave as is"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-2">New Password</label>
                <input 
                  type="password" 
                  className="w-full px-6 py-4 bg-black border border-zinc-800 rounded-3xl focus:outline-none focus:border-red-600 transition-all"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="Leave empty to keep current"
                />
              </div>
           </div>

           <button 
             type="submit"
             className="w-full bg-zinc-100 text-black py-4 rounded-3xl font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2"
           >
             <Save size={18} /> Update Profile
           </button>
        </form>
      )}
    </div>
  );
};

export default AdminDashboard;
