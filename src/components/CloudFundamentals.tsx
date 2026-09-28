import React, { useState } from 'react';
import { 
  Cloud, 
  Cpu, 
  HardDrive, 
  Network, 
  ArrowRight, 
  Server, 
  ShieldCheck, 
  Layers, 
  CheckCircle2,
  Database,
  Lock,
  Activity
} from 'lucide-react';
import { CLOUD_FUNDAMENTALS } from '../data/portfolioData';

export const CloudFundamentals: React.FC = () => {
  const [activeCard, setActiveCard] = useState<string>('compute');

  return (
    <section id="cloud-fundamentals" className="py-16 bg-slate-950/80 border-b border-slate-800/80 relative overflow-hidden">
      
      {/* Background Subtle Highlights */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono mb-3">
            <Cloud className="w-3.5 h-3.5" />
            <span>Infrastructure Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Cloud Fundamentals
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            Foundational pillars of cloud computing: compute instances, reliable storage tiers, and secure network routing.
          </p>
        </div>

        {/* Three Infrastructure Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CLOUD_FUNDAMENTALS.map((card) => {
            const isSelected = activeCard === card.id;
            
            return (
              <div
                key={card.id}
                onClick={() => setActiveCard(card.id)}
                className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 border-blue-500 shadow-xl shadow-blue-500/10 -translate-y-1'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${
                      card.id === 'compute' 
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                        : card.id === 'storage'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                    }`}>
                      {card.id === 'compute' && <Cpu className="w-6 h-6" />}
                      {card.id === 'storage' && <HardDrive className="w-6 h-6" />}
                      {card.id === 'networking' && <Network className="w-6 h-6" />}
                    </div>

                    <span className="text-[10px] font-mono font-semibold px-2 py-1 rounded bg-slate-950 text-slate-400 border border-slate-800">
                      {card.status}
                    </span>
                  </div>

                  {/* Title & Tagline Pipeline */}
                  <h3 className="text-lg font-bold text-white font-mono tracking-wide">
                    {card.title}
                  </h3>

                  {/* Visual Flow Tagline */}
                  <div className="mt-2 p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 font-mono text-[11px] text-blue-300 flex items-center justify-center text-center font-semibold">
                    {card.tagline}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                    {card.description}
                  </p>

                  {/* Key Highlights Bullet points */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2">
                    {card.keyPoints.map((pt, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/50 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>Pillar 0{card.id === 'compute' ? '1' : card.id === 'storage' ? '2' : '3'}</span>
                  <span className="text-blue-400 font-semibold flex items-center gap-1">
                    {isSelected ? 'Selected' : 'Click to inspect'}
                  </span>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="mt-8 text-center text-[11px] font-mono text-slate-500">
          * Demonstrating conceptual understanding of basic cloud infrastructure models as supported by coursework & certifications.
        </div>

      </div>
    </section>
  );
};
