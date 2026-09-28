import React, { useState } from 'react';
import { 
  Cloud, 
  Terminal, 
  Layers, 
  Database, 
  Network, 
  Wrench, 
  Code2, 
  GitBranch, 
  Search,
  CheckCircle2,
  Workflow,
  Cpu,
  Server,
  HardDrive,
  Rocket,
  Activity,
  Binary,
  Layout,
  Braces,
  Shield
} from 'lucide-react';
import { SKILLS_DATA, SkillItem } from '../data/portfolioData';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { label: 'All', icon: Layers },
    { label: 'Cloud & DevOps', icon: Cloud },
    { label: 'Programming', icon: Code2 },
    { label: 'Web Development', icon: Layout },
    { label: 'Databases', icon: Database },
    { label: 'Core Concepts', icon: Network },
    { label: 'Tools', icon: Wrench },
  ];

  const filteredSkills = SKILLS_DATA.filter((skill) => {
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesSearch = 
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cloud': return <Cloud className="w-4 h-4 text-blue-400" />;
      case 'CloudRain': return <Cloud className="w-4 h-4 text-amber-400" />;
      case 'Server': return <Server className="w-4 h-4 text-cyan-400" />;
      case 'Workflow': return <Workflow className="w-4 h-4 text-purple-400" />;
      case 'GitBranch': return <GitBranch className="w-4 h-4 text-emerald-400" />;
      case 'Github': return <GitBranch className="w-4 h-4 text-slate-300" />;
      case 'Rocket': return <Rocket className="w-4 h-4 text-rose-400" />;
      case 'Activity': return <Activity className="w-4 h-4 text-emerald-400" />;
      case 'Terminal': return <Terminal className="w-4 h-4 text-blue-400" />;
      case 'Code2': return <Code2 className="w-4 h-4 text-amber-400" />;
      case 'Braces': return <Braces className="w-4 h-4 text-yellow-400" />;
      case 'Layers': return <Layers className="w-4 h-4 text-cyan-400" />;
      case 'Cpu': return <Cpu className="w-4 h-4 text-emerald-400" />;
      case 'Layout': return <Layout className="w-4 h-4 text-blue-400" />;
      case 'Database': return <Database className="w-4 h-4 text-indigo-400" />;
      case 'HardDrive': return <HardDrive className="w-4 h-4 text-emerald-400" />;
      case 'Binary': return <Binary className="w-4 h-4 text-purple-400" />;
      case 'Network': return <Network className="w-4 h-4 text-cyan-400" />;
      default: return <CheckCircle2 className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <section id="skills" className="py-20 bg-[#07111F] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-mono mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Core Competencies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technical Stack
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Categorized skills across cloud computing, version control, full-stack web development, and computer science foundations.
          </p>
          <div className="w-16 h-1 bg-blue-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Controls: Category Filter Tabs + Search Input */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.label;
              return (
                <button
                  key={cat.label}
                  onClick={() => setSelectedCategory(cat.label)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-medium flex items-center gap-2 whitespace-nowrap transition-all duration-200 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search technologies..."
              className="w-full pl-9 pr-4 py-2 bg-slate-900/90 border border-slate-800 rounded-xl text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-blue-500/40 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/5 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 group-hover:border-blue-500/30 transition-colors">
                    {getIcon(skill.iconName)}
                  </div>
                  
                  {skill.badge ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20">
                      {skill.badge}
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-500 bg-slate-950 border border-slate-800">
                      {skill.level}
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-sm text-white group-hover:text-blue-300 transition-colors font-mono">
                  {skill.name}
                </h3>
                
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  {skill.description}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>{skill.category}</span>
                <span className="text-slate-400 font-semibold">{skill.level}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12 text-slate-500 font-mono text-xs">
            No matching technologies found for "{searchQuery}".
          </div>
        )}

      </div>
    </section>
  );
};
