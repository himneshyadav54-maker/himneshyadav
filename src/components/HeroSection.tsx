import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowUpRight, Sparkles, ChevronRight, Zap } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../config/portfolioData';
import { ThreeHeroScene } from './ThreeHeroScene';

interface HeroSectionProps {
  onExploreWork: () => void;
  onWorkTogether: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreWork,
  onWorkTogether,
}) => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % PORTFOLIO_CONFIG.rotatingRoles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-16 overflow-hidden bg-grid-pattern"
    >
      {/* Background ambient light orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#FF6B2C]/10 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] rounded-full bg-[#FF8C42]/8 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Editorial Copy (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            {/* Small Pill Label */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111111] border border-[#FF6B2C]/30 text-xs tracking-wider uppercase font-semibold text-zinc-300 mb-6 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-[#FF6B2C]" />
              <span className="text-[#FF8C42]">INDEPENDENT</span> DIGITAL MARKETING PROFESSIONAL
            </div>

            {/* Main Heading: "Turning Ideas Into Digital Impact." */}
            <h1 className="font-heading text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
              Turning Ideas Into{' '}
              <span className="orange-gradient-text drop-shadow-[0_0_35px_rgba(255,107,44,0.35)]">
                Digital Impact.
              </span>
            </h1>

            {/* Introduction */}
            <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed max-w-2xl mb-8">
              I&apos;m <span className="text-white font-semibold">Himnesh Yadav</span> — I help businesses build their digital presence, create powerful content and connect with the right audiences through strategic marketing and creative execution.
            </p>

            {/* Animated Service Text Rotation */}
            <div className="w-full mb-10 p-4 rounded-2xl bg-[#111111]/80 border border-white/10 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xl">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400 font-mono">
                <Zap className="w-4 h-4 text-[#FF6B2C]" />
                <span>EXPERTISE FOCUS:</span>
              </div>
              <div className="h-7 overflow-hidden flex items-center">
                <div
                  key={roleIndex}
                  className="font-heading text-sm sm:text-base font-bold text-[#FF8C42] tracking-wider animate-in fade-in slide-in-from-bottom-2 duration-300"
                >
                  {PORTFOLIO_CONFIG.rotatingRoles[roleIndex]}
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              {/* Primary CTA: Explore My Work */}
              <button
                onClick={onExploreWork}
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-[#FF8C42] to-[#FF6B2C] text-white text-sm font-bold uppercase tracking-wider shadow-lg hover:shadow-[0_0_30px_rgba(255,107,44,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                aria-label="Explore My Work"
              >
                <span>Explore My Work</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Secondary CTA: Let's Work Together */}
              <button
                onClick={onWorkTogether}
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#111111] hover:bg-zinc-900 border border-white/15 hover:border-[#FF6B2C]/50 text-white text-sm font-bold uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98] transition-all"
                aria-label="Let's Work Together"
              >
                <span>Let&apos;s Work Together</span>
                <ArrowUpRight className="w-4 h-4 text-[#FF8C42] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive 3D Hero Object (5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <ThreeHeroScene className="w-full" />
          </div>

        </div>

        {/* Scroll To Explore Indicator */}
        <div className="mt-12 sm:mt-16 flex flex-col items-center justify-center gap-2 text-zinc-400">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-400">
            SCROLL TO EXPLORE
          </span>
          <a
            href="#about"
            className="p-2 rounded-full border border-white/10 hover:border-[#FF6B2C] text-zinc-400 hover:text-[#FF8C42] transition-colors"
            aria-label="Scroll to About Me section"
          >
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};
