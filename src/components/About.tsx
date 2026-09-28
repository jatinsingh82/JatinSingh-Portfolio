import React from 'react';
import { 
  User, 
  Cloud, 
  Server, 
  Code2, 
  GitBranch, 
  Database, 
  Network, 
  Terminal,
  Cpu,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { PERSONAL_INFO, ENGINEERING_PROFILE } from '../data/portfolioData';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-card-dark border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-mono mb-3">
            <User className="w-3.5 h-3.5" />
            <span>Profile & Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About Jatin
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Engineering foundation, cloud curiosity, and modern software development focus.
          </p>
          <div className="w-16 h-1 bg-blue-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Two-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Narrative Introduction */}
          <div className="lg:col-span-7 space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed">
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Terminal className="w-5 h-5 text-blue-400" />
                <span>Computer Science & Cloud Focus</span>
              </h3>
              
              <p>
                I am a motivated <strong className="text-white">Computer Science Engineering undergraduate</strong> at GLA University with a strong foundation in cloud computing fundamentals, DevOps basics, and full-stack software development.
              </p>

              <p>
                My journey combines hands-on web development with an active exploration of cloud platforms. Through internship and training experiences at <strong className="text-blue-400">Zidio Development</strong> and <strong className="text-cyan-400">Edu-versity</strong>, I have gained practical experience developing web applications using React, Node.js, and MongoDB, alongside rigorous version control using Git and GitHub.
              </p>

              <p>
                With certifications in <strong className="text-white">Oracle Cloud Infrastructure Foundations</strong>, <strong className="text-white">OCI DevOps</strong>, and Cisco's <strong className="text-white">CCNA Networking</strong>, I understand how software connects to infrastructure—from networking protocols and REST APIs to automated build pipelines and cloud deployment workflows.
              </p>

              <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20">
                  #CloudInfrastructure
                </span>
                <span className="px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  #DevOpsFundamentals
                </span>
                <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  #FullStackDevelopment
                </span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  #ContinuousLearning
                </span>
              </div>
            </div>

            {/* Core Values / Approach Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
                  <Cloud className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wide">
                    Cloud-First Mindset
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Understanding availability, compute scaling, and decoupled architecture.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 shrink-0">
                  <GitBranch className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wide">
                    Version Control Discipline
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Clean commit history, structured branching, and collaborative peer reviews.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Engineering Profile Card */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-5 relative overflow-hidden">
              
              {/* Top Card Badge */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 font-mono text-xs">
                <div className="flex items-center gap-2 text-white font-bold tracking-wider uppercase">
                  <Cpu className="w-4 h-4 text-blue-400" />
                  <span>Engineering Profile</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  ACTIVE
                </span>
              </div>

              {/* Profile Fields */}
              <div className="space-y-3.5 font-mono text-xs">
                
                {/* Focus */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-slate-400">
                    <Cloud className="w-4 h-4 text-blue-400" />
                    <span>Focus</span>
                  </div>
                  <span className="font-bold text-white bg-blue-600/20 px-2.5 py-1 rounded text-blue-300 border border-blue-500/30">
                    {ENGINEERING_PROFILE.focus}
                  </span>
                </div>

                {/* Cloud Platforms */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-slate-400">
                    <Server className="w-4 h-4 text-cyan-400" />
                    <span>Cloud Platforms</span>
                  </div>
                  <span className="font-bold text-slate-200">
                    {ENGINEERING_PROFILE.cloudPlatforms}
                  </span>
                </div>

                {/* Development */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-slate-400">
                    <Code2 className="w-4 h-4 text-purple-400" />
                    <span>Development</span>
                  </div>
                  <span className="font-bold text-slate-200">
                    {ENGINEERING_PROFILE.development}
                  </span>
                </div>

                {/* Version Control */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-slate-400">
                    <GitBranch className="w-4 h-4 text-emerald-400" />
                    <span>Version Control</span>
                  </div>
                  <span className="font-bold text-slate-200">
                    {ENGINEERING_PROFILE.versionControl}
                  </span>
                </div>

                {/* Databases */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-slate-400">
                    <Database className="w-4 h-4 text-amber-400" />
                    <span>Databases</span>
                  </div>
                  <span className="font-bold text-slate-200">
                    {ENGINEERING_PROFILE.databases}
                  </span>
                </div>

                {/* Core */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-slate-400">
                    <Network className="w-4 h-4 text-indigo-400" />
                    <span>Core</span>
                  </div>
                  <span className="font-bold text-slate-200">
                    {ENGINEERING_PROFILE.core}
                  </span>
                </div>

              </div>

              {/* Bottom Note */}
              <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-900/40 text-[11px] text-blue-300 font-sans flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  Seeking an entry-level Azure/AWS DevOps Engineer – Analyst role to contribute to cloud operations and continuous deployment.
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
