import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  Cloud, 
  Workflow, 
  Network, 
  ShieldCheck, 
  FileCode, 
  ExternalLink,
  Sparkles,
  Search
} from 'lucide-react';
import { CERTIFICATIONS_DATA } from '../data/portfolioData';

export const Certifications: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Cloud', 'DevOps', 'Networking', 'Security', 'Programming'];

  const filteredCerts = CERTIFICATIONS_DATA.filter((cert) => {
    return activeCategory === 'All' || cert.category === activeCategory;
  });

  const getIssuerIcon = (category: string) => {
    switch (category) {
      case 'Cloud': return <Cloud className="w-5 h-5 text-blue-400" />;
      case 'DevOps': return <Workflow className="w-5 h-5 text-purple-400" />;
      case 'Networking': return <Network className="w-5 h-5 text-cyan-400" />;
      case 'Security': return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'Programming': return <FileCode className="w-5 h-5 text-amber-400" />;
      default: return <Award className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <section id="certifications" className="py-20 bg-[#07111F] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-mono mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Certifications & Learning
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Industry credentials in Oracle Cloud Infrastructure, DevOps pipelines, Cisco CCNA Networking, Cybersecurity, and Python.
          </p>
          <div className="w-16 h-1 bg-blue-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Category Filters */}
        <div className="flex justify-center flex-wrap gap-2 mb-10 font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Certification Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/40 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl shadow-slate-950/50 flex flex-col justify-between group"
            >
              <div>
                {/* Card Top Bar */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-blue-500/30 transition-colors">
                    {getIssuerIcon(cert.category)}
                  </div>

                  <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{cert.status}</span>
                  </span>
                </div>

                {/* Issuer Badge */}
                <span className="text-xs font-mono font-semibold text-cyan-400">
                  {cert.issuer}
                </span>

                {/* Title */}
                <h3 className="text-base font-bold text-white mt-1 group-hover:text-blue-300 transition-colors font-mono leading-snug">
                  {cert.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-400 mt-2.5 leading-relaxed font-sans">
                  {cert.description}
                </p>

                {/* Skills Gained Tags */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                  {cert.skillsGained.map((skill) => (
                    <span 
                      key={skill}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950 text-slate-300 border border-slate-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Verification Note */}
              <div className="mt-5 pt-3 border-t border-slate-800/60 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                <span>{cert.credentialNote}</span>
                <span className="text-blue-400 font-bold group-hover:underline">
                  {cert.category}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
