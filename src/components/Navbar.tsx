import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, MessageCircle, ShieldCheck } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../config/portfolioData';
import { SecretAdminName } from './SecretAdminName';

interface NavbarProps {
  onContactClick: () => void;
  isAdmin?: boolean;
  onSecretAdminTrigger?: () => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onContactClick,
  isAdmin = false,
  onSecretAdminTrigger = () => {},
  onOpenAdmin = () => {},
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3.5 bg-[#080808]/85 backdrop-blur-md border-b border-white/5 shadow-2xl'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Minimal HY. Logo + Secret Click on second 'a' in Yadav */}
        <div className="flex items-center gap-3">
          <a
            href="#hero"
            className="w-10 h-10 rounded-xl bg-[#111111] border border-white/10 hover:border-[#FF6B2C]/60 flex items-center justify-center transition-colors shadow-lg group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B2C]"
            aria-label="Himnesh Yadav Homepage"
          >
            <span className="font-heading font-extrabold text-lg text-white tracking-tighter">
              HY<span className="text-[#FF6B2C]">.</span>
            </span>
          </a>

          <div className="hidden sm:inline-block font-heading font-bold text-sm tracking-widest text-zinc-300">
            <SecretAdminName onSecretTrigger={onSecretAdminTrigger} />
          </div>

          {isAdmin && (
            <button
              onClick={onOpenAdmin}
              className="px-2.5 py-0.5 rounded-full bg-[#FF6B2C]/20 border border-[#FF6B2C]/40 text-[10px] font-mono font-bold text-[#FF8C42] hover:bg-[#FF6B2C] hover:text-white transition-colors flex items-center gap-1"
              title="Open Admin Control Panel"
            >
              <ShieldCheck className="w-3 h-3" />
              <span>ADMIN</span>
            </button>
          )}
        </div>

        {/* Center / Right: Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#111111]/70 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-lg">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3.5 py-1.5 text-xs uppercase font-medium tracking-wider text-zinc-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA: LET'S TALK */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onContactClick}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FF8C42] to-[#FF6B2C] text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-[0_0_25px_rgba(255,107,44,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all"
            aria-label="Let's Talk - Open contact pathways"
          >
            <span>LET&apos;S TALK</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          {isAdmin && (
            <button
              onClick={onOpenAdmin}
              className="px-2 py-1 rounded-lg bg-[#FF6B2C]/20 border border-[#FF6B2C]/50 text-[10px] font-mono text-[#FF8C42] font-bold"
            >
              ADMIN
            </button>
          )}
          <button
            onClick={onContactClick}
            className="p-2 rounded-lg bg-[#FF6B2C] text-white text-xs font-bold"
            aria-label="Quick contact"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2 rounded-xl bg-[#111111] border border-white/10 text-zinc-300 hover:text-white focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0a0a0a]/95 border-b border-white/10 backdrop-blur-2xl px-6 pt-4 pb-8 transition-all animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-3">
            <div className="py-2 text-xs font-mono text-zinc-400 border-b border-white/5">
              <SecretAdminName onSecretTrigger={onSecretAdminTrigger} />
            </div>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-sm font-medium tracking-wide text-zinc-300 hover:text-[#FF8C42] border-b border-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onContactClick();
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF8C42] to-[#FF6B2C] text-white text-sm font-bold tracking-wider uppercase text-center shadow-lg"
              >
                LET&apos;S TALK
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
