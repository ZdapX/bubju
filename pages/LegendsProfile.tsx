
import React from 'react';
import { ADMINS } from '../constants';
import { ExternalLink, Hash, Award } from 'lucide-react';

const LegendsProfile: React.FC = () => {
  return (
    <div className="space-y-12 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">THE LEGENDS</h1>
        <p className="text-zinc-500 font-mono text-sm max-w-xl mx-auto">
          The architects behind Source Code Hub. Pushing the boundaries of digital sharing and cyberpunk aesthetics.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {ADMINS.map(legend => (
          <div key={legend.id} className="glass p-8 md:p-12 rounded-40 relative overflow-hidden group border-t-4 border-t-red-600">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Award size={120} className="text-red-500" />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center space-y-6">
              <div className="relative">
                <img 
                  src={legend.photoUrl} 
                  alt={legend.name} 
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-red-600 p-1 bg-black group-hover:scale-105 transition-transform" 
                />
                <div className="absolute -bottom-2 -right-2 bg-red-600 text-white p-2 rounded-full red-glow">
                  <span className="text-xs font-bold px-2">{legend.role}</span>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold tracking-tight">{legend.name}</h2>
                <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest mt-1">@{legend.username}</p>
              </div>

              <div className="bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800 italic text-zinc-400 relative">
                <span className="text-4xl absolute -top-4 -left-2 text-red-600 opacity-30 font-serif">"</span>
                {legend.quote}
                <span className="text-4xl absolute -bottom-10 -right-2 text-red-600 opacity-30 font-serif">"</span>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {legend.hashtags.map(tag => (
                  <span key={tag} className="text-xs font-bold text-red-500 bg-red-600/10 px-4 py-2 rounded-full flex items-center gap-1 border border-red-600/20">
                    <Hash size={12} /> {tag.replace('#', '')}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 pt-4">
                <button className="p-4 bg-zinc-900 rounded-full hover:bg-red-600 transition-colors text-white red-glow-hover">
                  <ExternalLink size={20} />
                </button>
                <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-colors uppercase tracking-widest text-xs">
                  Portfolio
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="glass p-10 rounded-40 text-center space-y-4 border border-dashed border-zinc-800">
         <h3 className="text-xl font-bold tracking-tighter">WANT TO BECOME A LEGEND?</h3>
         <p className="text-zinc-500 text-sm max-w-lg mx-auto">
           Currently, Source Code Hub is an exclusive repository. If you have exceptional projects to share, contact the Owner directly.
         </p>
         <button className="text-red-500 font-bold underline uppercase tracking-widest text-xs">Join the Waitlist</button>
      </div>
    </div>
  );
};

export default LegendsProfile;
