import React, { useState } from 'react';
import { X, Plus, Upload, Trash2, Check, Download, Copy, AlertCircle } from 'lucide-react';
import { PortfolioProject, PORTFOLIO_CONFIG } from '../config/portfolioData';

interface EditPortfolioModalProps {
  projects: PortfolioProject[];
  onSave: (projects: PortfolioProject[]) => void;
  onClose: () => void;
}

export const EditPortfolioModal: React.FC<EditPortfolioModalProps> = ({
  projects,
  onSave,
  onClose,
}) => {
  const [items, setItems] = useState<PortfolioProject[]>([...projects]);
  const [copied, setCopied] = useState(false);

  // New project draft
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<PortfolioProject['category']>('Video Editing');
  const [newDesc, setNewDesc] = useState('');
  const [newRole, setNewRole] = useState('Creative Lead & Editor');
  const [newMediaType, setNewMediaType] = useState<'image' | 'video'>('image');
  const [newMediaUrl, setNewMediaUrl] = useState('');

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newProject: PortfolioProject = {
      id: `proj-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      tag: newCategory,
      description: newDesc.trim() || 'Custom creative project asset.',
      role: newRole.trim() || 'Creative Producer',
      mediaType: newMediaType,
      mediaUrl: newMediaUrl.trim() || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      deliverableCount: 'Project Deliverable',
    };

    const updated = [newProject, ...items];
    setItems(updated);
    onSave(updated);

    // Reset inputs
    setNewTitle('');
    setNewDesc('');
    setNewMediaUrl('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isVideo = file.type.startsWith('video');
      setNewMediaType(isVideo ? 'video' : 'image');
      const reader = new FileReader();
      reader.onload = () => {
        setNewMediaUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (id: string) => {
    const updated = items.filter((p) => p.id !== id);
    setItems(updated);
    onSave(updated);
  };

  const handleResetToDefault = () => {
    setItems(PORTFOLIO_CONFIG.initialProjects);
    onSave(PORTFOLIO_CONFIG.initialProjects);
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(items, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="manage-projects-title"
    >
      <div
        className="relative w-full max-w-4xl bg-[#111111] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h3 id="manage-projects-title" className="font-heading text-xl sm:text-2xl font-bold text-white">
              Portfolio Media & Project Manager
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Easily add, edit or replace your images, MP4 videos, and project titles.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto py-6 space-y-8 pr-1">
          {/* Add Project Form */}
          <form onSubmit={handleAddProject} className="p-5 rounded-2xl bg-[#161616] border border-white/10">
            <h4 className="font-heading text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#FF8C42]" />
              <span>Add New Project / Video / Creative</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kinetic Reel Edit / Brand Carousel"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF6B2C]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Category *
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as PortfolioProject['category'])}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF6B2C]"
                >
                  <option value="Video Editing">Video Editing</option>
                  <option value="Instagram Carousel Designs">Instagram Carousel Designs</option>
                  <option value="Promotional Creatives">Promotional Creatives</option>
                  <option value="Social Media Campaigns">Social Media Campaigns</option>
                  <option value="Marketing Projects">Marketing Projects</option>
                  <option value="Influencer Campaigns">Influencer Campaigns</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Media Type
                </label>
                <div className="flex gap-4 items-center h-10">
                  <label className="flex items-center gap-1.5 text-xs text-zinc-300 cursor-pointer">
                    <input
                      type="radio"
                      name="mediaType"
                      checked={newMediaType === 'image'}
                      onChange={() => setNewMediaType('image')}
                      className="accent-[#FF6B2C]"
                    />
                    <span>Image / Thumbnail</span>
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-zinc-300 cursor-pointer">
                    <input
                      type="radio"
                      name="mediaType"
                      checked={newMediaType === 'video'}
                      onChange={() => setNewMediaType('video')}
                      className="accent-[#FF6B2C]"
                    />
                    <span>MP4 Video</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Role / Specialization
                </label>
                <input
                  type="text"
                  placeholder="e.g. Video Editor & Colorist"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF6B2C]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Media URL or Local Upload
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="https://... or paste direct MP4 / image link"
                    value={newMediaUrl}
                    onChange={(e) => setNewMediaUrl(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-black border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF6B2C]"
                  />
                  <label className="cursor-pointer px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-xs text-zinc-200 flex items-center gap-1.5 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload File</span>
                    <input
                      type="file"
                      accept="image/*,video/mp4"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Explain the strategy, visual style, or deliverable framework..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-black border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF6B2C]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF8C42] to-[#FF6B2C] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              Add Project To Portfolio
            </button>
          </form>

          {/* Current Projects List */}
          <div>
            <h4 className="font-heading text-sm font-bold text-white mb-3">
              Active Portfolio Items ({items.length})
            </h4>

            <div className="space-y-3">
              {items.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-black/40 border border-white/5 hover:border-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-white/10 overflow-hidden shrink-0 flex items-center justify-center">
                      {project.mediaUrl ? (
                        project.mediaType === 'video' ? (
                          <div className="text-[9px] font-mono text-[#FF8C42] uppercase text-center">
                            MP4 VIDEO
                          </div>
                        ) : (
                          <img
                            src={project.mediaUrl}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        )
                      ) : (
                        <span className="text-[10px] text-zinc-500 font-mono">No Media</span>
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white line-clamp-1">
                        {project.title}
                      </div>
                      <div className="text-[11px] text-zinc-400 font-mono">
                        {project.category} • {project.mediaType.toUpperCase()}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 rounded-lg hover:bg-red-500/10 text-zinc-500 hover:text-red-400 transition-colors"
                    title="Remove project"
                    aria-label={`Remove project ${project.title}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer with JSON copy/reset options */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 bg-[#111111]">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyJSON}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-zinc-300 flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied JSON Config' : 'Copy JSON Config'}</span>
            </button>
            <button
              onClick={handleResetToDefault}
              className="px-3 py-1.5 rounded-lg text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Reset to Defaults
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-[#FF6B2C] text-white text-xs font-bold uppercase tracking-wider"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
