import React, { useState } from 'react';
import {
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  Calculator,
  MessageCircle,
  Coins,
} from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../config/portfolioData';
import { calculateDealBreakdown, formatCurrencyINR, getWhatsAppUrl } from '../utils/helpers';
import { InteractiveTiltCard } from './InteractiveTiltCard';

export const InfluencerSection: React.FC = () => {
  const [dealAmount, setDealAmount] = useState<number>(10000);
  const breakdown = calculateDealBreakdown(dealAmount, PORTFOLIO_CONFIG.personal.commissionRate);

  const handleCreatorCta = () => {
    const url = getWhatsAppUrl('influencer');
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="influencers" className="py-24 sm:py-32 relative bg-[#0a0a0a] border-t border-white/5 overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] rounded-full bg-[#FF8C42]/8 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111111] border border-[#FF6B2C]/30 text-xs font-mono tracking-widest text-[#FF8C42] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B2C]" />
            <span>FOR CREATORS & INFLUENCERS</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-3xl leading-tight">
            Your Content Has Value.{' '}
            <span className="orange-gradient-text">Let&apos;s Find The Right Brands.</span>
          </h2>

          <p className="mt-5 text-zinc-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            I help influencers and content creators discover paid collaboration opportunities, connect with relevant brands and negotiate partnerships.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Left Column: 6 Creator Benefits (6 cols) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PORTFOLIO_CONFIG.influencerFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#111111] border border-white/5 hover:border-[#FF6B2C]/30 transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-black border border-white/10 flex items-center justify-center text-[#FF8C42] mb-3 group-hover:bg-[#FF6B2C]/10 transition-colors">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <h3 className="font-heading text-sm font-bold text-white mb-1.5 group-hover:text-[#FF8C42] transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Right Column: Premium Transparent Commission Card & Calculator (6 cols) */}
          <div className="lg:col-span-6">
            <InteractiveTiltCard
              maxTilt={7}
              scale={1.02}
              glowColor="rgba(255, 107, 44, 0.35)"
              className="w-full"
            >
              <div className="p-7 sm:p-8 bg-gradient-to-br from-[#161616] via-[#121212] to-[#0d0d0d] border border-[#FF6B2C]/30 rounded-3xl shadow-2xl">
                
                {/* Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6B2C]/15 border border-[#FF6B2C]/30 text-xs font-mono font-bold text-[#FF8C42]">
                    <Coins className="w-3.5 h-3.5 text-[#FF6B2C]" />
                    TRANSPARENT COMMISSION MODEL
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400">
                    ZERO UPFRONT FEES
                  </span>
                </div>

                {/* Main Heading */}
                <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mb-3">
                  20% Commission On Successfully Secured Deals
                </h3>

                {/* Formal explanation */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                  For brand collaborations sourced or negotiated by me, the agreed management commission is 20% of the total deal value, subject to a mutually agreed written arrangement.
                </p>

                {/* Interactive Deal Calculation Visualizer */}
                <div className="p-5 rounded-2xl bg-black/60 border border-white/10 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                      <Calculator className="w-3.5 h-3.5 text-[#FF8C42]" />
                      SIMULATE DEAL AMOUNT:
                    </span>
                    <span className="text-sm font-bold text-white font-mono">
                      {formatCurrencyINR(dealAmount)}
                    </span>
                  </div>

                  {/* Slider Control */}
                  <input
                    type="range"
                    min={5000}
                    max={100000}
                    step={5000}
                    value={dealAmount}
                    onChange={(e) => setDealAmount(Number(e.target.value))}
                    className="w-full accent-[#FF6B2C] cursor-pointer mb-5"
                    aria-label="Simulate Brand Deal Amount"
                  />

                  {/* Breakdown Cards */}
                  <div className="grid grid-cols-3 gap-2.5 text-center">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                      <span className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">
                        Brand Deal
                      </span>
                      <span className="text-xs sm:text-sm font-bold font-mono text-white">
                        {formatCurrencyINR(breakdown.dealAmount)}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#FF6B2C]/10 border border-[#FF6B2C]/30">
                      <span className="block text-[10px] uppercase font-mono text-[#FF8C42] mb-1">
                        Creator&apos;s Share (80%)
                      </span>
                      <span className="text-xs sm:text-sm font-bold font-mono text-[#FF8C42]">
                        {formatCurrencyINR(breakdown.creatorShare)}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                      <span className="block text-[10px] uppercase font-mono text-zinc-400 mb-1">
                        Commission (20%)
                      </span>
                      <span className="text-xs sm:text-sm font-bold font-mono text-zinc-300">
                        {formatCurrencyINR(breakdown.managementCommission)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Caveat and Terms */}
                <div className="flex items-start gap-2 text-[11px] text-zinc-400 mb-6">
                  <ShieldCheck className="w-4 h-4 text-[#FF8C42] shrink-0 mt-0.5" />
                  <span>
                    Payment and commission arrangements are agreed upon before starting the collaboration.
                  </span>
                </div>

                {/* CTA Button */}
                <button
                  onClick={handleCreatorCta}
                  className="w-full group inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-gradient-to-r from-[#FF8C42] to-[#FF6B2C] text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg hover:shadow-[0_0_25px_rgba(255,107,44,0.45)] hover:scale-[1.01] active:scale-[0.99] transition-all"
                  aria-label="Get Brand Collaborations on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>GET BRAND COLLABORATIONS</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

              </div>
            </InteractiveTiltCard>
          </div>

        </div>

      </div>
    </section>
  );
};
