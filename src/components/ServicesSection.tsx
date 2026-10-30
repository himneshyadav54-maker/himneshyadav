import React, { useState } from 'react';
import {
  Instagram,
  Film,
  Target,
  Users,
  Handshake,
  Sparkles,
  ArrowRight,
  Check,
} from 'lucide-react';
import { PORTFOLIO_CONFIG, ServiceItem } from '../config/portfolioData';
import { InteractiveTiltCard } from './InteractiveTiltCard';
import { ServiceDetailModal } from './ServiceDetailModal';

export const ServicesSection: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Icon selector mapping
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Instagram':
        return <Instagram className="w-6 h-6 text-[#FF8C42]" />;
      case 'Film':
        return <Film className="w-6 h-6 text-[#FF8C42]" />;
      case 'Target':
        return <Target className="w-6 h-6 text-[#FF8C42]" />;
      case 'Users':
        return <Users className="w-6 h-6 text-[#FF8C42]" />;
      case 'Handshake':
        return <Handshake className="w-6 h-6 text-[#FF8C42]" />;
      case 'Sparkles':
      default:
        return <Sparkles className="w-6 h-6 text-[#FF8C42]" />;
    }
  };

  return (
    <section id="services" className="py-24 sm:py-32 relative bg-[#090909]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111111] border border-white/10 text-xs font-mono tracking-widest text-[#FF8C42] uppercase mb-3">
            <span>SPECIALIZED EXPERTISE</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            What I Bring <span className="text-[#FF6B2C]">To The Table.</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base max-w-xl">
            High-caliber creative production, strategic marketing and commercial partnerships built for genuine conversion and reach.
          </p>
        </div>

        {/* 6 Interactive 3D Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PORTFOLIO_CONFIG.services.map((service) => (
            <InteractiveTiltCard
              key={service.id}
              maxTilt={8}
              scale={1.02}
              className="h-full"
              onClick={() => setSelectedService(service)}
            >
              <div className="p-7 flex flex-col h-full justify-between bg-gradient-to-b from-[#141414] to-[#0d0d0d]">
                
                {/* Card Top: Number & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-bold text-zinc-400">
                      SERVICE {service.number}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] border border-white/10 flex items-center justify-center shadow-inner group-hover:border-[#FF6B2C]/40 transition-colors">
                      {renderIcon(service.iconName)}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-xl font-bold text-white mb-3 tracking-tight group-hover:text-[#FF8C42] transition-colors">
                    {service.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>

                  {/* Bullet preview */}
                  <div className="space-y-2 mb-6 border-t border-white/5 pt-4">
                    {service.deliverables.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                        <Check className="w-3.5 h-3.5 text-[#FF8C42] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{item}</span>
                      </div>
                    ))}
                    {service.deliverables.length > 3 && (
                      <p className="text-[11px] text-zinc-400 pl-5">
                        +{service.deliverables.length - 3} more deliverables
                      </p>
                    )}
                  </div>
                </div>

                {/* Card Bottom: Explore Service Link */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white group-hover:text-[#FF8C42] transition-colors">
                    <span>Explore Service</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#FF6B2C] group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">
                    Details
                  </span>
                </div>

              </div>
            </InteractiveTiltCard>
          ))}
        </div>

      </div>

      {/* Deep-dive service modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </section>
  );
};
