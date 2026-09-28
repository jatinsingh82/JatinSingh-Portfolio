import React from 'react';
import { 
  Terminal, 
  Cloud, 
  ArrowRight, 
  FileText, 
  Mail, 
  Linkedin, 
  Github, 
  ShieldCheck, 
  Sparkles,
  Server,
  Layers
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { CloudHeroVisual } from './CloudHeroVisual';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-grid-pattern bg-radial-glow">
      
      {/* Background Decorative Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text Content & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Small Technical Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 font-mono text-xs font-semibold shadow-inner">
              <Cloud className="w-3.5 h-3.5 text-cyan-400" />
              <span>{PERSONAL_INFO.rolePill}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                Building Reliable Software &{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400">
                  Exploring the Cloud.
                </span>
              </h1>
              
              <h2 className="text-lg sm:text-xl font-medium text-slate-300 leading-snug">
                {PERSONAL_INFO.heroSupporting}
              </h2>
            </div>

            {/* Descriptive Summary Paragraph */}
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl">
              {PERSONAL_INFO.heroBio}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                id="hero-explore-btn"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenResume}
                id="hero-resume-btn"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700 hover:border-blue-500/50 transition-all duration-200"
              >
                <FileText className="w-4 h-4 text-blue-400" />
                <span>Download Resume</span>
              </button>

              <a
                href="#contact"
                id="hero-connect-btn"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 font-semibold text-sm border border-slate-800 hover:text-white transition-all duration-200"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Let's Connect</span>
              </a>
            </div>

            {/* Social & Contact Links */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs font-mono text-slate-400">
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4 text-slate-300" />
                <span>github.com/jatinsingh82</span>
              </a>

              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4 text-blue-400" />
                <span>LinkedIn</span>
              </a>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
            </div>

            {/* Subdued Status Pill */}
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{PERSONAL_INFO.statusBadge}</span>
            </div>

          </div>

          {/* Right Column: Dynamic Cloud Infrastructure Visual */}
          <div className="lg:col-span-5 flex justify-center">
            <CloudHeroVisual />
          </div>

        </div>
      </div>

    </section>
  );
};
