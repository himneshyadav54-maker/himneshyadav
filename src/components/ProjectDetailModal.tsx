import React from 'react';
import { X, Play, Tag, ExternalLink, Calendar, Layers } from 'lucide-react';
import { PortfolioProject } from '../config/portfolioData';

interface ProjectDetailModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        className="relative w-full max-w-3xl bg-[#111111] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white transition-colors"
          aria-label="Close project modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Preview Header */}
        <div className="relative w-full h-72 sm:h-96 bg-black flex items-center justify-center overflow-hidden">
          {project.mediaType === 'video' ? (
            <video
              src={project.mediaUrl}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            />
          ) : project.mediaUrl ? (
            <img
              src={project.mediaUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-zinc-500">
              <Layers className="w-12 h-12 mb-2 text-zinc-600" />
              <span>Project Media Showcase</span>
            </div>
          )}

          {/* Tag badge overlay */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-black/70 border border-white/10 text-xs font-mono text-[#FF8C42] backdrop-blur-md">
              {project.category}
            </span>
          </div>
        </div>

        {/* Project Body Info */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          <h3 id="project-modal-title" className="font-heading text-2xl sm:text-3xl font-extrabold text-white mb-3">
            {project.title}
          </h3>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-black/40 border border-white/5 text-xs">
            <div>
              <span className="text-zinc-400 block font-mono uppercase mb-1">Creative Role:</span>
              <span className="text-white font-medium">{project.role}</span>
            </div>
            <div>
              <span className="text-zinc-400 block font-mono uppercase mb-1">Deliverable Scope:</span>
              <span className="text-white font-medium">{project.deliverableCount || 'Custom Deliverable Set'}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#0d0d0d] border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-zinc-400 font-mono">
            {project.tag}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
