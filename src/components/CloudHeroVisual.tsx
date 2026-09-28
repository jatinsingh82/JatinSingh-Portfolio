import React, { useState, useEffect } from 'react';
import { 
  Cloud, 
  Server, 
  Workflow, 
  Package, 
  Rocket, 
  Layout, 
  GitBranch, 
  CheckCircle2, 
  Activity, 
  Terminal,
  Cpu,
  Database,
  ArrowDown,
  Layers,
  Sparkles
} from 'lucide-react';

export const CloudHeroVisual: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string>('cicd');
  const [pulseCount, setPulseCount] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseCount((prev) => (prev + 1) % 6);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const nodeDetails: Record<string, { title: string; desc: string; badge: string }> = {
    cloud: {
      title: 'Cloud Infrastructure Tier',
      desc: 'Scalable cloud computing foundations leveraging virtualized compute, storage buckets, and high-availability architecture.',
      badge: 'IaaS & PaaS Foundations'
    },
    aws: {
      title: 'AWS Cloud Portal',
      desc: 'Familiarity with AWS portal, EC2 compute concepts, S3 object storage, and foundational cloud services.',
      badge: 'AWS Familiarity'
    },
    azure: {
      title: 'Microsoft Azure Portal',
      desc: 'Familiarity with Azure Portal, virtual machines, resource groups, and cloud operations.',
      badge: 'Azure Familiarity'
    },
    cicd: {
      title: 'CI/CD Automation Flow',
      desc: 'Version-controlled repository triggers, automated build verification, and deployment pipelines.',
      badge: 'Pipeline Active'
    },
    build: {
      title: 'Artifact Build & Package',
      desc: 'Compiling React frontends, Node.js backend bundles, dependency resolution, and asset packaging.',
      badge: 'Build Verification'
    },
    deploy: {
      title: 'Release & Deployment',
      desc: 'Rollout to target hosting environments, port binding, environment config, and health readiness checks.',
      badge: 'Target Rollout'
    },
    application: {
      title: 'Live Web Application',
      desc: 'Reliable, responsive full-stack applications backed by resilient APIs and secure databases.',
      badge: 'System Online'
    }
  };

  return (
    <div className="relative w-full max-w-lg mx-auto bg-slate-900/90 border border-slate-800/90 rounded-2xl p-5 sm:p-6 shadow-2xl backdrop-blur-xl font-sans overflow-hidden">
      
      {/* Decorative Gradient Background Highlights */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header / Control Bar */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800/80 font-mono text-[11px]">
        <div className="flex items-center gap-2 text-slate-300">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-slate-400 pl-1 font-semibold">CLOUD_INFRASTRUCTURE.sys</span>
        </div>

        <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span>SYS_ONLINE</span>
        </div>
      </div>

      {/* Interactive Cloud Infrastructure Diagram */}
      <div className="flex flex-col items-center gap-2 text-xs relative">
        
        {/* Tier 1: Cloud Root */}
        <button
          onClick={() => setActiveNode('cloud')}
          className={`w-44 py-2 px-3 rounded-xl border flex items-center justify-center gap-2 font-mono font-bold transition-all duration-200 ${
            activeNode === 'cloud'
              ? 'bg-blue-600/30 border-blue-400 text-white shadow-lg shadow-blue-500/20 scale-105'
              : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-blue-500/50'
          }`}
        >
          <Cloud className="w-4 h-4 text-blue-400" />
          <span>☁ CLOUD</span>
        </button>

        {/* Connector Line 1 */}
        <div className="w-0.5 h-4 bg-gradient-to-b from-blue-500 to-slate-700" />

        {/* Tier 2: AWS & Azure Branch */}
        <div className="w-full flex items-center justify-center gap-4 relative">
          
          {/* AWS Node */}
          <button
            onClick={() => setActiveNode('aws')}
            className={`flex-1 py-2 px-3 rounded-xl border flex items-center justify-center gap-2 font-mono font-semibold transition-all duration-200 ${
              activeNode === 'aws'
                ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md shadow-amber-500/20 scale-105'
                : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-amber-500/40'
            }`}
          >
            <Cloud className="w-4 h-4 text-amber-400" />
            <span>AWS ☁</span>
          </button>

          {/* Center Line Marker */}
          <div className="text-slate-600 font-mono text-[10px]">&</div>

          {/* Azure Node */}
          <button
            onClick={() => setActiveNode('azure')}
            className={`flex-1 py-2 px-3 rounded-xl border flex items-center justify-center gap-2 font-mono font-semibold transition-all duration-200 ${
              activeNode === 'azure'
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20 scale-105'
                : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-cyan-500/40'
            }`}
          >
            <Server className="w-4 h-4 text-cyan-400" />
            <span>AZURE ☁</span>
          </button>

        </div>

        {/* Connector Line 2 */}
        <div className="w-0.5 h-4 bg-gradient-to-b from-slate-700 to-purple-500" />

        {/* Tier 3: CI/CD Central Hub */}
        <button
          onClick={() => setActiveNode('cicd')}
          className={`w-48 py-2 px-3 rounded-xl border flex items-center justify-center gap-2 font-mono font-bold transition-all duration-200 ${
            activeNode === 'cicd'
              ? 'bg-purple-600/30 border-purple-400 text-white shadow-lg shadow-purple-500/25 scale-105'
              : 'bg-slate-950/80 border-slate-800 text-purple-300 hover:border-purple-500/50'
          }`}
        >
          <Workflow className="w-4 h-4 text-purple-400 animate-spin-slow" />
          <span>CI / CD PIPELINE</span>
        </button>

        {/* Connector Line 3 */}
        <div className="w-0.5 h-4 bg-gradient-to-b from-purple-500 to-slate-700" />

        {/* Tier 4: Build & Deploy Branch */}
        <div className="w-full flex items-center justify-center gap-4">
          
          {/* Build Node */}
          <button
            onClick={() => setActiveNode('build')}
            className={`flex-1 py-2 px-3 rounded-xl border flex items-center justify-center gap-2 font-mono font-semibold transition-all duration-200 ${
              activeNode === 'build'
                ? 'bg-blue-600/25 border-blue-400 text-blue-300 shadow-md scale-105'
                : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-blue-500/40'
            }`}
          >
            <Package className="w-4 h-4 text-blue-400" />
            <span>BUILD</span>
          </button>

          <ArrowDown className="w-3.5 h-3.5 text-slate-600" />

          {/* Deploy Node */}
          <button
            onClick={() => setActiveNode('deploy')}
            className={`flex-1 py-2 px-3 rounded-xl border flex items-center justify-center gap-2 font-mono font-semibold transition-all duration-200 ${
              activeNode === 'deploy'
                ? 'bg-emerald-600/25 border-emerald-400 text-emerald-300 shadow-md scale-105'
                : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-emerald-500/40'
            }`}
          >
            <Rocket className="w-4 h-4 text-emerald-400" />
            <span>DEPLOY</span>
          </button>

        </div>

        {/* Connector Line 4 */}
        <div className="w-0.5 h-4 bg-gradient-to-b from-slate-700 to-emerald-500" />

        {/* Tier 5: Target Live Application */}
        <button
          onClick={() => setActiveNode('application')}
          className={`w-full py-2.5 px-4 rounded-xl border flex items-center justify-center gap-2 font-mono font-bold transition-all duration-200 ${
            activeNode === 'application'
              ? 'bg-gradient-to-r from-blue-600/30 via-cyan-600/30 to-emerald-600/30 border-emerald-400 text-white shadow-lg scale-[1.02]'
              : 'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-cyan-500/50'
          }`}
        >
          <Layout className="w-4 h-4 text-cyan-400" />
          <span>PRODUCTION APPLICATION</span>
        </button>

      </div>

      {/* Dynamic Detail Card for Clicked Node */}
      <div className="mt-4 p-3 rounded-xl bg-slate-950/90 border border-slate-800 text-left transition-all">
        <div className="flex items-center justify-between font-mono text-[11px] mb-1">
          <span className="text-white font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            {nodeDetails[activeNode].title}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px]">
            {nodeDetails[activeNode].badge}
          </span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed font-sans">
          {nodeDetails[activeNode].desc}
        </p>
      </div>

      {/* Status Indicators Grid */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 font-mono text-[10px]">
        <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/60 flex items-center gap-2 text-slate-300">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span>CLOUD READY</span>
        </div>
        <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/60 flex items-center gap-2 text-slate-300">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          <span>CI/CD ACTIVE</span>
        </div>
        <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/60 flex items-center gap-2 text-slate-300">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>GIT CONNECTED</span>
        </div>
        <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/60 flex items-center gap-2 text-emerald-400 font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>SYSTEM ONLINE</span>
        </div>
      </div>

      <div className="mt-2 text-center text-[10px] font-mono text-slate-500">
        * Interactive visual representation of Jatin's Cloud & DevOps conceptual architecture.
      </div>

    </div>
  );
};
