import React, { useState } from 'react';
import {
  Sparkles,
  Play,
  Layers,
  ArrowUpRight,
  PlusCircle,
  SlidersHorizontal,
  FolderOpen,
  ShieldCheck,
} from 'lucide-react';
import { PORTFOLIO_CONFIG, PortfolioProject } from '../config/portfolioData';
import { filterProjects } from '../utils/helpers';
import { InteractiveTiltCard } from './InteractiveTiltCard';
import { ProjectDetailModal } from './ProjectDetailModal';
import { EditPortfolioModal } from './EditPortfolioModal';

const CATEGORIES = [
  'All',
  'Video Editing',
  'Instagram Carousel Designs',
  'Promotional Creatives',
  'Social Media Campaigns',
  'Marketing Projects',
  'Influencer Campaigns',
] as const;

interface PortfolioSectionProps {
  isAdmin?: boolean;
  onOpenAdmin?: () => void;
  projects?: PortfolioProject[];
  onSaveProjects?: (projects: PortfolioProject[]) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  isAdmin = false,
  onOpenAdmin,
  projects: propProjects,
  onSaveProjects: propOnSaveProjects,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [localProjects, setLocalProjects] = useState<PortfolioProject[]>(() => {
    const saved = localStorage.getItem('hy_custom_projects');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fall back to config
      }
    }
    return PORTFOLIO_CONFIG.initialProjects;
  });

  const projects = propProjects || localProjects;
  const handleSaveProjects = propOnSaveProjects || ((newProjects: PortfolioProject[]) => {
    setLocalProjects(newProjects);
    localStorage.setItem('hy_custom_projects', JSON.stringify(newProjects));
  });

  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const filtered = filterProjects(projects, activeCategory);

  return (
    <section id="portfolio" className="py-24 sm:py-32 relative bg-[#080808] border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-[#FF6B2C]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin status pill if logged in */}
        {isAdmin && (
          <div className="mb-6 p-3 rounded-2xl bg-[#FF6B2C]/10 border border-[#FF6B2C]/30 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF8C42]">
              <ShieldCheck className="w-4 h-4 text-[#FF6B2C]" />
              <span>ADMIN MODE ACTIVE — YOU CAN ADD, EDIT OR DELETE PROJECTS</span>
            </div>
            <button
              onClick={onOpenAdmin || (() => setIsEditorOpen(true))}
              className="px-3 py-1 rounded-lg bg-[#FF6B2C] text-white text-xs font-bold uppercase tracking-wider shadow"
            >
              Open Admin Manager
            </button>
          </div>
        )}

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111111] border border-white/10 text-xs font-mono tracking-widest text-[#FF8C42] uppercase mb-3">
              <Layers className="w-3.5 h-3.5 text-[#FF6B2C]" />
              <span>FEATURED PORTFOLIO</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Selected Work & <span className="text-[#FF6B2C]">Creative Projects.</span>
            </h2>
            <p className="mt-3 text-zinc-400 text-xs sm:text-sm max-w-xl">
              Authentic creative direction, short-form video edits, conversion-oriented creatives, and strategic campaigns.
            </p>
          </div>

          {/* Admin-only quick action */}
          {isAdmin && (
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenAdmin || (() => setIsEditorOpen(true))}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#141414] hover:bg-[#1a1a1a] border border-[#FF6B2C]/40 hover:border-[#FF6B2C] text-xs font-semibold text-zinc-200 hover:text-white transition-all shadow-md"
                title="Add or replace your images, MP4 videos, and project details"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#FF8C42]" />
                <span>Admin Media Manager</span>
              </button>
            </div>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#FF8C42] to-[#FF6B2C] text-white shadow-[0_0_15px_rgba(255,107,44,0.35)]'
                  : 'bg-[#111111] hover:bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Gallery Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filtered.map((project) => (
              <InteractiveTiltCard
                key={project.id}
                maxTilt={9}
                scale={1.02}
                className="h-full cursor-pointer group"
                onClick={() => setSelectedProject(project)}
              >
                <div className="flex flex-col h-full bg-[#111111] border border-white/10 rounded-2xl overflow-hidden">
                  
                  {/* Thumbnail / Media Container */}
                  <div className="relative aspect-[16/10] bg-black overflow-hidden flex items-center justify-center">
                    {project.mediaUrl ? (
                      project.mediaType === 'video' ? (
                        <div className="relative w-full h-full flex items-center justify-center bg-zinc-900">
                          <video
                            src={project.mediaUrl}
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-[#FF6B2C] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                              <Play className="w-5 h-5 ml-0.5 fill-white" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <img
                          src={project.mediaUrl}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      )
                    ) : (
                      <div className="flex flex-col items-center justify-center text-zinc-500 p-6 text-center">
                        <FolderOpen className="w-10 h-10 mb-2 text-[#FF6B2C]/50" />
                        <span className="text-xs font-mono">Creative Asset</span>
                      </div>
                    )}

                    {/* Category Overlay Tag */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md bg-black/75 border border-white/10 text-[10px] font-mono font-semibold text-[#FF8C42] backdrop-blur-md uppercase tracking-wider">
                        {project.category}
                      </span>
                    </div>

                    {/* View overlay icon */}
                    <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-black/70 border border-white/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                      <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                        {project.role}
                      </div>
                      <h3 className="font-heading text-lg font-bold text-white mb-2 group-hover:text-[#FF8C42] transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                      <span>{project.deliverableCount || 'Deliverable'}</span>
                      <span className="text-[#FF8C42] group-hover:underline">View Project →</span>
                    </div>
                  </div>

                </div>
              </InteractiveTiltCard>
            ))}

            {/* Admin-only "Add Your Project" Card */}
            {isAdmin && (
              <div
                onClick={onOpenAdmin || (() => setIsEditorOpen(true))}
                className="p-8 rounded-2xl border border-dashed border-[#FF6B2C]/40 hover:border-[#FF6B2C] bg-black/40 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group min-h-[300px]"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#FF6B2C]/10 border border-[#FF6B2C]/30 flex items-center justify-center text-[#FF8C42] mb-4 transition-colors">
                  <PlusCircle className="w-6 h-6" />
                </div>
                <h4 className="font-heading text-base font-bold text-white mb-1">
                  Add New Project (Admin)
                </h4>
                <p className="text-xs text-zinc-400 max-w-xs mb-4">
                  Upload image, MP4 preview, or set custom titles directly in your authenticated panel.
                </p>
                <span className="text-xs font-mono text-[#FF8C42] font-semibold group-hover:underline">
                  + Create New Entry
                </span>
              </div>
            )}
          </div>
        ) : (
          /* Empty state */
          <div className="p-12 rounded-3xl border border-dashed border-white/15 bg-black/40 flex flex-col items-center justify-center text-center">
            <FolderOpen className="w-12 h-12 text-[#FF6B2C] mb-4 opacity-75" />
            <h3 className="font-heading text-xl font-bold text-white mb-2">
              No Projects in &quot;{activeCategory}&quot; Yet
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md mb-6">
              {isAdmin
                ? 'As administrator, you can add an image or MP4 video preview for this category.'
                : 'New projects in this category are being curated. Connect with Himnesh for custom case studies.'}
            </p>
            {isAdmin && (
              <button
                onClick={onOpenAdmin || (() => setIsEditorOpen(true))}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF8C42] to-[#FF6B2C] text-white text-xs font-bold uppercase tracking-wider shadow-lg"
              >
                Add Your Project
              </button>
            )}
          </div>
        )}

      </div>

      {/* Project details viewer modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Admin edit modal fallback */}
      {isEditorOpen && (
        <EditPortfolioModal
          projects={projects}
          onSave={handleSaveProjects}
          onClose={() => setIsEditorOpen(false)}
        />
      )}
    </section>
  );
};
