import React, { useEffect } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  FileText,
  CheckCircle2
} from 'lucide-react';
import { 
  PERSONAL_INFO, 
  EXPERIENCES_DATA, 
  EDUCATION_DATA, 
  PROJECTS_DATA, 
  CERTIFICATIONS_DATA, 
  CO_CURRICULAR_DATA 
} from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;

    // Prevent background scrolling while modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Handle Escape key to close modal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadTxt = () => {
    const textContent = `
JATIN SINGH
+918273324743 | rjsinghtarkar@gmail.com
LinkedIn: www.linkedin.com/in/jatin-singh-4685b0253
GitHub: https://github.com/jatinsingh82

CAREER OBJECTIVE
${PERSONAL_INFO.careerObjective}

EDUCATION
${EDUCATION_DATA.map(edu => `${edu.degree} | ${edu.institution}, ${edu.location} | ${edu.score} | ${edu.period}`).join('\n')}

INTERNSHIP / TRAINING EXPERIENCE
${EXPERIENCES_DATA.map(exp => `
${exp.role} | ${exp.company} (${exp.period}) [${exp.location}]
${exp.highlights.map(h => `• ${h}`).join('\n')}
`).join('\n')}

PROJECTS
${PROJECTS_DATA.map(proj => `
${proj.title}
${proj.highlights.map(h => `• ${h}`).join('\n')}
`).join('\n')}

TECHNICAL SKILLS
• Cloud & DevOps Fundamentals:
  - Basic cloud concepts: compute, storage, networking.
  - Familiar with AWS and Azure portals.
  - CI/CD basics and version control using Git/GitHub.
  - Understanding of deployment and monitoring workflows.
• Programming & Web Technologies: Python, Java, HTML, CSS, JavaScript, React, Node.js, Express.
• Databases and Tools: MySQL, MongoDB, VS Code, Eclipse, Git, GitHub.
• Core Concepts: Data Structures, DBMS, Computer Networking, Cloud Computing.

PROFESSIONAL ACHIEVEMENTS / CERTIFICATIONS
${CERTIFICATIONS_DATA.map(c => `• ${c.title} by ${c.issuer}`).join('\n')}

CO-CURRICULAR ACTIVITIES
• ${CO_CURRICULAR_DATA.role} for ${CO_CURRICULAR_DATA.event}, ${CO_CURRICULAR_DATA.institution} (${CO_CURRICULAR_DATA.year})
• ${CO_CURRICULAR_DATA.description}
    `.trim();

    const element = document.createElement('a');
    const file = new Blob([textContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'Jatin_Singh_Cloud_DevOps_Resume.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div 
      id="printable-resume-modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      
      {/* Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        
        {/* Top Control Bar */}
        <div className="no-print p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0 font-mono text-xs">
          <div className="flex items-center gap-2 text-slate-200 font-bold">
            <FileText className="w-4 h-4 text-blue-400" />
            <span>Jatin_Singh_Resume.pdf</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={handleDownloadTxt}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Download Text</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Close Resume View"
              aria-label="Close Resume Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Document View */}
        <div 
          id="printable-resume-content"
          className="p-6 sm:p-10 bg-white text-slate-900 overflow-y-auto space-y-5 font-sans text-xs leading-relaxed selection:bg-blue-200"
        >
          
          {/* Header Section */}
          <div className="text-center border-b border-slate-300 pb-3">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
              JATIN SINGH
            </h1>
            <p className="text-slate-700 text-xs mt-1 font-mono">
              +918273324743 | rjsinghtarkar@gmail.com
            </p>
            <p className="text-slate-600 text-xs font-mono">
              LinkedIn: www.linkedin.com/in/jatin-singh-4685b0253 | GitHub: https://github.com/jatinsingh82
            </p>
          </div>

          {/* Career Objective */}
          <div>
            <h2 className="text-sm font-bold uppercase font-serif tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
              Career Objective
            </h2>
            <p className="text-slate-800 text-xs">
              {PERSONAL_INFO.careerObjective}
            </p>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-sm font-bold uppercase font-serif tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
              Education
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between items-start font-bold text-slate-900">
                <div>
                  <span>Bachelor of Technology (B.Tech) – Computer Science Engineering</span>
                  <span className="font-normal block text-slate-700">GLA University, Mathura | CGPA: 6.82/10</span>
                </div>
                <div className="text-right text-slate-700 font-normal">
                  <span>May 2026</span>
                </div>
              </div>

              <div className="flex justify-between items-start font-bold text-slate-900">
                <div>
                  <span>Intermediate (Class XII)</span>
                  <span className="font-normal block text-slate-700">Kanha Makhan Public School, Mathura | Percentage: 69.4%</span>
                </div>
                <div className="text-right text-slate-700 font-normal">
                  <span>May 2022</span>
                </div>
              </div>
            </div>
          </div>

          {/* Internship / Training Experience */}
          <div>
            <h2 className="text-sm font-bold uppercase font-serif tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
              Internship / Training Experience
            </h2>
            <div className="space-y-3">
              {EXPERIENCES_DATA.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start font-bold text-slate-900">
                    <div>
                      <span>{exp.company} ({exp.location}):</span>
                      <span className="font-semibold block text-slate-700">{exp.role}</span>
                    </div>
                    <div className="text-right text-slate-700 font-normal">
                      <span>{exp.period}</span>
                    </div>
                  </div>
                  <ul className="list-disc pl-5 text-slate-800 space-y-0.5 mt-1">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-sm font-bold uppercase font-serif tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
              Projects
            </h2>
            <div className="space-y-3">
              {PROJECTS_DATA.map((p) => (
                <div key={p.id}>
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{p.title}:</span>
                    <span className="text-blue-700 font-normal text-[11px]">{p.githubUrl}</span>
                  </div>
                  <ul className="list-disc pl-5 text-slate-800 space-y-0.5 mt-1">
                    {p.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-sm font-bold uppercase font-serif tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
              Technical Skills
            </h2>
            <div className="space-y-1 text-slate-800 text-xs">
              <p>
                <strong>Cloud & DevOps Fundamentals:</strong> Basic cloud concepts: compute, storage, networking. Familiar with AWS and Azure portals. CI/CD basics and version control using Git/GitHub. Understanding of deployment and monitoring workflows.
              </p>
              <p>
                <strong>Programming & Web Technologies:</strong> Python, Java, HTML, CSS, JavaScript, React, Node.js, Express.
              </p>
              <p>
                <strong>Databases and Tools:</strong> MySQL, MongoDB, VS Code, Eclipse, Git, GitHub.
              </p>
              <p>
                <strong>Core Concepts:</strong> Data Structures, DBMS, Computer Networking, Cloud Computing.
              </p>
            </div>
          </div>

          {/* Professional Achievements / Insights */}
          <div>
            <h2 className="text-sm font-bold uppercase font-serif tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
              Professional Achievements / Insights
            </h2>
            <ul className="list-disc pl-5 text-slate-800 space-y-0.5">
              {CERTIFICATIONS_DATA.map((c) => (
                <li key={c.id}>
                  Certificate of <strong>{c.title}</strong> by {c.issuer}.
                </li>
              ))}
            </ul>
          </div>

          {/* Co-Curricular Activities */}
          <div>
            <h2 className="text-sm font-bold uppercase font-serif tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
              Co-Curricular Activities
            </h2>
            <ul className="list-disc pl-5 text-slate-800 space-y-0.5">
              <li>
                <strong>Event Coordinator</strong> for {CO_CURRICULAR_DATA.event}, {CO_CURRICULAR_DATA.institution} ({CO_CURRICULAR_DATA.year})
              </li>
              <li>
                {CO_CURRICULAR_DATA.description}
              </li>
            </ul>
          </div>

        </div>

        {/* Footer info */}
        <div className="no-print p-3 bg-slate-950 border-t border-slate-800 text-center font-mono text-[11px] text-slate-500 shrink-0">
          Official Resume Document of Jatin Singh • Aspiring Cloud & DevOps Engineer
        </div>

      </div>

    </div>
  );
};
