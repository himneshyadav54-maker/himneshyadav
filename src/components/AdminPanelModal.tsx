import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  Upload,
  Copy,
  Check,
  ShieldCheck,
  LogOut,
  FolderOpen,
  Phone,
  Mail,
  Instagram,
  User,
  Sliders,
} from 'lucide-react';
import { PortfolioProject, PORTFOLIO_CONFIG } from '../config/portfolioData';

interface AdminPanelModalProps {
  isOpen: boolean;
  projects: PortfolioProject[];
  onSaveProjects: (projects: PortfolioProject[]) => void;
  onClose: () => void;
  onLogout: () => void;
  onContactUpdate?: (whatsapp: string, email: string, instagram: string) => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  projects,
  onSaveProjects,
  onClose,
  onLogout,
  onContactUpdate,
}) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'contact'>('projects');
  const [items, setItems] = useState<PortfolioProject[]>([...projects]);
  const [copied, setCopied] = useState(false);

  // Contact editing state
  const [whatsappVal, setWhatsappVal] = useState(() => {
    return localStorage.getItem('hy_custom_whatsapp') || PORTFOLIO_CONFIG.personal.whatsappNumber;
  });
  const [emailVal, setEmailVal] = useState(() => {
    return localStorage.getItem('hy_custom_email') || PORTFOLIO_CONFIG.personal.email;
  });
  const [instaVal, setInstaVal] = useState(() => {
    return localStorage.getItem('hy_custom_instagram') || PORTFOLIO_CONFIG.personal.instagramUrl;
  });
  const [contactSaved, setContactSaved] = useState(false);

  // New project draft form
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<PortfolioProject['category']>('Video Editing');
  const [newDesc, setNewDesc] = useState('');
  const [newRole, setNewRole] = useState('Creative Lead & Editor');
  const [newMediaType, setNewMediaType] = useState<'image' | 'video'>('image');
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newDeliverable, setNewDeliverable] = useState('Deliverable Asset');

  if (!isOpen) return null;

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newProject: PortfolioProject = {
      id: `proj-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      tag: newCategory,
      description: newDesc.trim() || 'Custom creative project asset.',
      role: newRole.trim() || 'Creative Lead',
      mediaType: newMediaType,
      mediaUrl: newMediaUrl.trim() || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      deliverableCount: newDeliverable.trim() || 'Project Asset',
    };

    const updated = [newProject, ...items];
    setItems(updated);
    onSaveProjects(updated);

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
    onSaveProjects(updated);
  };

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('hy_custom_whatsapp', whatsappVal);
    localStorage.setItem('hy_custom_email', emailVal);
    localStorage.setItem('hy_custom_instagram', instaVal);
    if (onContactUpdate) {
      onContactUpdate(whatsappVal, emailVal, instaVal);
    }
    setContactSaved(true);
    setTimeout(() => setContactSaved(false), 2500);
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(items, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-panel-title"
    >
      <div
        className="relative w-full max-w-4xl bg-[#111111] border border-[#FF6B2C]/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6B2C]/10 blur-3xl pointer-events-none" />

        {/* Header with Admin Status */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B2C]/15 border border-[#FF6B2C]/30 flex items-center justify-center text-[#FF8C42]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="admin-panel-title" className="font-heading text-lg sm:text-xl font-bold text-white">
                  Admin Control Panel
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-green-500/15 border border-green-500/30 text-[10px] font-mono text-green-400 uppercase font-semibold">
                  AUTHENTICATED
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Logged in as Himnesh Yadav • Full Administrative Control
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Log Out of Admin Mode"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Log Out</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close Admin Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 my-4 border-b border-white/5 pb-2">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'projects'
                ? 'bg-[#FF6B2C] text-white shadow-md'
                : 'text-zinc-400 hover:text-white bg-black/40'
            }`}
          >
            Manage Projects ({items.length})
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'contact'
                ? 'bg-[#FF6B2C] text-white shadow-md'
                : 'text-zinc-400 hover:text-white bg-black/40'
            }`}
          >
            Contact Channels
          </button>
        </div>

        {/* Body Content */}
        <div className="overflow-y-auto py-2 space-y-6 pr-1">
          {activeTab === 'projects' && (
            <>
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
                          name="adminMediaType"
                          checked={newMediaType === 'image'}
                          onChange={() => setNewMediaType('image')}
                          className="accent-[#FF6B2C]"
                        />
                        <span>Image / Thumbnail</span>
                      </label>
                      <label className="flex items-center gap-1.5 text-xs text-zinc-300 cursor-pointer">
                        <input
                          type="radio"
                          name="adminMediaType"
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
                      Role / Scope
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
                        placeholder="https://... or paste direct image / MP4 video link"
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

              {/* Existing Projects */}
              <div>
                <h4 className="font-heading text-sm font-bold text-white mb-3">
                  Current Portfolio Projects ({items.length})
                </h4>

                <div className="space-y-3">
                  {items.map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-black/50 border border-white/5 hover:border-white/10 transition-colors"
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
            </>
          )}

          {activeTab === 'contact' && (
            <form onSubmit={handleSaveContact} className="p-6 rounded-2xl bg-[#161616] border border-white/10 space-y-5">
              <h4 className="font-heading text-sm font-bold text-white flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FF8C42]" />
                <span>Primary Contact Channels</span>
              </h4>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  WhatsApp Number (with country code)
                </label>
                <input
                  type="text"
                  value={whatsappVal}
                  onChange={(e) => setWhatsappVal(e.target.value)}
                  placeholder="+91 7722983376"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF6B2C]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={emailVal}
                  onChange={(e) => setEmailVal(e.target.value)}
                  placeholder="himneshyadav54@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF6B2C]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Instagram Profile URL / Handle
                </label>
                <input
                  type="text"
                  value={instaVal}
                  onChange={(e) => setInstaVal(e.target.value)}
                  placeholder="https://instagram.com/himneshyadav"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF6B2C]"
                />
              </div>

              {contactSaved && (
                <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Contact channels updated and persisted successfully!</span>
                </div>
              )}

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#FF6B2C] text-white text-xs font-bold uppercase tracking-wider"
              >
                Save Contact Channels
              </button>
            </form>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 bg-[#111111]">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyJSON}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-zinc-300 flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Projects JSON' : 'Copy Projects JSON'}</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Close Panel
          </button>
        </div>
      </div>
    </div>
  );
};
