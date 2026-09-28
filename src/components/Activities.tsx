import React from 'react';
import { 
  Users, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  Award, 
  Building2 
} from 'lucide-react';
import { CO_CURRICULAR_DATA } from '../data/portfolioData';

export const Activities: React.FC = () => {
  return (
    <section className="py-16 bg-[#07111F] border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-mono mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Co-Curricular</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Leadership & Activities
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            Team collaboration, organizational responsibility, and campus leadership.
          </p>
        </div>

        {/* Single Event Coordinator Card */}
        <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/40 transition-all duration-200 shadow-xl relative overflow-hidden group">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:scale-105 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white font-mono group-hover:text-blue-300 transition-colors">
                  {CO_CURRICULAR_DATA.role}
                </h3>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold mt-0.5">
                  <span>{CO_CURRICULAR_DATA.event}</span>
                  <span>•</span>
                  <span className="text-slate-400">{CO_CURRICULAR_DATA.institution}</span>
                </div>
              </div>
            </div>

            <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-md border border-blue-500/20 w-fit flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{CO_CURRICULAR_DATA.year}</span>
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 mt-4 leading-relaxed font-sans">
            {CO_CURRICULAR_DATA.description}
          </p>

          <div className="mt-4 pt-3 border-t border-slate-800/60 flex flex-wrap gap-2 font-mono text-[11px]">
            {CO_CURRICULAR_DATA.skillsDemonstrated.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-md bg-slate-950 text-blue-300 border border-slate-800 flex items-center gap-1"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>{skill}</span>
              </span>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
