import React, { useState } from 'react';
import { 
  Layers, 
  Github, 
  ExternalLink, 
  CheckCircle2, 
  Server, 
  Database, 
  User, 
  Layout, 
  Cpu, 
  Network, 
  HardDrive, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  Code2
} from 'lucide-react';
import { PROJECTS_DATA, ProjectItem } from '../data/portfolioData';

export const Projects: React.FC = () => {
  const [activeProjectTab, setActiveProjectTab] = useState<string>('bus-booking');

  const getNodeIcon = (iconName: string) => {
    switch (iconName) {
      case 'User': return <User className="w-4 h-4 text-blue-400" />;
      case 'Layout': return <Layout className="w-4 h-4 text-cyan-400" />;
      case 'Cpu': return <Cpu className="w-4 h-4 text-purple-400" />;
      case 'Server': return <Server className="w-4 h-4 text-amber-400" />;
      case 'Database': return <Database className="w-4 h-4 text-emerald-400" />;
      case 'Layers': return <Layers className="w-4 h-4 text-cyan-400" />;
      case 'Network': return <Network className="w-4 h-4 text-blue-400" />;
      case 'HardDrive': return <HardDrive className="w-4 h-4 text-emerald-400" />;
      default: return <Server className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <section id="projects" className="py-20 bg-[#07111F] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-mono mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Featured Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Projects
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Applied web development, full-stack architecture, deployment concepts, and database operations.
          </p>
          <div className="w-16 h-1 bg-blue-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Project Selector Tabs */}
        <div className="flex justify-center gap-3 mb-10 font-mono text-xs">
          {PROJECTS_DATA.map((proj) => {
            const isSelected = activeProjectTab === proj.id;
            return (
              <button
                key={proj.id}
                onClick={() => setActiveProjectTab(proj.id)}
                className={`px-5 py-2.5 rounded-xl border flex items-center gap-2 transition-all font-semibold ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/30'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
                }`}
              >
                <Code2 className="w-4 h-4" />
                <span>{proj.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Project Full Detail Container */}
        {PROJECTS_DATA.map((project) => {
          if (project.id !== activeProjectTab) return null;

          return (
            <div 
              key={project.id}
              className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 animate-in fade-in duration-300"
            >
              
              {/* Project Header Info */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-mono font-semibold">
                      {project.category}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      {project.year}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-cyan-400 font-mono mt-0.5">
                    {project.subtitle}
                  </p>
                </div>

                {/* Action Button */}
                <div className="flex items-center gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-blue-500/50 font-mono text-xs font-semibold transition-all shadow-md"
                  >
                    <Github className="w-4 h-4 text-blue-400" />
                    <span>View on GitHub</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>
              </div>

              {/* Description & Core Highlights */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left: Summary & Highlights */}
                <div className="lg:col-span-6 space-y-4">
                  <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                    Overview & Engineering Highlights
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {project.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    {project.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300 font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="pt-4 border-t border-slate-800">
                    <span className="text-[11px] font-mono text-slate-400 block mb-2 font-semibold">
                      Tech Stack & Concepts:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-slate-950 text-blue-300 text-xs font-mono border border-slate-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Deployment & System Availability Considerations */}
                <div className="lg:col-span-6 space-y-4">
                  <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    <span>Deployment & Availability Considerations</span>
                  </h4>

                  <div className="space-y-3">
                    {project.deploymentConsiderations.map((consideration, idx) => (
                      <div 
                        key={idx}
                        className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 font-sans leading-relaxed"
                      >
                        {consideration}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Conceptual Architecture Visual Pipeline */}
              <div className="pt-6 border-t border-slate-800">
                <div className="flex items-center justify-between mb-4 font-mono text-xs">
                  <span className="text-white font-bold tracking-wider uppercase flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                    <span>Conceptual Data Flow Architecture</span>
                  </span>
                  <span className="text-slate-400 text-[11px]">
                    Interactive Pipeline Nodes
                  </span>
                </div>

                {/* Architecture Pipeline Nodes */}
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
                  {project.architectureNodes.map((node, index) => (
                    <div 
                      key={node.step}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 transition-all text-center flex flex-col items-center justify-between group"
                    >
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-blue-400/40 mb-2 transition-colors">
                        {getNodeIcon(node.icon)}
                      </div>
                      
                      <div>
                        <span className="text-[10px] font-mono text-slate-500 block">
                          Step 0{node.step}
                        </span>
                        <h5 className="font-bold text-xs text-white font-mono group-hover:text-blue-300 transition-colors">
                          {node.label}
                        </h5>
                        <p className="text-[11px] text-slate-400 mt-1 leading-snug font-sans">
                          {node.desc}
                        </p>
                      </div>

                      <div className="w-full h-1 bg-gradient-to-r from-blue-500/20 via-cyan-500/40 to-blue-500/20 rounded-full mt-3 group-hover:from-blue-500 group-hover:to-cyan-400 transition-all" />
                    </div>
                  ))}
                </div>

              </div>

            </div>
          );
        })}

      </div>
    </section>
  );
};
