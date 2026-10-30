import React from 'react';
import { GitCommit, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../config/portfolioData';
import { InteractiveTiltCard } from './InteractiveTiltCard';

export const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="py-24 sm:py-32 relative bg-[#090909] border-t border-white/5 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] rounded-full bg-[#FF6B2C]/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111111] border border-white/10 text-xs font-mono tracking-widest text-[#FF8C42] uppercase mb-3">
            <span>METHODOLOGY</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            From Idea <span className="text-[#FF6B2C]">To Execution.</span>
          </h2>
          <p className="mt-3 text-zinc-400 text-xs sm:text-sm max-w-xl">
            A disciplined, 5-phase operating framework ensuring seamless communication and high-impact deliverables.
          </p>
        </div>

        {/* 3D Timeline Grid */}
        <div className="relative">
          {/* Vertical connecting line for desktop */}
          <div className="hidden lg:block absolute left-1/2 top-8 bottom-8 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#FF8C42] via-[#FF6B2C] to-zinc-800 pointer-events-none" />

          <div className="space-y-8 lg:space-y-12">
            {PORTFOLIO_CONFIG.workingProcess.map((step, idx) => {
              const isEven = idx % 2 === 1;

              return (
                <div
                  key={step.number}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Step Card (Half Width on LG) */}
                  <div className="w-full lg:w-[calc(50%-40px)]">
                    <InteractiveTiltCard
                      maxTilt={8}
                      scale={1.02}
                      glowColor="rgba(255, 107, 44, 0.3)"
                      className="w-full"
                    >
                      <div className="p-7 bg-[#111111] border border-white/10 rounded-2xl hover:border-[#FF6B2C]/50 transition-colors">
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-mono text-2xl font-extrabold text-[#FF6B2C]">
                            {step.number}
                          </span>
                          <span className="text-xs font-mono uppercase tracking-widest text-[#FF8C42] px-2.5 py-0.5 rounded-full bg-[#FF6B2C]/10 border border-[#FF6B2C]/20">
                            {step.phase}
                          </span>
                        </div>

                        <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-2">
                          {step.title}
                        </h3>

                        <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-5">
                          {step.description}
                        </p>

                        <div className="space-y-2 pt-4 border-t border-white/5">
                          {step.details.map((bullet, bIdx) => (
                            <div key={bIdx} className="flex items-start gap-2 text-xs text-zinc-400">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#FF8C42] shrink-0 mt-0.5" />
                              <span>{bullet}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </InteractiveTiltCard>
                  </div>

                  {/* Center Node Indicator */}
                  <div className="hidden lg:flex shrink-0 w-12 h-12 rounded-full bg-[#111111] border-2 border-[#FF6B2C] items-center justify-center text-xs font-mono font-bold text-white shadow-[0_0_20px_rgba(255,107,44,0.4)] z-10">
                    {step.number}
                  </div>

                  {/* Empty counterpart spacer */}
                  <div className="hidden lg:block w-[calc(50%-40px)]" />
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
