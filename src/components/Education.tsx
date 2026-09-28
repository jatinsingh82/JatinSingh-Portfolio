import React from 'react';
import { 
  GraduationCap, 
  MapPin, 
  Calendar, 
  Award, 
  CheckCircle2, 
  BookOpen, 
  School 
} from 'lucide-react';
import { EDUCATION_DATA } from '../data/portfolioData';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 bg-card-dark border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-mono mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Formal Computer Science Engineering education and academic foundations.
          </p>
          <div className="w-16 h-1 bg-blue-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Education Timeline Cards Grid */}
        <div className="max-w-4xl mx-auto space-y-6">
          {EDUCATION_DATA.map((edu, idx) => (
            <div
              key={edu.id}
              className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/40 transition-all duration-200 shadow-xl relative overflow-hidden group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-blue-500/30 transition-colors text-blue-400">
                    {idx === 0 ? <GraduationCap className="w-6 h-6" /> : <School className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white font-mono group-hover:text-blue-300 transition-colors">
                      {edu.degree}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5 text-xs font-mono text-cyan-400">
                      <span>{edu.institution}</span>
                      <span>•</span>
                      <span className="text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {edu.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-1 font-mono">
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/20 w-fit">
                    {edu.score}
                  </span>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {edu.period}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 mt-4 leading-relaxed font-sans">
                {edu.highlight}
              </p>

              {/* Coursework Tags */}
              <div className="mt-4 pt-3 border-t border-slate-800/60 flex flex-wrap items-center gap-1.5 font-mono text-[10px]">
                <span className="text-slate-500 font-semibold mr-1">Key Subjects:</span>
                {edu.courses.map((course) => (
                  <span
                    key={course}
                    className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800"
                  >
                    {course}
                  </span>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
