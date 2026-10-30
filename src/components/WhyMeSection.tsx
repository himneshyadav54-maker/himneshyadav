import React from 'react';
import {
  Palette,
  ShieldCheck,
  TrendingUp,
  MessageSquare,
  SlidersHorizontal,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../config/portfolioData';
import { InteractiveTiltCard } from './InteractiveTiltCard';

export const WhyMeSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Palette':
        return <Palette className="w-6 h-6 text-[#FF8C42]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#FF8C42]" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-[#FF8C42]" />;
      case 'MessageSquare':
        return <MessageSquare className="w-6 h-6 text-[#FF8C42]" />;
      case 'SlidersHorizontal':
        return <SlidersHorizontal className="w-6 h-6 text-[#FF8C42]" />;
      case 'CheckCircle2':
      default:
        return <CheckCircle2 className="w-6 h-6 text-[#FF8C42]" />;
    }
  };

  return (
    <section className="py-24 sm:py-32 relative bg-[#080808] border-t border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] rounded-full bg-[#FF6B2C]/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111111] border border-white/10 text-xs font-mono tracking-widest text-[#FF8C42] uppercase mb-3">
            <span>VALUE PROPOSITION</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Creative Thinking.{' '}
            <span className="text-[#FF6B2C]">Strategic Execution.</span>
          </h2>
          <p className="mt-3 text-zinc-400 text-xs sm:text-sm max-w-xl">
            A reliable partner for brand marketing, creative direction, and high-converting creator collaborations.
          </p>
        </div>

        {/* 6 Interactive Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PORTFOLIO_CONFIG.whyWorkWithMe.map((item) => (
            <InteractiveTiltCard
              key={item.id}
              maxTilt={9}
              scale={1.03}
              glowColor="rgba(255, 140, 66, 0.28)"
              className="h-full"
            >
              <div className="p-7 flex flex-col justify-between h-full bg-[#111111] border border-white/10 rounded-2xl hover:border-[#FF6B2C]/40 transition-colors">
                <div>
                  {/* Top: Icon & Spec */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center shadow-inner group-hover:bg-[#FF6B2C]/10 transition-colors">
                      {getIcon(item.icon)}
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#FF8C42] px-2.5 py-0.5 rounded-full bg-[#FF6B2C]/10 border border-[#FF6B2C]/20">
                      {item.highlight}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-lg font-bold text-white mb-2.5">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF8C42]" />
                  <span>Guaranteed Standards</span>
                </div>
              </div>
            </InteractiveTiltCard>
          ))}
        </div>

      </div>
    </section>
  );
};
