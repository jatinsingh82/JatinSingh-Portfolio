import React, { useState } from 'react';
import { 
  Mail, 
  Linkedin, 
  Github, 
  Phone, 
  Send, 
  CheckCircle2, 
  Copy, 
  Check, 
  AlertCircle, 
  MapPin, 
  Terminal,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const [lastSentDraft, setLastSentDraft] = useState<{ subject: string; mailtoUrl: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim()) {
      setErrorMessage('Please enter your name.');
      setFormStatus('error');
      return;
    }

    if (!formData.email.trim() || !validateEmail(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      setFormStatus('error');
      return;
    }

    if (!formData.subject.trim()) {
      setErrorMessage('Please provide a subject for your message.');
      setFormStatus('error');
      return;
    }

    if (!formData.message.trim() || formData.message.length < 10) {
      setErrorMessage('Please write a message with at least 10 characters.');
      setFormStatus('error');
      return;
    }

    setFormStatus('loading');

    const subjectFormatted = `[Portfolio Inquiry] ${formData.subject} - from ${formData.name}`;
    const bodyFormatted = `Hello Jatin,\n\nMy Name: ${formData.name}\nMy Email: ${formData.email}\n\nMessage:\n${formData.message}\n\n---\nSent from your Portfolio Contact Form`;
    const mailtoUrl = `mailto:${encodeURIComponent(PERSONAL_INFO.email)}?subject=${encodeURIComponent(subjectFormatted)}&body=${encodeURIComponent(bodyFormatted)}`;

    // Copy formatted text to clipboard
    navigator.clipboard.writeText(bodyFormatted).catch(() => {});

    setTimeout(() => {
      setLastSentDraft({ subject: formData.subject, mailtoUrl });
      setFormStatus('success');
      // Trigger user's mail client
      window.location.href = mailtoUrl;
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 600);
  };

  return (
    <section id="contact" className="py-20 bg-card-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-mono mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let's Build Something Reliable.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Interested in cloud, DevOps, software development, or technical collaboration? Let's connect.
          </p>
          <div className="w-16 h-1 bg-blue-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info & Social Channels */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Email Card */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between group hover:border-blue-500/40 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-500 block">Email Address</span>
                  <a 
                    href={`mailto:${PERSONAL_INFO.email}`} 
                    className="text-xs sm:text-sm font-bold text-white font-mono hover:text-blue-400 transition-colors"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              <button
                onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                className="p-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                title="Copy Email"
              >
                {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone Card */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between group hover:border-blue-500/40 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-500 block">Phone Number</span>
                  <a 
                    href={`tel:${PERSONAL_INFO.phone}`} 
                    className="text-xs sm:text-sm font-bold text-white font-mono hover:text-cyan-400 transition-colors"
                  >
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
              </div>

              <button
                onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                className="p-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                title="Copy Phone"
              >
                {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* LinkedIn Card */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between group hover:border-blue-500/40 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-blue-600/10 text-blue-400 border border-blue-600/20">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-500 block">LinkedIn Profile</span>
                  <a 
                    href={PERSONAL_INFO.linkedinUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm font-bold text-white font-mono hover:text-blue-400 transition-colors flex items-center gap-1"
                  >
                    <span>{PERSONAL_INFO.linkedinDisplay}</span>
                  </a>
                </div>
              </div>

              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                title="Open LinkedIn"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* GitHub Card */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between group hover:border-blue-500/40 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-slate-800 text-slate-200 border border-slate-700">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-500 block">GitHub Profile</span>
                  <a 
                    href={PERSONAL_INFO.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm font-bold text-white font-mono hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span>github.com/jatinsingh82</span>
                  </a>
                </div>
              </div>

              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                title="Open GitHub"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Location Pill */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-3 text-xs font-mono text-slate-400">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Location: Mathura, Uttar Pradesh, India</span>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl">
              
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800 font-mono text-xs">
                <div className="flex items-center gap-2 text-white font-bold">
                  <MessageSquare className="w-4 h-4 text-blue-400" />
                  <span>Send a Direct Message</span>
                </div>
                <span className="text-slate-500 text-[11px]">
                  All fields validated
                </span>
              </div>

              {/* Status Alert Banner */}
              {formStatus === 'success' && (
                <div className="p-4 mb-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono space-y-2 animate-in fade-in">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-bold">Your message draft has been prepared and copied to clipboard!</span>
                  </div>
                  <p className="text-slate-300 font-sans text-xs">
                    Your default mail app was prompted with the pre-filled message. If it didn't open automatically, you can open it directly or send to <strong className="text-white">{PERSONAL_INFO.email}</strong>.
                  </p>
                  {lastSentDraft && (
                    <div className="pt-2 flex flex-wrap gap-2">
                      <a
                        href={lastSentDraft.mailtoUrl}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-[11px] font-semibold transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Open in Email App</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => setFormStatus('idle')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[11px] transition-colors"
                      >
                        <span>Send Another Message</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {formStatus === 'error' && errorMessage && (
                <div className="p-4 mb-6 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5 font-semibold">
                      Your Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Miller"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5 font-semibold">
                      Your Email <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alex@company.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5 font-semibold">
                    Subject <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Opportunity for Cloud / DevOps Engineer"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5 font-semibold">
                    Message <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your requirement, job role, or discussion topic..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-sans placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors leading-relaxed"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                >
                  <Send className={`w-4 h-4 ${formStatus === 'loading' ? 'animate-spin' : ''}`} />
                  <span>{formStatus === 'loading' ? 'Sending Message...' : 'Send Message'}</span>
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
