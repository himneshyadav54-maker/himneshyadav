import React from 'react';
import { ArrowUp, Instagram, MessageCircle, Mail } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../config/portfolioData';
import { getWhatsAppUrl } from '../utils/helpers';
import { SecretAdminName } from './SecretAdminName';

interface FooterProps {
  onSecretAdminTrigger?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSecretAdminTrigger = () => {} }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Brands', href: '#brands' },
    { label: 'Influencers', href: '#influencers' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-[#050505] border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/5">
          {/* Brand & Subtitle */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#111111] border border-[#FF6B2C]/40 flex items-center justify-center shadow-lg">
                <span className="font-heading font-extrabold text-lg text-white">
                  HY<span className="text-[#FF6B2C]">.</span>
                </span>
              </div>
              <span className="font-heading text-2xl font-bold tracking-tight text-white">
                <SecretAdminName onSecretTrigger={onSecretAdminTrigger} />
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-mono tracking-wider uppercase">
              Digital Marketing | Creative Services | Creator Partnerships
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={PORTFOLIO_CONFIG.personal.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-[#111111] border border-white/10 hover:border-[#FF6B2C]/50 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
              aria-label="Instagram profile @himneshyadav"
            >
              <Instagram className="w-4 h-4" />
            </a>

            <a
              href={getWhatsAppUrl('custom')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-[#111111] border border-white/10 hover:border-[#FF6B2C]/50 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
              aria-label="WhatsApp +91 7722983376"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${PORTFOLIO_CONFIG.personal.email}`}
              className="w-10 h-10 rounded-xl bg-[#111111] border border-white/10 hover:border-[#FF6B2C]/50 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
              aria-label="Send email to himneshyadav54@gmail.com"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-xl bg-[#FF6B2C]/20 border border-[#FF6B2C]/40 hover:bg-[#FF6B2C] flex items-center justify-center text-[#FF8C42] hover:text-white transition-all shadow-md"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation links & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <nav className="flex flex-wrap items-center gap-4 sm:gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-zinc-400 hover:text-white uppercase tracking-wider font-mono transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <p className="text-xs text-zinc-500 font-mono">
            © 2026 Himnesh Yadav. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};
