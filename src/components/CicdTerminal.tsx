import React, { useState } from 'react';
import { 
  Terminal, 
  Play, 
  CheckCircle2, 
  RotateCcw, 
  Copy, 
  Check, 
  GitBranch,
  ShieldCheck,
  Activity
} from 'lucide-react';

export const CicdTerminal: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([
    '$ git push origin main',
    '✓ [git] Remote repository updated: refs/heads/main -> origin/main',
    '✓ [build] Web application build started (Vite + React)',
    '✓ [test] Unit checks & linting validations passing (0 errors)',
    '✓ [deploy] Deployment pipeline ready: AWS / Azure cloud runtime',
    'STATUS: SUCCESS • All checks passed in 480ms'
  ]);

  const handleRunPipeline = () => {
    setIsRunning(true);
    setLogs(['$ git push origin main', '⏳ [git] Pushing changes to remote main branch...']);

    setTimeout(() => {
      setLogs((prev) => [...prev, '✓ [git] Remote repository updated: commit a8f9c2d verified']);
    }, 400);

    setTimeout(() => {
      setLogs((prev) => [...prev, '⏳ [build] Compiling production bundle & resolving dependencies...']);
    }, 800);

    setTimeout(() => {
      setLogs((prev) => [...prev, '✓ [build] Build artifact generated: dist/ (0 warnings)']);
    }, 1200);

    setTimeout(() => {
      setLogs((prev) => [...prev, '✓ [test] Automated tests completed: 18/18 test suites green']);
    }, 1600);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev, 
        '✓ [deploy] Deployment pipeline target ready: Cloud VM instance online',
        'STATUS: SUCCESS • Release pipeline verified in 2.1s'
      ]);
      setIsRunning(false);
    }, 2000);
  };

  const copyCommand = () => {
    navigator.clipboard.writeText('git push origin main');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-14 bg-[#07111F] border-b border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Terminal Window Box */}
        <div className="rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden font-mono text-xs">
          
          {/* Top Control Bar */}
          <div className="p-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-slate-400 font-semibold text-xs ml-2 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-blue-400" />
                <span>cicd-pipeline-runner.sh</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={copyCommand}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] flex items-center gap-1 transition-colors"
                title="Copy git push command"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={handleRunPipeline}
                disabled={isRunning}
                className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1.5 transition-all disabled:opacity-50 text-[11px]"
              >
                <Play className={`w-3 h-3 ${isRunning ? 'animate-spin' : ''}`} />
                <span>{isRunning ? 'Running...' : 'Simulate Push'}</span>
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-5 space-y-2.5 bg-[#050B14] min-h-[190px] font-mono leading-relaxed">
            {logs.map((log, index) => {
              const isHeader = log.startsWith('$');
              const isSuccessStatus = log.startsWith('STATUS: SUCCESS');
              const isPending = log.startsWith('⏳');

              return (
                <div 
                  key={index}
                  className={`flex items-start gap-2 ${
                    isHeader 
                      ? 'text-cyan-400 font-bold text-sm' 
                      : isSuccessStatus 
                      ? 'text-emerald-400 font-bold pt-2 border-t border-slate-900' 
                      : isPending
                      ? 'text-amber-300'
                      : 'text-slate-300'
                  }`}
                >
                  <span>{log}</span>
                </div>
              );
            })}
          </div>

          {/* Terminal Status Bar */}
          <div className="px-4 py-2 bg-slate-900/80 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <GitBranch className="w-3.5 h-3.5 text-purple-400" /> branch: main (up to date)
            </span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> PIPELINE READY
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
