import React from 'react';
import { ArrowUpRight, CheckCircle2, Sparkles, Building2, MessageCircle } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../config/portfolioData';
import { getWhatsAppUrl } from '../utils/helpers';
import { InteractiveTiltCard } from './InteractiveTiltCard';

export const BrandSection: React.FC = () => {
  const handleBrandCta = () => {
    const url = getWhatsAppUrl('brand');
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="brands" className="py-24 sm:py-32 relative bg-[#080808] border-t border-white/5 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-10 w-[450px] h-[450px] rounded-full bg-[#FF6B2C]/8 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111111] border border-[#FF6B2C]/30 text-xs font-mono tracking-widest text-[#FF8C42] uppercase mb-3">
            <Building2 className="w-3.5 h-3.5 text-[#FF6B2C]" />
            <span>FOR BUSINESSES & BRANDS</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-3xl leading-tight">
            Your Brand Deserves{' '}
            <span className="orange-gradient-text">The Right Creators.</span>
          </h2>

          <p className="mt-5 text-zinc-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            I help businesses connect with relevant influencers and content creators to promote their products and services through meaningful collaborations.
          </p>
        </div>

        {/* 5-Step Brand Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-16">
          {PORTFOLIO_CONFIG.brandProcess.map((item, idx) => (
            <InteractiveTiltCard
              key={item.step}
              maxTilt={10}
              scale={1.03}
              glowColor="rgba(255, 140, 66, 0.25)"
              className="h-full"
            >
              <div className="p-6 flex flex-col justify-between h-full bg-[#111111] border border-white/5 hover:border-[#FF6B2C]/40 transition-colors">
                <div>
                  {/* Step Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-extrabold text-[#FF6B2C]">
                      {item.step}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                      Phase
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-base font-bold text-white mb-2">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-[#FF8C42] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Quality Assured</span>
                </div>
              </div>
            </InteractiveTiltCard>
          ))}
        </div>

        {/* Brand Banner Card with WhatsApp CTA */}
        <div className="relative rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-[#141414] via-[#161616] to-[#120f0d] border border-[#FF6B2C]/30 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF8C42] font-semibold mb-2 block">
              READY FOR AUDIENCE EXPANSION?
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mb-2">
              Launch high-ROI creator campaigns without the operational headache.
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300">
              From scouting and background checks to briefing and deliverable tracking — I handle the entire pipeline.
            </p>
          </div>

          <button
            onClick={handleBrandCta}
            className="group shrink-0 inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#FF8C42] to-[#FF6B2C] text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg hover:shadow-[0_0_30px_rgba(255,107,44,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all"
            aria-label="Let's Plan Your Campaign on WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
            <span>LET&apos;S PLAN YOUR CAMPAIGN</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
