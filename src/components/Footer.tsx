import React from 'react';
import { 
  Cloud, 
  ArrowUp, 
  Mail, 
  Linkedin, 
  Github, 
  CheckCircle2,
  Workflow,
  Server
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-12 pb-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          
          {/* Brand & Subtitle */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight font-mono">
                {PERSONAL_INFO.name}
              </h3>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                {PERSONAL_INFO.title} • {PERSONAL_INFO.location}
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-slate-400 text-xs font-mono">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
            <span>•</span>
            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <span>•</span>
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-blue-500/50 transition-all flex items-center gap-2 font-mono text-xs"
            title="Scroll to Top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4 text-blue-400" />
          </button>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-2 text-center sm:text-left">
          <p>© 2026 Jatin Singh. Built with a cloud-first mindset.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Infrastructure & Portfolio Code Verified</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
