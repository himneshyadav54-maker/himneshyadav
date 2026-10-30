import React from 'react';
import { X, CheckCircle, ArrowRight, MessageCircle } from 'lucide-react';
import { ServiceItem } from '../config/portfolioData';
import { getWhatsAppUrl } from '../utils/helpers';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ service, onClose }) => {
  if (!service) return null;

  const handleInquire = () => {
    const customMessage = `Hi Himnesh, I'm interested in your ${service.title} services. I'd like to discuss the scope and timeline.`;
    const url = getWhatsAppUrl('custom', customMessage);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
    >
      <div
        className="relative w-full max-w-2xl bg-[#111111] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF6B2C]/15 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          aria-label="Close service modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Number & Category */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs font-bold text-[#FF8C42] px-2.5 py-1 rounded-md bg-[#FF6B2C]/10 border border-[#FF6B2C]/20">
            SERVICE {service.number}
          </span>
          <span className="text-xs text-zinc-400 font-mono">
            {service.typicalTimeline}
          </span>
        </div>

        {/* Title */}
        <h3 id="service-modal-title" className="font-heading text-2xl sm:text-3xl font-extrabold text-white mb-3">
          {service.title}
        </h3>

        <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6">
          {service.shortDesc}
        </p>

        {/* Ideal For */}
        <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 mb-6 text-xs text-zinc-300">
          <strong className="text-[#FF8C42]">Best suited for:</strong> {service.idealFor}
        </div>

        {/* Key Deliverables */}
        <h4 className="text-xs uppercase font-mono tracking-widest text-zinc-400 mb-3">
          KEY DELIVERABLES & EXECUTION:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
          {service.deliverables.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 p-3 rounded-xl bg-[#161616] border border-white/5 text-xs text-zinc-200"
            >
              <CheckCircle className="w-4 h-4 text-[#FF8C42] shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-medium text-zinc-400 hover:text-white transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleInquire}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF8C42] to-[#FF6B2C] text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-[0_0_20px_rgba(255,107,44,0.4)] transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Discuss This Service On WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
