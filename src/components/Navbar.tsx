import React, { useState, useEffect } from 'react';
import { 
  Cloud, 
  Terminal, 
  FileText, 
  Menu, 
  X, 
  Send,
  Github,
  Linkedin,
  Cpu
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenResume: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'DevOps Flow', href: '#devops-flow' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-nav py-2.5 border-b border-slate-800/80 shadow-lg shadow-black/40' 
          : 'bg-transparent py-4 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Identity */}
          <a 
            href="#home" 
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5 font-mono">
                {PERSONAL_INFO.name}
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </span>
              <span className="text-xs text-slate-400 font-mono block">
                {PERSONAL_INFO.subtitle}
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-sm font-semibold' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={onOpenResume}
              id="nav-resume-btn"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-blue-500/50 transition-all duration-200 shadow-sm"
              title="View & Download Resume"
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>Resume</span>
            </button>

            <a
              href="#contact"
              id="nav-connect-btn"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/25 transition-all duration-200 hover:scale-[1.02]"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Let's Connect</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenResume}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              title="Resume"
            >
              <FileText className="w-4 h-4 text-blue-400" />
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 pb-4 px-2 bg-slate-900/95 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200 space-y-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-xs font-mono transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white font-bold' 
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}

            <div className="pt-3 mt-2 border-t border-slate-800/80 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 text-slate-200 text-xs font-mono flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4 text-blue-400" />
                <span>View & Print Resume</span>
              </button>

              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 text-white text-xs font-mono font-bold flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Let's Connect</span>
              </a>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
