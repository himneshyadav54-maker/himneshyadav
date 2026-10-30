import React, { useState } from 'react';
import {
  MessageCircle,
  Mail,
  Instagram,
  Send,
  ArrowUpRight,
  Sparkles,
  Building2,
  Users,
  Briefcase,
  CheckCircle,
  Edit2,
  Check,
} from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../config/portfolioData';
import { getWhatsAppUrl, INQUIRY_MESSAGES } from '../utils/helpers';
import { ContactSphereScene } from './ContactSphereScene';
import { InteractiveTiltCard } from './InteractiveTiltCard';

interface ContactSectionProps {
  isAdmin?: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ isAdmin = false }) => {
  // Contact details state (editable via modal or quick toggle)
  const [email, setEmail] = useState<string>(() => {
    return localStorage.getItem('hy_custom_email') || PORTFOLIO_CONFIG.personal.email;
  });
  const [whatsapp, setWhatsapp] = useState<string>(() => {
    return localStorage.getItem('hy_custom_whatsapp') || PORTFOLIO_CONFIG.personal.whatsappNumber;
  });
  const [instagram, setInstagram] = useState<string>(() => {
    return localStorage.getItem('hy_custom_instagram') || PORTFOLIO_CONFIG.personal.instagramUrl;
  });

  const [isEditingContact, setIsEditingContact] = useState(false);
  const [editEmail, setEditEmail] = useState(email);
  const [editWhatsapp, setEditWhatsapp] = useState(whatsapp);
  const [editInstagram, setEditInstagram] = useState(instagram);

  // Form State
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formInquiryType, setFormInquiryType] = useState<'business' | 'influencer' | 'brand' | 'custom'>('business');
  const [formMessage, setFormMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSaveContactInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail(editEmail);
    setWhatsapp(editWhatsapp);
    setInstagram(editInstagram);
    localStorage.setItem('hy_custom_email', editEmail);
    localStorage.setItem('hy_custom_whatsapp', editWhatsapp);
    localStorage.setItem('hy_custom_instagram', editInstagram);
    setIsEditingContact(false);
  };

  const handlePathwayClick = (pathway: 'business' | 'influencer' | 'brand') => {
    const url = getWhatsAppUrl(pathway, undefined, whatsapp);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formMessage.trim()) return;

    // Send formatted message through WhatsApp or Email client
    const fullMessage = `Inquiry from ${formName} (${formEmail}) - [Type: ${formInquiryType}]:\n${formMessage}`;
    const url = getWhatsAppUrl('custom', fullMessage, whatsapp);
    window.open(url, '_blank', 'noopener,noreferrer');

    setFormSubmitted(true);
    setTimeout(() => {
      setFormName('');
      setFormEmail('');
      setFormMessage('');
      setFormSubmitted(false);
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative bg-[#090909] border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#FF6B2C]/10 blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111111] border border-white/10 text-xs font-mono tracking-widest text-[#FF8C42] uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B2C]" />
            <span>CONNECT WITH HIMNESH</span>
          </div>

          <h2 className="font-heading text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-4">
            Have A Project <span className="orange-gradient-text">In Mind?</span>
          </h2>

          <p className="text-zinc-300 text-sm sm:text-lg max-w-xl">
            Let&apos;s turn your next idea into something impactful.
          </p>
        </div>

        {/* 3 Contact Pathways Grid (Businesses, Influencers, Brands) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
          
          {/* Pathway A: For Businesses */}
          <InteractiveTiltCard
            maxTilt={9}
            scale={1.03}
            glowColor="rgba(255, 107, 44, 0.35)"
            className="h-full"
          >
            <div className="p-7 flex flex-col justify-between h-full bg-[#111111] border border-white/10 rounded-2xl">
              <div>
                <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center text-[#FF8C42] mb-5">
                  <Briefcase className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-1">
                  PATHWAY 01
                </span>
                <h3 className="font-heading text-xl font-bold text-white mb-2">
                  For Businesses
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                  Social media management, high-converting Meta Ads, video editing, and organic audience acquisition.
                </p>
              </div>

              <button
                onClick={() => handlePathwayClick('business')}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#FF8C42] to-[#FF6B2C] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-[0_0_20px_rgba(255,107,44,0.4)] transition-all"
                aria-label="Discuss A Project on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
                <span>DISCUSS A PROJECT</span>
              </button>
            </div>
          </InteractiveTiltCard>

          {/* Pathway B: For Influencers */}
          <InteractiveTiltCard
            maxTilt={9}
            scale={1.03}
            glowColor="rgba(255, 140, 66, 0.35)"
            className="h-full"
          >
            <div className="p-7 flex flex-col justify-between h-full bg-[#111111] border border-white/10 rounded-2xl">
              <div>
                <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center text-[#FF8C42] mb-5">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-1">
                  PATHWAY 02
                </span>
                <h3 className="font-heading text-xl font-bold text-white mb-2">
                  For Influencers
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                  Paid brand collaborations, rate negotiation, sponsor management, and commercial representation.
                </p>
              </div>

              <button
                onClick={() => handlePathwayClick('influencer')}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#FF8C42] to-[#FF6B2C] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-[0_0_20px_rgba(255,107,44,0.4)] transition-all"
                aria-label="Get Brand Deals on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
                <span>GET BRAND DEALS</span>
              </button>
            </div>
          </InteractiveTiltCard>

          {/* Pathway C: For Brands */}
          <InteractiveTiltCard
            maxTilt={9}
            scale={1.03}
            glowColor="rgba(255, 107, 44, 0.35)"
            className="h-full"
          >
            <div className="p-7 flex flex-col justify-between h-full bg-[#111111] border border-white/10 rounded-2xl">
              <div>
                <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center text-[#FF8C42] mb-5">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-1">
                  PATHWAY 03
                </span>
                <h3 className="font-heading text-xl font-bold text-white mb-2">
                  For Brands
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                  Targeted creator matchmaking, briefing, synchronized execution, and verified deliverable tracking.
                </p>
              </div>

              <button
                onClick={() => handlePathwayClick('brand')}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#FF8C42] to-[#FF6B2C] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-[0_0_20px_rgba(255,107,44,0.4)] transition-all"
                aria-label="Start A Brand Campaign on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
                <span>START A BRAND CAMPAIGN</span>
              </button>
            </div>
          </InteractiveTiltCard>

        </div>

        {/* 3D Sphere Showcase & Direct Contact Information */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          
          {/* Left: Glowing Orange 3D Sphere (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <ContactSphereScene className="w-full max-w-sm" />
            <div className="mt-3 px-3.5 py-1 rounded-full bg-black/60 border border-white/10 text-[11px] font-mono text-zinc-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF6B2C] animate-pulse" />
              <span>Direct Partnership Access</span>
            </div>
          </div>

          {/* Right: Direct Channels & Interactive Form (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Direct Channel Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* WhatsApp */}
              <a
                href={getWhatsAppUrl('custom', undefined, whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#111111] hover:bg-[#161616] border border-white/10 hover:border-[#FF6B2C]/40 flex items-center gap-3 transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-black border border-white/10 flex items-center justify-center text-[#FF8C42] group-hover:text-white transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[10px] font-mono text-zinc-400 block uppercase">WhatsApp</span>
                  <span className="text-xs font-semibold text-white truncate block">
                    +91 7722983376
                  </span>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${email}`}
                className="p-4 rounded-xl bg-[#111111] hover:bg-[#161616] border border-white/10 hover:border-[#FF6B2C]/40 flex items-center gap-3 transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-black border border-white/10 flex items-center justify-center text-[#FF8C42] group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[10px] font-mono text-zinc-400 block uppercase">Email</span>
                  <span className="text-xs font-semibold text-white truncate block">
                    {email}
                  </span>
                </div>
              </a>

              {/* Instagram */}
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#111111] hover:bg-[#161616] border border-white/10 hover:border-[#FF6B2C]/40 flex items-center gap-3 transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-black border border-white/10 flex items-center justify-center text-[#FF8C42] group-hover:text-white transition-colors">
                  <Instagram className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[10px] font-mono text-zinc-400 block uppercase">Instagram</span>
                  <span className="text-xs font-semibold text-white truncate block">
                    {PORTFOLIO_CONFIG.personal.instagramHandle}
                  </span>
                </div>
              </a>
            </div>

            {/* Quick Edit Contact Info Toggle (Admin Only) */}
            {isAdmin && (
              <div className="flex justify-end">
                <button
                  onClick={() => setIsEditingContact((prev) => !prev)}
                  className="text-[11px] font-mono text-zinc-400 hover:text-[#FF8C42] flex items-center gap-1 transition-colors"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>{isEditingContact ? 'Cancel Editing' : 'Edit Contact Details (Admin)'}</span>
                </button>
              </div>
            )}

            {/* Editable Contact Info Panel */}
            {isEditingContact && (
              <form onSubmit={handleSaveContactInfo} className="p-4 rounded-2xl bg-black/70 border border-[#FF6B2C]/30 space-y-3">
                <span className="text-xs font-bold text-white block">
                  Update Contact Channels:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    placeholder="Email address"
                    className="px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-xs text-white"
                  />
                  <input
                    type="text"
                    value={editWhatsapp}
                    onChange={(e) => setEditWhatsapp(e.target.value)}
                    placeholder="WhatsApp number"
                    className="px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-xs text-white"
                  />
                  <input
                    type="text"
                    value={editInstagram}
                    onChange={(e) => setEditInstagram(e.target.value)}
                    placeholder="Instagram URL"
                    className="px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-xs text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#FF6B2C] text-white text-xs font-bold"
                >
                  Save Changes
                </button>
              </form>
            )}

            {/* Contact Form */}
            <form onSubmit={handleFormSubmit} className="p-6 sm:p-7 rounded-2xl bg-[#111111] border border-white/10 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <h4 className="font-heading text-sm font-bold text-white">
                  Send A Direct Message
                </h4>
                <span className="text-[10px] font-mono text-zinc-400">
                  Quick Response
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF6B2C]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF6B2C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                  Inquiry Type *
                </label>
                <select
                  value={formInquiryType}
                  onChange={(e) => setFormInquiryType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF6B2C]"
                >
                  <option value="business">Business — Social Media & Marketing</option>
                  <option value="influencer">Influencer — Get Brand Deals</option>
                  <option value="brand">Brand — Influencer Marketing Campaign</option>
                  <option value="custom">General Inquiry / Creative Partnership</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                  Message Details *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell Himnesh about your project, timeline or goals..."
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-black border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF6B2C]"
                />
              </div>

              {formSubmitted ? (
                <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Message dispatched via direct messaging client!</span>
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF8C42] to-[#FF6B2C] text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-[0_0_20px_rgba(255,107,44,0.4)] transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message Directly</span>
                </button>
              )}
            </form>

          </div>

        </div>

      </div>
    </section>
  );
};
