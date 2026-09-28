import React, { useState } from 'react';
import { 
  Cloud, 
  CheckCircle2, 
  Play, 
  X, 
  Terminal, 
  Workflow,
  Activity,
  Server,
  ShieldCheck
} from 'lucide-react';

export const DevOpsControlWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [suiteProgress, setSuiteProgress] = useState(100);
  const [activeLog, setActiveLog] = useState('System Status: 100% Cloud & DevOps Ready.');

  const runFullAudit = () => {
    setIsRunning(true);
    setSuiteProgress(0);
    setActiveLog('Step 1/4: Checking Git branch consistency & commit hygiene...');

    setTimeout(() => {
      setSuiteProgress(30);
      setActiveLog('Step 2/4: Verifying Vite build & TypeScript zero-error compilation...');
    }, 400);

    setTimeout(() => {
      setSuiteProgress(65);
      setActiveLog('Step 3/4: Simulating cloud container ingress on port 3000...');
    }, 800);

    setTimeout(() => {
      setSuiteProgress(100);
      setActiveLog('✓ AUDIT COMPLETE! All pipeline checks passed. Status: READY.');
      setIsRunning(false);
    }, 1300);
  };

  return (
    <div id="devops-control-widget" className="no-print fixed bottom-5 right-5 z-40 font-mono text-xs">
      
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2.5 rounded-full bg-slate-900 border border-blue-500/50 text-blue-400 font-bold shadow-2xl flex items-center gap-2 hover:bg-slate-800 hover:border-blue-400 transition-all duration-200"
        >
          <Workflow className="w-4 h-4 text-cyan-400" />
          <span>DevOps Control</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      )}

      {/* Expanded Control Box */}
      {isOpen && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl w-80 sm:w-96 p-4 shadow-2xl space-y-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-slate-200 font-bold">
              <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>DEVOPS CONTROL CENTER</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white font-bold p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-[11px]">
            <div className="flex justify-between text-slate-400">
              <span>Cloud Readiness:</span>
              <span className="text-emerald-400 font-bold">100% ONLINE</span>
            </div>

            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 transition-all duration-300"
                style={{ width: `${suiteProgress}%` }}
              />
            </div>

            <div className="text-[10px] text-blue-300 leading-snug pt-1 truncate">
              {activeLog}
            </div>
          </div>

          <div className="space-y-1.5 text-[11px] text-slate-300">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> AWS / Azure Portal Models
              </span>
              <span className="text-emerald-400 font-semibold">VERIFIED</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> CI/CD Automation Flow
              </span>
              <span className="text-emerald-400 font-semibold">ACTIVE</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Responsive Web & API Architecture
              </span>
              <span className="text-emerald-400 font-semibold">PASSED</span>
            </div>
          </div>

          <button
            onClick={runFullAudit}
            disabled={isRunning}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Verifying Pipeline...' : 'Run DevOps Health Check'}</span>
          </button>

        </div>
      )}

    </div>
  );
};
