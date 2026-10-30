import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoaded: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Check if ?autostart=1 or fast load
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') {
      onLoaded();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(onLoaded, 600);
          }, 200);
          return 100;
        }
        const increment = Math.floor(Math.random() * 18) + 12;
        return Math.min(100, prev + increment);
      });
    }, 90);

    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#080808] transition-opacity duration-700 select-none ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="Loading Himnesh Yadav Portfolio"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Background radial glow */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[#FF6B2C]/10 blur-[120px] pointer-events-none" />

      {/* Brand Monogram */}
      <div className="relative flex flex-col items-center">
        <div className="w-20 h-20 rounded-2xl bg-[#111111] border border-white/10 flex items-center justify-center shadow-2xl relative overflow-hidden mb-6">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6B2C]/20 to-transparent" />
          <span className="font-heading text-3xl font-extrabold tracking-tighter text-white">
            HY<span className="text-[#FF6B2C]">.</span>
          </span>
          {/* Subtle spinning ring border */}
          <div className="absolute inset-0 border border-[#FF6B2C]/40 rounded-2xl" />
        </div>

        {/* Full Name */}
        <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-[0.2em] text-white uppercase mb-2">
          HIMNESH YADAV
        </h1>

        <p className="text-xs uppercase tracking-[0.3em] text-zinc-400 font-medium mb-8">
          Digital Marketing • Creative 3D Portfolio
        </p>

        {/* Progress Bar & Percentage */}
        <div className="w-64 flex flex-col items-center gap-3">
          <div className="w-full h-[2px] bg-zinc-800 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-[#FF8C42] to-[#FF6B2C] transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between w-full text-[11px] font-mono text-zinc-400">
            <span>INITIALIZING EXPERIENCE</span>
            <span className="text-[#FF8C42] font-semibold">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
