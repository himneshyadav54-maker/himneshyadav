import React, { useState } from 'react';
import { Camera, Sparkles, CheckCircle, Upload, Image as ImageIcon } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../config/portfolioData';
import { InteractiveTiltCard } from './InteractiveTiltCard';

export const AboutSection: React.FC = () => {
  const [customPhoto, setCustomPhoto] = useState<string>(() => {
    return localStorage.getItem('hy_custom_portrait') || PORTFOLIO_CONFIG.personal.portraitUrl || '';
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setCustomPhoto(result);
        localStorage.setItem('hy_custom_portrait', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetPhoto = () => {
    setCustomPhoto('');
    localStorage.removeItem('hy_custom_portrait');
  };

  const pillars = [
    { title: 'Strategic Execution', desc: 'Every campaign and asset is built to achieve commercial objectives.' },
    { title: 'Content Retention', desc: 'Visual storytelling optimized for engagement, watch time, and trust.' },
    { title: 'High-Value Matchmaking', desc: 'Connecting brands and creators who genuinely align in values and audience.' },
    { title: 'Transparent Process', desc: 'Clear deliverables, straightforward communication, and no guesswork.' },
  ];

  return (
    <section id="about" className="py-24 sm:py-32 relative bg-[#080808] border-t border-white/5">
      {/* Background orange haze */}
      <div className="absolute top-1/2 right-1/4 w-[350px] h-[350px] rounded-full bg-[#FF6B2C]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111111] border border-white/10 text-xs font-mono tracking-widest text-[#FF8C42] uppercase mb-3">
            <span>ABOUT ME</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            More Than Just <span className="text-[#FF6B2C]">Marketing.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive 3D Frame Around Portrait (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <InteractiveTiltCard
              maxTilt={14}
              scale={1.03}
              glowColor="rgba(255, 107, 44, 0.4)"
              className="w-full max-w-md aspect-[4/5] rounded-3xl"
            >
              <div className="relative w-full h-full p-4 flex flex-col items-center justify-center text-center bg-gradient-to-b from-[#141414] to-[#0c0c0c] border border-white/10">
                {/* 3D Corner Accents */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#FF6B2C]" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#FF6B2C]" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#FF6B2C]" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#FF6B2C]" />

                {customPhoto ? (
                  <div className="relative w-full h-full rounded-2xl overflow-hidden group">
                    <img
                      src={customPhoto}
                      alt="Himnesh Yadav portrait"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-4">
                      <label className="cursor-pointer px-4 py-2 rounded-xl bg-[#FF6B2C] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Change Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                          aria-label="Upload custom portrait"
                        />
                      </label>
                      <button
                        onClick={handleResetPhoto}
                        className="text-[11px] text-zinc-400 hover:text-white underline"
                      >
                        Reset to default frame
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full rounded-2xl border border-dashed border-white/15 bg-black/40 flex flex-col items-center justify-center p-6 text-center">
                    {/* Stylish Abstract Monogram Placeholder */}
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#1b1b1b] to-[#111111] border border-white/15 flex items-center justify-center mb-5 shadow-2xl relative">
                      <span className="font-heading text-4xl font-extrabold text-white tracking-tighter">
                        HY<span className="text-[#FF6B2C]">.</span>
                      </span>
                      <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-[#FF6B2C] text-white shadow-md">
                        <Sparkles className="w-4 h-4" />
                      </div>
                    </div>

                    <h4 className="font-heading text-lg font-bold text-white mb-1">
                      Himnesh Yadav
                    </h4>
                    <p className="text-xs text-zinc-400 mb-6 max-w-xs">
                      Independent Marketing & Creator Partnerships Specialist
                    </p>

                    {/* Direct Upload Trigger */}
                    <label className="cursor-pointer px-4 py-2.5 rounded-xl bg-[#111111] hover:bg-[#1a1a1a] border border-[#FF6B2C]/40 hover:border-[#FF6B2C] text-xs font-semibold text-zinc-200 hover:text-white flex items-center gap-2 transition-all shadow-md">
                      <Camera className="w-4 h-4 text-[#FF8C42]" />
                      <span>Upload Your Portrait</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                        aria-label="Upload your portrait photo"
                      />
                    </label>
                    <span className="text-[10px] text-zinc-400 mt-2">
                      Local preview or set in portfolioData.ts
                    </span>
                  </div>
                )}

                {/* Bottom Frame Spec Badge */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/80 border border-white/10 text-[10px] font-mono text-zinc-400 backdrop-blur-md uppercase tracking-widest whitespace-nowrap">
                  3D DYNAMIC FRAME
                </div>
              </div>
            </InteractiveTiltCard>
          </div>

          {/* Right Column: Bio & Core Philosophy (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-6 leading-snug">
              Combining creative execution with smart strategies to create meaningful results.
            </h3>

            <div className="space-y-4 text-base text-zinc-300 leading-relaxed mb-8">
              <p>
                I&apos;m <span className="text-white font-medium">Himnesh Yadav</span>, an independent digital marketing professional passionate about creativity, content and building meaningful digital connections.
              </p>
              <p>
                I work with businesses, personal brands, influencers and content creators to help them grow through social media management, video editing, marketing strategies and brand partnerships.
              </p>
              <p className="text-white font-medium">
                My focus is simple: combining creative execution with smart strategies to create meaningful results.
              </p>
            </div>

            {/* Strategic Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#111111]/70 border border-white/5 hover:border-[#FF6B2C]/30 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <CheckCircle className="w-4 h-4 text-[#FF8C42] shrink-0" />
                    <h4 className="font-heading text-sm font-bold text-white">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs text-zinc-400 leading-normal pl-6">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
