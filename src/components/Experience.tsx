import React from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Layers, 
  GitBranch, 
  Terminal, 
  Code2, 
  Award,
  BookOpen
} from 'lucide-react';
import { EXPERIENCES_DATA } from '../data/portfolioData';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-card-dark border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-mono mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career History</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Experience & Training
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Practical development internships, hands-on training, and intensive algorithmic problem solving.
          </p>
          <div className="w-16 h-1 bg-blue-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Vertical Timeline */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Vertical Center/Side Line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-500 to-purple-500 -translate-x-1/2 hidden sm:block" />
          <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 sm:hidden" />

          <div className="space-y-10">
            {EXPERIENCES_DATA.map((exp, index) => {
              const isEven = index % 2 === 0;
              const isCourse = exp.type === 'Value Added Course';

              return (
                <div 
                  key={exp.id} 
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* Timeline Badge Node */}
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-950 border-2 border-blue-500 flex items-center justify-center text-white z-10 shadow-lg shadow-blue-500/20">
                    {isCourse ? (
                      <BookOpen className="w-4 h-4 text-purple-400" />
                    ) : (
                      <Briefcase className="w-4 h-4 text-blue-400" />
                    )}
                  </div>

                  {/* Experience Card */}
                  <div className={`w-full sm:w-[calc(50%-2.5rem)] ml-14 sm:ml-0 ${
                    isEven ? 'sm:mr-auto' : 'sm:ml-auto'
                  }`}>
                    <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/40 transition-all duration-200 shadow-xl group">
                      
                      {/* Top Header Information */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
                        <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded ${
                          isCourse 
                            ? 'bg-purple-500/10 text-purple-300 border border-purple-500/20' 
                            : 'bg-blue-500/10 text-blue-300 border border-blue-500/20'
                        }`}>
                          {exp.type.toUpperCase()}
                        </span>

                        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          <span>{exp.period}</span>
                        </div>
                      </div>

                      {/* Role & Company */}
                      <div className="mt-3">
                        <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors font-mono">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 mt-1 text-xs font-mono text-cyan-400 font-semibold">
                          <span>{exp.company}</span>
                          <span>•</span>
                          <span className="text-slate-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {exp.location}
                          </span>
                        </div>
                      </div>

                      {/* Highlights */}
                      <ul className="mt-4 space-y-2 text-xs text-slate-300 leading-relaxed font-sans">
                        {exp.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Skills Tags */}
                      <div className="mt-4 pt-3 border-t border-slate-800/60 flex flex-wrap gap-1.5">
                        {exp.skillsUsed.map((skill) => (
                          <span 
                            key={skill}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950 text-slate-300 border border-slate-800"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
