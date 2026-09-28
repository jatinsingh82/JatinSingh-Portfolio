import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { CloudFundamentals } from './components/CloudFundamentals';
import { CloudPlatforms } from './components/CloudPlatforms';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { DevOpsPipeline } from './components/DevOpsPipeline';
import { CicdTerminal } from './components/CicdTerminal';
import { Certifications } from './components/Certifications';
import { Education } from './components/Education';
import { Activities } from './components/Activities';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { DevOpsControlWidget } from './components/DevOpsControlWidget';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'devops-flow', 'certifications', 'education', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#07111F] text-slate-100 font-sans antialiased selection:bg-blue-600/40 selection:text-white">
      
      {/* Sticky Top Navigation */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Portfolio Sections */}
      <main>
        {/* 1. Hero Section with Interactive Cloud Visual */}
        <Hero onOpenResume={() => setIsResumeOpen(true)} />

        {/* 2. About Jatin Section */}
        <About />

        {/* 3. Technical Skills Stack */}
        <Skills />

        {/* 4. Cloud Fundamentals (Compute, Storage, Networking) */}
        <CloudFundamentals />

        {/* 5. Cloud Platforms (AWS & Azure Portals) */}
        <CloudPlatforms />

        {/* 6. Experience & Training (Vertical Timeline) */}
        <Experience />

        {/* 7. Featured Projects (Bus Booking System & MERN Job Portal) */}
        <Projects />

        {/* 8. From Code to Deployment (Interactive DevOps Pipeline) */}
        <DevOpsPipeline />

        {/* 9. Interactive CI/CD Visual Terminal */}
        <CicdTerminal />

        {/* 10. Certifications & Verified Credentials */}
        <Certifications />

        {/* 11. Education Timeline */}
        <Education />

        {/* 12. Leadership & Activities */}
        <Activities />

        {/* 13. Contact & Direct Message Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Resume View & Download Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Floating DevOps Control Center */}
      <DevOpsControlWidget />

    </div>
  );
}
