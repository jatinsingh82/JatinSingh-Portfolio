import React from 'react';
import { 
  Cloud, 
  Server, 
  Cpu, 
  HardDrive, 
  Network, 
  ShieldCheck, 
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';
import { CLOUD_PLATFORMS_DATA } from '../data/portfolioData';

export const CloudPlatforms: React.FC = () => {
  return (
    <section id="cloud-platforms" className="py-16 bg-[#07111F] border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-mono mb-3">
            <Server className="w-3.5 h-3.5" />
            <span>Cloud Portals</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Cloud Platforms
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            Familiarity with enterprise cloud portals, foundational services, compute, storage, and networking architectures.
          </p>
        </div>

        {/* AWS and Azure Two Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CLOUD_PLATFORMS_DATA.map((platform) => (
            <div
              key={platform.id}
              className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/40 transition-all duration-300 shadow-xl relative overflow-hidden group flex flex-col justify-between"
            >
              {/* Background Accent Glow */}
              <div 
                className="absolute top-0 right-0 w-36 h-36 rounded-full blur-3xl opacity-10 pointer-events-none transition-opacity group-hover:opacity-20"
                style={{ backgroundColor: platform.color }}
              />

              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center border shadow-md"
                      style={{ 
                        backgroundColor: `${platform.color}15`, 
                        borderColor: `${platform.color}35`,
                        color: platform.color 
                      }}
                    >
                      {platform.id === 'aws' ? <Cloud className="w-6 h-6" /> : <Server className="w-6 h-6" />}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white font-mono tracking-tight">
                        {platform.name}
                      </h3>
                      <span className="text-xs text-slate-400 font-sans">
                        {platform.fullName}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded bg-slate-950 text-blue-400 border border-slate-800">
                    {platform.badge}
                  </span>
                </div>

                {/* Description strictly per resume & prompt */}
                <p className="text-sm font-medium text-slate-200 mt-3 leading-relaxed">
                  {platform.description}
                </p>

                {/* Visual Elements: Compute, Storage, Networking */}
                <div className="mt-6 space-y-3">
                  {platform.pillars.map((pillar, idx) => (
                    <div 
                      key={idx}
                      className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3"
                    >
                      <div className="p-1.5 rounded-md bg-slate-900 text-blue-400 border border-slate-800 mt-0.5">
                        {pillar.name === 'Compute' && <Cpu className="w-3.5 h-3.5 text-blue-400" />}
                        {pillar.name === 'Storage' && <HardDrive className="w-3.5 h-3.5 text-emerald-400" />}
                        {pillar.name === 'Networking' && <Network className="w-3.5 h-3.5 text-cyan-400" />}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white font-mono">
                          {pillar.name}
                        </h4>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {pillar.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Note */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Portal Navigation & Foundations
                </span>
                <span className="text-slate-400">Cloud Operations</span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
