import React, { useState } from 'react';
import { 
  Workflow, 
  Code2, 
  GitBranch, 
  Package, 
  ShieldCheck, 
  Rocket, 
  Activity, 
  ArrowRight, 
  Terminal,
  CheckCircle2,
  Sparkles,
  Info
} from 'lucide-react';
import { DEVOPS_PIPELINE_STAGES } from '../data/portfolioData';

export const DevOpsPipeline: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<string>('code');

  const getStageIcon = (iconName: string, isSelected: boolean) => {
    const cls = `w-5 h-5 ${isSelected ? 'text-white' : 'text-blue-400'}`;
    switch (iconName) {
      case 'Code2': return <Code2 className={cls} />;
      case 'GitBranch': return <GitBranch className={cls} />;
      case 'Package': return <Package className={cls} />;
      case 'ShieldCheck': return <ShieldCheck className={cls} />;
      case 'Rocket': return <Rocket className={cls} />;
      case 'Activity': return <Activity className={cls} />;
      default: return <Workflow className={cls} />;
    }
  };

  const currentStage = DEVOPS_PIPELINE_STAGES.find((s) => s.id === selectedStage) || DEVOPS_PIPELINE_STAGES[0];

  return (
    <section id="devops-flow" className="py-20 bg-card-dark border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-mono mb-3">
            <Workflow className="w-3.5 h-3.5" />
            <span>Lifecycle Automation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            From Code to Deployment
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Conceptual DevOps delivery pipeline model: from local commit to continuous cloud monitoring.
          </p>
          <div className="w-16 h-1 bg-purple-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Horizontal Pipeline Steps Container */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {DEVOPS_PIPELINE_STAGES.map((stage, idx) => {
            const isSelected = selectedStage === stage.id;

            return (
              <button
                key={stage.id}
                onClick={() => setSelectedStage(stage.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-blue-600 border-blue-400 text-white shadow-xl shadow-blue-600/30 scale-[1.03]'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-950 text-slate-400'
                    }`}>
                      {stage.stage}
                    </span>
                    
                    <div className={`p-2 rounded-xl transition-colors ${
                      isSelected ? 'bg-white/10' : 'bg-slate-950'
                    }`}>
                      {getStageIcon(stage.icon, isSelected)}
                    </div>
                  </div>

                  <h3 className="font-bold text-sm font-mono tracking-tight">
                    {stage.name}
                  </h3>
                  <p className={`text-xs mt-1 leading-snug line-clamp-2 ${
                    isSelected ? 'text-blue-100' : 'text-slate-400'
                  }`}>
                    {stage.shortDesc}
                  </p>
                </div>

                <div className={`mt-3 pt-2 border-t text-[10px] font-mono flex items-center justify-between ${
                  isSelected ? 'border-white/20 text-blue-200' : 'border-slate-800/80 text-slate-500'
                }`}>
                  <span>Stage {idx + 1}/6</span>
                  <span>{isSelected ? 'Active' : 'Inspect'}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Deep-Dive Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-mono font-bold">
                STAGE {currentStage.stage} DETAILS
              </span>
              <span className="text-white font-mono font-bold text-sm">
                {currentStage.title}
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              {currentStage.description}
            </p>

            <div className="flex items-center gap-2 pt-1 font-mono text-xs text-cyan-400">
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              <span>Recommended tooling & practices:</span>
              <span className="text-slate-200 font-semibold">{currentStage.tooling}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-400 w-full lg:w-80 shrink-0 space-y-2">
            <div className="flex items-center justify-between text-slate-300 font-bold pb-2 border-b border-slate-800">
              <span>Pipeline Health:</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> READY
              </span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span>Automation:</span>
              <span className="text-blue-400">Continuous Delivery</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span>Stage Target:</span>
              <span className="text-purple-400">Cloud High Availability</span>
            </div>
          </div>
        </div>

        {/* Note / Disclaimer per user prompt */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs font-mono text-slate-500 text-center">
          <Info className="w-3.5 h-3.5 text-blue-400" />
          <span>
            * Conceptual DevOps workflow model representing end-to-end continuous integration and deployment principles.
          </span>
        </div>

      </div>
    </section>
  );
};
